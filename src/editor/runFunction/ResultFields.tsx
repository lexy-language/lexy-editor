import React from 'react';
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import {TextField} from "@mui/material";
import IndentFields from "../indentFields/IndentFields";

const FullWidthStack = styled(Stack)`
  width: 100%;
`;

const FieldBox = styled(Box)`
  &:not(:last-child) {
    margin-bottom: 24px;
  }
`;

const ResultsTextField = styled(TextField)`
  width: 100%;
`;

type ResultFieldsProps = {
  values: any;
};

export default function ResultFields(props: ResultFieldsProps) {

  const {values} = props;
  const keys = values !== null ? Object.keys(values) : null;
  if (values === null || keys === null || keys.length === 0) {
    return <FieldBox>No result variables defined</FieldBox>;
  }

  const elements: Array<JSX.Element> = [];

  function isValueType(value: any) {
    return typeof value === 'number'
      || typeof value === 'string'
      || value instanceof String
      || value instanceof Date
      || toString.call(value) === '[object Boolean]';
  }

  function renderField(value: any, resultKey: string) {
    if (value === null || isValueType((value))) {
      return <FieldBox key={resultKey}>
        <ResultsTextField disabled label={resultKey} variant="outlined" value={value !== null ? value : ""}/>
      </FieldBox>;
    } else {
      return <IndentFields key={resultKey} name={resultKey}>
        <ResultFields values={value}/>
      </IndentFields>;
    }
  }

  for (const resultKey of keys) {
    const value = values[resultKey];
    elements.push(renderField(value, resultKey));
  }

  return <FullWidthStack>{elements}</FullWidthStack>;
}