import React, {FunctionComponent} from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import {makeStyles, styled} from '@mui/material/styles';
import {Edit} from "@mui/icons-material";
import {CircularProgress, MenuItem, MenuList} from "@mui/material";
import {Loading, useContext} from "../context/editorContext";


function Logging() {

  const {
    currentFileErrors,
  } = useContext();

  if (currentFileErrors.isLoading) {
    return <CircularProgress/>;
  }
  const logs = currentFileErrors.map(log => <div>{log}</div>);
  return <div>{logs}</div>;
}

export default Logging;
