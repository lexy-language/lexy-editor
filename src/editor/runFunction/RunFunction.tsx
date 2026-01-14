import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {
  Button,
  CircularProgress,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {ProjectContextState, useProjectContext} from "../../context/project/context";
import {isLoading} from "../../context/loading";
import {styled} from "@mui/material/styles";
import ParameterFields from "./ParameterFields";
import ResultFields from "./ResultFields";
import IndentFields from "../indentFields/IndentFields";
import {CompilationContextState, useCompilationContext} from "../../context/compilation/context";
import {FunctionNodeModel, NodeKind, NodeModel} from "../../context/project/nodeModel";
import {NodeType} from "lexy/dist/language/nodeType";
import {firstOrDefault} from "lexy/dist/infrastructure/arrayFunctions";
import {Nothing} from "../../infrastructure/nothing";
import {RunFunctionFailedResponse} from "../../context/compilation/response";
import Grid from "@mui/material/Grid2";

const MainBox = styled(Box)`
  padding: 16px 8px;
`;

const SelectBox = styled(Box)`
  margin-bottom: 24px;
`;

const ExecuteButton = styled(Button)`
  width: 100%;
  margin-top: 24px;
`;

const Feedback = styled(Box)`
  margin-top: 2px;
  margin-bottom: 24px;
  font-size: .8rem;
`;

const Error = styled(Box)`
  margin-top: 8px;
  margin-bottom: 24px;
  font-size: 1rem;
  color: crimson;
`;

const FullAreaBox = styled(Box)`
  padding: 16px;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function RunFunction() {

  const {
    nodes,
    currentNode,
    currentFile,
    setCurrentNode,
    currentFileCode
  }: ProjectContextState = useProjectContext();

  const {
    runFunction,
    runFunctionCompleted,
    executeFunction,
    setExecuteFunction
  }: CompilationContextState = useCompilationContext();

  const [functionsOptions, setFunctionsOptions] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (isLoading(nodes)) return;

    function addFunction(node: NodeModel) {
      if (node.kind === NodeKind.Function) {
        result.push(<MenuItem key={node.name} value={node.name}>{node.name}</MenuItem>)
      } else if (node.kind === NodeKind.Scenario) {
        const scenarioFunction = firstOrDefault(node.children, where => where.kind === NodeKind.Function) as FunctionNodeModel;
        if (scenarioFunction) {
          result.push(<MenuItem key={scenarioFunction.name} value={node.name}>{scenarioFunction.name}</MenuItem>)
        }
      }
    }

    const result: JSX.Element[] = [];
    nodes.forEach(addFunction);
    setFunctionsOptions(result);

    for (const node of nodes) {
      const functionNode = getFunctionNode(node);
      if (functionNode !== null) {
        setCurrentNode(node);
        return;
      }
    }
    setCurrentNode(null);
  }, [nodes, setCurrentNode])

  function renderError() {
    if (!runFunctionCompleted || !runFunctionCompleted.error) return <></>;
    const executeFunctionFailed = runFunctionCompleted as RunFunctionFailedResponse
    return <Error>
      {executeFunctionFailed.lastError.split('\n').map((value, index: number) => <div key={index}>{value}</div>)}
    </Error>;
  }

  function getFunctionNode(currentNode: NodeModel | Nothing): FunctionNodeModel | Nothing {
    if (currentNode?.nodeType === NodeType.Function) {
      return currentNode as FunctionNodeModel;
    } else if (currentNode?.nodeType === NodeType.Scenario) {
      return firstOrDefault(currentNode.children, where => where.nodeType === NodeType.Function) as FunctionNodeModel;
    }
    return null
  }

  function execute() {
    if (isLoading(nodes) || !currentNode || !currentFile || currentFileCode == null || isLoading(currentFileCode)) return;

    const functionNode = getFunctionNode(node);
    if (functionNode === null) {
      setExecuteFunction(executeFunction.setError(`Couldn't find function: '${node?.name}'`));
      return;
    }

    const currentFolder = currentFileCode.identifier.split("|");
    currentFolder.splice(currentFolder.length - 1, 1);
    runFunction(currentFolder, currentFile.name, currentNode.name, executeFunction.parameters)
  }

  function form() {
    if (isLoading(nodes)) {
      return (
        <FullAreaBox>
          <Grid container direction="row" alignItems="center">
            <Grid>
              <CircularProgress size={50} />
            </Grid>
          </Grid>
        </FullAreaBox>
      );
    }

    if (node === null || functionNode === null) {
      return <Box>Select function to execute it.</Box>
    }

    return (
      <FormGroup>
        <IndentFields name={"Parameters"} title={true}>
          {<ParameterFields variables={functionNode.parameters} />}
        </IndentFields>
        <ExecuteButton variant="contained" onClick={execute}>Execute</ExecuteButton>
        {executeFunction.elapsed !== null ? <Feedback>Compilation and execution time: {executeFunction.elapsed}ms</Feedback> : <></>}
        {renderError()}
        {executeFunction.loading ?
          <FullAreaBox>
            <Grid container direction="row" alignItems="center">
              <Grid>
                <CircularProgress size={50} />
              </Grid>
            </Grid>
          </FullAreaBox> : <></>}
        {executeFunction.results ? <IndentFields name={"Results"} title={true}>
          <ResultFields values={executeFunction.results} />
        </IndentFields> : <></>}
      </FormGroup>
    );
  }

  function getFunction(name: string): NodeModel | null {
    if (isLoading(nodes)) return null;
    for (const node of nodes) {
      const functionNode = getFunctionNode(node);
      if (functionNode !== null && functionNode.name === name) {
        return functionNode;
      }
    }
    return null;
  }

  const handleChange = (event: SelectChangeEvent) => {
    const functionNode = getFunction(event.target.value);
    if (functionNode !== null) {
      setCurrentNode(functionNode);
    }
  };

  const node = currentNode as NodeModel | null;
  const functionNode = getFunctionNode(currentNode);

  if (functionsOptions.length === 0) {
    return <Box>
      No functions found in file. Add <strong>function NewFunction</strong> to the code, or select a file with functions.
    </Box>;
  }

  return (
    <MainBox>
      <SelectBox>
        <FormControl fullWidth>
          <InputLabel id="label-select-function">Execute Function</InputLabel>
          <Select labelId="label-select-function"
                  label="Execute Function"
                  onChange={handleChange}
                  value={currentNode ? currentNode.name : ""}
                  disabled={isLoading(nodes)}>
            {functionsOptions}
          </Select>
        </FormControl>
      </SelectBox>
      {form()}
    </MainBox>
  );
}

export default RunFunction;
