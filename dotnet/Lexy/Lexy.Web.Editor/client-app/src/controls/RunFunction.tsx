import React from 'react';
import Box from "@mui/material/Box";
import {Button, CircularProgress, Divider, FormGroup, TextField, Typography} from "@mui/material";
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
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {compileNodes} from "../api/parser";

const ParameterTextField = styled(TextField)`
  width: 400px;
  margin-bottom: 16px;
`;

const ResultsTextField = styled(TextField)`
  width: 400px;
  margin-bottom: 16px;
`;

const ExecuteButton = styled(Button)`
  width: 400px;
`;

function RunFunction() {

  function renderParameter(parameter: VariableDefinition) {

    function valueChanged(event: any) {
      setExecuteFunction(executeFunction.setParameter(parameter.name, event.target.value));
    }

    function numberValueChanged(event: any) {
      setExecuteFunction(executeFunction.setParameter(parameter.name, parseInt(event.target.value)));
    }

    if (parameter.variableType?.variableTypeName === VariableTypeName.PrimitiveType ) {
      const primitiveType = asPrimitiveType(parameter.variableType);

      let value = executeFunction.getParameter(parameter.name);
      if (primitiveType?.type == TypeNames.string) {
        return <ParameterTextField id={parameter.name} label={parameter.name} variant="outlined"
                                   value={value} onChange={valueChanged}/>;
      }
      if (primitiveType?.type == TypeNames.number) {
        return <ParameterTextField id={parameter.name} label={parameter.name} variant="outlined"
                                   type="number"
                                   value={!!value ? value : ''} onChange={numberValueChanged}/>;
      }
      if (primitiveType?.type == TypeNames.date) {
        return <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label={parameter.name}
                      value={value} onChange={valueChanged}/>
        </LocalizationProvider>;
      }
    }
  }

  function renderParameters() {
    const elements: Array<JSX.Element> = [];
    if (!functionNode.parameters?.variables) return elements;
    for (const parameter of functionNode.parameters?.variables) {
      const element = renderParameter(parameter);
      if (!!element) {
        elements.push(element);
      }
    }
    return elements;
  }

  function renderResults() {
    const elements: Array<JSX.Element> = [];
    if (!functionNode.results?.variables) return elements;
    for (const result of functionNode.results?.variables) {
      let value = executeFunction.getResult(result.name);
      elements.push(<ResultsTextField disabled id={result.name} label={result.name} variant="outlined" value={!!value ? value : ""}  />)
    }
    return elements;
  }

  function renderError() {
    if (!executeFunction.error) return [];
    return <Box>{executeFunction.error}</Box>;
  }

  function execute() {
    if (isLoading(nodes)) return;

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
    currentStructureNode,
    executeFunction,
    setExecuteFunction,
    nodes
  } = useContext();

  if (currentStructureNode == null) {
    return <Box>Select function in the structure to execute it.</Box>
  }
  if (isLoading(currentStructureNode)) {
    return <CircularProgress />;
  }

  const node = currentStructureNode as StructureNode;
  if (node.nodeType !== NodeType.Function) {
    return <Box>Select function in the structure to execute it.</Box>
  }

  const functionNode = node.node as Function;

  return (
    <FormGroup>
      <Typography variant="h5" gutterBottom>
        Execute Function: {node.name}
      </Typography>
      <Divider />
      {renderParameters()}
      {renderResults()}
      <ExecuteButton variant="outlined" onClick={execute}>Execute</ExecuteButton>
      {renderError()}
    </FormGroup>
  );
}

export default RunFunction;
