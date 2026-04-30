import {
  languages,
  editor,
  CancellationToken,
  IRange,
} from "monaco-editor";

import React from "react";
import {Assert} from "lexy";
import {Suggestion} from "lexy/dist/language/symbols/suggestion";
import {SuggestionsResult} from "lexy/dist/parser/symbols/SuggestionsResult";
import {SymbolsCreated} from "../response";
import {CreateSymbols, newMessageId, RequestType} from "../requests";
import {SymbolWorkerClient} from "../worker";

import CompletionItem = languages.CompletionItem;
import CompletionList = languages.CompletionList;
import DocumentSymbolProvider = languages.DocumentSymbolProvider;
import EditorSymbolKind = languages.SymbolKind;
import DocumentSymbol = languages.DocumentSymbol;
import SymbolTag = languages.SymbolTag;
import {mapKind} from "./mapKind"

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

  private mapValue(value: Suggestion): CompletionItem {
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

  private map(items: SuggestionsResult): CompletionList {
    const suggestions = items.all.map(value => this.mapValue(value));
    return {suggestions: suggestions};
  }
}
