import createContext from "./createContext"
import React, {useEffect, useState} from 'react';
import {getFileDetails, getProjectFiles, ProjectFile, ProjectFileDetails, ProjectFolder} from "../api/project";
import {compileCurrentFile} from "../api/parser";
import {isLoading, Loading} from "./loading";
import {LogEntry} from "lexy/dist/parser/parserLogger";

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

export type EditorPosition = {
  lineNumber: number,
  column: number,
  source: "editor" | "state"
}

export type EditorState = {
  currentProject: string;
  setCurrentProject: React.Dispatch<React.SetStateAction<string>>;

  projectFiles: ProjectFolder | null | Loading;
  setProjectFiles: React.Dispatch<React.SetStateAction<ProjectFolder | null | Loading>>;

  currentFile: ProjectFile | null;
  setCurrentFile: React.Dispatch<React.SetStateAction<ProjectFile | null>>;

  currentFileDetails: ProjectFileDetails | null | Loading;
  setCurrentFileDetails: React.Dispatch<React.SetStateAction<ProjectFileDetails | null | Loading>>;

  currentFileLogging: Array<LogEntry> | Loading;
  setCurrentFileLogging: React.Dispatch<Array<LogEntry> | Loading>;

  editorPosition: EditorPosition | null;
  setEditorPosition: React.Dispatch<EditorPosition | null>;

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
  const [currentFileLogging, setCurrentFileLogging] = useState<Array<LogEntry> | Loading>([]);

  const [editorPosition, setEditorPosition] = useState<EditorPosition | null>(null);

  const [leftContainer, setLeftContainer] = useState(LeftContainer.Explorer);
  const [mainContainer, setMainContainer] = useState(MainContainer.Source);
  const [bottomContainer, setBottomContainer] = useState(BottomContainer.Logging);

  const value = {
    currentProject, setCurrentProject,
    projectFiles, setProjectFiles,

    currentFile, setCurrentFile,
    currentFileDetails, setCurrentFileDetails,
    currentFileLogging, setCurrentFileLogging,

    editorPosition, setEditorPosition,

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

  useEffect(() => {
    if (currentFileDetails != null && !isLoading(currentFileDetails)) {
      const errors = compileCurrentFile(currentFileDetails.name, currentFileDetails.code);
      setCurrentFileLogging(errors);
    } else {
      setCurrentFileLogging([]);
    }
  }, [currentFileDetails]);

  return <Provider value={value}>{children}</Provider>;
};
