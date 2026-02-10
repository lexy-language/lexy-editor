import {
  Response,
} from "../response";
import {Request, RequestType, RunFunctionRequest, StartCompilationRequest} from "../requests";
import {startCompilation} from "./startCompilation";
import {executeFunction} from "./executeFunction";

export interface CompilationContext {
  postResponse(response: Response): void;
}

class CompilationWorker implements CompilationContext {

  public postResponse(response: Response) {
    self.postMessage(response);
  }

  public async processWorkerRequest(message: MessageEvent<Request>): Promise<void> {

    if (message.data.type === RequestType.StartCompilation) {
      await startCompilation(message.data as StartCompilationRequest, this);
    } else if (message.data.type === RequestType.RunFunction) {
      await executeFunction(message.data as RunFunctionRequest, this);
    } else {
      console.log("Invalid compile worker request: " + JSON.stringify(message.data));
    }
  }
}

const compilationWorker = new CompilationWorker();

const self = globalThis as unknown as DedicatedWorkerGlobalScope;
self.onmessage = compilationWorker.processWorkerRequest;
