import React from 'react';
import {CircularProgress, styled} from "@mui/material";
import {useContext} from "../../context/editorContext";
import {isLoading} from "../../context/loading";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import {MemoryLogEntry} from "../../api/loggers";
import {LogLevel} from "lexy";

const NoPaddingListItemButton = styled(ListItemButton)`
  padding: 2px;
`;

interface LogItemProps {
  entry: MemoryLogEntry
}

function LogItem(props: LogItemProps) {
  return <ListItem disablePadding>
    <NoPaddingListItemButton style={props.entry.level == LogLevel.Error ? ({color: 'red'}) : ({})} >
      {props.entry.message}
    </NoPaddingListItemButton>
  </ListItem>;
}

function Testing() {

  const {
    testingLogging,
  } = useContext();

  if (isLoading(testingLogging)) {
    return <CircularProgress/>;
  }

  const logs = testingLogging.map((entry, index) => <LogItem entry={entry} key={index} /> );

  return <List disablePadding>{logs}</List>;
}

export default Testing;
