import React, {FunctionComponent, useState} from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import {makeStyles, styled} from '@mui/material/styles';
import {Edit} from "@mui/icons-material";
import {Button, ButtonGroup} from "@mui/material";
import {BottomContainer, LeftContainer, MainContainer, useContext} from '../context/EditorPageContext';

import Explorer from '../controls/Explorer';
import Structure from '../controls/Structure';
import SourceEditor from '../controls/SourceEditor';
import RunFunction from '../controls/RunFunction';
import EditTable from '../controls/EditTable';
import Testing from '../controls/Testing';
import Logging from '../controls/Logging';

const GridFullHeight = styled(Grid)`
  height: calc(100% - 264px);
`;

const GridItem = styled(Grid)`
  height: 100%;
  padding: 8px;
`;

const ToolPanel = styled(Grid)`
  height: 200px;
  padding: 8px;
  padding-top: 0px;
`;

const FullHeightPaper = styled(Paper)`
  height: 100%;
  overflow-y: scroll;
  padding: 8px;
`;

const PaperContainer = styled(FullHeightPaper)`
  position: relative;
`;

const LeftContentBox = styled(Box)`
`;

const LeftBottomButtonGroup = styled(ButtonGroup)`
  position: absolute;
  bottom: 0;
  left: 0;
`;



function EditorPage() {
  const {
    leftContainer, setLeftContainer,
    mainContainer, setMainContainer,
    bottomContainer, setBottomContainer
  } = useContext();

  function leftContent() {
    switch (leftContainer) {
      case LeftContainer.Explorer:
        return <Explorer />;
      case LeftContainer.Structure:
        return <Structure />;
    }
  }

  function mainContent() {
    switch (mainContainer) {
      case MainContainer.Source:
        return <SourceEditor />;
      case MainContainer.Run:
        return <RunFunction />;
      case MainContainer.Table:
        return <EditTable />;
    }
  }

  function bottomContent() {
    switch (bottomContainer) {
      case BottomContainer.Testing:
        return <Testing />;
      case BottomContainer.Logging:
        return <Logging />;
    }
  }

  const leftOptions = [
    { Name: 'Explorer', Value: LeftContainer.Explorer },
    { Name: 'Structure', Value: LeftContainer.Structure },
  ];
  const mainOptions = [
    { Name: 'Source Code', Value: MainContainer.Source },
    { Name: 'Run Function', Value: MainContainer.Run },
    { Name: 'Edit Table', Value: MainContainer.Table },
  ];
  const bottomOptions = [
    { Name: 'Compilation Loggig', Value: BottomContainer.Logging },
    { Name: 'Test Logging', Value: BottomContainer.Testing },
  ];

  function optionButtons<T>(values: {Name: string, Value: T}[], currentValue: T, setValue: (item: T) => void) {
    return values.map(value => <Button
      variant={(value.Value == currentValue ? 'contained' : 'text')}
      onClick={() => setValue(value.Value)}>
      {value.Name}
    </Button>);
  }

  return (
    <>
      <GridFullHeight container>
        <GridItem size={4}>
          <PaperContainer>
            <LeftContentBox>
              {leftContent()}
            </LeftContentBox>
            <LeftBottomButtonGroup variant="text" aria-label="Basic button group">
              {optionButtons(leftOptions, leftContainer, setLeftContainer)}
            </LeftBottomButtonGroup>
          </PaperContainer>
        </GridItem>
        <GridItem size={8} >
          <PaperContainer>
            {mainContent()}
            <LeftBottomButtonGroup variant="text" aria-label="Basic button group">
              {optionButtons(mainOptions, mainContainer, setMainContainer)}
            </LeftBottomButtonGroup>
          </PaperContainer>
        </GridItem>
      </GridFullHeight>
      <ToolPanel>
        <PaperContainer>
          {bottomContent()}
          <LeftBottomButtonGroup variant="text" aria-label="Basic button group">
            {optionButtons(bottomOptions, bottomContainer, setBottomContainer)}
          </LeftBottomButtonGroup>
        </PaperContainer>
      </ToolPanel>
    </>
  );
}

export default EditorPage;
