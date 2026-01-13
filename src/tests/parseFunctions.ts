import type {IParserLogger} from "lexy/dist/parser/parserLogger";
import {ComponentNodeList} from "lexy/dist/language/componentNodeList";
import {LexyParser} from "lexy/dist/parser/lexyParser";
import {Tokenizer} from "lexy/dist/parser/tokens/tokenizer";
import {ExpressionFactory} from "lexy/dist/language/expressions/expressionFactory";
import {asTable, Table} from "lexy/dist/language/tables/table";
import {asScenario, Scenario} from "lexy/dist/language/scenarios/scenario";
import {asEnumDefinition, EnumDefinition} from "lexy/dist/language/enums/enumDefinition";
import {ComponentNode} from "lexy/dist/language/componentNode";
import {asFunction, Function} from "lexy/dist/language/functions/function";
import {ILibraries, Libraries} from "lexy/dist/functionLibraries/libraries";
import {DummyLogger} from "../infrastructure/loggers";
import {NodeFileSystem} from "./nodeFileSystem";
import {Assert} from "lexy";

export function createParser(libraries: ILibraries) {

  const logger = new DummyLogger();
  const expressionFactory = new ExpressionFactory();
  const fileSystem = new NodeFileSystem();
  const tokenizer = new Tokenizer();

  return new LexyParser(logger, tokenizer, fileSystem, expressionFactory, libraries);
}

export async function parseNodes(code: string, libraries: ILibraries | null = null): Promise<{nodes: ComponentNodeList, logger: IParserLogger}> {

  if (libraries == null) {
    libraries = new Libraries([]);
  }

  const parser = createParser(libraries);
  const codeLines = code.split("\n");
  const result = await parser.parse(codeLines, `tests.lexy`, {suppressException: true});

  return {nodes: result.componentNodes, logger: result.logger};
}

export async function parseFunction(code: string): Promise<{functionNode: Function, logger: IParserLogger}> {
  const {result, logger} = await parseNode<Function>(asFunction, code);
  return {functionNode: result, logger};
}

export async function parseTable(code: string): Promise<{ table: Table, logger: IParserLogger}> {
  const {result, logger} = await parseNode<Table>(asTable, code);
  return {table: result, logger};
}

export async function parseScenario(code: string): Promise<{scenario: Scenario, logger: IParserLogger}> {
  const {result, logger} = await parseNode<Scenario>(asScenario, code);
  return {scenario: result, logger};
}

export async function parseEnum(code: string): Promise<{enumDefinition: EnumDefinition, logger: IParserLogger}> {
  const {result, logger} = await parseNode<EnumDefinition>(asEnumDefinition, code);
  return {enumDefinition: result, logger};
}

export async function parseNode<T extends ComponentNode>(castFunction: (value: object) => T | null, code: string):
  Promise<{ result: T, logger: IParserLogger }> {

  const {nodes, logger} = await parseNodes(code);
  if (nodes.length != 1) throw new Error(`Only 1 node expected. Actual: ` + nodes.length);

  const first = Assert.notNull(nodes.values[0], "first");
  const specificType = castFunction(first);
  if (specificType == null) {
    throw new Error(`Node not a ${castFunction.name}. Actual: ${first?.nodeType}`);
  }

  return {result: specificType, logger: logger};
}
