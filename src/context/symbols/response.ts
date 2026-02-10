import {languages, Position} from "monaco-editor";
import DocumentSymbol = languages.DocumentSymbol;
import CompletionList = languages.CompletionList;
import SignatureHelp = languages.SignatureHelp;

export enum ResponseType {
  SymbolsCompleted,
  SignaturesCompleted,
  CompletionItemsCompleted,
}

export type SymbolsCompletedResponse = {
  readonly type: ResponseType.SymbolsCompleted;
  readonly fileName: string;
  readonly versionId: number;
  readonly symbols: DocumentSymbol[];
}

export type SignaturesCompletedResponse = {
  readonly type: ResponseType.SignaturesCompleted;
  readonly fileName: string;
  readonly versionId: number;
  readonly position: Position;
  readonly signatures: SignatureHelp;
}

export type CompletionItemsCompletedResponse = {
  readonly type: ResponseType.CompletionItemsCompleted;
  readonly fileName: string;
  readonly versionId: number;
  readonly position: Position;
  readonly items: CompletionList;
}

export type Response = SymbolsCompletedResponse | SignaturesCompletedResponse | CompletionItemsCompletedResponse;
