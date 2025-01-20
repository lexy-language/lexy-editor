import createContext from "./createContext"
import React, {useEffect, useState} from 'react';
import {getFileDetails, getProjectFiles, ProjectFile, ProjectFolder} from "../api/project";
import {parseFile} from "../api/parser";
import {isLoading, Loading} from "./loading";
import {IParserLogger, LogEntry} from "lexy/dist/parser/parserLogger";
import {createStructure, StructureNode} from "./structure";
import {TreeNodeState} from "./treeNodeState";
import {ExecuteFunctionState} from "./executeFunctionState";
import {IRootNode} from "lexy/dist/language/rootNode";
import {SourceReference} from "lexy/dist/parser/sourceReference";
import {SourceFile} from "lexy/dist/parser/sourceFile";
import {firstOrDefault} from "lexy/dist/infrastructure/enumerableExtensions";
import {runScenarios} from "./runScenarios";
import {MemoryLogEntry} from "../api/loggers";
import {WebFileSystem} from "./webFileSystem";
import {ProjectState} from "./projectState";

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
  currentProject: ProjectState;
  setCurrentProject: React.Dispatch<React.SetStateAction<ProjectState>>;

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

  parserLogging: IParserLogger | null | Loading;
  setParserLogging: React.Dispatch<React.SetStateAction<IParserLogger | null | Loading>>;

  testingLogging: ReadonlyArray<MemoryLogEntry> | Loading;
  setTestingLogging: React.Dispatch<React.SetStateAction<ReadonlyArray<MemoryLogEntry> | Loading>>;

  nodes: Array<IRootNode> | Loading;
  setNodes: React.Dispatch<React.SetStateAction<Array<IRootNode> | Loading>>;

  structure: Array<StructureNode> | null;
  setStructure: React.Dispatch<React.SetStateAction<Array<StructureNode> | null>>;

  currentStructureNode: StructureNode | null;
  setCurrentStructureNode: React.Dispatch<React.SetStateAction<StructureNode | null>>;

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

export const EditorContextProvider = ({children}: ContextProviderProps) => {

  const [currentProject, setCurrentProject] = useState(new ProjectState());
  const [projectFiles, setProjectFiles] = useState<ProjectFolder | null | Loading>(null);
  const [projectFilesTreeState, setProjectFilesTreeState] = useState<TreeNodeState>(new TreeNodeState());

  const [currentFile, setCurrentFile] = useState<ProjectFile | null>(null);
  const [currentFileCode, setCurrentFileCode] = useState<ProjectFileCode | null | Loading>(null);
  const [currentFileLogging, setCurrentFileLogging] = useState<Array<LogEntry> | Loading>([]);
  const [testingLogging, setTestingLogging] = useState<ReadonlyArray<MemoryLogEntry> | Loading>([]);
  const [parserLogging, setParserLogging] = useState<IParserLogger | null | Loading>(null);
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

    testingLogging, setTestingLogging,
    parserLogging, setParserLogging,

    structure, setStructure,
    currentStructureNode, setCurrentStructureNode,
    structureTreeState, setStructureTreeState,

    executeFunction, setExecuteFunction,

    editorPosition, setEditorPosition,

    leftContainer, setLeftContainer,
    mainContainer, setMainContainer,
    bottomContainer, setBottomContainer
  };

  function openIntroductionFoldersAndSelectFirstFile(data: ProjectFolder): {tree: TreeNodeState, file: ProjectFile | null}  {
    let tree = new TreeNodeState();
    tree = tree.setOpen([data.name], true)
    let file: ProjectFile | null = null;
    for (const folder of data.folders) {
      if (folder.name != "Introduction") continue;
      tree = tree.setOpen([data.name, folder.name], true)
      if (file == null) {
        file = firstOrDefault(folder.files);
      }
    }
    return {tree: tree, file: file};
  }

  useEffect(() => {
    getProjectFiles(currentProject.name)
      .then(data => {
        setProjectFiles(data);
        const state = openIntroductionFoldersAndSelectFirstFile(data);
        setProjectFilesTreeState(state.tree)
        setCurrentFile(state.file)
      })
      .catch(console.error);
  }, [currentProject.name]);

  useEffect(() => {
    if (!currentFile) {
      setCurrentFileCode(null);
      return;
    }

    getFileDetails(currentProject.name, currentFile.identifier)
      .then(data => {
        setCurrentFileCode({
          code: data.code,
          identifier: data.identifier,
          name: data.name,
          source: "state"
        });
      })
      .catch(console.error);
  }, [currentFile]);

  useEffect(() => {
    if (currentFileCode == null || isLoading(currentFileCode)) return;
    setCurrentProject(currentProject.setFile(currentFileCode.identifier.split("|"), currentFileCode.code));
  }, [currentFileCode])

  useEffect(() => {
    setCurrentProject(currentProject.setName("Introduction"));
  }, []);

  useEffect(() => {
    if (currentFileCode != null && currentFile != null && !isLoading(currentFileCode)) {
      try {
        const currentFolder = currentFile.identifier.split("|");
        currentFolder.splice(currentFolder.length - 1, 1)
        const fileSystem = new WebFileSystem(currentFolder, currentProject);
        const {logging, nodes, logger} = parseFile(currentFileCode.name, currentFileCode.code, fileSystem);
        setCurrentFileLogging(logging);
        setNodes(nodes);
        setParserLogging(logger);
        setStructure(createStructure(nodes));
        setCurrentStructureNode(null);
      } catch (error: any) {
        setCurrentFileLogging([new LogEntry(new SourceReference(new SourceFile("parsing"), 1, 1), null, true, "Parsing error occurred:" + error.stack)]);
        setNodes([]);
        setParserLogging(null);
        setStructure([]);
        setCurrentStructureNode(null);
      }
    } else {
      setCurrentFileLogging([]);
      setNodes([]);
      setStructure([]);
      setCurrentStructureNode(null);
      setParserLogging(null);
    }
  }, [currentFileCode]);

  useEffect(() => {
    if (currentFile == null || nodes == null || isLoading(nodes)) return;
    if (parserLogging == null || isLoading(parserLogging)) return;
    runScenarios(currentFile.name, nodes, parserLogging, setTestingLogging);
  }, [structure])

  return <Provider value={value}>{children}</Provider>;
};