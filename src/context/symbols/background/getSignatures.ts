import {GetSignatures} from "../requests";
import {SymbolsWorkerContext} from "./worker";
import {Position} from "lexy/dist/language/position";
import {ResponseType, SignaturesFetched} from "../response";
import {nothing} from "../../../infrastructure/nothing";

export async function getSignatures(request: GetSignatures, context: SymbolsWorkerContext) {

  function geValue() {

    const symbols = context.verifySymbols("GetSignatures", request.fullFilePath, request.versionId);
    if (symbols == null) return;

    const fileName = symbols.project.file(request.fullFilePath);
    const items = symbols.value.getSignatures(fileName, new Position(request.position.lineNumber, request.position.column));

    const response: SignaturesFetched = {
      type: ResponseType.SignaturesFetched,
      messageId: request.messageId,
      errorMessage: nothing,
      fullFilePath: request.fullFilePath,
      versionId: request.versionId,
      position: request.position,
      signatures: items
    };
    context.postResponse(response);
  }

  function handleError(error: any) {

    console.log("Error occurred in symbol worker: getSignatures");
    console.log(error);

    const response: SignaturesFetched = {
      type: ResponseType.SignaturesFetched,
      messageId: request.messageId,
      errorMessage: nothing,
      fullFilePath: request.fullFilePath,
      versionId: request.versionId,
      position: request.position,
      signatures: nothing
    };
    context.postResponse(response);
  }

  try {
    geValue();
  } catch (error: any) {
    handleError(error)
  }
}
