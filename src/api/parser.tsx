import {createCompiler, createParser, IFileSystem, ILexyCompiler} from "lexy";
import {IParserLogger, LogEntry} from "lexy/dist/parser/parserLogger";
import {IComponentNode} from "lexy/dist/language/componentNode";
import {CompilerResult} from "lexy/dist/generation/compilerResult";
import {DummyLogger} from "../infrastructure/loggers";
import {ComponentNodeList} from "lexy/dist/language/componentNodeList";
import {Libraries} from "lexy/dist/functionLibraries/libraries";
import {milliseconds} from "lexy/dist/runTime/libraries/dateLibrary";
import {Dependencies} from "lexy/dist/dependencyGraph/dependencies";

export type ParseResult = {
  logger: IParserLogger;
  logging: Array<LogEntry>;
  nodes: ComponentNodeList;
  elapsed: number;
  dependencies: Dependencies
}

const baseLogger = new DummyLogger();

export async function parseLines(fileName: string, lines: string[], fileSystem: IFileSystem): Promise<ParseResult> {
  const startTime = new Date();
  const lexyParser = createParser(baseLogger, fileSystem, new Libraries([]));
  const {componentNodes, logger, dependencies} = await lexyParser.parse(lines, fileName, {suppressException: true});
  const elapsed = milliseconds(new Date(), startTime).toNumber();
  return {logging: logger.entries, nodes: componentNodes, logger: logger, elapsed: elapsed, dependencies: dependencies}
}

export async function parseCode(fileName: string, code: string, fileSystem: IFileSystem): Promise<ParseResult> {
  const lines = code.split("\n");
  return await parseLines(fileName, lines, fileSystem);
}

export async function parseFile(fileName: string, fileSystem: IFileSystem): Promise<ParseResult> {
  const startTime = new Date();
  const lexyParser = createParser(baseLogger, fileSystem, new Libraries([]));
  const {componentNodes, logger, dependencies} = await lexyParser.parseFile(fileName, {suppressException: true});
  const elapsed = milliseconds(new Date(), startTime).toNumber();
  return {logging: logger.entries, nodes: componentNodes, logger: logger, elapsed: elapsed, dependencies: dependencies}
}

export function createLexyCompiler(): ILexyCompiler {
  return createCompiler(baseLogger, baseLogger, new Libraries([]));
}

export function compileNodes(nodes: readonly IComponentNode[]): CompilerResult {
  const lexyCompiler = createLexyCompiler();
  return lexyCompiler.compile(nodes);
}
