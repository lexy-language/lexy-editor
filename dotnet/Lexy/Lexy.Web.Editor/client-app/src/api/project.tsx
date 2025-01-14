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

export async function getProjectFiles(projectName: string, setProjectFiles: (value: ProjectFolder) => void) {
  const response = await fetch(`/api/project/${projectName}/file`);
  const data = await response.json();
  setProjectFiles(data);
}

export async function getFileDetails(projectName: string, identifier: string, setProjectFileDetails: (value: ProjectFileDetails) => void) {
  const response = await fetch(`/api/project/${projectName}/file/${identifier}`);
  const data = await response.json();
  setProjectFileDetails(data);
}

//todo return promise