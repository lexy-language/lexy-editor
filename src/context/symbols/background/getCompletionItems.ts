import {CompletionItemsCompletedResponse, ResponseType} from "../response";
import {GetCompletionItemsRequest} from "../requests";
import {SymbolsContext} from "./worker";
import {SuggestionsResult} from "lexy/dist/parser/symbols/SuggestionsResult";
import {languages} from "monaco-editor";
import {Position} from "lexy/dist/language/position";
import {SymbolKind} from "lexy/dist/language/symbols/symbolKind";
import {Suggestion} from "lexy/dist/language/symbols/suggestion";
import CompletionList = languages.CompletionList;
import CompletionItem = languages.CompletionItem;
import CompletionItemKind = languages.CompletionItemKind;

export async function getCompletionItems(request: GetCompletionItemsRequest, context: SymbolsContext) {

  function mapKind(kind: SymbolKind): CompletionItemKind {
    switch (kind) {
      case SymbolKind.Scenario:
        return CompletionItemKind.Class;
      case SymbolKind.Keyword:
        return CompletionItemKind.Keyword;
      case SymbolKind.Type:
        return CompletionItemKind.Class;
      case SymbolKind.ParameterVariable:
        return CompletionItemKind.Variable;
      case SymbolKind.ValueType:
        return CompletionItemKind.Class;
      case SymbolKind.ResultVariable:
        return CompletionItemKind.Variable;
      case SymbolKind.Operator:
        return CompletionItemKind.Operator;
      case SymbolKind.Function:
        return CompletionItemKind.Function;
      case SymbolKind.Enum:
        return CompletionItemKind.Enum;
      case SymbolKind.EnumMember:
        return CompletionItemKind.EnumMember;
      case SymbolKind.Constant:
        return CompletionItemKind.Constant;
      case SymbolKind.Variable:
        return CompletionItemKind.Variable;
      case SymbolKind.SystemFunction:
        return CompletionItemKind.Function;
      case SymbolKind.GeneratedType:
        return CompletionItemKind.Class;
      case SymbolKind.Table:
        return CompletionItemKind.Class;
      case SymbolKind.TableFunction:
        return CompletionItemKind.Function;
      case SymbolKind.ObjectVariable:
        return CompletionItemKind.Variable;
      case SymbolKind.Comments:
        return CompletionItemKind.Keyword;
      case SymbolKind.LibraryFunction:
        return CompletionItemKind.Function;
      case SymbolKind.TableColumn:
        return CompletionItemKind.Variable;
      default:
        return CompletionItemKind.Keyword;
    }
  }

  function mapValue(value: Suggestion): CompletionItem {
    return {
      label: value.name,
      kind: mapKind(value.kind),
      insertText: value.name,
      range: {
        startLineNumber: 0,
        startColumn: 0,
        endLineNumber: 0,
        endColumn: 0
      }
    }
  }

  function map(items: SuggestionsResult): CompletionList {
    const suggestions = items.all.map(value => mapValue(value));
    return {suggestions: suggestions};
  }

  async function getItems() {

    const symbols = context.verifySymbols("GetCompletionItems", request.fileName, request.versionId);
    if (symbols == null) return;

    const items = symbols.value.getSuggestions(request.fileName, new Position(request.position.lineNumber, request.position.column));

    const response: CompletionItemsCompletedResponse = {
      type: ResponseType.CompletionItemsCompleted,
      fileName: request.fileName,
      versionId: request.versionId,
      position: request.position,
      items: map(items)
    };
    context.postResponse(response);
  }

  try {
    await getItems();
  } catch (error: any) {
    console.log("Error occurred in symbol worker: getCompletionItems");
    console.log(error);
  }
}
