import React from 'react';
import {CircularProgress, styled} from "@mui/material";
import {useContext} from "../../context/editorContext";
import {isLoading} from "../../context/loading";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {where} from "lexy/dist/infrastructure/enumerableExtensions";
import ListItemButton from "@mui/material/ListItemButton";
import {LogEntry} from "lexy/dist/parser/parserLogger";

const NoPaddingListItemButton = styled(ListItemButton)`
  padding: 2px;
`;

const LoggingList = styled(List)`
  font-family: Menlo, Monaco, "Courier New", monospace;
  font-size: 12px;
`;

interface LogItemProps {
  logEntry: LogEntry
}

function LogItem(props: LogItemProps) {

  const {
    setEditorPosition,
    currentFile
  } = useContext();
  const {logEntry} = props;

  function setPosition() {
    if (currentFile != null && !isLoading(currentFile) && currentFile.name != logEntry.reference.file.fileName) {
      //todo navigate to different file: logEntry.reference.file.fileName
      return;
    }
    setEditorPosition({
      lineNumber: logEntry.reference.lineNumber,
      column: logEntry.reference.characterNumber,
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

  const {
    currentFileLogging,
  } = useContext();

  if (isLoading(currentFileLogging)) {
    return <CircularProgress/>;
  }

  const errors = where(currentFileLogging, entry => entry.isError);
  const sorted = errors.sort((left, right) => left.sortIndex < right.sortIndex ? -1 : 1);
  const logs = sorted.map((entry, index) => <LogItem logEntry={entry} key={index} /> );

  return <LoggingList disablePadding>{logs}</LoggingList>;
}

export default Logging;
