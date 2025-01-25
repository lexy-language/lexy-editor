export class ProjectState {

  private readonly files: { [key: string]: string }

  public readonly name: string;

  public constructor(name: string | null = null, files: { [key: string]: string } | null = null) {
    this.name = name ?? "Introduction";
    this.files = files !== null ? files : {};
  }

  public file(identifier: string): string | undefined {
    return this.files[identifier];
  }

  public setFile(identifier: string, file: string): ProjectState {
    const newFiles = {
      ...this.files,
      [identifier]: file
    }
    return new ProjectState(this.name, newFiles);
  }

  setName(name: string) {
    return new ProjectState(name, this.files);
  }
}