import * as React from 'react';
import {alpha, IconButton, Menu, MenuItem} from "@mui/material";
import {styled} from "@mui/material/styles";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Stack from "@mui/material/Stack";
import {useEffect, useState} from "react";
import {useContext} from "../context/editorContext";
import {ProjectFile, ProjectFolder} from "../api/project";
import {firstOrDefault} from "lexy/dist/infrastructure/enumerableExtensions";
import {isLoading} from "../context/loading";
import {useNavigate} from "react-router";
import {useLocation } from 'react-router-dom';

const Introduction = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '300px',
}));

const IntroductionFile = styled('div')`
  text-align: center;
  padding: 8px 16px;
  flex-grow: 1;
  cursor: pointer;
`;

type CurrentFileBoxProps = {
  fileIndex: number,
  introductionFiles: ProjectFile[] | null
}

function CurrentFileBox(props: CurrentFileBoxProps) {

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleMenuItemClick = (file: ProjectFile) => () => {
    setCurrentFile(file);
    handleClose();
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const {currentFile, setCurrentFile} = useContext();
  const {fileIndex, introductionFiles} = props;
  const navigate = useNavigate();
  const location = useLocation(); // React Hook

  if (introductionFiles === null || introductionFiles.length === 0) {
    return <IntroductionFile>Introduction not found!</IntroductionFile>;
  }

  function goToIntroduction() {
    if (!introductionFiles || introductionFiles.length === 0) return;
    setCurrentFile(introductionFiles[0]);
    navigate("/editor");
  }

  console.log(location.pathname)
  if (fileIndex < 0 || currentFile === null || location.pathname !== "/editor") {
    return <IntroductionFile onClick={() => goToIntroduction()}>
      Go to introduction...
    </IntroductionFile>;
  }

  const fileMenuItems = introductionFiles.map((value, index) =>
    <MenuItem key={index} onClick={handleMenuItemClick(value)}>{value.name}</MenuItem>)

  return <>
    <IntroductionFile onClick={handleClick}>{currentFile.name}</IntroductionFile>
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}>
      {fileMenuItems}
    </Menu>
  </>;
}

export default function IntroductionNavigation() {

  const {
    projectFiles,
    currentFile,
    setCurrentFile
  } = useContext();

  const [introductionFiles, setIntroductionFiles] = useState<Array<ProjectFile> | null>([]);

  useEffect(() => {
    if (projectFiles === null || isLoading(projectFiles)) return;
    const project = projectFiles as ProjectFolder;
    const introductionFolder = firstOrDefault(project.folders, folder => folder.name === "Introduction");
    if (introductionFolder === null) return;
    setIntroductionFiles(introductionFolder.files);
  }, [projectFiles])

  function previous() {
    if (introductionFiles === null) return;
    setCurrentFile(introductionFiles[fileIndex - 1]);
  }

  function next() {
    if (introductionFiles === null) return;
    setCurrentFile(introductionFiles[fileIndex + 1]);
  }

  const fileIndex = currentFile !== null && introductionFiles !== null ? introductionFiles.indexOf(currentFile) : -1;
  const previousDisabled = fileIndex <= 0;
  const nextDisabled = introductionFiles === null || fileIndex >= introductionFiles.length - 1;

  return <Introduction>
    <Stack direction="row">
      <IconButton size={"small"} color="inherit" disabled={previousDisabled} onClick={previous}>
        <ChevronLeftIcon/>
      </IconButton>
      <CurrentFileBox fileIndex={fileIndex} introductionFiles={introductionFiles}/>
      <IconButton size={"small"} color="inherit" disabled={nextDisabled} onClick={next}>
        <ChevronRightIcon/>
      </IconButton>
    </Stack>
  </Introduction>;
}