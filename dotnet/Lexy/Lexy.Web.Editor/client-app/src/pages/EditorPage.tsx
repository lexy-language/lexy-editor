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
import Box from "@mui/material/Box";

const GridFullHeight = styled(Grid)`
  height: calc(100% - 264px);
`;

const GridItem = styled(Grid)`
  height: 100%;
  padding: 8px;
`;

const ToolPanel = styled(Grid)`
  height: 200px;
  padding: 0px 8px 8px;
`;

const FullHeightPaper = styled(Paper)`
  height: 100%;
  padding: 8px;
`;

const TopPart = styled(Box)`
  height: calc(100% - 44px);
  padding: 0;
  overflow-y: scroll;
`;

const BottomPart = styled(Box)`
  height: 44px;
  padding: 8px 0 0;
`;

function optionButtonsGroup<T>(values: {name: string, value: T}[], currentValue: T, setValue: (item: T) => void) {
  return <BottomPart>
    {optionButtons(values, currentValue, setValue)}
  </BottomPart>;
}

function optionButtons<T>(values: {name: string, value: T}[], currentValue: T, setValue: (item: T) => void) {
  return values.map(value => <Button
    key={value.name}
    variant={(value.value == currentValue ? 'contained' : 'text')}
    onClick={() => setValue(value.value)}>
    {value.name}
  </Button>);
}

function content<T>(values: {value: T, element: () => React.ReactNode}[], currentValue: T) {
  return <TopPart>
    {values.find(value => value.value == currentValue)?.element()}
  </TopPart>;
}

function EditorPage() {
  const {
    leftContainer, setLeftContainer,
    mainContainer, setMainContainer,
    bottomContainer, setBottomContainer
  } = useContext();

  const leftOptions = [
    { name: 'Explorer', value: LeftContainer.Explorer, element: () => <Explorer /> },
    { name: 'Structure', value: LeftContainer.Structure, element: () => <Structure />  },
  ];

  const mainOptions = [
    { name: 'Source Code', value: MainContainer.Source, element: () => <SourceEditor /> },
    { name: 'Run Function', value: MainContainer.Run, element: () => <RunFunction /> },
    { name: 'Edit Table', value: MainContainer.Table, element: () => <EditTable /> },
  ];

  const bottomOptions = [
    { name: 'Compilation Loggig', value: BottomContainer.Logging, element: () => <Logging /> },
    { name: 'Test Logging', value: BottomContainer.Testing, element: () => <Testing /> },
  ];

  return (
    <>
      <GridFullHeight container>
        <GridItem size={4}>
          <FullHeightPaper>
            {content(leftOptions, leftContainer)}
            {optionButtonsGroup(leftOptions, leftContainer, setLeftContainer)}
          </FullHeightPaper>
        </GridItem>
        <GridItem size={8}>
          <FullHeightPaper>
            {content(mainOptions, mainContainer)}
            {optionButtonsGroup(mainOptions, mainContainer, setMainContainer)}
          </FullHeightPaper>
        </GridItem>
      </GridFullHeight>
      <ToolPanel>
        <FullHeightPaper>
          {content(bottomOptions, bottomContainer)}
          {optionButtonsGroup(bottomOptions, bottomContainer, setBottomContainer)}
        </FullHeightPaper>
      </ToolPanel>
    </>
  );
}

export default EditorPage;