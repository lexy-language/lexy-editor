import React, {FunctionComponent} from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import {makeStyles, styled} from '@mui/material/styles';
import {Edit} from "@mui/icons-material";
import {MenuItem, MenuList} from "@mui/material";

const GridFullHeight = styled(Grid)`
  height: calc(100% - 264px);
`;

const GridItem = styled(Grid)`
  height: 100%;
  padding: 8px;
`;
function FileExamples() {

  return (
    <div>FileExamples</div>
  );
}

export default FileExamples;
