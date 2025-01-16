import {ConsoleLogger, createParser, IFileSystem, ILogger, LogLevel} from "lexy";
import {LogEntry} from "lexy/dist/parser/parserLogger";

class WebFileSystem implements IFileSystem {
  readAllLines(fileName: string): Array<string> {
    console.log("readAllLines" + fileName);
    return [];
  }

  getFileName(fullFileName: string): string {
    console.log("getFileName" + fullFileName);
    return fullFileName;
  }

  getDirectoryName(parentFullFileName: string): string {
    console.log("getDirectoryName" + parentFullFileName);
    return parentFullFileName;
  }

  getFullPath(directName: string): string {
    console.log("getFullPath" + directName);
    return directName;
  }

  combine(fullPath: string, fileName: string): string {
    console.log("combine" + fullPath + ", "+ fileName);
    return fullPath + "/" + fileName;
  }

  fileExists(fullFinName: string): boolean {
    console.log("fileExists" + fullFinName);
    return false;
  }

  directoryExists(absoluteFolder: string): boolean {
    console.log("directoryExists" + absoluteFolder);
    return false;
  }

  isPathRooted(folder: string): boolean {
    console.log("readAllLines" + folder);
    return false;
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

class DummyLogger implements ILogger {

  isEnabled(level: LogLevel): boolean {
    return false;
  }

  logDebug(message: string): void {
  }

  logError(message: string): void {
  }

  logInformation(message: string): void {
  }
}


const baseLogger = new DummyLogger();
const fileSystem = new WebFileSystem();
const lexyParser = createParser(baseLogger, fileSystem);
//const lexyCompiler = creatCompiler(baseLogger, baseLogger);

export function compileCurrentFile(fileName: string, code: string): LogEntry[] {
  const lines = code.split("\n");
  const {rootNodes, logger} = lexyParser.parse(lines, fileName, false);
  return logger.entries;
}