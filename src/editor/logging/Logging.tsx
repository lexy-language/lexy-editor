import React from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import {CircularProgress, styled} from "@mui/material";
import {useEditorContext} from "../../context/editor/context";
import {useProjectContext} from "../../context/project/context";
import {LogModel} from "../../context/project/logModel";
import {isLoading} from "../../context/loading";

const NoPaddingListItemButton = styled(ListItemButton)`
  padding: 2px;
`;

const LoggingList = styled(List)`
  font-family: Menlo, Monaco, "Courier New", monospace;
  font-size: 12px;
`;

interface LogItemProps {
  logEntry: LogModel
}

function LogItem(props: LogItemProps) {

  const {currentFile} = useProjectContext();
  const {setEditorPosition} = useEditorContext();

  const {logEntry} = props;

  function setPosition() {
    if (currentFile !== null && !isLoading(currentFile) && currentFile.name !== logEntry.fileName) {
      //todo navigate to different file: logEntry.fileName
      return;
    }
    setEditorPosition({
      lineNumber: logEntry.lineNumber,
      column: logEntry.characterNumber,
      source: "state"
    })
  }

  return <ListItem disablePadding onClick={setPosition}>
    <NoPaddingListItemButton style={logEntry.isError ? ({color: 'red'}) : ({})} >
      {logEntry.message}
    </NoPaddingListItemButton>
  </ListItem>;
}

function Logging() {

  const {currentFileLogging} = useProjectContext();

  if (isLoading(currentFileLogging)) {
    return <CircularProgress/>;
  }

  const sorted = [...currentFileLogging].sort((left, right) => left.sortIndex < right.sortIndex ? -1 : 1);
  const logs = sorted.map((entry, index) => <LogItem logEntry={entry} key={index} /> );

  return <LoggingList disablePadding>{logs}</LoggingList>;
}

export default Logging;
