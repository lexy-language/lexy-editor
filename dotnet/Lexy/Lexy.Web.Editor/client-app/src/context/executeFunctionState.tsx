type VariableState = { [key: string]: any };

export class ExecuteFunctionState {

  private readonly parameters: VariableState;
  private readonly results: VariableState;
  private readonly errorValue: string | null;

  public get error(): string | null {
    return this.errorValue;
  }

  public constructor(parameters: VariableState | null = null, results: VariableState | null = null, error: string | null = null) {
    this.parameters = parameters != null ? parameters : {};
    this.results = results != null ? results : {};
    this.errorValue = error;
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

  public setError(error: string): ExecuteFunctionState {
    return new ExecuteFunctionState(this.parameters, {}, error);
  }
}