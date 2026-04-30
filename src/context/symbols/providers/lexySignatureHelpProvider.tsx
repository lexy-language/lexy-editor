import {languages, editor, CancellationToken, Position} from "monaco-editor";
import SignatureHelpProvider = languages.SignatureHelpProvider;
import React from "react";
import {Assert} from "lexy";
import {GetSignatures, newMessageId, RequestType} from "../requests";
import {SignaturesFetched} from "../response";
import {SymbolWorkerClient} from "../worker";

export default class LexySignatureHelpProvider implements SignatureHelpProvider {

  private readonly symbolWorkerClient: SymbolWorkerClient;
  private readonly getFileFilePath: () => string;

  constructor(symbolWorkerClient: SymbolWorkerClient, getFileFilePath: () => string) {
    this.symbolWorkerClient = Assert.notNull(symbolWorkerClient, "symbolWorkerClient");
    this.getFileFilePath = Assert.notNull(getFileFilePath, "getFileFilePath");
  }

  public async provideSignatureHelp(model: editor.ITextModel, position: Position, token: CancellationToken, context: languages.SignatureHelpContext): Promise<languages.SignatureHelpResult> {

    console.log(">>>>> LexyDocumentSymbolProvider.provideSignatureHelp");

    const modelVersionId = model.getVersionId();
    const request: GetSignatures = {
      type: RequestType.GetSignatures,
      messageId: newMessageId(),
      versionId: modelVersionId,
      fullFilePath: this.getFileFilePath(),
      position: position
    };

    try {
      const response = await this.symbolWorkerClient.execute<GetSignatures, SignaturesFetched>(request, token);
      return LexySignatureHelpProvider.emptyResult();
    } catch (error: any) {
      console.log(`ERROR in provideSignatureHelp${error.message}/n${error.stack}`);
      return LexySignatureHelpProvider.emptyResult();
    }
  }

  private static emptyResult() {
    return {
      value: {
        signatures: [],
        activeSignature: 0,
        activeParameter: 0
      },
      dispose: function () {
      }
    };
  }
}
