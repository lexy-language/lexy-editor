import createContext from "./createContext"
import React, {useEffect, useState} from 'react';
import {getFileDetails, getProjectFiles, ProjectFile, ProjectFileDetails, ProjectFolder} from "../api/project";
import {parseFile} from "../api/parser";
import {isLoading, Loading} from "./loading";
import {IParserLogger, LogEntry} from "lexy/dist/parser/parserLogger";
import {createStructure, StructureNode} from "./structure";
import {TreeNodeState} from "./treeNodeState";
import {ExecuteFunctionState} from "./executeFunctionState";
import {SourceReference} from "lexy/dist/parser/sourceReference";
import {SourceFile} from "lexy/dist/parser/sourceFile";
import {firstOrDefault, where} from "lexy/dist/infrastructure/enumerableExtensions";
import {runScenarios} from "./runScenarios";
import {WebFileSystem} from "./webFileSystem";
import {ProjectState} from "./projectState";
import {SpecificationsLogEntry} from "lexy/dist/specifications/specificationsLogEntry";
import {ExecutionLoggingState} from "./executionLoggingState";
import {RootNodeList} from "lexy/dist/language/rootNodeList";
import {LayoutState} from "./layoutState";
import {getLocalStorageCode, setLocalStorageCode} from "../api/codeStorage";

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

  testingLogging: ReadonlyArray<SpecificationsLogEntry> | Loading;
  setTestingLogging: React.Dispatch<React.SetStateAction<ReadonlyArray<SpecificationsLogEntry> | Loading>>;

  nodes: RootNodeList | Loading;
  setNodes: React.Dispatch<React.SetStateAction<RootNodeList | Loading>>;

  structure: Array<StructureNode> | null;
  setStructure: React.Dispatch<React.SetStateAction<Array<StructureNode> | null>>;

  currentStructureNode: StructureNode | null;
  setCurrentStructureNode: React.Dispatch<React.SetStateAction<StructureNode | null>>;

  structureTreeState: TreeNodeState;
  setStructureTreeState: React.Dispatch<React.SetStateAction<TreeNodeState>>;

  executeFunction: ExecuteFunctionState;
  setExecuteFunction: React.Dispatch<React.SetStateAction<ExecuteFunctionState>>;

  executionLoggingTreeState: TreeNodeState;
  setExecutionLoggingTreeState: React.Dispatch<React.SetStateAction<TreeNodeState>>;

  executionLogging: ExecutionLoggingState;
  setExecutionLogging: React.Dispatch<React.SetStateAction<ExecutionLoggingState>>;

  editorPosition: EditorPosition | null;
  setEditorPosition: React.Dispatch<React.SetStateAction<EditorPosition | null>>;

  layout: LayoutState;
  setLayout: React.Dispatch<React.SetStateAction<LayoutState>>;
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
  const [testingLogging, setTestingLogging] = useState<ReadonlyArray<SpecificationsLogEntry> | Loading>([]);
  const [parserLogging, setParserLogging] = useState<IParserLogger | null | Loading>(null);
  const [nodes, setNodes] = useState<RootNodeList | Loading>(new RootNodeList([]));

  const [structure, setStructure] = useState<Array<StructureNode> | null>(null);
  const [currentStructureNode, setCurrentStructureNode] = useState<StructureNode | null>(null);
  const [structureTreeState, setStructureTreeState] = useState<TreeNodeState>(new TreeNodeState());

  const [executeFunction, setExecuteFunction] = useState<ExecuteFunctionState>(new ExecuteFunctionState());

  const [executionLoggingTreeState, setExecutionLoggingTreeState] = useState<TreeNodeState>(new TreeNodeState());
  const [executionLogging, setExecutionLogging] = useState<ExecutionLoggingState>(new ExecutionLoggingState());

  const [editorPosition, setEditorPosition] = useState<EditorPosition | null>(null);

  const [layout, setLayout] = useState(LayoutState.defaultState());

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

    executionLoggingTreeState, setExecutionLoggingTreeState,
    structureTreeState, setStructureTreeState,

    executeFunction, setExecuteFunction,
    executionLogging, setExecutionLogging,

    editorPosition, setEditorPosition,

    layout, setLayout,
  };

  function openIntroductionFoldersAndSelectFirstFile(data: ProjectFolder): {tree: TreeNodeState, file: ProjectFile | null}  {
    let tree = new TreeNodeState();
    tree = tree.setOpen([data.name], true)
    let file: ProjectFile | null = null;
    for (const folder of data.folders) {
      if (folder.name !== "Introduction") continue;
      tree = tree.setOpen([data.name, folder.name], true)
      if (file === null) {
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

        //hack: load all code for all files in the project
        //this works only when using the embedded lexy-language file (see api/project)
        //this should be async in the background once working with an api
        //pre loading of files in necessary in case files are included using the "include" keyword (see WebFileSystem)
        let currentProjectState = currentProject;
        function addCode(parent: ProjectFolder) {
          for (const file of parent.files) {
            let code = (file as ProjectFileDetails).code;
            if (code) {
              currentProjectState = currentProjectState.setFile(file.identifier, code);
            }
          }
          for (const folder of parent.folders) {
            addCode(folder);
          }
        }

        addCode(data);
        setCurrentProject(currentProjectState);
      })
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProject.name]);

  useEffect(() => {
    function emptyCurrentFileState() {
      setNodes(new RootNodeList());
      setStructure([]);
      setParserLogging(null);
      setStructure([]);
      setCurrentStructureNode(null);
    }

    function errorOrSuccessful(logging: Array<LogEntry>, elapsed: number) {
      const fileName = !isLoading(currentFileCode) && currentFileCode?.name !== undefined ? currentFileCode.name : "untitled";
      const errors = where(logging, entry => entry.isError);
      if (errors.length === 0) {
        return [new LogEntry(new SourceReference(new SourceFile(fileName), 1, 1), null, false, `Compilation successful: ${fileName} (${elapsed}ms)`)];
      }
      errors.push(new LogEntry(new SourceReference(new SourceFile(fileName), 1, 1), null, false, `Compilation failed: ${fileName} (${elapsed}ms)`));
      return errors;
    }

    if (!!currentFileCode && !isLoading(currentFileCode)) {
      if (currentFileCode.source === "editor") {
        setLocalStorageCode(currentFileCode.identifier, currentFileCode.code)
      }

      try {
        const currentFolder = currentFileCode.identifier.split("|");
        currentFolder.splice(currentFolder.length - 1, 1)
        const fileSystem = new WebFileSystem(currentFolder, currentProject);
        const {logging, nodes, logger, elapsed} = parseFile(currentFileCode.name, currentFileCode.code, fileSystem);
        setCurrentFileLogging(errorOrSuccessful(logging, elapsed));
        setNodes(nodes);
        setParserLogging(logger);
        setStructure(createStructure(nodes.asArray()));
        setCurrentStructureNode(null);
      } catch (error: any) {
        setCurrentFileLogging([new LogEntry(new SourceReference(new SourceFile("parsing"), 1, 1), null, true, "Parsing error occurred:" + error.stack)]);
        emptyCurrentFileState();
      }
    } else {
      setCurrentFileLogging([]);
      emptyCurrentFileState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFileCode]);


  useEffect(() => {

    function setCodeFile(data: ProjectFileDetails) {
      let currentFileCode = {
        code: data.code,
        identifier: data.identifier,
        name: data.name,
        source: "state"
      };
      setCurrentFileCode(currentFileCode);
      setCurrentProject(state => state.setFile(currentFileCode.identifier, currentFileCode.code));
    }

    if (!currentFile) {
      setCurrentFileCode(null);
      return;
    }
    setExecuteFunction(executeFunction => executeFunction.reset());
    setExecutionLogging(executionLogging => executionLogging.reset());

    const codeFromCache = currentProject.file(currentFile.identifier);
    if (codeFromCache) {
      setCodeFile({
        code: codeFromCache,
        identifier: currentFile.identifier,
        name: currentFile.name
      });
      return;
    }

    const fromLocalStorage = getLocalStorageCode(currentFile.identifier);
    if (fromLocalStorage) {
      setCodeFile({
        code: fromLocalStorage,
        identifier: currentFile.identifier,
        name: currentFile.name,
      });
      return;
    }

    getFileDetails(currentProject.name, currentFile.identifier)
      .then(data => setCodeFile(data))
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProject.name, currentFile]);

  useEffect(() => {
    if (currentFile === null || nodes === null || isLoading(nodes)) return;
    if (parserLogging === null || isLoading(parserLogging)) return;
    runScenarios(currentFile.name, nodes.asArray(), parserLogging, setTestingLogging);
  }, [structure, currentFile, nodes, parserLogging])

  useEffect(() => {
    setExecuteFunction(executeFunction => executeFunction.reset());
  }, [currentStructureNode])

  return <Provider value={value}>
    {children}
  </Provider>;
};