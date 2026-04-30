import React from "react";
import {Nothing} from "../../infrastructure/nothing";
import {
  Response,
} from "./response";
import {
  CreateSymbols, newMessageId,
  Request, RequestType,
} from "./requests";
import {EditorProviders} from "./providers/editorProviders";
import {firstOrDefault} from "lexy/dist/infrastructure/arrayFunctions";
import {CancellationToken} from "monaco-editor";

export interface SymbolContextState {
  editorProviders: EditorProviders | Nothing;
}

export interface SymbolWorkerClient {
  execute<TRequest extends Request, TResponse extends Response>(request: TRequest, token: CancellationToken): Promise<TResponse>;
}

class MessageHandler {

  private readonly resolve: ((value: any) => void);
  private readonly reject: ((value: any) => void);
  private readonly token: CancellationToken;
  private readonly removeHandler: (handler: MessageHandler) => void;
  private readonly timeout: NodeJS.Timeout;

  public readonly messageId: string | Nothing;

  constructor(messageId: string | Nothing,
              resolve: ((value: any) => void),
              reject: ((value: any) => void),
              token: CancellationToken,
              removeHandler: (handler: MessageHandler) => void) {

    this.messageId = messageId;
    this.resolve = resolve;
    this.reject = reject;
    this.token = token;
    this.removeHandler = removeHandler;
    this.timeout = setTimeout(this.timeoutHandler.bind(this), 60000);
  }

  private timeoutHandler() {
    this.reject(new Error("Message response timeout."));
    this.removeHandler(this);
  }

  handle(response: Response) {
    try {
      if (this.token.isCancellationRequested) {
        this.reject(new Error("Message cancellation requested."))
      } else if (response.errorMessage) {
        this.reject(new Error("Error while receiving: " + response.type));
      } else {
        this.resolve(response);
      }
    } finally {
      clearTimeout(this.timeout);
      this.removeHandler(this);
    }
  }
}

export class SymbolsWorker implements SymbolWorkerClient {

  private worker: Worker;
  private readonly responseHandlers: MessageHandler[] = [];

  constructor() {
    this.worker = new Worker(new URL('./background/worker.ts', import.meta.url));
    this.worker.onmessage = this.handleResponse.bind(this);
  }

  public createSymbols(fullFilePath: string, modelVersionId: number, code: string) {
    const request: CreateSymbols = {
      type: RequestType.CreateSymbols,
      messageId: null,
      versionId: modelVersionId,
      fullFilePath: fullFilePath,
      code: code
    }
    this.worker.postMessage(request);
  }

  public execute<TRequest extends Request, TResponse extends Response>(request: TRequest, token: CancellationToken): Promise<TResponse> {
    console.log(`Symbols request: ${JSON.stringify(request, null, 4)}`);
    this.worker.postMessage(request);
    return new Promise<TResponse>((resolve, reject) => {
      this.responseHandlers.push(new MessageHandler(request.messageId, resolve, reject, token, this.removeHandler.bind(this)));
    });
  }

  private removeHandler(handler: MessageHandler) {
    const index = this.responseHandlers.indexOf(handler);
    this.responseHandlers.splice(index, 1);
  }

  private handleResponse(response: MessageEvent<Response>) {

    console.log(`Symbols handle response: ${JSON.stringify(response.data, null, 4)}`);

    const handler = firstOrDefault(this.responseHandlers, handler => handler.messageId == response.data.messageId);

    if (!handler) {
      console.log(`IGNORE: Unknown message: ${JSON.stringify(response.data, null, 4)}\nHandlers: ${JSON.stringify(this.responseHandlers, null, 4)}`);
      return;
    }

    handler.handle(response.data);
  }
}
