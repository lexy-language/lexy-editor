type VariableState = { [key: string]: any };

export class ExecuteFunctionState {

  private readonly parameters: VariableState;
  private readonly results: VariableState;

  public constructor(parameters: VariableState | null = null, results: VariableState | null = null) {
    this.parameters = parameters != null ? parameters : {};
    this.results = results != null ? results : {};
  }

  public getParameter(name: string): any {
    return this.parameters[name];
  }

  public setParameter(name: string, value: any): ExecuteFunctionState {
    return new ExecuteFunctionState({...this.parameters, [name]: value}, this.results);
  }

  public getParameters(): any {
    return this.parameters;
  }

  public getResult(name: string): any {
    return this.results[name];
  }

  public setResults(results: any): ExecuteFunctionState {
    return new ExecuteFunctionState(this.parameters, {...results});
  }
}