import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormGroup, InputLabel, MenuItem, Select,
  SelectChangeEvent,
  TextField,
  Typography
} from "@mui/material";
import {useContext} from "../context/editorContext";
import {isLoading} from "../context/loading";
import {StructureNode} from "../context/structure";
import {Function} from "lexy/dist/language/functions/function";
import {styled} from "@mui/material/styles";
import {NodeType} from "lexy/dist/language/nodeType";
import {VariableDefinition} from "lexy/dist/language/variableDefinition";
import {TypeNames} from "lexy/dist/language/variableTypes/typeNames";
import {VariableTypeName} from "lexy/dist/language/variableTypes/variableTypeName";
import {asPrimitiveType} from "lexy/dist/language/variableTypes/primitiveType";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {compileNodes} from "../api/parser";
import {Scenario} from "lexy/dist/language/scenarios/scenario";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";

const MainBox = styled(Box)`
  padding: 16px 8px;
`;

const SelectBox = styled(Box)`
  margin-bottom: 24px;
`;

const FieldBox = styled(Box)`
  margin-bottom: 24px;
`;

const ParameterTextField = styled(TextField)`
  width: 100%;
`;

const ParameterDatePicker = styled(DatePicker)`
  width: 100%;
`;

const ResultsTextField = styled(TextField)`
  width: 100%;
`;

const ExecuteButton = styled(Button)`
  width: 100%;
`;

function RunFunction() {

  function renderParameter(parameter: VariableDefinition) {

    function valueChanged(value: any) {
      setExecuteFunction(executeFunction.setParameter(parameter.name, value));
    }

    function numberValueChanged(event: any) {
      setExecuteFunction(executeFunction.setParameter(parameter.name, parseInt(event.target.value)));
    }

    if (parameter.variableType?.variableTypeName === VariableTypeName.PrimitiveType) {
      const primitiveType = asPrimitiveType(parameter.variableType);

      let value = executeFunction.getParameter(parameter.name);
      if (primitiveType?.type == TypeNames.string) {
        return <ParameterTextField label={parameter.name} variant="outlined"
                                   value={value} onChange={valueChanged}/>;
      }
      if (primitiveType?.type == TypeNames.number) {
        return <ParameterTextField label={parameter.name} variant="outlined"
                                   type="number"
                                   value={!!value ? value : ''} onChange={numberValueChanged}/>;
      }
      if (primitiveType?.type == TypeNames.date) {
        return <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ParameterDatePicker label={parameter.name} value={value} onChange={valueChanged}/>
        </LocalizationProvider>;
      }
    }
  }

  function renderParameters(functionNode: Function) {
    const elements: Array<JSX.Element> = [];
    if (!functionNode.parameters?.variables) return elements;
    for (let index = 0; index < functionNode.parameters?.variables.length; index++){
      const parameter = functionNode.parameters?.variables[index];
      const element = renderParameter(parameter);
      if (!!element) {
        elements.push(<FieldBox key={index++}>{element}</FieldBox>);
      }
    }
    return elements;
  }

  function renderResults(functionNode: Function) {
    const elements: Array<JSX.Element> = [];
    if (!functionNode.results?.variables) return elements;
    for (let index = 0; index < functionNode.results?.variables.length; index++){
      const result = functionNode.results?.variables[index];
      let value = executeFunction.getResult(result.name);
      elements.push(<FieldBox key={index}>
        <ResultsTextField disabled label={result.name}
                          variant="outlined" value={value != null ? value : ""}/>
      </FieldBox>)
    }
    return elements;
  }

  function renderError() {
    if (executeFunction == null || !executeFunction.error) return [];
    return <Box>{executeFunction.error}</Box>;
  }

  function execute() {
    if (isLoading(nodes)) return;

    const node = currentStructureNode as StructureNode;
    const functionNode = getFunctionNode(node);
    if (functionNode == null) {
      setExecuteFunction(executeFunction.setError(`Couldn't find function: '${node?.name}'`))
      return;
    }

    const result = compileNodes(nodes)
    const executable = result.getFunction(functionNode);
    const parameters = executeFunction.getParameters();

    try {
      const results = executable.run(parameters);
      setExecuteFunction(executeFunction.setResults(results.value))
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
    nodes
  } = useContext();

  useEffect(() => {
    if (structure == null) return;

    for (const node of structure) {
      const functionNode = getFunctionNode(node);
      if (functionNode != null) {
        setCurrentStructureNode(node);
        console.log("setCurrentStructureNode: " + node.name);
        return;
      }
    }
    setCurrentStructureNode(null);
  }, [structure])

  if (isLoading(currentStructureNode)) {
    return <CircularProgress/>;
  }

  function getFunctionNode(node: StructureNode | null): Function | null {
    return node == null
      ? null
      : node.nodeType == NodeType.Function
        ? node.node as Function
        : node.nodeType == NodeType.Scenario
          ? (node.node as Scenario).functionNode
          : null;
  }

  function content() {
    if (node == null || functionNode == null) {
      return <Box>Select function to execute it.</Box>
    }

    return <FormGroup>
      {renderParameters(functionNode)}
      {renderResults(functionNode)}
      <ExecuteButton variant="outlined" onClick={execute}>Execute</ExecuteButton>
      {renderError()}
    </FormGroup>;
  }

  function getFunction(name: string): StructureNode | null {
    if (structure == null) return null;
    for (const node of structure) {
      const functionNode = getFunctionNode(node);
      if (functionNode != null && functionNode.name.value == name) {
        return node;
      }
    }
    return null;
  }

  const handleChange = (event: SelectChangeEvent) => {
    if (structure == null) return;
    const functionNode = getFunction(event.target.value);
    if (functionNode != null) {
      setCurrentStructureNode(functionNode);
    }
  };

  function functionsMenuItems() {
    if (structure == null) return []
    const result: JSX.Element[] = [];
    structure.forEach(node => {
      const functionNode = getFunctionNode(node);
      if (functionNode != null) {
        const functionName = functionNode.name.value;
        result.push(<MenuItem key={functionName} value={functionName}>{functionName}</MenuItem>)
      }
    });
    return result;
  }

  const node = currentStructureNode as StructureNode | null;
  const functionNode = getFunctionNode(currentStructureNode);
  const currentNodeName = functionNode != null ? functionNode.name.value : "";
  console.log("currentNodeName: " + currentNodeName);
  const menuItems = functionsMenuItems();

  if (structure == null || menuItems.length == 0) {
    return <Box>No functions found in file. Add Function: to the code, or select a file with functions.</Box>
  }

  return (
    <MainBox>
      <SelectBox>
        <FormControl fullWidth>
          <InputLabel id="label-select-function">Function</InputLabel>
          <Select
            labelId="label-select-function"
            id="select-function"
            value={currentNodeName}
            label="Function"
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
