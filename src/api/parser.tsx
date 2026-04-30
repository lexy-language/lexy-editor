import type {IParserLogger} from "lexy/dist/parser/logging/parserLogger";
import type {IComponentNode} from "lexy/dist/language/componentNode";

import {createCompiler, createParser, IFileSystem, ILexyCompiler} from "lexy";
import {CompilerResult} from "lexy/dist/generation/compilerResult";
import {DummyLogger} from "../infrastructure/loggers";
import {ComponentNodeList} from "lexy/dist/language/componentNodeList";
import {Libraries} from "lexy/dist/functionLibraries/libraries";
import {milliseconds} from "lexy/dist/runTime/libraries/dateLibrary";
import {Dependencies} from "lexy/dist/dependencyGraph/dependencies";
import {LogEntry} from "lexy/dist/parser/logging/parserLogger";
import {IProject, Project} from "lexy/dist/infrastructure/project";
import {WebFileSystem} from "./webFileSystem";
import {ISymbols} from "lexy/dist/parser/symbols/symbols";

export type ParseResult = {
  logger: IParserLogger;
  logging: Array<LogEntry>;
  nodes: ComponentNodeList;
  elapsed: number;
  dependencies: Dependencies,
  symbols: ISymbols,
  project: IProject
}

const baseLogger = new DummyLogger();
const project = new Project(new WebFileSystem([""]));

export async function parseLines(fileName: string, lines: string[], fileSystem: IFileSystem): Promise<ParseResult> {
  const startTime = new Date();
  const lexyParser = createParser(baseLogger, fileSystem, new Libraries([]));
  const {componentNodes, logger, dependencies, symbols} = await lexyParser.parseCode(fileName, lines, {suppressException: true});
  const elapsed = milliseconds(new Date(), startTime).toNumber();
  return {
    logging: logger.entries,
    nodes: componentNodes,
    logger: logger,
    elapsed: elapsed,
    dependencies: dependencies,
    symbols: symbols,
    project: project
  }
}

export async function parseCode(fileName: string, code: string, fileSystem: IFileSystem): Promise<ParseResult> {
  const lines = code.split("\n");
  return await parseLines(fileName, lines, fileSystem);
}

export async function parseFile(fileName: string, fileSystem: IFileSystem): Promise<ParseResult> {
  const startTime = new Date();
  const lexyParser = createParser(baseLogger, fileSystem, new Libraries([]));
  const file = project.file(fileName);
  const {componentNodes, logger, dependencies, symbols} = await lexyParser.parseFile(file, {suppressException: true});
  const elapsed = milliseconds(new Date(), startTime).toNumber();
  return {
    logging: logger.entries,
    nodes: componentNodes,
    logger: logger,
    elapsed: elapsed,
    dependencies: dependencies,
    symbols: symbols,
    project: project
  };
}

export function createLexyCompiler(): ILexyCompiler {
  return createCompiler(baseLogger, baseLogger, new Libraries([]));
}

export function compileNodes(nodes: readonly IComponentNode[]): CompilerResult {
  const lexyCompiler = createLexyCompiler();
  return lexyCompiler.compile(nodes);
}
