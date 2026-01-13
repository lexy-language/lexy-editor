import {FunctionResult} from "lexy/dist/runTime/functionResult";


export type ParametersValueModel = Date | string | number | boolean | ParametersModel;

export type ParametersModel = {[key: string]: ParametersValueModel};

export type ResultsValueModel = Date | string | number | boolean | ResultsModel;

export type ResultsModel = {[key: string]: ResultsValueModel};

export function mapExecutionResults(results: FunctionResult): ResultsModel {
  return results.value;
}
