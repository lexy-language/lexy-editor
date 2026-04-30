import {WebFileSystem} from "../../../api/webFileSystem";
import {parseLines} from "../../../api/parser";
import {
  ResponseType, SymbolsCreated,
} from "../response";
import {CreateSymbols} from "../requests";
import {SymbolsWorkerContext} from "./worker";
import {nothing} from "../../../infrastructure/nothing";

export async function createSymbols(request: CreateSymbols, context: SymbolsWorkerContext) {

  async function getDocumentSymbols(fileName: string, fileSystem: WebFileSystem) {

    if (context.symbols
     && context.symbols.fullFilePath == request.fullFilePath
     && context.symbols.versionId == request.versionId) {
      console.log(">>>>> CreateSymbols >>> use existing '" + request.fullFilePath + "' - " + request.versionId);
      return context.symbols.value;
    }
    console.log(">>>>> CreateSymbols >>> parseFile '" + request.fullFilePath + "' - " + request.versionId);
    const {project, symbols} = await parseLines(request.fullFilePath, request.code.split("\n"), fileSystem);

    context.symbols = {
      versionId: request.versionId,
      fullFilePath: request.fullFilePath,
      project: project,
      value: symbols
    };

    return symbols;
  }

  async function getSymbols(request: CreateSymbols) {

    console.log(">>>>> CreateSymbols: " + JSON.stringify(request, null, 4));

    const fullPath = request.fullFilePath.split("/");
    const fileName = fullPath[fullPath.length - 1];
    fullPath.splice(fullPath.length - 1, 1);

    const fileSystem = new WebFileSystem(fullPath);
    const symbols = await getDocumentSymbols(fileName, fileSystem);

    if (!request.messageId) return;

    const response: SymbolsCreated = {
      type: ResponseType.SymbolsCreated,
      messageId: request.messageId,
      errorMessage: nothing,
      fullFilePath: request.fullFilePath,
      versionId: request.versionId,
      symbols: []
    };
    context.postResponse(response);
  }

  function handleError(error: any) {

    console.log("Error occurred in symbol worker: createSymbols");
    console.log(error);

    if (!request.messageId) return;

    const response: SymbolsCreated = {
      type: ResponseType.SymbolsCreated,
      messageId: request.messageId,
      errorMessage: `${error.stack}: ${error.message}`,
      fullFilePath: request.fullFilePath,
      versionId: request.versionId,
      symbols: []
    };
    context.postResponse(response);
  }

  try {
    await getSymbols(request);
  } catch (error: any) {
    handleError(error);
  }
}
