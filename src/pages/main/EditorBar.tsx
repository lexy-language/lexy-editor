import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {MenuItem} from "@mui/material";
import {useNavigate} from "react-router";
import IntroductionNavigation from "./IntroductionNavigation";

export default function EditorBar() {

  const pages = ['File', 'Editor'];
  const navigate = useNavigate();

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          {pages.map((page) => (
            <MenuItem key={page} onClick={() => {
              navigate(page.toLowerCase());
            }}>
              <Typography sx={{textAlign: 'center'}}>{page}</Typography>
            </MenuItem>
          ))}
          <Box sx={{flexGrow: 1}}/>
          <IntroductionNavigation />
        </Toolbar>
      </AppBar>
    </Box>
  );
}