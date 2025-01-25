export class ProjectState {

  private readonly files: { [key: string]: string }

  public readonly name: string;

  public constructor(name: string | null = null, files: { [key: string]: string } | null = null) {
    this.name = name ?? "Untitled";
    this.files = files !== null ? files : {};
  }

  public file(path: Array<string>): string | undefined {
    const fullPath = ProjectState.fullPath(path);
    return this.files[fullPath];
  }

  public setFile(path: Array<string>, file: string): ProjectState {
    const fullPath = ProjectState.fullPath(path);
    const newFiles = {
      ...this.files,
      [fullPath]: file
    }
    return new ProjectState(this.name, newFiles);
  }

  private static fullPath(path: Array<string>) {
    return path.join("|");
  }

  setName(name: string) {
    return new ProjectState(name, this.files);
  }
}