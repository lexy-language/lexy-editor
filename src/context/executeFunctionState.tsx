import {VariablePath} from "lexy/dist/language/variablePath";

type VariableState = { [key: string]: any };

export class ExecuteFunctionState {

  private readonly parameters: VariableState;
  private readonly results: VariableState | null;

  public readonly elapsed: number | null;
  public readonly error: string | null ;

  public constructor(parameters: VariableState | null = null,
                     results: VariableState | null = null,
                     error: string | null = null,
                     elapsed: number | null = null) {
    this.parameters = parameters !== null ? parameters : {};
    this.results = results;
    this.error = error;
    this.elapsed = elapsed;
  }

  public getParameter(variable: VariablePath): any {
    let reference = variable;
    let valueObject = this.parameters;
    while (reference.hasChildIdentifiers) {
      if (valueObject[reference.parentIdentifier] === undefined) {
        return undefined;
      }
      valueObject = valueObject[reference.parentIdentifier];
      reference = reference.childrenReference();
    }
    return valueObject[reference.parentIdentifier];
  }

  public setParameter(variable: VariablePath, value: any): ExecuteFunctionState {
    let reference = variable;
    let newParameters = {...this.parameters};
    let valueObject = newParameters;
    while (reference.hasChildIdentifiers) {
      if (valueObject[reference.parentIdentifier] === undefined) {
        valueObject[reference.parentIdentifier] = {};
      }
      valueObject = valueObject[reference.parentIdentifier];
      reference = reference.childrenReference();
    }
    valueObject[reference.parentIdentifier] = value;

    return new ExecuteFunctionState(newParameters, this.results, null, this.elapsed);
  }

  public getParameters(): any {
    return this.parameters;
  }

  public getResults(): any {
    return this.results;
  }

  public setResults(results: any, elapsed: number): ExecuteFunctionState {
    return new ExecuteFunctionState(this.parameters, {...results}, null, elapsed);
  }

  public setError(error: string): ExecuteFunctionState {
    return new ExecuteFunctionState(this.parameters, null, error);
  }

  public reset(): ExecuteFunctionState {
    return new ExecuteFunctionState();
  }
}