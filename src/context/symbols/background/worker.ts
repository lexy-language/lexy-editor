import type {ISymbols} from "lexy/dist/parser/symbols/symbols";
import type {IProject} from "lexy/dist/infrastructure/project";

import {
  Response,
} from "../response";
import {
  CreateSymbols,
  GetCompletionItems, GetSignatures,
  Request,
  RequestType
} from "../requests";
import {createSymbols} from "./createSymbols";
import {getCompletionItems} from "./getCompletionItems";
import {getSignatures} from "./getSignatures";
import {nothing, Nothing} from "../../../infrastructure/nothing";

export interface Symbols {
  versionId: number,
  fullFilePath: string,
  project: IProject;
  value: ISymbols;
}

export interface SymbolsWorkerContext {
  symbols: Symbols | Nothing;
  verifySymbols(action: string, fullFilePath: string, versionId: number): Symbols | Nothing;
  postResponse(response: Response): void;
}

class SymbolsWorker implements SymbolsWorkerContext {

  public symbols: Symbols | null = null;

  public postResponse(response: Response) {
    self.postMessage(response);
  }

  public verifySymbols(action: string, fullFilePath: string, versionId: number): Symbols | null {

    if (this.symbols == nothing) {
      console.log(`${action} failed: symbols is nothing`);
      return null;
    }
    if (this.symbols.fullFilePath != fullFilePath) {
      console.log(`${action} failed: filename '${this.symbols.fullFilePath}' != '${fullFilePath}'`);
      return null;
    }
    if (this.symbols.versionId != versionId) {
      console.log(`${action} failed: '${this.symbols.fullFilePath}' versionId: '${this.symbols.versionId}' != '${versionId}'`);
      return null;
    }
    return this.symbols;
  }

  public async processWorkerRequest(message: MessageEvent<Request>): Promise<void> {

    switch (message.data.type) {
      case RequestType.CreateSymbols:
        await createSymbols(message.data as CreateSymbols, this);
        break;

      case RequestType.GetCompletionItems:
        await getCompletionItems(message.data as GetCompletionItems, this);
        break;

      case RequestType.GetSignatures:
        await getSignatures(message.data as GetSignatures, this);
        break;

      default:
        console.log("Invalid compile worker request: " + JSON.stringify(message.data));
        break;
    }
  }
}

const symbolsWorker = new SymbolsWorker();

const self = globalThis as unknown as DedicatedWorkerGlobalScope;
self.onmessage = symbolsWorker.processWorkerRequest.bind(symbolsWorker);
