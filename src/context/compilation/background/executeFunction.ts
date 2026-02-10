import {RunFunctionRequest} from "../requests";
import {WebFileSystem} from "../../../api/webFileSystem";
import {compileNodes, parseFile} from "../../../api/parser";
import {asScenario, instanceOfScenario} from "lexy/dist/language/scenarios/scenario";
import {asFunction} from "lexy/dist/language/functions/function";
import {Assert} from "lexy";
import {milliseconds} from "../../../infrastructure/dateFunctions";
import {ResponseType, RunFunctionFailedResponse, RunFunctionSuccessResponse} from "../response";
import {mapExecutionLogging} from "../executionLogModel";
import {mapExecutionResults} from "../resultsModel";
import {CompilationContext} from "./worker";

export async function executeFunction(request: RunFunctionRequest, context: CompilationContext) {

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

    context.postResponse(response);

  } catch (error: any) {
    const failed: RunFunctionFailedResponse = {type: ResponseType.RunFunctionCompleted, error: true, lastError: error.stack};
    context.postResponse(failed);
  }
}
