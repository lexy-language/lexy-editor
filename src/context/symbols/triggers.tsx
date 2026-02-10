import {Position} from "monaco-editor";

export interface CreateSymbolsTrigger {
  readonly versionId: number;
}

export interface GetSignaturesTrigger {
  readonly versionId: number;
  readonly position: Position;
}

export interface GetCompletionTrigger {
  readonly versionId: number;
  readonly position: Position;
}
