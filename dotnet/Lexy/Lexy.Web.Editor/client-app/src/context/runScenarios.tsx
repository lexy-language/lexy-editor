import React from 'react';
import {IRootNode} from "lexy/dist/language/rootNode";
import {NodeType} from "lexy/dist/language/nodeType";
import {ScenarioRunner} from "lexy/dist/specifications/scenarioRunner";
import {asScenario} from "lexy/dist/language/scenarios/scenario";
import {createLexyCompiler, createLogger} from "../api/parser";
import {Assert} from "lexy";
import {SpecificationRunnerContext} from "lexy/dist/specifications/specificationRunnerContext";
import {IParserLogger} from "lexy/dist/parser/parserLogger";
import {RootNodeList} from "lexy/dist/language/rootNodeList";
import {MemoryLogEntry, MemoryLogger} from "../api/loggers";

export function runScenarios(currentFileName: string, nodes: Array<IRootNode>, parserLogger: IParserLogger, setTestingLogging: ((log: ReadonlyArray<MemoryLogEntry>) => void)) {
  const scenarioRunners: Array<ScenarioRunner> = [];
  const lexyCompiler = createLexyCompiler();
  const logger = new MemoryLogger();
  const context = new SpecificationRunnerContext(logger)
  for (const node of nodes) {
    if (node.nodeType != NodeType.Scenario) continue;
    const scenario = Assert.notNull(asScenario(node), "scenario");
    const runner = new ScenarioRunner(currentFileName, lexyCompiler, new RootNodeList(nodes), scenario, context, parserLogger);
    scenarioRunners.push(runner)
  }

  for (const scenarioRunner of scenarioRunners) {
    scenarioRunner.run()
  }

  setTestingLogging(logger.logging);
}