import React, {FunctionComponent} from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import {makeStyles, styled} from '@mui/material/styles';
import {Edit} from "@mui/icons-material";

const GridFullHeight = styled(Grid)`
  height: calc(100% - 264px);
  background: blue;
`;

const GridItem = styled(Grid)`
  height: 100%;
  background: yellow;
`;

const ToolPanel = styled(Grid)`
  height: 200px;
  background: grey;
`;

function HomePage() {
  return (
    <GridFullHeight container>
      <GridItem size={12}>
        <Box>Welcome to the Lexy Editor</Box>
      </GridItem>
    </GridFullHeight>
  );
}

export default HomePage;
