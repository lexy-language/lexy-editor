export interface ProjectFolder {
  name: string;
  identifier: string;
  files: ProjectFile[];
  folders: ProjectFolder[];
}

export interface ProjectFile {
  name: string;
  identifier: string;
}

export interface ProjectFileDetails {
  name: string;
  identifier: string;
  code: string;
}

export async function getProjectFiles(projectName: string): Promise<ProjectFolder> {
  const response = await fetch(`/api/project/${projectName}/file`);
  const data = await response.json();
  return data;
}

export async function getFileDetails(projectName: string, identifier: string): Promise<ProjectFileDetails> {
  const response = await fetch(`/api/project/${projectName}/file/${identifier}`);
  const data = await response.json();
  return data;
}

//todo return promise