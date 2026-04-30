import {languages, editor, CancellationToken, Position, IRange} from "monaco-editor";
import CompletionItemProvider = languages.CompletionItemProvider;
import React from "react";
import CompletionItem = languages.CompletionItem;
import {Assert} from "lexy";
import {GetCompletionItems, newMessageId, RequestType} from "../requests";
import {CompletionItemsFetched} from "../response";
import {SymbolWorkerClient} from "../worker";
import {SuggestionModel} from "../model";
import {mapKind} from "./mapKind"

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

  private static mapValue(value: SuggestionModel, range: IRange): CompletionItem {
    return {
      label: value.name,
      detail: value.description ? value.description : undefined,
      kind: mapKind(value.kind),
      insertText: value.name,
      range: range
    };
  }

  private map(items: SuggestionModel[], range: IRange): languages.CompletionList {
    const suggestions = items.map(value => LexyCompletionItemProvider.mapValue(value, range));
    return {suggestions: suggestions};
  }
}
