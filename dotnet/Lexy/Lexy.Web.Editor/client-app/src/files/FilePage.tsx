import React, {FunctionComponent} from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import {makeStyles, styled} from '@mui/material/styles';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import {MenuItem, MenuList} from "@mui/material";
import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";

const GridFullHeight = styled(Grid)`
  height: calc(100% - 64px);
`;

const GridItem = styled(Grid)`
  height: 100%;
  padding: 8px;
`;

const FullHeightPaper = styled(Paper)`
  height: 100%;
`;

function FilePage() {
  const pages = ['Examples', 'New', 'Open'];
  let navigate = useNavigate();
  return (
    <GridFullHeight container>
      <GridItem size={4}>
        <FullHeightPaper>
          <MenuList>
            {pages.map((page) => (
              <MenuItem key={page} onClick={() => {
                navigate('/file/'+ page.toLowerCase());
              }}>
                <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
              </MenuItem>
            ))}
          </MenuList>
        </FullHeightPaper>
      </GridItem>
      <GridItem size={8}>
        <FullHeightPaper>
          <Outlet />
        </FullHeightPaper>
      </GridItem>
    </GridFullHeight>
  );
}

export default FilePage;
