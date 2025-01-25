import React from 'react';
import {useContext} from '../../context/editorContext';
import {ProjectFile, ProjectFolder} from "../../api/project";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {CircularProgress, styled} from "@mui/material";
import Box from "@mui/material/Box";
import {isLoading} from "../../context/loading";

const indentValue = 16;
const fileIndentValue = 30;

const NoPaddingListItemButton = styled(ListItemButton)`
  padding: 0;
`;

const NoPaddingListItemIcon = styled(ListItemIcon)`
  padding: 0;
  min-width: 30px
`;

function FolderItem(props: {folder: ProjectFolder, currentFile: ProjectFile | null, indent: number, setCurrentFile: (file: ProjectFile | null) => void, parent: Array<string>}) {

  const {folder, currentFile, indent, setCurrentFile, parent} = props;
  const path = [...parent, folder.name];
  const {projectFilesTreeState, setProjectFilesTreeState} = useContext();
  const open = projectFilesTreeState.isOpen(path);
  const setOpen = (value: boolean) => setProjectFilesTreeState(projectFilesTreeState.setOpen(path, value));

  return (
    <>
      <ListItem disablePadding>
        <NoPaddingListItemButton style={indent > 0 ? ({marginLeft: (indentValue * indent) + 'px'}) : ({})}>
          <NoPaddingListItemIcon onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowDownIcon fontSize={"small"} /> : <KeyboardArrowRightIcon fontSize={"small"} />}
          </NoPaddingListItemIcon>
          <NoPaddingListItemIcon>
            <FolderIcon fontSize={"small"} />
          </NoPaddingListItemIcon>
          <ListItemText primary={folder.name}/>
        </NoPaddingListItemButton>
      </ListItem>
      {open && folder.folders ? folder.folders.map(folder => <FolderItem key={folder.name} folder={folder}
                                                                         indent={indent + 1}
                                                                         currentFile={currentFile}
                                                                         setCurrentFile={setCurrentFile}
                                                                         parent={path} />) : []}
      {open && folder.files ? folder.files.map(file => <FileItem key={file.name} file={file}
                                                                 indent={indent + 1}
                                                                 currentFile={currentFile}
                                                                 setCurrentFile={setCurrentFile} />) : []}
    </>
  );
}

function FileItem(props: {file: ProjectFile, currentFile: ProjectFile | null, indent: number, setCurrentFile: (file: ProjectFile) => void}) {

  const {file, currentFile, indent, setCurrentFile} = props;

  return (
    <ListItem disablePadding onClick={() => setCurrentFile(file)} style={currentFile === file ? {background: '#EEE'} : {}}>
      <NoPaddingListItemButton
        style={indent > 0 ? ({paddingLeft: fileIndentValue + (indentValue * indent) + 'px'}) : ({})}>
        <NoPaddingListItemIcon>
          <InsertDriveFileIcon fontSize={"small"} />
        </NoPaddingListItemIcon>
        <ListItemText primary={file.name}/>
      </NoPaddingListItemButton>
    </ListItem>
  );
}

function Explorer() {

  const {
    projectFiles,
    currentFile,
    setCurrentFile
  } = useContext();

  function content() {
    if (projectFiles === null) {
      return <Box>No project loaded.</Box>;
    }
    if (isLoading(projectFiles)) {
      return <CircularProgress/>;
    }
    return <FolderItem folder={projectFiles as ProjectFolder} indent={0} currentFile={currentFile} setCurrentFile={setCurrentFile} parent={[]}/>;
  }

  return (
    <List disablePadding>
      {content()}
    </List>
  );
}

export default Explorer;
