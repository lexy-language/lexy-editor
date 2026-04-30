import type {IFile} from "lexy/dist/infrastructure/file";
import type {IFileSystem} from "lexy";
import type {ISourceCodeDocument} from "lexy/dist/parser/documents/ISourceCodeDocument";
import type {ISourceCodeDocuments} from "lexy/dist/parser/documents/ISourceCodeDocuments";

import {CodeFileStorage, workerCodeFileStorage} from "./codeStorage";
import {StringSourceCodeDocument} from "lexy/dist/parser/documents/stringSourceCodeDocument";

export class WebFileSystem implements IFileSystem {

  private readonly currentFolderValue: string[];
  private readonly store: CodeFileStorage;

  constructor(currentFolder: string[]) {
    this.currentFolderValue = currentFolder;
    this.store = workerCodeFileStorage();
  }

  async readAllLines(fileName: string): Promise<string[]> {
    const identifier = this.identifier(fileName);
    const data = await this.store.getCodeFile(identifier);
    if (!data) {
      throw new Error("Couldn't load: " + fileName);
    }
    return data.split("\n");
  }

  async writeAllLines(fileName: string, lines: readonly string[]): Promise<void> {
    const identifier = this.identifier(fileName);
    await this.store.storeCodeFile(identifier, lines.join("\n"), 0, true);
  }

  private identifier(fileName: string) {
    const fullFile = this.isPathRooted(fileName) ? fileName : this.getFullPath(fileName);
    const parts = fullFile.split("/");
    WebFileSystem.removeFirst(parts);
    return parts.join("|");
  }

  getFileName(fullFileName: string): string {
    return fullFileName;
  }

  getDirectoryName(parentFullFileName: string): string {
    const parts = parentFullFileName.split("/");
    WebFileSystem.removeLast(parts);
    return parts.length > 0 ? parts.join("/") : "";
  }

  getFullPath(fileName: string): string {
    if (this.isPathRooted(fileName)) return fileName;

    const parts = fileName.split("/");
    const folder = [...this.currentFolderValue];
    for (const part of parts) {
      if (part === "..") {
        WebFileSystem.removeLast(folder);
      } else {
        folder.push(part)
      }
    }

    const fullPath = folder.join("/");
    return fullPath.startsWith("/") ? fullPath : "/" + fullPath;
  }

  private static removeLast(folder: string[]) {
    folder.splice(folder.length - 1, 1);
  }

  private static removeFirst(folder: string[]) {
    folder.splice(0, 1);
  }

  combine(fullPath: string, fileName: string): string {
    if (fullPath.length === 0) return fileName;
    const parts = fullPath.split("/");
    if (parts[parts.length - 1].length === 0) WebFileSystem.removeLast(parts);

    const fileParts = fileName.split("/");

    for (const part of fileParts) {
      if (part === "..") {
        WebFileSystem.removeLast(parts);
      } else {
        parts.push(part)
      }
    }
    return parts.join("/");
  }

  public currentFolder(): string {
    return this.currentFolderValue.join("/");
  }

  async fileExists(fileName: string): Promise<boolean> {
    const parts = fileName.split("/");
    if (parts[0].length === 0) WebFileSystem.removeFirst(parts);
    const data = await this.store.getCodeFile(parts.join('|'));
    return !!data;
  }

  async directoryExists(absoluteFolder: string): Promise<boolean> {
    throw new Error("Not implemented.")
  }

  isPathRooted(folder: string): boolean {
    return folder.startsWith("/");
  }

  async getDirectoryFiles(folder: string, extension: Array<string>): Promise<string[]> {
    return [];
  }

  async getDirectories(folder: string): Promise<string[]> {
    return [];
  }

  logFolders(): string {
    return "";
  }

  async createFileSourceDocument(file: IFile): Promise<ISourceCodeDocument> {
    const code = await this.readAllLines(file.fullPath);
    return new StringSourceCodeDocument(code, file);
  }

  async createFileSourceDocuments(files: readonly IFile[]): Promise<ISourceCodeDocuments> {
    const documents = [];
    for (const fileName of files) {
      documents.push(await this.createFileSourceDocument(fileName));
    }
    return {documents, dispose: () => {}};
  }
}
