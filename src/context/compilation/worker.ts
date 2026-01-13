import {WebFileSystem} from "../../api/webFileSystem";
import {compileNodes, parseCode, parseFile} from "../../api/parser";
import {mapNodes} from "../project/nodeModel";
import {mapLogging} from "../project/logModel";
import {
  Response,
  CompilationFailedResponse,
  CompilationSuccessResponse,
  RunFunctionSuccessResponse,
  RunFunctionFailedResponse, ResponseType, RunScenariosResponse
} from "./response";
import {Request, RequestType, RunFunctionRequest, StartCompilationRequest} from "./requests";
import {milliseconds} from "../../infrastructure/dateFunctions";
import {Assert} from "lexy";
import {mapExecutionLogging} from "./executionLogModel";
import {mapExecutionResults} from "./resultsModel";
import {runScenarios} from "./runScenarios";
import {ComponentNodeList} from "lexy/dist/language/componentNodeList";
import {IParserLogger} from "lexy/dist/parser/parserLogger";
import {mapSpecificationsLog} from "./specificationsLogModel";
import {Dependencies} from "lexy/dist/dependencyGraph/dependencies";
import {asFunction} from "lexy/dist/language/functions/function";
import {asScenario, instanceOfScenario} from "lexy/dist/language/scenarios/scenario";
import {workerOperationStateStorage} from "../../api/operationStorage";

export const operationKey = "compilation-worker";

async function processWorkerRequest(message: MessageEvent<Request>): Promise<void> {

  const {getOperationState} = workerOperationStateStorage();

  async function processStartCompilation(request: StartCompilationRequest) {

    async function parseFiles(request: StartCompilationRequest) {

      const fileSystem = new WebFileSystem(request.folder);
      const {logging, nodes, logger, elapsed, dependencies} = await parseCode(request.fileName, request.code, fileSystem);
      const response: CompilationSuccessResponse = {
        type: ResponseType.CompilationCompleted,
        error: false,
        logging: mapLogging(logging),
        nodes: mapNodes(nodes.values),
        elapsed: elapsed
      };

      if (await continueOperation()) {
        postResponse(response);
        return {nodes, logger, elapsed, dependencies};
      } else {
        return null;
      }
    }

    async function continueOperation(): Promise<boolean> {
      let operationState = await getOperationState(operationKey);
      let continueValue = operationState == request.timestamp;
      if (!continueValue) {
        console.log(`CANCEL CURRENT OPERATION: ${operationState} (new: ${request.timestamp})`);
      }
      return continueValue;
    }

    async function runFileScenarios(fileName: string, nodes: ComponentNodeList, dependencies: Dependencies, logger: IParserLogger) {
      const result = await runScenarios(fileName, nodes, dependencies, logger, continueOperation);
      const response: RunScenariosResponse = {
        type: ResponseType.RunScenariosCompleted,
        result: mapSpecificationsLog(result),
      };
      postResponse(response);
    }

    try {
      const result = await parseFiles(request);
      if (!result) return;

      const {nodes, logger, dependencies} = result;
      await runFileScenarios(request.fileName, nodes, dependencies, logger);
    } catch (error: any) {
      const failed: CompilationFailedResponse = {type: ResponseType.CompilationFailed, error: true, lastError: error.stack};
      postResponse(failed);
    }
  }

  async function processExecuteFunction(request: RunFunctionRequest) {
    const startTime = new Date();
    try {
      const fileSystem = new WebFileSystem(request.folder);
      const {nodes} = await parseFile(request.fileName, fileSystem);
      const result = compileNodes(nodes.values);

      const node = nodes.getNode(request.functionName);
      const functionNode = instanceOfScenario(node) ? asScenario(node)?.functionNode : asFunction(node);
      const executable = result.getFunction(Assert.notNull(functionNode, "functionNode"));
      const parameters = request.parameters;
      const results = executable.run(parameters);
      const elapsed = milliseconds(new Date(), startTime).toNumber();

      const response: RunFunctionSuccessResponse = {
        type: ResponseType.RunFunctionCompleted,
        error: false,
        logging: mapExecutionLogging(results.logging),
        result: mapExecutionResults(results),
        elapsed: elapsed
      };

      postResponse(response);

    } catch (error: any) {
      const failed: RunFunctionFailedResponse = {type: ResponseType.RunFunctionCompleted, error: true, lastError: error.stack};
      postResponse(failed);
    }
  }

  function postResponse(response: Response) {
    self.postMessage(response);
  }

  if (message.data.type == RequestType.StartCompilation) {
    await processStartCompilation(message.data as StartCompilationRequest);
  } else if (message.data.type == RequestType.RunFunction) {
    await processExecuteFunction(message.data as RunFunctionRequest);
  } else {
    console.log("Invalid compile worker request: " + JSON.stringify(message.data));
  }
}

const self = globalThis as unknown as DedicatedWorkerGlobalScope;
self.onmessage = processWorkerRequest;
