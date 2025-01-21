import React, {useState} from 'react';
import {CircularProgress, styled} from "@mui/material";
import {useContext} from "../../context/editorContext";
import {isLoading} from "../../context/loading";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import {SpecificationsLogEntry} from "lexy/dist/specifications/specificationRunnerContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ListItemIcon from "@mui/material/ListItemIcon";
import Stack from "@mui/material/Stack";

const LoggingList = styled(List)`
  font-family: Menlo, Monaco, "Courier New", monospace;
  font-size: 12px;
`;

const NoPaddingListItemButton = styled(ListItemButton)`
  padding: 2px;
`;

const NoPaddingListItemIcon = styled(ListItemIcon)`
  padding: 0;
  min-width: 30px
`;

interface LogItemProps {
  entry: SpecificationsLogEntry
}

function LogItem(props: LogItemProps) {
  const colorStyle = props.entry.isError ? {color: 'red'} : props.entry.node != null ? {color: 'green'} : {};
  const [open, setOpen] = useState(false);

  return <ListItem disablePadding>
    <Stack>
      <NoPaddingListItemButton style={colorStyle}>
        <NoPaddingListItemIcon onClick={() => setOpen(!open)}>
          {props.entry.errors == null || props.entry.errors.length === 0 ? <></>
            : open ? <KeyboardArrowDownIcon fontSize="small"/> : <KeyboardArrowRightIcon fontSize="small"/>}
        </NoPaddingListItemIcon>
        {props.entry.message}
      </NoPaddingListItemButton>
      {props.entry.errors != null && open ? <List>
        {props.entry.errors.map((log, index) => <ListItem disablePadding key={index}>{log}</ListItem>)}
      </List> : <></>}
    </Stack>
  </ListItem>;
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
