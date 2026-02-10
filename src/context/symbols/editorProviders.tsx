import {languages, editor, CancellationToken, Position} from "monaco-editor";
import CompletionItemProvider = languages.CompletionItemProvider;
import SignatureHelpProvider = languages.SignatureHelpProvider;
import DocumentSymbolProvider = languages.DocumentSymbolProvider;
import {
  CompletionItemsCompletedResponse,
  SignaturesCompletedResponse,
  SymbolsCompletedResponse
} from "./response";
import React from "react";
import {CreateSymbolsTrigger, GetCompletionTrigger, GetSignaturesTrigger} from "./triggers";
import {nothing, Nothing} from "../../infrastructure/nothing";

class LexyDocumentSymbolProvider implements DocumentSymbolProvider {

  private readonly getter: () => SymbolsCompletedResponse | Nothing;
  private readonly trigger: React.Dispatch<React.SetStateAction<CreateSymbolsTrigger | Nothing>>;

  constructor(getter: () => SymbolsCompletedResponse | Nothing, trigger: React.Dispatch<React.SetStateAction<CreateSymbolsTrigger | Nothing>>) {
    this.getter = getter;
    this.trigger = trigger;
  }

  provideDocumentSymbols(model: editor.ITextModel, token: CancellationToken): languages.ProviderResult<languages.DocumentSymbol[]> {

    const response = this.getter();
    const modelVersionId = model.getVersionId();

    if (response != nothing && modelVersionId == response.versionId) {
      return response.symbols;
    }

    this.trigger({versionId: modelVersionId});
    return [];
  }
}

class LexyCompletionItemProvider implements CompletionItemProvider {

  private readonly getter: () => CompletionItemsCompletedResponse | Nothing;
  private readonly trigger: React.Dispatch<React.SetStateAction<GetSignaturesTrigger | Nothing>>;

  constructor(getter: () => CompletionItemsCompletedResponse | Nothing, trigger: React.Dispatch<React.SetStateAction<GetSignaturesTrigger | Nothing>>) {
    this.getter = getter;
    this.trigger = trigger;
  }

  provideCompletionItems(model: editor.ITextModel, position: Position, context: languages.CompletionContext, token: CancellationToken): languages.ProviderResult<languages.CompletionList> {

    const response = this.getter();
    const modelVersionId = model.getVersionId();

    if (response != nothing && modelVersionId == response.versionId && response.position.equals(position)) {
      return {suggestions: response.items.suggestions};
    }

    this.trigger({versionId: modelVersionId, position: position});
    return {suggestions: []};
  }
}

class LexySignatureHelpProvider implements SignatureHelpProvider {

  private readonly getter: () => SignaturesCompletedResponse | Nothing;
  private readonly trigger: React.Dispatch<React.SetStateAction<GetCompletionTrigger | Nothing>>;

  constructor(getter: () => SignaturesCompletedResponse | Nothing, trigger: React.Dispatch<React.SetStateAction<GetCompletionTrigger | Nothing>>) {
    this.getter = getter;
    this.trigger = trigger;
  }

  provideSignatureHelp(model: editor.ITextModel, position: Position, token: CancellationToken, context: languages.SignatureHelpContext): languages.ProviderResult<languages.SignatureHelpResult> {

    const response = this.getter();
    const modelVersionId = model.getVersionId();

    if (response != nothing && modelVersionId == response.versionId && response.position.equals(position)) {
      return {value: response.signatures, dispose: function () {}};
    }

    this.trigger({versionId: modelVersionId, position: position});
    return {
      value: {
        signatures: [],
        activeSignature: 0,
        activeParameter: 0
      },
      dispose: function () {}
    };
  }
}

export class EditorProviders {

  private documentSymbolResponse: SymbolsCompletedResponse | Nothing = nothing;
  private signaturesCompletedResponse: SignaturesCompletedResponse | Nothing = nothing;
  private completionItemsCompletedResponse: CompletionItemsCompletedResponse | Nothing = nothing;

  public readonly documentSymbolProvider: DocumentSymbolProvider;
  public readonly completionItemProvider: CompletionItemProvider;
  public readonly signatureHelpProvider: SignatureHelpProvider;

  constructor(setCreateSymbolsTrigger: React.Dispatch<React.SetStateAction<CreateSymbolsTrigger | Nothing>>,
              setGetSignaturesTrigger: React.Dispatch<React.SetStateAction<GetSignaturesTrigger | Nothing>>,
              setGetCompletionItemsTrigger: React.Dispatch<React.SetStateAction<GetCompletionTrigger | Nothing>>) {

    this.documentSymbolProvider = new LexyDocumentSymbolProvider(() => this.documentSymbolResponse, setCreateSymbolsTrigger);
    this.completionItemProvider = new LexyCompletionItemProvider(() => this.completionItemsCompletedResponse, setGetSignaturesTrigger);
    this.signatureHelpProvider = new LexySignatureHelpProvider(() => this.signaturesCompletedResponse, setGetCompletionItemsTrigger);
  }

  public setDocumentSymbol(value: SymbolsCompletedResponse) {
    this.documentSymbolResponse = value;
  }

  public setSignaturesCompletedResponse(value: SignaturesCompletedResponse) {
    this.signaturesCompletedResponse = value;
  }

  public setCompletionItemsCompletedResponse(value: CompletionItemsCompletedResponse) {
    this.completionItemsCompletedResponse = value
  }
}
