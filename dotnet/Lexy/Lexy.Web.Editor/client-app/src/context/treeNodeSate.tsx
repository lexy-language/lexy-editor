export class TreeNodeSate {

  private readonly state: { [key: string]: boolean }

  public constructor(state: { [key: string]: boolean } | null = null) {
    this.state = state != null ? state : {};
  }

  public isOpen(path: Array<string>): boolean {
    const fullPath = TreeNodeSate.fullPath(path);
    const value = this.state[fullPath];
    return !!value;
  }

  public setOpen(path: Array<string>, open: boolean): TreeNodeSate {
    const fullPath = TreeNodeSate.fullPath(path);
    const newState = {
      ...this.state,
      [fullPath]: open
    }
    return new TreeNodeSate(newState);
  }

  private static fullPath(path: Array<string>) {
    return path.join("|");
  }
}