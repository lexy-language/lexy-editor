import {
  Response,
} from "../response";
import {
  CreateSymbolsRequest,
  GetCompletionItemsRequest, GetSignaturesRequest,
  Request,
  RequestType
} from "../requests";
import {createSymbols} from "./createSymbols";
import {DocumentsSymbols} from "lexy/dist/parser/symbols/documentsSymbols";
import {getCompletionItems} from "./getCompletionItems";
import {getSignatures} from "./getSignatures";
import {nothing, Nothing} from "../../../infrastructure/nothing";

export interface Symbols {
  versionId: number,
  fileName: string,
  value: DocumentsSymbols;
}

export interface SymbolsContext {
  symbols: Symbols | Nothing;
  verifySymbols(action: string, fileName: string, versionId: number): Symbols | null;
  postResponse(response: Response): void;
}

class SymbolsWorker {

  public symbols: Symbols | null = null;

  public postResponse(response: Response) {
    self.postMessage(response);
  }

  public verifySymbols(action: string, fileName: string, versionId: number): Symbols | null {

    if (this.symbols == nothing) {
      console.log("GetCompletionItems failed: symbols is nothing");
      return null;
    }
    if (this.symbols.fileName != fileName) {
      console.log(`GetCompletionItems failed: filename '${this.symbols.fileName}' != '${fileName}'`);
      return null;
    }
    if (this.symbols.versionId != versionId) {
      console.log(`GetCompletionItems failed: '${this.symbols.fileName}' versionId: '${this.symbols.versionId}' != '${versionId}'`);
      return null;
    }
    return this.symbols;
  }

  public async processWorkerRequest(message: MessageEvent<Request>): Promise<void> {

    switch (message.data.type) {
      case RequestType.CreateSymbols:
        await createSymbols(message.data as CreateSymbolsRequest, this);
        break;

      case RequestType.GetCompletionItems:
        await getCompletionItems(message.data as GetCompletionItemsRequest, this);
        break;

      case RequestType.GetSignatures:
        await getSignatures(message.data as GetSignaturesRequest, this);
        break;

      default:
        console.log("Invalid compile worker request: " + JSON.stringify(message.data));
        break;
    }
  }
}

const symbolsWorker = new SymbolsWorker();

const self = globalThis as unknown as DedicatedWorkerGlobalScope;
self.onmessage = symbolsWorker.processWorkerRequest;
