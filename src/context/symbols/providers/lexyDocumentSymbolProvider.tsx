import {
  languages,
  editor,
  CancellationToken,
  IRange,
} from "monaco-editor";

import React from "react";
import {Assert} from "lexy";
import {SymbolKind} from "lexy/dist/language/symbols/symbolKind";
import {Suggestion} from "lexy/dist/language/symbols/suggestion";
import {SuggestionsResult} from "lexy/dist/parser/symbols/SuggestionsResult";
import {SymbolsCreated} from "../response";
import {CreateSymbols, newMessageId, RequestType} from "../requests";
import {SymbolWorkerClient} from "../worker";

import CompletionItemKind = languages.CompletionItemKind;
import CompletionItem = languages.CompletionItem;
import CompletionList = languages.CompletionList;
import DocumentSymbolProvider = languages.DocumentSymbolProvider;
import EditorSymbolKind = languages.SymbolKind;
import DocumentSymbol = languages.DocumentSymbol;
import SymbolTag = languages.SymbolTag;

export default class LexyDocumentSymbolProvider implements DocumentSymbolProvider {

  private readonly symbolWorkerClient: SymbolWorkerClient;
  private readonly getFileFilePath: () => string;

  constructor(symbolWorkerClient: SymbolWorkerClient, getFileFilePath: () => string) {
    this.symbolWorkerClient = Assert.notNull(symbolWorkerClient, "symbolWorkerClient");
    this.getFileFilePath = Assert.notNull(getFileFilePath, "getFileFilePath");
  }

  public async provideDocumentSymbols(model: editor.ITextModel, token: CancellationToken): Promise<languages.DocumentSymbol[]> {

    console.log(">>>>> LexyDocumentSymbolProvider.provideDocumentSymbols");

    const modelVersionId = model.getVersionId();
    const request: CreateSymbols = {
      type: RequestType.CreateSymbols,
      messageId: newMessageId(),
      versionId: modelVersionId,
      fullFilePath: this.getFileFilePath(),
      code: model.getValue()
    };

    function range(start: number, end: number): IRange {
      return {
        startLineNumber: 1,
        startColumn: start,
        endLineNumber: 5,
        endColumn: end
      }
    };

    try {
      const response = await this.symbolWorkerClient.execute<CreateSymbols, SymbolsCreated>(request, token);
      //const range: IRange = model.getFullModelRange();
      const emptyTags: SymbolTag[] = [];
      const symbols: DocumentSymbol[] = [{
        name: "All symbol",
        detail: "All symbol detail",
        kind: EditorSymbolKind.Class,
        tags: emptyTags,
        range: range(1, 10),
        selectionRange: range(1, 10),
      }, {
        name: "Second symbol",
        detail: "Second symbol",
        kind: EditorSymbolKind.Function,
        tags: emptyTags,
        range: range(10, 20),
        selectionRange: range(10, 20),
      }];
      return symbols; //todo map symbols
    } catch (error: any) {
      console.log(`ERROR in provideDocumentSymbols${error.message}/n${error.stack}`);
      return [];
    }
  }

  mapKind(kind: SymbolKind): languages.CompletionItemKind {
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

  private mapValue(value: Suggestion): CompletionItem {
    return {
      label: value.name,
      kind: this.mapKind(value.kind),
      insertText: value.name,
      range: {
        startLineNumber: 0,
        startColumn: 0,
        endLineNumber: 0,
        endColumn: 0
      }
    }
  }

  private map(items: SuggestionsResult): CompletionList {
    const suggestions = items.all.map(value => this.mapValue(value));
    return {suggestions: suggestions};
  }
}
