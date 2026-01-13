import {IdentifierPath} from "lexy/dist/language/identifierPath";
import {nothing, Nothing} from "../../infrastructure/nothing";
import {ParametersModel, ResultsModel} from "./resultsModel";

export class ExecuteFunctionState {

  public readonly parameters: ParametersModel;
  public readonly results: ResultsModel | Nothing;
  public readonly elapsed: number | Nothing;
  public readonly error: string | Nothing;
  public readonly loading: boolean;

  public constructor(parameters: ParametersModel | Nothing = nothing,
                     results: ResultsModel | Nothing = nothing,
                     loading: boolean = false,
                     error: string | Nothing = nothing,
                     elapsed: number | Nothing = nothing) {
    this.parameters = parameters ? parameters : {};
    this.results = results;
    this.loading = loading;
    this.error = error;
    this.elapsed = elapsed;
  }

  public getParameter(variable: IdentifierPath): any {
    let reference = variable;
    let valueObject = this.parameters;
    while (reference.hasChildIdentifiers) {
      if (valueObject[reference.rootIdentifier] === undefined) {
        return undefined;
      }
      valueObject = valueObject[reference.rootIdentifier] as ParametersModel;
      reference = reference.childrenReference();
    }
    return valueObject[reference.rootIdentifier];
  }

  public setParameter(variable: IdentifierPath, value: any): ExecuteFunctionState {
    const newParameters = {...this.parameters};
    let reference = variable;
    let valueObject = newParameters;
    while (reference.hasChildIdentifiers) {
      if (valueObject[reference.rootIdentifier] === undefined) {
        valueObject[reference.rootIdentifier] = {};
      }
      valueObject = valueObject[reference.rootIdentifier] as ParametersModel;
      reference = reference.childrenReference();
    }
    valueObject[reference.rootIdentifier] = value;

    return new ExecuteFunctionState(newParameters, this.results, this.loading, this.error, this.elapsed);
  }

  public setLoading(loading: boolean): ExecuteFunctionState {
    return new ExecuteFunctionState(this.parameters, null, loading, null, null);
  }

  public setResults(results: any, elapsed: number): ExecuteFunctionState {
    return new ExecuteFunctionState(this.parameters, {...results}, false, null, elapsed);
  }

  public setError(error: string): ExecuteFunctionState {
    return new ExecuteFunctionState(this.parameters, null, false, error, this.elapsed);
  }

  public reset(): ExecuteFunctionState {
    return new ExecuteFunctionState();
  }
}
