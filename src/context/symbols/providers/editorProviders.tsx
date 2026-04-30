import {languages} from "monaco-editor";
import CompletionItemProvider = languages.CompletionItemProvider;
import SignatureHelpProvider = languages.SignatureHelpProvider;
import DocumentSymbolProvider = languages.DocumentSymbolProvider;
import React from "react";
import LexyDocumentSymbolProvider from "./lexyDocumentSymbolProvider";
import LexyCompletionItemProvider from "./lexyCompletionItemProvider";
import LexySignatureHelpProvider from "./lexySignatureHelpProvider";
import {SymbolWorkerClient} from "../worker";

export class EditorProviders {

  private fullFilePath: string = "";

  public readonly documentSymbolProvider: DocumentSymbolProvider;
  public readonly completionItemProvider: CompletionItemProvider;
  public readonly signatureHelpProvider: SignatureHelpProvider;

  constructor(symbolWorkerClient: SymbolWorkerClient) {
    this.documentSymbolProvider = new LexyDocumentSymbolProvider(symbolWorkerClient, () => this.fullFilePath);
    this.completionItemProvider = new LexyCompletionItemProvider(symbolWorkerClient, () => this.fullFilePath);
    this.signatureHelpProvider = new LexySignatureHelpProvider(symbolWorkerClient, () => this.fullFilePath);
  }

  public setFullFilePath(fullFilePath: string) {
    this.fullFilePath = fullFilePath;
  }
}
