import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import {styled} from '@mui/material/styles';
import {Button} from "@mui/material";
import {BottomContainer, LayoutState, LeftContainer, MainContainer} from '../../context/editor/layoutState';
import Explorer from '../../editor/explorer/Explorer';
import Structure from '../../editor/structure/Structure';
import SourceEditor from '../../editor/sourceEditor/SourceEditor';
import RunFunction from '../../editor/runFunction/RunFunction';
import Testing from '../../editor/testing/Testing';
import Logging from '../../editor/logging/Logging';
import Box from "@mui/material/Box";
import {isLoading} from "../../context/loading";
import {count} from "lexy/dist/infrastructure/arrayFunctions";
import ExecutionLogging from "../../editor/executionLogging/ExecutionLogging";
import ViewEditor from "../../editor/viewEditor/ViewEditor";
import {isBrowser} from "react-device-detect";
import {useEditorContext} from "../../context/editor/context";
import {useProjectContext} from "../../context/project/context";
import {useCompilationContext} from "../../context/compilation/context";
import AutorenewIcon from '@mui/icons-material/Autorenew';

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

function OptionButtonsGroup<T>(values: {name: string | JSX.Element, value: T}[], currentValue: T, setValue: (item: T) => void) {
  return <BottomPart>
    {values.map((value, index) => <Button
      key={'option-' + index}
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

  const {layout, setLayout} = useEditorContext();
  const {currentFileCode} = useProjectContext();
  const {testingLogging} = useCompilationContext();
  const [lastShowView, setLastShowView] = useState<boolean>(false);

  const leftOptions = [
    { name: 'Explorer', value: LeftContainer.Explorer, element: () => <Explorer /> },
    { name: 'Structure', value: LeftContainer.Structure, element: () => <Structure />  },
  ];

  const mainOptions = [
    { name: 'View', value: MainContainer.View, element: () => <ViewEditor /> },
    { name: 'Source Code', value: MainContainer.Source, element: () => <SourceEditor /> },
    { name: 'Execution Logging', value: MainContainer.ExecutionLogging, element: () => <ExecutionLogging /> },
  ];

  const bottomOptions = (suffix: JSX.Element) => [
    { name: 'Compilation Logging', value: BottomContainer.Logging, element: () => <Logging /> },
    { name: <>Test Logging {suffix}</>, value: BottomContainer.Testing, element: () => <Testing /> },
  ];

  function getScenariosSuffix() {
    if (!testingLogging) {
      return <></>;
    }

    if (isLoading(testingLogging)) {
      return <AutorenewIcon fontSize={"small"}  sx={{
        animation: "spin 2s linear infinite",
        "@keyframes spin": {
          "0%": {transform: "rotate(0deg)"},
          "100%": {transform: "rotate(360deg)"},
        },
      }} />;
    }

    const errors = count(testingLogging, entry => !entry.isError && entry.nodeName !== null);
    const scenarios = count(testingLogging, entry => entry.nodeName !== null);

    return <> ({errors}/{scenarios})</>;
  }

  function setValue<T>(setLayoutValue: (layout: LayoutState, item: T) => LayoutState) {
    return (value: T) => setLayout(layout => setLayoutValue(layout, value));
  }

  const showView = currentFileCode !== null && !isLoading(currentFileCode) && currentFileCode.identifier.endsWith('.md');
  if (lastShowView !== showView) {
    setLastShowView(showView);
  }
  const scenariosSuffix = getScenariosSuffix();
  const mainOptionsFiltered = showView ? mainOptions : mainOptions.splice(1);
  const mainContainer = showView || layout.mainContainer !== MainContainer.View ? layout.mainContainer : MainContainer.Source;

  useEffect(() =>  {
    if (showView && layout.mainContainer !== MainContainer.View) {
      setLayout(layout => layout.setMainContainer(MainContainer.View));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastShowView]);

  return (
    <>
      <GridFullHeight container style={!isBrowser ? {height: 'calc(100% - 64px)'} : {}}>
        {isBrowser ? <GridItem size={3}>
          <FullHeightPaper>
            {content(leftOptions, layout.leftContainer)}
            {OptionButtonsGroup(leftOptions, layout.leftContainer, setValue<LeftContainer>((layout, value) => layout.setLeftContainer(value)))}
          </FullHeightPaper>
        </GridItem> : <></>}
        <GridItem size={!isBrowser ? 12 : 6}>
          <FullHeightPaper>
            {content(mainOptionsFiltered, mainContainer)}
            {OptionButtonsGroup(mainOptionsFiltered, mainContainer, setValue<MainContainer>((layout, value) => layout.setMainContainer(value)))}
          </FullHeightPaper>
        </GridItem>
        {isBrowser ? <GridItem size={3}>
          <FullHeightPaper>
            <TopPart>
              <RunFunction />
            </TopPart>
          </FullHeightPaper>
        </GridItem> : <></>}
      </GridFullHeight>
      {isBrowser ? <ToolPanel>
        <FullHeightPaper>
          {content(bottomOptions(scenariosSuffix), layout.bottomContainer)}
          {OptionButtonsGroup(bottomOptions(scenariosSuffix), layout.bottomContainer, setValue<BottomContainer>((layout, value) => layout.setBottomContainer(value)))}
        </FullHeightPaper>
      </ToolPanel> : <></>}
    </>
  );
}

export default EditorPage;
