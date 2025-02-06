import {createCompiler, createParser, IFileSystem, ILexyCompiler, ILogger} from "lexy";
import {IParserLogger, LogEntry} from "lexy/dist/parser/parserLogger";
import {IRootNode} from "lexy/dist/language/rootNode";
import {CompilerResult} from "lexy/dist/compiler/compilerResult";
import {DummyLogger} from "./loggers";
import {RootNodeList} from "lexy/dist/language/rootNodeList";
import {BuiltInDateFunctions} from "lexy/dist/runTime/builtInDateFunctions";

export type CompileResult = {
  logger: IParserLogger;
  logging: Array<LogEntry>;
  nodes: RootNodeList;
  elapsed: number;
}

const baseLogger = new DummyLogger();

export function parseFile(fileName: string, code: string, fileSystem: IFileSystem): CompileResult {
  const lineFilter = fileName.endsWith('md') ? (() => {
    let inCodeBlock = false;
    const useLine = (line: string) => {
      if (line === '```') {
        inCodeBlock = !inCodeBlock;
        return false;
      }
      return inCodeBlock;
    };
    return {
      useLine: useLine
    }
  })() : undefined;
  const startTime = new Date();
  const lexyParser = createParser(baseLogger, fileSystem);
  const lines = code.split("\n");
  const {rootNodes, logger} = lexyParser.parse(lines, fileName, {suppressException: true, lineFilter: lineFilter });
  const elapsed = BuiltInDateFunctions.milliseconds(new Date(), startTime);
  return {logging: logger.entries, nodes: rootNodes, logger: logger, elapsed: elapsed}
}

export function createLogger(): ILogger {
  return baseLogger;
}

export function createLexyCompiler(): ILexyCompiler {
  return createCompiler(baseLogger, baseLogger);
}

export function compileNodes(nodes: Array<IRootNode>): CompilerResult {
  const lexyCompiler = createLexyCompiler();
  return lexyCompiler.compile(nodes);
}