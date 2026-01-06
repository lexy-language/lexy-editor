import React from 'react';
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import ParameterField from "./ParameterField";
import {VariableDefinition} from "lexy/dist/language/variableDefinition";
import Stack from "@mui/material/Stack";
import {IdentifierPath} from "lexy/dist/language/identifierPath";

const FullWidthStack = styled(Stack)`
  width: 100%;
`;

const FieldBox = styled(Box)`
  margin-bottom: 24px;
`;

type ParameterFieldsProps = {
  parent?: IdentifierPath;
  variables: ReadonlyArray<VariableDefinition> | null | undefined;
}

export default function ParameterFields(props: ParameterFieldsProps) {
  const {variables, parent} = props;
  if (!variables || variables.length === 0) return <FieldBox>No parameter variables defined</FieldBox>;

  const elements: Array<JSX.Element> = [];
  for (let index = 0; index < variables.length; index++) {
    const parameter = variables[index];
    elements.push(<ParameterField key={index} parameter={parameter} parent={parent}/>);
  }

  return <FullWidthStack>
    {elements}
  </FullWidthStack>;
}