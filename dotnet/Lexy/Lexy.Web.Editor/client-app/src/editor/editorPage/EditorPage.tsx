import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import {styled} from '@mui/material/styles';
import {Button} from "@mui/material";
import {BottomContainer, LeftContainer, MainContainer, useContext} from '../../context/editorContext';

import Explorer from '../explorer/Explorer';
import Structure from '../structure/Structure';
import SourceEditor from '../sourceEditor/SourceEditor';
import RunFunction from '../runFunction/RunFunction';
import Testing from '../testing/Testing';
import Logging from '../logging/Logging';
import Box from "@mui/material/Box";
import {isLoading} from "../../context/loading";
import {count} from "lexy/dist/infrastructure/enumerableExtensions";
import {SpecificationsLogEntry} from "lexy/dist/specifications/specificationRunnerContext";

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
  overflow-y: auto;
`;

const TopPart = styled(Box)`
  height: calc(100% - 44px);
  padding: 0;
  overflow-y: auto;
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
    bottomContainer, setBottomContainer,
    testingLogging
  } = useContext();

  const leftOptions = [
    { name: 'Explorer', value: LeftContainer.Explorer, element: () => <Explorer /> },
    { name: 'Structure', value: LeftContainer.Structure, element: () => <Structure />  },
  ];

  const mainOptions = [
    { name: 'Source Code', value: MainContainer.Source, element: () => <SourceEditor /> },
  ];

  const bottomOptions = (suffix: string) => [
    { name: 'Compilation Logging', value: BottomContainer.Logging, element: () => <Logging /> },
    { name: 'Test Logging' + suffix, value: BottomContainer.Testing, element: () => <Testing /> },
  ];

  function getScenariosSuffix() {
    if (!(testingLogging != null && !isLoading(testingLogging))) {
      return '';
    }

    const logging = testingLogging as SpecificationsLogEntry[];
    const errors = count(logging, entry => !entry.isError && entry.node != null);
    const scenarios = count(logging, entry => entry.node != null);

    return ` (${errors}/${scenarios})`;
  }

  const scenariosSuffix = getScenariosSuffix();

  return (
    <>
      <GridFullHeight container>
        <GridItem size={3}>
          <FullHeightPaper>
            {content(leftOptions, leftContainer)}
            {optionButtonsGroup(leftOptions, leftContainer, setLeftContainer)}
          </FullHeightPaper>
        </GridItem>
        <GridItem size={6}>
          <FullHeightPaper>
            {content(mainOptions, mainContainer)}
            {optionButtonsGroup(mainOptions, mainContainer, setMainContainer)}
          </FullHeightPaper>
        </GridItem>
        <GridItem size={3}>
          <FullHeightPaper>
            <TopPart>
              <RunFunction />
            </TopPart>
          </FullHeightPaper>
        </GridItem>
      </GridFullHeight>
      <ToolPanel>
        <FullHeightPaper>
          {content(bottomOptions(scenariosSuffix), bottomContainer)}
          {optionButtonsGroup(bottomOptions(scenariosSuffix), bottomContainer, setBottomContainer)}
        </FullHeightPaper>
      </ToolPanel>
    </>
  );
}

export default EditorPage;