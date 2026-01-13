import {Nothing, nothing} from "../../infrastructure/nothing";

export class ProjectState {

  public readonly name: string;

  public constructor(name: string | Nothing = nothing) {
    this.name = name ?? "Introduction";
  }

  setName(name: string) {
    return new ProjectState(name);
  }
}
