import React, {useState} from 'react';
import {CircularProgress, Link, styled} from "@mui/material";
import {MainContainer} from "../../context/layoutState";
import {useContext} from "../../context/editorContext";
import {isLoading} from "../../context/loading";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import {SpecificationsLogEntry} from "lexy/dist/specifications/specificationRunnerContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ListItemIcon from "@mui/material/ListItemIcon";

const LoggingList = styled(List)`
  font-family: Menlo, Monaco, "Courier New", monospace;
  font-size: 12px;
`;

const NoPaddingListItemButton = styled(ListItemButton)`
  padding: 2px;
  width: 30px;
`;

const NoPaddingListItemIcon = styled(ListItemIcon)`
  padding: 0;
  min-width: 30px
`;

const LogText = styled('div')`
  flex-grow: 1;
`;

const Separator = styled('div')`
  width: 12px;
`;

interface LogItemProps {
  entry: SpecificationsLogEntry
}

function LogItem(props: LogItemProps) {
  const {entry} = props;
  const colorStyle = entry.isError ? {color: 'red'} : entry.node !== null ? {color: 'green'} : {};
  const {
    executionLogging,
    setExecutionLogging,
    setEditorPosition,
    setLayout,
    currentFile
  } = useContext();
  const [open, setOpen] = useState(false);

  const showExecutionLogging = () => {
    if (!entry.executionLogging) return;
    setExecutionLogging(executionLogging.setCurrent(entry.executionLogging))
    setLayout(layout => layout.setMainContainer(MainContainer.ExecutionLogging));
  }

  const showCode = () => {
    if (!entry.reference)  return;
    if (currentFile !== null && !isLoading(currentFile) && currentFile.name !== entry.reference.file.fileName) {
      //todo navigate to different file: logEntry.reference.file.fileName
      return;
    }
    setEditorPosition({
      lineNumber: entry.reference.lineNumber,
      column: entry.reference.characterNumber,
      source: "state"
    });
    setLayout(layout => layout.setMainContainer(MainContainer.Source));
  }

  return <>
    <ListItem disablePadding style={colorStyle}>
      <NoPaddingListItemButton style={{flexGrow: 0}}>
        <NoPaddingListItemIcon onClick={() => setOpen(!open)}>
          {entry.errors === null || entry.errors.length === 0 ? <></>
            : open ? <KeyboardArrowDownIcon fontSize="small"/> : <KeyboardArrowRightIcon fontSize="small"/>}
        </NoPaddingListItemIcon>
      </NoPaddingListItemButton>
      <LogText>{entry.message}</LogText>
      {!entry.executionLogging ? <></>
        : <Link style={{ cursor: 'pointer' }} onClick={showExecutionLogging}>view execution logging</Link>}
      <Separator />
      {!entry.reference ? <></>
        : <Link style={{ cursor: 'pointer' }} onClick={showCode}>view code</Link>}
    </ListItem>
    {entry.errors !== null && open ? <List>
      {entry.errors.map((log, index) => <ListItem disablePadding key={index}>{log}</ListItem>)}
    </List> : <></>}
  </>;
}

function Testing() {

  const {
    testingLogging,
  } = useContext();

  if (isLoading(testingLogging)) {
    return <CircularProgress/>;
  }

  const logs = testingLogging.map((entry, index) => <LogItem entry={entry} key={index}/>);

  return <LoggingList disablePadding>{logs}</LoggingList>;
}

export default Testing;
