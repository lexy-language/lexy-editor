import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import {styled} from '@mui/material/styles';
import {Button, ButtonGroup} from "@mui/material";
import {BottomContainer, LeftContainer, MainContainer, useContext} from '../context/editorContext';

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

const LeftBottomButtonGroup = styled(ButtonGroup)`
  position: absolute;
  bottom: 0;
  left: 0;
`;


function optionButtonsGroup<T>(values: {Name: string, Value: T}[], currentValue: T, setValue: (item: T) => void) {
  return <LeftBottomButtonGroup variant="text" aria-label="Basic button group">
    {optionButtons(values, currentValue, setValue)}
  </LeftBottomButtonGroup>;
}

function optionButtons<T>(values: {Name: string, Value: T}[], currentValue: T, setValue: (item: T) => void) {
  return values.map(value => <Button
    variant={(value.Value == currentValue ? 'contained' : 'text')}
    onClick={() => setValue(value.Value)}>
    {value.Name}
  </Button>);
}

function content<T>(values: {Value: T, Element: () => React.ReactNode}[], currentValue: T) {
  return values.find(value => value.Value == currentValue)?.Element();
}

function EditorPage() {
  const {
    leftContainer, setLeftContainer,
    mainContainer, setMainContainer,
    bottomContainer, setBottomContainer
  } = useContext();

  const leftOptions = [
    { Name: 'Explorer', Value: LeftContainer.Explorer, Element: () => <Explorer /> },
    { Name: 'Structure', Value: LeftContainer.Structure, Element: () => <Structure />  },
  ];

  const mainOptions = [
    { Name: 'Source Code', Value: MainContainer.Source, Element: () => <SourceEditor /> },
    { Name: 'Run Function', Value: MainContainer.Run, Element: () => <RunFunction /> },
    { Name: 'Edit Table', Value: MainContainer.Table, Element: () => <EditTable /> },
  ];

  const bottomOptions = [
    { Name: 'Compilation Loggig', Value: BottomContainer.Logging, Element: () => <Testing />  },
    { Name: 'Test Logging', Value: BottomContainer.Testing, Element: () => <Logging />  },
  ];

  return (
    <>
      <GridFullHeight container>
        <GridItem size={4}>
          <PaperContainer>
            {content(leftOptions, leftContainer)}
            {optionButtonsGroup(leftOptions, leftContainer, setLeftContainer)}
          </PaperContainer>
        </GridItem>
        <GridItem size={8} >
          <PaperContainer>
            {content(mainOptions, mainContainer)}
            {optionButtonsGroup(mainOptions, mainContainer, setMainContainer)}
          </PaperContainer>
        </GridItem>
      </GridFullHeight>
      <ToolPanel>
        <PaperContainer>
          {content(bottomOptions, bottomContainer)}
          {optionButtonsGroup(bottomOptions, bottomContainer, setBottomContainer)}
        </PaperContainer>
      </ToolPanel>
    </>
  );
}

export default EditorPage;
