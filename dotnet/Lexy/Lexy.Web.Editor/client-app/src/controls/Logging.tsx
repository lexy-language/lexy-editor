import React, {FunctionComponent} from 'react';
import {CircularProgress, styled} from "@mui/material";
import {useContext} from "../context/editorContext";
import {isLoading} from "../context/loading";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {where} from "lexy/dist/infrastructure/enumerableExtensions";
import ListItemButton from "@mui/material/ListItemButton";
import {LogEntry} from "lexy/dist/parser/parserLogger";

const NoPaddingListItemButton = styled(ListItemButton)`
  padding: 2px;
`;

interface LogItemProps {
  logEntry: LogEntry
}

function LogItem(props: LogItemProps) {

  const {
    setEditorPosition,
  } = useContext();

  function setPosition() {
    setEditorPosition({
      lineNumber: props.logEntry.reference.lineNumber,
      column: props.logEntry.reference.characterNumber,
      source: "state"
    })
  }

  return <ListItem disablePadding onClick={setPosition}>
    <NoPaddingListItemButton style={props.logEntry.isError ? ({color: 'red'}) : ({})} >
      {props.logEntry.message}
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
  const sorted = errors.sort((left, right) => left.sortIndex - right.sortIndex);
  const logs = sorted.map((entry, index) => <LogItem logEntry={entry} key={index} /> );

  return <List disablePadding>{logs}</List>;
}

export default Logging;
