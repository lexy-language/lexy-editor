import {IComponentNode} from "lexy/dist/language/componentNode";
import {NodeType} from "lexy/dist/language/nodeType";
import {ScenarioRunner} from "lexy/dist/specifications/scenarioRunner";
import {asScenario} from "lexy/dist/language/scenarios/scenario";
import {createLexyCompiler} from "../api/parser";
import {Assert, ILexyCompiler} from "lexy";
import {SpecificationRunnerContext} from "lexy/dist/specifications/specificationRunnerContext";
import {SpecificationsLogEntry} from "lexy/dist/specifications/specificationsLogEntry";
import {IParserLogger} from "lexy/dist/parser/parserLogger";
import {ComponentNodeList} from "lexy/dist/language/componentNodeList";
import {MemoryLogger} from "../api/loggers";

export function runScenarios(currentFileName: string, nodes: Array<IComponentNode>, parserLogger: IParserLogger, setTestingLogging: ((log: ReadonlyArray<SpecificationsLogEntry>) => void)) {

  function addRunners(lexyCompiler: ILexyCompiler, context: SpecificationRunnerContext, scenarioRunners: Array<ScenarioRunner>) {
    for (const node of nodes) {
      if (node.nodeType !== NodeType.Scenario) continue;
      const scenario = Assert.notNull(asScenario(node), "scenario");
      const runner = new ScenarioRunner(currentFileName, lexyCompiler, new ComponentNodeList(nodes), scenario, context, parserLogger);
      scenarioRunners.push(runner)
    }
  }

  function runRunners(scenarioRunners: Array<ScenarioRunner>) {
    for (const scenarioRunner of scenarioRunners) {
      scenarioRunner.run()
    }
  }

  try {
    const lexyCompiler = createLexyCompiler();
    const logger = new MemoryLogger();
    const context = new SpecificationRunnerContext(logger)
    const scenarioRunners: Array<ScenarioRunner> = [];

    addRunners(lexyCompiler, context, scenarioRunners);
    runRunners(scenarioRunners);
    context.logTimeSpent();

    setTestingLogging(context.logEntries);

  } catch (error: any) {
    const entry = new SpecificationsLogEntry(null, null, true, "Application error occurred: " + error.stack);
    setTestingLogging([entry]);
  }
}