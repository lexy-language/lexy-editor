import React from "react";
import {styled} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ListItemButton from "@mui/material/ListItemButton";
import {LogVariables} from "lexy/dist/runTime/executionContext";
import Stack from "@mui/material/Stack";
import Variables from "./Variables";
import {ExecutionLogModel} from "../../context/compilation/executionLogModel";
import {CompilationContextState, useCompilationContext} from "../../context/compilation/context";

const indentValue = 16;

const NoPaddingListItemButton = styled(ListItemButton)`
  padding: 0;
`;

const NoPaddingListItemIcon = styled(ListItemIcon)`
  padding: 0;
  min-width: 30px
`;

const TopVariables = styled(Variables)`
  margin-bottom: 24px
`;

const FullWidthStack = styled(Stack)`
  flex-grow: 1;
`;

const LogListItem = styled(ListItem)``;

const VariablesListItem = styled(ListItem)`
  color: darkgrey;
`;

type TreeNodeProps = {
  entry: ExecutionLogModel,
  indent: number,
  parent: Array<string>,
  index: number
}

export function LogEntry(props: TreeNodeProps) {

  function hasVariables(variables: LogVariables | null) {
    return variables !== null && Object.keys(variables).length > 0;
  }

  function renderVariablesValues(variablesLeftMargin: number) {
    return <ListItem disablePadding style={indent > 0 ? ({paddingLeft: variablesLeftMargin + 'px'}) : ({})}>
      <FullWidthStack>
        {!hasVariables(entry.readVariables) ? <></>
          : <TopVariables values={entry.readVariables}/>}
        {!hasVariables(entry.writeVariables) ? <></>
          : <Variables values={entry.writeVariables}/>}
      </FullWidthStack>
    </ListItem>;
  }

  function renderVariables() {
    if (isSystemVariables) {
      if (!openChildren) return <></>;
      return renderVariablesValues((indentValue * indent) + 30);
    }

    if (!showVariables) return <></>;
    const variablesLeftMargin = (indentValue * indent) + 60;
    return <>
      <VariablesListItem disablePadding>
          <NoPaddingListItemButton onClick={() => setOpenVariables(!openVariables)}
                                   style={indent > 0 ? ({paddingLeft: ((indentValue * indent) + 30) + 'px'}) : ({})}>
            <NoPaddingListItemIcon>
              {openVariables ? <KeyboardArrowDownIcon fontSize="small"/> : <KeyboardArrowRightIcon fontSize="small"/>}
            </NoPaddingListItemIcon>
            Variables
          </NoPaddingListItemButton>
        </VariablesListItem>
      {!openVariables ? <></> : renderVariablesValues(variablesLeftMargin)}
    </>
  }

  function renderChildren() {
    const children = [];
    if (openChildren && entry.entries) {
      for (let index = 0; index < entry.entries.length; index++) {
        const childEntry: ExecutionLogModel = entry.entries[index];
        if (!!childEntry) {
          children.push(<LogEntry entry={childEntry} indent={indent + 1} key={index} parent={path} index={index}/>);
        }
      }
    }
    return children;
  }

  const {entry, indent, parent, index} = props;
  const path = [...parent, index.toString()];
  const pathVariables = [...parent, index.toString(), "var"];
  const {executionLoggingTreeState, setExecutionLoggingTreeState}: CompilationContextState = useCompilationContext();

  const openChildren = executionLoggingTreeState.isOpen(path);
  const openVariables = executionLoggingTreeState.isOpen(pathVariables);
  const isSystemVariables = entry.message === "Parameters" || entry.message === "Results";
  const showVariables = hasVariables(entry.readVariables) || hasVariables(entry.writeVariables);
  const hasChildren = entry.entries.length > 0 || (isSystemVariables && showVariables);
  const isFunction = entry.message.startsWith("Execute:");

  const setOpenChildren = (value: boolean) => setExecutionLoggingTreeState(executionLoggingTreeState.setOpen(path, value));
  const setOpenVariables = (value: boolean) => setExecutionLoggingTreeState(executionLoggingTreeState.setOpen(pathVariables, value));

  return (isSystemVariables && !showVariables ? <></> :
    <>
      <LogListItem disablePadding style={isSystemVariables ? {color: 'darkgray'} : {}}>
        <NoPaddingListItemButton onClick={() => setOpenChildren(!openChildren)}
                                 style={indent > 0 ? ({paddingLeft: (indentValue * indent) + 'px'}) : ({})}>
          <NoPaddingListItemIcon>
            {!hasChildren ? <></>
              : openChildren ? <KeyboardArrowDownIcon fontSize="small"/> : <KeyboardArrowRightIcon fontSize="small"/>}
          </NoPaddingListItemIcon>
          <ListItemText primaryTypographyProps={isFunction ? {fontWeight: 600} : {}}>{entry.message}</ListItemText>
        </NoPaddingListItemButton>
      </LogListItem>
      {renderVariables()}
      {renderChildren()}
    </>
  );
}
