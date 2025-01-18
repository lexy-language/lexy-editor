import createContext from "./createContext"
import React, {useEffect, useState} from 'react';
import {getFileDetails, getProjectFiles, ProjectFile, ProjectFolder} from "../api/project";
import {parseFile} from "../api/parser";
import {isLoading, Loading} from "./loading";
import {LogEntry} from "lexy/dist/parser/parserLogger";
import {createStructure, StructureNode} from "./structure";
import {TreeNodeState} from "./treeNodeState";
import {ExecuteFunctionState} from "./executeFunctionState";
import {IRootNode} from "lexy/dist/language/rootNode";

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
  lineNumber: number;
  column: number;
  source: string;
}

export interface ProjectFileCode {
  name: string;
  identifier: string;
  code: string;
  source: string;
}

export interface EditorState {
  currentProject: string;
  setCurrentProject: React.Dispatch<React.SetStateAction<string>>;

  projectFiles: ProjectFolder | null | Loading;
  setProjectFiles: React.Dispatch<React.SetStateAction<ProjectFolder | null | Loading>>;

  projectFilesTreeState: TreeNodeState;
  setProjectFilesTreeState: React.Dispatch<React.SetStateAction<TreeNodeState>>;

  currentFile: ProjectFile | null;
  setCurrentFile: React.Dispatch<React.SetStateAction<ProjectFile | null>>;

  currentFileCode: ProjectFileCode | null | Loading;
  setCurrentFileCode: React.Dispatch<React.SetStateAction<ProjectFileCode | null | Loading>>;

  currentFileLogging: Array<LogEntry> | Loading;
  setCurrentFileLogging: React.Dispatch<React.SetStateAction<Array<LogEntry> | Loading>>;

  nodes: Array<IRootNode> | Loading;
  setNodes: React.Dispatch<React.SetStateAction<Array<IRootNode> | Loading>>;

  structure: Array<StructureNode> | null;
  setStructure: React.Dispatch<React.SetStateAction<Array<StructureNode> | null>>;

  currentStructureNode: StructureNode | null;
  setCurrentStructureNode:React.Dispatch<React.SetStateAction<StructureNode | null>>;

  structureTreeState: TreeNodeState;
  setStructureTreeState: React.Dispatch<React.SetStateAction<TreeNodeState>>;

  executeFunction: ExecuteFunctionState;
  setExecuteFunction: React.Dispatch<React.SetStateAction<ExecuteFunctionState>>;

  editorPosition: EditorPosition | null;
  setEditorPosition: React.Dispatch<React.SetStateAction<EditorPosition | null>>;

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
  const [projectFilesTreeState, setProjectFilesTreeState] = useState<TreeNodeState>(new TreeNodeState());

  const [currentFile, setCurrentFile] = useState<ProjectFile | null>(null);
  const [currentFileCode, setCurrentFileCode] = useState<ProjectFileCode | null | Loading>(null);
  const [currentFileLogging, setCurrentFileLogging] = useState<Array<LogEntry> | Loading>([]);
  const [nodes, setNodes] = useState<Array<IRootNode> | Loading>([]);

  const [structure, setStructure] = useState<Array<StructureNode> | null>(null);
  const [currentStructureNode, setCurrentStructureNode] = useState<StructureNode | null>(null);
  const [structureTreeState, setStructureTreeState] = useState<TreeNodeState>(new TreeNodeState());

  const [executeFunction, setExecuteFunction] = useState<ExecuteFunctionState>(new ExecuteFunctionState());

  const [editorPosition, setEditorPosition] = useState<EditorPosition | null>(null);

  const [leftContainer, setLeftContainer] = useState(LeftContainer.Explorer);
  const [mainContainer, setMainContainer] = useState(MainContainer.Source);
  const [bottomContainer, setBottomContainer] = useState(BottomContainer.Logging);

  const value = {
    currentProject, setCurrentProject,
    projectFiles, setProjectFiles,
    projectFilesTreeState, setProjectFilesTreeState,

    currentFile, setCurrentFile,
    currentFileCode, setCurrentFileCode,
    currentFileLogging, setCurrentFileLogging,
    nodes, setNodes,

    structure, setStructure,
    currentStructureNode, setCurrentStructureNode,
    structureTreeState, setStructureTreeState,

    executeFunction, setExecuteFunction,

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
      getFileDetails(currentProject, currentFile.identifier, value => {
        setCurrentFileCode({
          code: value.code,
          identifier: value.identifier,
          name: value.name,
          source: "state"
        });
      }).catch(console.error);
    } else {
      setCurrentFileCode(null);
    }
  }, [currentFile]);

  useEffect(() => {
    setCurrentProject("test");
  }, []);

  useEffect(() => {
    if (currentFileCode != null && !isLoading(currentFileCode)) {
      const {logging, nodes} = parseFile(currentFileCode.name, currentFileCode.code);
      setCurrentFileLogging(logging);
      setNodes(nodes);
      setStructure(createStructure(nodes));
    } else {
      setCurrentFileLogging([]);
      setNodes([]);
      setStructure([]);
    }
  }, [currentFileCode]);

  return <Provider value={value}>{children}</Provider>;
};