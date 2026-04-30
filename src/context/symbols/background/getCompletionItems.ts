import {CompletionItemsFetched, ResponseType} from "../response";
import {GetCompletionItems} from "../requests";
import {SymbolsWorkerContext} from "./worker";
import {Position} from "lexy/dist/language/position";
import {nothing} from "../../../infrastructure/nothing";
import {SuggestionModel} from "../model";
import {Suggestion} from "lexy/dist/language/symbols/suggestion";
import {Project} from "lexy/dist/infrastructure/project";

export async function getCompletionItems(request: GetCompletionItems, context: SymbolsWorkerContext) {

  function map(filtered: readonly Suggestion[]): SuggestionModel[] {
    return filtered.map(value => ({
      name: value.name,
      description: value.description,
      kind: value.kind
    }))
  }

  async function getItems() {

    const symbols = context.verifySymbols("GetCompletionItems", request.fullFilePath, request.versionId);
    if (symbols == null) return;

    const position = new Position(request.position.lineNumber, request.position.column);

    const fileName = symbols.project.file(request.fullFilePath);
    const items = symbols.value.getSuggestions(fileName, position);

    console.log(`>>>>>>> getCompletionItems items: ${items.filtered.length} (filter: ${items.filter})`);

    const response: CompletionItemsFetched = {
      type: ResponseType.CompletionItemsFetched,
      messageId: request.messageId,
      errorMessage: nothing,
      fullFilePath: request.fullFilePath,
      versionId: request.versionId,
      position: request.position,
      items: map(items.filtered)
    };

    context.postResponse(response);
  }

  function handleError(error: any) {

    console.log("Error occurred in symbol worker: getCompletionItems");
    console.log(error);

    const response: CompletionItemsFetched = {
      type: ResponseType.CompletionItemsFetched,
      messageId: request.messageId,
      errorMessage: nothing,
      fullFilePath: request.fullFilePath,
      versionId: request.versionId,
      position: request.position,
      items: []
    };
    context.postResponse(response);
  }

  try {
    await getItems();
  } catch (error: any) {
    handleError(error);
  }
}
