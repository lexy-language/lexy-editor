import {IFileSystem} from "lexy";
import {CodeFileStorage, workerCodeFileStorage} from "./codeStorage";

export class WebFileSystem implements IFileSystem {

  private readonly currentFolder: string[];
  private readonly store: CodeFileStorage;

  constructor(currentFolder: string[]) {
    this.currentFolder = currentFolder;
    this.store = workerCodeFileStorage();
  }

  async readAllLines(fileName: string): Promise<string[]> {
    const fullFile = this.isPathRooted(fileName) ? fileName : this.getFullPath(fileName);
    const parts = fullFile.split("/");
    this.removeFirst(parts);
    const data = await this.store.getCodeFile(parts.join("|"));
    if (!data) {
      throw new Error("Couldn't load: " + fileName);
    }
    return data.split("\n");
  }

  getFileName(fullFileName: string): string {
    return fullFileName;
  }

  getDirectoryName(parentFullFileName: string): string {
    const parts = parentFullFileName.split("/");
    this.removeLast(parts);
    return parts.length > 0 ? parts.join("/") : "";
  }

  getFullPath(fileName: string): string {
    if (this.isPathRooted(fileName)) return fileName;

    const parts = fileName.split("/");
    const folder = [...this.currentFolder];
    for (const part of parts) {
      if (part === "..") {
        this.removeLast(folder);
      } else {
        folder.push(part)
      }
    }
    const fullPath = folder.join("/");
    return "/" + fullPath;
  }

  private removeLast(folder: string[]) {
    folder.splice(folder.length - 1, 1);
  }

  private removeFirst(folder: string[]) {
    folder.splice(0, 1);
  }

  combine(fullPath: string, fileName: string): string {
    if (fullPath.length === 0) return fileName;
    const parts = fullPath.split("/");
    if (parts[parts.length - 1].length === 0) this.removeLast(parts);

    const fileParts = fileName.split("/");

    for (const part of fileParts) {
      if (part === "..") {
        this.removeLast(parts);
      } else {
        parts.push(part)
      }
    }
    return parts.join("/");
  }

  async fileExists(fileName: string): Promise<boolean> {
    const parts = fileName.split("/");
    if (parts[0].length === 0) this.removeFirst(parts);
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
}
