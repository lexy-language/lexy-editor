import {languages, editor, CancellationToken, Position, IRange} from "monaco-editor";
import CompletionItemProvider = languages.CompletionItemProvider;
import React from "react";
import CompletionItem = languages.CompletionItem;
import CompletionItemKind = languages.CompletionItemKind;
import {SymbolKind} from "lexy/dist/language/symbols/symbolKind";
import {Assert} from "lexy";
import {GetCompletionItems, newMessageId, RequestType} from "../requests";
import {CompletionItemsFetched} from "../response";
import {SymbolWorkerClient} from "../worker";
import {SuggestionModel} from "../model";

export default class LexyCompletionItemProvider implements CompletionItemProvider {

  private readonly symbolWorkerClient: SymbolWorkerClient;
  private readonly getFileFilePath: () => string;

  constructor(symbolWorkerClient: SymbolWorkerClient, getFileFilePath: () => string) {
    this.symbolWorkerClient = Assert.notNull(symbolWorkerClient, "symbolWorkerClient");
    this.getFileFilePath = Assert.notNull(getFileFilePath, "getFileFilePath");
  }

  public async provideCompletionItems(model: editor.ITextModel, position: Position, context: languages.CompletionContext, token: CancellationToken): Promise<languages.CompletionList> {

    console.log(`>>>>> LexyCompletionItemProvider.provideCompletionItems`);

    const modelVersionId = model.getVersionId();
    const word = model.getWordUntilPosition(position);

    const range = {
      startLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endLineNumber: position.lineNumber,
      endColumn: word.endColumn
    }

    const request: GetCompletionItems = {
      type: RequestType.GetCompletionItems,
      messageId: newMessageId(),
      fullFilePath: this.getFileFilePath(),
      versionId: modelVersionId,
      position: position,
    };

    try {
      const response = await this.symbolWorkerClient.execute<GetCompletionItems, CompletionItemsFetched>(request, token);
      return this.map(response.items, range);
    } catch (error: any) {
      console.log(`ERROR in provideCompletionItems: ${error.message}/n${error.stack}`);
      return {suggestions: []};
    }
  }

  private static mapKind(kind: SymbolKind): languages.CompletionItemKind {
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

  private static mapValue(value: SuggestionModel, range: IRange): CompletionItem {
    return {
      label: value.name,
      detail: value.description ? value.description : undefined,
      kind: LexyCompletionItemProvider.mapKind(value.kind),
      insertText: value.name,
      range: range
    };
  }

  private map(items: SuggestionModel[], range: IRange): languages.CompletionList {
    const suggestions = items.map(value => LexyCompletionItemProvider.mapValue(value, range));
    return {suggestions: suggestions};
  }
}
