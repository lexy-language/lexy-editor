import createContext from "./createContext"
import React, {useEffect, useState} from 'react';
import {getProjectFiles, getFileDetails, ProjectFileDetails, ProjectFolder, ProjectFile} from "../api/project";

export enum LeftContainer {
  Explorer,
  Structure
}

export enum MainContainer {
  Source,
  Run,
  Table
}

export enum BottomContainer {
  Logging,
  Testing
}

export class Loading {
}

export type EditorState = {
  currentProject: string;
  setCurrentProject: React.Dispatch<React.SetStateAction<string>>;

  projectFiles: ProjectFolder | null | Loading;
  setProjectFiles: React.Dispatch<React.SetStateAction<ProjectFolder | null>>;

  currentFile: ProjectFile | null;
  setCurrentFile: React.Dispatch<React.SetStateAction<ProjectFile | null>>;

  currentFileDetails: ProjectFileDetails | null | Loading;
  setCurrentFileDetails: React.Dispatch<React.SetStateAction<ProjectFileDetails | null | Loading>>;

  leftContainer: LeftContainer;
  setLeftContainer: React.Dispatch<React.SetStateAction<LeftContainer>>;

  mainContainer: MainContainer;
  setMainContainer: React.Dispatch<React.SetStateAction<MainContainer>>;

  bottomContainer: BottomContainer;
  setBottomContainer: React.Dispatch<React.SetStateAction<BottomContainer>>;
}

export const [useContext, Provider] = createContext<EditorState>();

type ContextProviderProps = {
  children: React.ReactNode;
};

export const EditorContextProvider = ({ children }: ContextProviderProps) => {

  const [currentProject, setCurrentProject] = useState('test');
  const [projectFiles, setProjectFiles] = useState<ProjectFolder | null | Loading>(null);

  const [currentFile, setCurrentFile] = useState<ProjectFile | null>(null);
  const [currentFileDetails, setCurrentFileDetails] = useState<ProjectFileDetails | null | Loading>(null);

  const [leftContainer, setLeftContainer] = useState(LeftContainer.Explorer);
  const [mainContainer, setMainContainer] = useState(MainContainer.Source);
  const [bottomContainer, setBottomContainer] = useState(BottomContainer.Logging);

  const value = {
    currentProject, setCurrentProject,
    projectFiles, setProjectFiles,

    currentFile, setCurrentFile,
    currentFileDetails, setCurrentFileDetails,

    leftContainer, setLeftContainer,
    mainContainer, setMainContainer,
    bottomContainer, setBottomContainer
  };

  useEffect(() => {
    getProjectFiles(currentProject, setProjectFiles)
      .catch(console.error);
  }, [currentProject]);

  useEffect(() => {
    if (currentFile) {
      getFileDetails(currentProject, currentFile.identifier, setCurrentFileDetails)
        .catch(console.error);
    } else {
      setCurrentFileDetails(null);
    }
  }, [currentFile]);

  useEffect(() => {
    setCurrentProject("test");
  }, []);

  return <Provider value={value}>{children}</Provider>;
};
