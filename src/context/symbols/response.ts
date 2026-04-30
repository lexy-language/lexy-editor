import {SuggestionsResult} from "lexy/dist/parser/symbols/SuggestionsResult";
import {Signatures} from "lexy/dist/language/symbols/signatures";
import {Position} from "../position";
import {Nothing} from "../../infrastructure/nothing";
import {SuggestionModel} from "./model";

export enum ResponseType {
  SymbolsCreated,
  SignaturesFetched,
  CompletionItemsFetched,
}

export type SymbolsCreated = {
  readonly type: ResponseType.SymbolsCreated;
  readonly messageId: string;
  readonly errorMessage: string | Nothing;
  readonly fullFilePath: string;
  readonly versionId: number;
  readonly symbols: any[];
}

export type SignaturesFetched = {
  readonly type: ResponseType.SignaturesFetched;
  readonly messageId: string;
  readonly errorMessage: string | Nothing;
  readonly fullFilePath: string;
  readonly versionId: number;
  readonly position: Position;
  readonly signatures: Signatures | Nothing;
}

export type CompletionItemsFetched = {
  readonly type: ResponseType.CompletionItemsFetched;
  readonly messageId: string;
  readonly errorMessage: string | Nothing;
  readonly fullFilePath: string;
  readonly versionId: number;
  readonly position: Position;
  readonly items: SuggestionModel[];
}

export type Response = SymbolsCreated | SignaturesFetched | CompletionItemsFetched;
