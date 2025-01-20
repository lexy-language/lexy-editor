import {createCompiler, createParser, IFileSystem, ILexyCompiler, ILogger} from "lexy";
import {IParserLogger, LogEntry} from "lexy/dist/parser/parserLogger";
import {IRootNode} from "lexy/dist/language/rootNode";
import {CompilerResult} from "lexy/dist/compiler/compilerResult";
import {DummyLogger} from "./loggers";

export type CompileResult = {
  logger: IParserLogger;
  logging: Array<LogEntry>;
  nodes: Array<IRootNode>;
}

const baseLogger = new DummyLogger();

export function parseFile(fileName: string, code: string, fileSystem: IFileSystem): CompileResult {
  const lexyParser = createParser(baseLogger, fileSystem);
  const lines = code.split("\n");
  const {rootNodes, logger} = lexyParser.parse(lines, fileName, false);
  return {logging: logger.entries, nodes: rootNodes.asArray(), logger: logger}
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