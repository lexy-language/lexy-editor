import {ConsoleLogger} from "lexy /infrastructure/logger"
import {LexyParser} from "parser/lexyParser"
import {Tokenizer} from "parser/tokens/tokenizer"
import {IFileSystem} from "parser/IFileSystem";

const baseLogger = new ConsoleLogger();

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

const expressionFactory = new ExpressionFactory();
const fileSystem = new WebFileSystem();
const tokenizer = new Tokenizer();
const lexyParser = new LexyParser(baseLogger, tokenizer, fileSystem, expressionFactory);

export function compileCurrentFile(fileName: string, code: string[]): string[] {
  const {rootNodes, logger} = lexyParser.parse(code, fileName, false);
  return logger.errorMessages();
}
