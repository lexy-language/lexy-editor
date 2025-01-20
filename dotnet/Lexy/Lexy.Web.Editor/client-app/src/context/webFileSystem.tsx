import {IFileSystem} from "lexy";
import {ProjectState} from "./projectState";
import {forEach} from "lexy/dist/infrastructure/enumerableExtensions";

export class WebFileSystem implements IFileSystem {

  private currentProject: ProjectState;
  private currentFolder: string[];

  constructor(currentFolder: string[], currentProject: ProjectState) {
    this.currentFolder = currentFolder;
    this.currentProject = currentProject;
  }

  readAllLines(fileName: string): Array<string> {
    const fullFile = this.isPathRooted(fileName) ? fileName : this.getFullPath(fileName);
    const parts = fullFile.split("/");
    this.removeFirst(parts);
    const data = this.currentProject.file(parts);
    if (data == undefined) {
      throw new Error("Couldn't load: " + fileName);
    }
    return data.split("\n");
  }

  getFileName(fullFileName: string): string {
    return fullFileName;
  }

  getDirectoryName(parentFullFileName: string): string {
    console.log("getDirectoryName: " + parentFullFileName);
    const parts = parentFullFileName.split("/");
    this.removeLast(parts);
    return parts.length > 0 ? parts.join("/") : "";
  }

  getFullPath(fileName: string): string {
    if (this.isPathRooted(fileName)) return fileName;

    const parts = fileName.split("/");
    const folder = [...this.currentFolder];
    for (const part of parts) {
      if (part == "..") {
        this.removeLast(folder);
      } else {
        folder.push(part)
      }
    }
    const fullPath = folder.join("/");
    console.log("getFullPath: " + fileName + " : " + fullPath);
    return "/" + fullPath;
  }

  private removeLast(folder: string[]) {
    folder.splice(folder.length - 1, 1);
  }

  private removeFirst(folder: string[]) {
    folder.splice(0, 1);
  }

  combine(fullPath: string, fileName: string): string {
    console.log("combine: " + fullPath + " & " + fileName);
    if (fullPath.length == 0) return fileName;
    const parts = fullPath.split("/");
    if (parts[parts.length - 1].length == 0) this.removeLast(parts);

    const fileParts = fileName.split("/");

    for (const part of fileParts) {
      if (part == "..") {
        this.removeLast(parts);
      } else {
        parts.push(part)
      }
    }
    return parts.join("/");
  }

  fileExists(fileName: string): boolean {
    console.log("fileExists: " + fileName);
    const parts = fileName.split("/");
    if (parts[0].length == 0) this.removeFirst(parts);
    const data = this.currentProject.file(parts);
    return !!data;
  }

  directoryExists(absoluteFolder: string): boolean {
    throw new Error("Not implemented.")
  }

  isPathRooted(folder: string): boolean {
    console.log("isPathRooted" + folder);
    return folder.startsWith("/");
  }

  getDirectoryFiles(folder: string, filter: string): Array<string> {
    console.log("getDirectoryFiles" + folder + "," + filter);
    return [];
  }

  getDirectories(folder: string): Array<string> {
    console.log("getDirectories" + folder);
    return [];
  }
}