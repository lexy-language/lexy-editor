import type {IParserLogger} from "lexy/dist/parser/parserLogger";

import {NodeType} from "lexy/dist/language/nodeType";
import {ScenarioRunner} from "lexy/dist/specifications/scenarioRunner";
import {asScenario} from "lexy/dist/language/scenarios/scenario";
import {createLexyCompiler} from "../../api/parser";
import {Assert, ILexyCompiler} from "lexy";
import {SpecificationRunnerContext} from "lexy/dist/specifications/specificationRunnerContext";
import {SpecificationsLogEntry} from "lexy/dist/specifications/specificationsLogEntry";
import {ComponentNodeList} from "lexy/dist/language/componentNodeList";
import {MemoryLogger} from "../../infrastructure/loggers";
import {Dependencies} from "lexy/dist/dependencyGraph/dependencies";

export async function runScenarios(currentFileName: string, nodes: ComponentNodeList, dependencies: Dependencies,
                             parserLogger: IParserLogger,
                             continueCheck: () => Promise<boolean>): Promise<readonly SpecificationsLogEntry[]> {

  function addRunners(lexyCompiler: ILexyCompiler, context: SpecificationRunnerContext, scenarioRunners: Array<ScenarioRunner>) {
    for (const node of nodes.values) {
      if (node.nodeType !== NodeType.Scenario) continue;
      const scenario = Assert.notNull(asScenario(node), "scenario");
      const runner = new ScenarioRunner(currentFileName, lexyCompiler, nodes, scenario, context, parserLogger, dependencies);
      scenarioRunners.push(runner)
    }
  }

  async function runRunners(scenarioRunners: Array<ScenarioRunner>): Promise<void> {
    for (const scenarioRunner of scenarioRunners) {
      console.log("scenarioRunner: " + scenarioRunner.scenario.name);
      if (!await continueCheck()) return;
      scenarioRunner.run()
    }
  }

  try {
    const lexyCompiler = createLexyCompiler();
    const logger = new MemoryLogger();
    const context = new SpecificationRunnerContext(logger)
    const scenarioRunners: Array<ScenarioRunner> = [];

    addRunners(lexyCompiler, context, scenarioRunners);
    await runRunners(scenarioRunners);
    context.logTimeSpent();
    //console.log("scenarioRunner: complete " + JSON.stringify(context.logEntries, null, 4));

    return context.logEntries;
  } catch (error: any) {
    console.log("scenarioRunner: error " + error);
    const entry = new SpecificationsLogEntry(null, null, true, "Application error occurred: " + error.stack);
    return [entry];
  }
}
