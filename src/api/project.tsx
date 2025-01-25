import {firstOrDefault} from "lexy/dist/infrastructure/enumerableExtensions";

// I didn't had the time to write a backend and I wanted to publish an SPA without the the need of a backend,
// so for now I included the lexy introduction and example files as a JSON
// (to update the lexyLanguage.json execute 'node update-lexy-language.js' from the ./scripts folder)
// This can be removed in the future...
import lexyLanguageFiles from "./../lexyLanguage.json";

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
  if (lexyLanguageFiles) {
    return lexyLanguageFiles;
  }

  const response = await fetch(`/api/project/${projectName}/file`);
  return await response.json();
}

function getEmbeddedFile(identifier: string): ProjectFileDetails {
  console.log("identifier: " + identifier);
  const parts = identifier.split("|");
  let folder = lexyLanguageFiles as ProjectFolder;
  for (let index = 1; index < parts.length - 1; index++) {
    const subFolder = firstOrDefault(folder.folders, folder => folder.name === parts[index]);
    if (subFolder == null) {
      throw new Error(`Can't find file: '${identifier}'`)
    }
    folder = subFolder;
  }
  const fileName = parts[parts.length - 1];
  let file = firstOrDefault(folder.files, files => files.name === fileName);
  if (file == null) {
    throw new Error(`Can't find file: '${identifier}'`)
  }
  return file as ProjectFileDetails;
}

export async function getFileDetails(projectName: string, identifier: string): Promise<ProjectFileDetails> {
  if (lexyLanguageFiles) {
    return getEmbeddedFile(identifier);
  }

  const response = await fetch(`/api/project/${projectName}/file/${identifier}`);
  return await response.json();
}
