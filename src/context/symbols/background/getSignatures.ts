import {GetSignaturesRequest} from "../requests";
import {SymbolsContext} from "./worker";
import {languages} from "monaco-editor";
import {Position} from "lexy/dist/language/position";
import SignatureHelp = languages.SignatureHelp;
import {Signatures} from "lexy/dist/language/symbols/signatures";
import {ResponseType, SignaturesCompletedResponse} from "../response";

export async function getSignatures(request: GetSignaturesRequest, context: SymbolsContext) {

  function map(items: Signatures | null): SignatureHelp {
    return {
      signatures: [],
      activeSignature: 0,
      activeParameter: 0
    };
  }

  function geValue() {

    const symbols = context.verifySymbols("GetSignatures", request.fileName, request.versionId);
    if (symbols == null) return;

    const items = symbols.value.getSignatures(request.fileName, new Position(request.position.lineNumber, request.position.column));

    const response: SignaturesCompletedResponse = {
      type: ResponseType.SignaturesCompleted,
      fileName: request.fileName,
      versionId: request.versionId,
      position: request.position,
      signatures: map(items)
    };
    context.postResponse(response);
  }

  try {
    geValue();
  } catch (error: any) {
    console.log("Error occurred in symbol worker: getSignatures");
    console.log(error);
  }
}
