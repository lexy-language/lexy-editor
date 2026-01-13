import React, {useState} from 'react';
import {CircularProgress, Link, styled} from "@mui/material";
import {MainContainer} from "../../context/editor/layoutState";
import {isLoading} from "../../context/loading";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ListItemIcon from "@mui/material/ListItemIcon";
import {ProjectContextState, useProjectContext} from "../../context/project/context";
import {useEditorContext} from "../../context/editor/context";
import {CompilationContextState, useCompilationContext} from "../../context/compilation/context";
import {SpecificationsLogModel} from "../../context/compilation/specificationsLogModel";
import Box from "@mui/material/Box";

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

const FullAreaBox = styled(Box)`
  padding: 16px;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface LogItemProps {
  entry: SpecificationsLogModel
}

function LogItem(props: LogItemProps) {

  const {entry} = props;
  const colorStyle = entry.isError ? {color: 'red'} : entry.nodeName !== null ? {color: 'green'} : {};
  const {setEditorPosition, setLayout} = useEditorContext();
  const {currentFile}: ProjectContextState = useProjectContext();
  const {executionLogging, setExecutionLogging}: CompilationContextState = useCompilationContext();

  const [open, setOpen] = useState(false);

  const showExecutionLogging = () => {
    if (!entry.executionLogging) return;
    setExecutionLogging(executionLogging.setCurrent(entry.executionLogging))
    setLayout(layout => layout.setMainContainer(MainContainer.ExecutionLogging));
  }

  const showCode = () => {
    if (!entry.fileName)  return;
    if (currentFile !== null && !isLoading(currentFile) && currentFile.name != entry.fileName) {
      //todo navigate to different file: logEntry.fileName
      return;
    }
    if (entry.lineNumber && entry.characterNumber) {
      setEditorPosition({
        lineNumber: entry.lineNumber,
        column: entry.characterNumber,
        source: "state"
      });
    }
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
      {!entry.fileName ? <></>
        : <Link style={{ cursor: 'pointer' }} onClick={showCode}>view code</Link>}
    </ListItem>
    {entry.errors !== null && open ? <List>
      {entry.errors.map((log, index) => <ListItem disablePadding key={index}>{log}</ListItem>)}
    </List> : <></>}
  </>;
}

function Testing() {

  const {testingLogging}: CompilationContextState = useCompilationContext();

  if (isLoading(testingLogging)) {
    return (
      <FullAreaBox><CircularProgress/></FullAreaBox>
    );
  }

  const logs = testingLogging.map((entry, index) => <LogItem entry={entry} key={index}/>);

  return (
    <LoggingList disablePadding>{logs}</LoggingList>
  );
}

export default Testing;
