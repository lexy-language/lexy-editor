import {createCompiler, createParser, IFileSystem, ILexyCompiler} from "lexy";
import {IParserLogger, LogEntry} from "lexy/dist/parser/parserLogger";
import {IComponentNode} from "lexy/dist/language/componentNode";
import {CompilerResult} from "lexy/dist/compiler/compilerResult";
import {DummyLogger} from "./loggers";
import {ComponentNodeList} from "lexy/dist/language/componentNodeList";
import {BuiltInDateFunctions} from "lexy/dist/runTime/builtInDateFunctions";

export type CompileResult = {
  logger: IParserLogger;
  logging: Array<LogEntry>;
  nodes: ComponentNodeList;
  elapsed: number;
}

const baseLogger = new DummyLogger();

export function parseFile(fileName: string, code: string, fileSystem: IFileSystem): CompileResult {
  const startTime = new Date();
  const lexyParser = createParser(baseLogger, fileSystem);
  const lines = code.split("\n");
  const {componentNodes, logger} = lexyParser.parse(lines, fileName, {suppressException: true});
  const elapsed = BuiltInDateFunctions.milliseconds(new Date(), startTime).toNumber();
  return {logging: logger.entries, nodes: componentNodes, logger: logger, elapsed: elapsed}
}

export function createLexyCompiler(): ILexyCompiler {
  return createCompiler(baseLogger, baseLogger);
}

export function compileNodes(nodes: Array<IComponentNode>): CompilerResult {
  const lexyCompiler = createLexyCompiler();
  return lexyCompiler.compile(nodes);
}