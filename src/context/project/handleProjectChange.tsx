import {getProjectFiles, ProjectFile, ProjectFileDetails, ProjectFolder} from "../../api/project";
import {TreeNodeState} from "../treeNodeState";
import {nothing, Nothing} from "../../infrastructure/nothing";
import {firstOrDefault} from "lexy/dist/infrastructure/arrayFunctions";
import React, {useEffect} from "react";
import {useCodeFileStorage} from "../../api/codeStorage";
import {ComponentProps} from "../../infrastructure/componentProps";
import {useProjectContext} from "./context";

export function HandleProjectChange({children}: ComponentProps) {

  const {
    currentProject,
    setCurrentProject,
    setCurrentFile,
    setProjectFiles,
    setProjectFilesTreeState,
  } = useProjectContext();
  const {storeCodeFile} = useCodeFileStorage();

  function openIntroductionFoldersAndSelectFirstFile(projectFolder: ProjectFolder): { tree: TreeNodeState, file: ProjectFile | Nothing } {
    let tree = new TreeNodeState();
    tree = tree.setOpen([projectFolder.name], true)
    let file: ProjectFile | Nothing = nothing;
    for (const folder of projectFolder.folders) {
      if (folder.name !== "Introduction") continue;
      tree = tree.setOpen([projectFolder.name, folder.name], true)
      if (file === null) {
        file = firstOrDefault(folder.files);
      }
    }
    return {tree: tree, file: file};
  }

  useEffect(() => {

    function loadProject() {
      getProjectFiles(currentProject.name)
        .then(data => {
          //hack: load all code for all files in the project
          //this works only when using the embedded lexy-language file (see api/project)
          //this should be async in the background once working with an api
          //pre loading of files in necessary in case files are included using the "include" keyword (see WebFileSystem)
          let currentProjectState = currentProject;

          function addCode(parent: ProjectFolder) {
            for (const file of parent.files) {
              let code = (file as ProjectFileDetails).code;
              storeCodeFile(file.identifier, code, false)
                .then(stored => {
                  if (stored) {
                    console.log("file stored: " + file.identifier);
                  }
                });
            }
            for (const folder of parent.folders) {
              addCode(folder);
            }
          }

          setProjectFiles(data);
          const state = openIntroductionFoldersAndSelectFirstFile(data);
          setProjectFilesTreeState(state.tree)
          setCurrentFile(state.file)
          setCurrentProject(currentProjectState);
          addCode(data);
        })
        .catch(console.error);
    }

    loadProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProject.name]);

  return <>{children}</>;
}
