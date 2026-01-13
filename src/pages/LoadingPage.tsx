import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import {styled} from '@mui/material/styles';
import {Box, CircularProgress} from "@mui/material";

const FullAreaBox = styled(Box)`
  height: calc(100% - 64px);
  padding: 8px;
`;

const FullAreaPaper = styled(Paper)`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function LoadingPage() {
  return (
    <FullAreaBox>
      <FullAreaPaper>
        <Grid
          container
          direction="row"
          alignItems="center">
          <Grid>
            <CircularProgress size={200} />
          </Grid>
        </Grid>
      </FullAreaPaper>
    </FullAreaBox>
  );
}

export default LoadingPage;
