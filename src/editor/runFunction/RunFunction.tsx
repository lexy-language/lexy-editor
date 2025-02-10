import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import {
  Button,
  CircularProgress,
  FormControl,
  FormGroup, InputLabel, MenuItem, Select,
  SelectChangeEvent,
} from "@mui/material";
import {useContext} from "../../context/editorContext";
import {isLoading} from "../../context/loading";
import {StructureNode} from "../../context/structure";
import {Function} from "lexy/dist/language/functions/function";
import {styled} from "@mui/material/styles";
import {NodeType} from "lexy/dist/language/nodeType";
import {compileNodes} from "../../api/parser";
import {Scenario} from "lexy/dist/language/scenarios/scenario";
import ParameterFields from "./ParameterFields";
import ResultFields from "./ResultFields";
import IndentFields from "../indentFields/IndentFields";
import {BuiltInDateFunctions} from "lexy/dist/runTime/builtInDateFunctions";
import {DependencyGraphFactory} from "lexy/dist/dependencyGraph/dependencyGraphFactory";

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

function RunFunction() {

  function renderError() {
    if (executeFunction === null || !executeFunction.error) return [];
    return <Error>
      {executeFunction.error.split('\n').map((value, index) => <div key={index}>{value}</div>)}
    </Error>;
  }

  function execute() {
    if (isLoading(nodes)) return;

    const node = currentStructureNode as StructureNode;
    const functionNode = getFunctionNode(node);
    if (functionNode === null) {
      setExecuteFunction(executeFunction.setError(`Couldn't find function: '${node?.name}'`))
      return;
    }

    const startTime = new Date();
    try {
      const functionAndDependencies = DependencyGraphFactory.nodeAndDependencies(nodes, functionNode);
      const result = compileNodes(functionAndDependencies)
      const executable = result.getFunction(functionNode);
      const parameters = executeFunction.getParameters();
      const results = executable.run(parameters);
      const elapsed = BuiltInDateFunctions.milliseconds(new Date(), startTime).toNumber();
      setExecutionLogging(executionLogging.setCurrent(results.logging));
      setExecuteFunction(executeFunction.setResults(results.value, elapsed));
    } catch (error: any) {
      setExecuteFunction(executeFunction.setError(error.toString()))
    }
  }

  const {
    structure,
    currentStructureNode,
    setCurrentStructureNode,
    executeFunction,
    setExecuteFunction,
    executionLogging,
    setExecutionLogging,
    nodes
  } = useContext();

  useEffect(() => {
    if (structure === null) return;

    for (const node of structure) {
      const functionNode = getFunctionNode(node);
      if (functionNode !== null) {
        setCurrentStructureNode(node);
        return;
      }
    }
    setCurrentStructureNode(null);
  }, [structure, setCurrentStructureNode])

  if (isLoading(currentStructureNode)) {
    return <CircularProgress/>;
  }

  function getFunctionNode(node: StructureNode | null): Function | null {
    return node === null
      ? null
      : node.nodeType === NodeType.Function
        ? node.node as Function
        : node.nodeType === NodeType.Scenario
          ? (node.node as Scenario).functionNode
          : null;
  }

  function content() {
    if (node === null || functionNode === null) {
      return <Box>Select function to execute it.</Box>
    }
    const results = executeFunction.getResults();

    return <FormGroup>
      <IndentFields name={"Parameters"} title={true}>
        <ParameterFields variables={functionNode.parameters?.variables} />
      </IndentFields>
      <ExecuteButton variant="contained" onClick={execute}>Execute</ExecuteButton>
      {executeFunction.elapsed !== null ? <Feedback>Execution time: {executeFunction.elapsed}ms</Feedback> : <></>}
      {renderError()}
      {results !== null ? <IndentFields name={"Results"} title={true}>
        <ResultFields values={results} />
      </IndentFields> : <></>}
    </FormGroup>;
  }

  function getFunction(name: string): StructureNode | null {
    if (structure === null) return null;
    for (const node of structure) {
      const functionNode = getFunctionNode(node);
      if (functionNode !== null && functionNode.name.value === name) {
        return node;
      }
    }
    return null;
  }

  const handleChange = (event: SelectChangeEvent) => {
    if (structure === null) return;
    const functionNode = getFunction(event.target.value);
    if (functionNode !== null) {
      setCurrentStructureNode(functionNode);
    }
  };

  function functionsMenuItems() {
    if (structure === null) return []
    const result: JSX.Element[] = [];
    structure.forEach(node => {
      const functionNode = getFunctionNode(node);
      if (functionNode !== null) {
        const functionName = functionNode.name.value;
        result.push(<MenuItem key={functionName} value={functionName}>{functionName}</MenuItem>)
      }
    });
    return result;
  }

  const node = currentStructureNode as StructureNode | null;
  const functionNode = getFunctionNode(currentStructureNode);
  const currentNodeName = functionNode !== null ? functionNode.name.value : "";
  const menuItems = functionsMenuItems();

  if (structure === null || menuItems.length === 0) {
    return <Box>No functions found in file. Add <strong>Function:</strong> to the code, or select a file with functions.</Box>
  }

  return (
    <MainBox>
      <SelectBox>
        <FormControl fullWidth>
          <InputLabel id="label-select-function">Execute Function</InputLabel>
          <Select
            labelId="label-select-function"
            value={currentNodeName}
            label="Execute Function"
            onChange={handleChange}>
            {menuItems}
          </Select>
        </FormControl>
      </SelectBox>
      {content()}
    </MainBox>
  );
}

export default RunFunction;
