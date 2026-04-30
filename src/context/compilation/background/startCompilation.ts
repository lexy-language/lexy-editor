import {StartCompilationRequest} from "../requests";
import {WebFileSystem} from "../../../api/webFileSystem";
import {parseCode} from "../../../api/parser";
import {
  CompilationFailed,
  CompilationSuccess,
  ResponseType,
  RunScenarios
} from "../response";
import {mapLogging} from "../../project/logModel";
import {mapNodes} from "../../project/nodeModel";
import {ComponentNodeList} from "lexy/dist/language/componentNodeList";
import {Dependencies} from "lexy/dist/dependencyGraph/dependencies";
import type {IParserLogger} from "lexy/dist/parser/logging/parserLogger";
import {mapSpecificationsLog} from "../specificationsLogModel";
import {workerOperationStateStorage} from "../../../api/operationStorage";
import {CompilationWorkerContext} from "./worker";
import {runScenarios} from "./runScenarios";
import {operationKey} from "../context";

export async function startCompilation(request: StartCompilationRequest, context: CompilationWorkerContext) {

  const {getOperationState} = workerOperationStateStorage();

  async function parseFiles(request: StartCompilationRequest) {

    const fileSystem = new WebFileSystem(request.folder);
    const {logging, nodes, logger, elapsed, dependencies} = await parseCode(request.fileName, request.code, fileSystem);
    const response: CompilationSuccess = {
      type: ResponseType.CompilationCompleted,
      error: false,
      logging: mapLogging(logging),
      nodes: mapNodes(nodes.values),
      elapsed: elapsed
    };

    if (await continueOperation()) {
      context.postResponse(response);
      return {nodes, logger, elapsed, dependencies};
    } else {
      return null;
    }
  }

  async function continueOperation(): Promise<boolean> {
    let operationState = await getOperationState(operationKey);
    let continueValue = operationState === request.timestamp;
    if (!continueValue) {
      console.log(`CANCEL CURRENT OPERATION: ${operationState} (new: ${request.timestamp})`);
    }
    return continueValue;
  }

  async function runFileScenarios(fileName: string, nodes: ComponentNodeList, dependencies: Dependencies, logger: IParserLogger) {
    const result = await runScenarios(fileName, nodes, dependencies, logger, continueOperation);
    const response: RunScenarios = {
      type: ResponseType.RunScenariosCompleted,
      result: mapSpecificationsLog(result),
    };
    context.postResponse(response);
  }

  try {
    const result = await parseFiles(request);
    if (!result) return;

    const {nodes, logger, dependencies} = result;
    await runFileScenarios(request.fileName, nodes, dependencies, logger);
  } catch (error: any) {
    const failed: CompilationFailed = {type: ResponseType.CompilationFailed, error: true, lastError: error.stack};
    context.postResponse(failed);
  }
}
