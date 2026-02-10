import {WebFileSystem} from "../../../api/webFileSystem";
import {parseFile} from "../../../api/parser";
import {
  ResponseType, SymbolsCompletedResponse,
} from "../response";
import {CreateSymbolsRequest} from "../requests";
import {SymbolsContext} from "./worker";

export async function createSymbols(request: CreateSymbolsRequest, context: SymbolsContext) {

  async function getSymbols(request: CreateSymbolsRequest) {

    const fileSystem = new WebFileSystem(request.folder);
    const {symbols} = await parseFile(request.fileName, fileSystem);
    const response: SymbolsCompletedResponse = {
      type: ResponseType.SymbolsCompleted,
      fileName: request.fileName,
      versionId: request.versionId,
      symbols: []
    };

    context.symbols = {
      versionId: request.versionId,
      fileName: request.fileName,
      value : symbols
    };
    context.postResponse(response);
  }

  try {
    await getSymbols(request);
  } catch (error: any) {
    console.log("Error occurred in symbol worker: createSymbols");
    console.log(error);
  }
}
