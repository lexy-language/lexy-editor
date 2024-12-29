import React from 'react';
import {useContext, Loading} from '../context/editorContext';
import {ProjectFile, ProjectFileDetails, ProjectFolder} from "../api/project";
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

const indentValue = 16;
const fileIndentValue = 30;

const NoPaddingListItemButton = styled(ListItemButton)`
  padding: 0;
`;

const NoPaddingListItemIcon = styled(ListItemIcon)`
  padding: 0;
  min-width: 30px
`;

function FolderItem(props: { folder: ProjectFolder, currentFile: ProjectFile | null, indent: number, setCurrentFile: (file: ProjectFile | null) => void }) {

  const {folder, currentFile, indent, setCurrentFile} = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <ListItem disablePadding>
        <NoPaddingListItemButton onClick={() => setOpen(!open)}
                                 style={indent > 0 ? ({marginLeft: (indentValue * indent) + 'px'}) : ({})}>
          <NoPaddingListItemIcon>
            {open ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>}
          </NoPaddingListItemIcon>
          <NoPaddingListItemIcon>
            <FolderIcon/>
          </NoPaddingListItemIcon>
          <ListItemText primary={folder.name}/>
        </NoPaddingListItemButton>
      </ListItem>
      {open && folder.folders ? folder.folders.map(folder => <FolderItem key={folder.name} folder={folder}
                                                                         indent={indent + 1}
                                                                         currentFile={currentFile}
                                                                         setCurrentFile={setCurrentFile} />) : []}
      {open && folder.files ? folder.files.map(file => <FileItem key={file.name} file={file}
                                                                 indent={indent + 1}
                                                                 currentFile={currentFile}
                                                                 setCurrentFile={setCurrentFile} />) : []}
    </>
  );
}

function FileItem(props: { file: ProjectFile, currentFile: ProjectFile | null, indent: number, setCurrentFile: (file: ProjectFile) => void }) {

  const {file, currentFile, indent, setCurrentFile} = props;

  return (
    <ListItem disablePadding onClick={() => setCurrentFile(file)} style={currentFile == file ? {background: '#EEE'} : {}}>
      <NoPaddingListItemButton
        style={indent > 0 ? ({marginLeft: fileIndentValue + (indentValue * indent) + 'px'}) : ({})}>
        <NoPaddingListItemIcon>
          <InsertDriveFileIcon/>
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
    if (projectFiles == null) {
      return <Box>No project loaded.</Box>;
    }
    if (projectFiles instanceof Loading) {
      return <CircularProgress/>;
    }
    return <FolderItem folder={projectFiles as ProjectFolder} indent={0} currentFile={currentFile} setCurrentFile={setCurrentFile}/>;
  }

  return (
    <List disablePadding>
      {content()}
    </List>
  );
}

export default Explorer;
