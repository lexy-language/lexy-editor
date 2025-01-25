import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import {styled} from '@mui/material/styles';
import {Button} from "@mui/material";
import {BottomContainer, LayoutState, LeftContainer, MainContainer} from '../../context/layoutState';
import {useContext} from '../../context/editorContext';
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
import ExecutionLogging from "../executionLogging/ExecutionLogging";

const GridFullHeight = styled(Grid)`
  height: calc(100% - 264px);
`;

const GridItem = styled(Grid)`
  height: 100%;
  padding: 8px;
`;

const ToolPanel = styled(Grid)`
  height: 200px;
  padding: 0 8px 8px;
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

function OptionButtonsGroup<T>(values: {name: string, value: T}[], currentValue: T, setValue: (item: T) => void) {
  return <BottomPart>
    {values.map(value => <Button
      key={value.name}
      variant={(value.value === currentValue ? 'contained' : 'text')}
      onClick={() => setValue(value.value)}>
      {value.name}
    </Button>)}
  </BottomPart>;
}

function content<T>(values: {value: T, element: () => React.ReactNode}[], currentValue: T) {
  return <TopPart>
    {values.find(value => value.value === currentValue)?.element()}
  </TopPart>;
}

function EditorPage() {

  const {
    layout,
    setLayout,
    testingLogging
  } = useContext();

  const leftOptions = [
    { name: 'Explorer', value: LeftContainer.Explorer, element: () => <Explorer /> },
    { name: 'Structure', value: LeftContainer.Structure, element: () => <Structure />  },
  ];

  const mainOptions = [
    { name: 'Source Code', value: MainContainer.Source, element: () => <SourceEditor /> },
    { name: 'Execution Logging', value: MainContainer.ExecutionLogging, element: () => <ExecutionLogging /> },
  ];

  const bottomOptions = (suffix: string) => [
    { name: 'Compilation Logging', value: BottomContainer.Logging, element: () => <Logging /> },
    { name: 'Test Logging' + suffix, value: BottomContainer.Testing, element: () => <Testing /> },
  ];

  function getScenariosSuffix() {
    if (!(testingLogging !== null && !isLoading(testingLogging))) {
      return '';
    }

    const logging = testingLogging as SpecificationsLogEntry[];
    const errors = count(logging, entry => !entry.isError && entry.node !== null);
    const scenarios = count(logging, entry => entry.node !== null);

    return ` (${errors}/${scenarios})`;
  }

  function setValue<T>(setLayoutValue: (layout: LayoutState, item: T) => LayoutState) {
    return (value: T) => setLayout(layout => setLayoutValue(layout, value));
  }

  const scenariosSuffix = getScenariosSuffix();

  return (
    <>
      <GridFullHeight container>
        <GridItem size={3}>
          <FullHeightPaper>
            {content(leftOptions, layout.leftContainer)}
            {OptionButtonsGroup(leftOptions, layout.leftContainer, setValue<LeftContainer>((layout, value) => layout.setLeftContainer(value)))}
          </FullHeightPaper>
        </GridItem>
        <GridItem size={6}>
          <FullHeightPaper>
            {content(mainOptions, layout.mainContainer)}
            {OptionButtonsGroup(mainOptions, layout.mainContainer, setValue<MainContainer>((layout, value) => layout.setMainContainer(value)))}
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
          {content(bottomOptions(scenariosSuffix), layout.bottomContainer)}
          {OptionButtonsGroup(bottomOptions(scenariosSuffix), layout.bottomContainer, setValue<BottomContainer>((layout, value) => layout.setBottomContainer(value)))}
        </FullHeightPaper>
      </ToolPanel>
    </>
  );
}

export default EditorPage;