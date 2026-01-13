import React, {useState} from 'react';
import {ProjectFile, ProjectFolder} from "../../api/project";
import {Loading} from "../loading";
import {TreeNodeState} from "../treeNodeState";
import {ProjectState} from "./projectState";
import createContext from "../createContext";
import {ComponentProps} from "../../infrastructure/componentProps";
import {nothing, Nothing} from "../../infrastructure/nothing";
import {LogModel} from "./logModel";
import {NodeModel} from "./nodeModel";
import {ProjectFileCode} from "./projectFileCode";
import {HandleFileChange} from "./handleFileChange";
import {HandleProjectChange} from "./handleProjectChange";
import {HandleNodeChange} from "./handleNodeChange";

export interface ProjectContextState {

  currentProject: ProjectState;
  setCurrentProject: React.Dispatch<React.SetStateAction<ProjectState>>;

  projectFiles: ProjectFolder | Nothing | Loading;
  setProjectFiles: React.Dispatch<React.SetStateAction<ProjectFolder | Nothing | Loading>>;

  projectFilesTreeState: TreeNodeState;
  setProjectFilesTreeState: React.Dispatch<React.SetStateAction<TreeNodeState>>;

  currentFile: ProjectFile | Nothing;
  setCurrentFile: React.Dispatch<React.SetStateAction<ProjectFile | Nothing>>;

  currentFileCode: ProjectFileCode | Nothing | Loading;
  setCurrentFileCode: React.Dispatch<React.SetStateAction<ProjectFileCode | Nothing | Loading>>;

  currentFileLogging: readonly LogModel[] | Loading;
  setCurrentFileLogging: React.Dispatch<React.SetStateAction<readonly LogModel[] | Loading>>;

  nodes: readonly NodeModel[] | Loading;
  setNodes: React.Dispatch<React.SetStateAction<readonly NodeModel[] | Loading>>;

  currentNode: NodeModel | Nothing;
  setCurrentNode: React.Dispatch<React.SetStateAction<NodeModel | Nothing>>;

  nodeTreeState: TreeNodeState;
  setNodeTreeState: React.Dispatch<React.SetStateAction<TreeNodeState>>;
}

export const [useProjectContext, Provider] = createContext<ProjectContextState>();

export const ProjectContextProvider = ({children}: ComponentProps) => {

  const [currentProject, setCurrentProject] = useState(new ProjectState());
  const [projectFiles, setProjectFiles] = useState<ProjectFolder | Nothing | Loading>(nothing);
  const [projectFilesTreeState, setProjectFilesTreeState] = useState<TreeNodeState>(new TreeNodeState());

  const [currentFile, setCurrentFile] = useState<ProjectFile | Nothing>(nothing);
  const [currentFileCode, setCurrentFileCode] = useState<ProjectFileCode | Nothing | Loading>(nothing);

  const [currentFileLogging, setCurrentFileLogging] = useState<readonly LogModel[] | Loading>([]);

  const [nodes, setNodes] = useState<readonly NodeModel[] | Loading>([]);
  const [structure, setStructure] = useState<readonly NodeModel[] | Nothing>(nothing);
  const [currentNode, setCurrentNode] = useState<NodeModel | Nothing>(nothing);
  const [nodeTreeState, setNodeTreeState] = useState<TreeNodeState>(new TreeNodeState());

  const state = {
    currentProject, setCurrentProject,
    currentFile, setCurrentFile,
    currentFileCode, setCurrentFileCode,
    currentFileLogging, setCurrentFileLogging,

    projectFiles, setProjectFiles,
    projectFilesTreeState, setProjectFilesTreeState,

    nodeTreeState, setNodeTreeState,

    nodes, setNodes,
    structure, setStructure,
    currentNode, setCurrentNode,
  };

  return (
    <Provider value={state}>
      {children}
    </Provider>
  );
};

export const ProjectHandlers = [HandleFileChange, HandleProjectChange, HandleNodeChange];
