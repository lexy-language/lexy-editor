import React, {useEffect} from 'react';
import List from "@mui/material/List";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import {isLoading} from "../../context/loading";
import {LogEntry} from "./LogEntry";
import {ProjectContextState, useProjectContext} from "../../context/project/context";
import {CompilationContextState, useCompilationContext} from "../../context/compilation/context";

function ExecutionLogging() {

  const {executionLogging, setExecutionLoggingTreeState}: CompilationContextState = useCompilationContext();
  const {currentFile}: ProjectContextState = useProjectContext();

  useEffect(() => {
    setExecutionLoggingTreeState(state => {
      return state.reset().setOpen(["0"], true)
    });
  }, [currentFile?.identifier, setExecutionLoggingTreeState])

  function content() {

    if (executionLogging === null) {
      return <Box>No execution logging.</Box>;
    }

    if (isLoading(executionLogging)) {
      return <CircularProgress/>;
    }

    const result = [];
    for (let index = 0 ; index < executionLogging.logging.length ; index ++) {
      const entry = executionLogging.logging[index];
      if (entry !== null) {
        result.push(<LogEntry entry={entry} indent={0} key={index} parent={[]} index={index}/>);
      }
    }
    return result;
  }

  return (
    <List disablePadding>
      {content()}
    </List>
  );
}

export default ExecutionLogging;
