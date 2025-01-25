import React from 'react';
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import {Grid2, TextField} from "@mui/material";
import IndentFields from "../indentFields/IndentFields";

const MainGrid = styled(Grid2)`
  margin-top: 8px;
  margin-bottom: 8px;
`;

const FieldBox = styled(Box)`
  &:not(:last-child) {
    margin-bottom: 24px;
  }
`;

const ResultsTextField = styled(TextField)`
  width: 100%;
`;

type VariablesProps = {
  values: any;
};

export default function Variables(props: VariablesProps) {

  const {values} = props;
  const keys = !!values ? Object.keys(values) : null;
  if (values === null || keys === null || keys.length === 0) {
    return <FieldBox>No variables defined</FieldBox>;
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
    if (!value || isValueType(value)) {
      return <Grid2 size={3}>
        <FieldBox key={resultKey}>
          <ResultsTextField disabled label={resultKey} variant="outlined" value={value !== null ? value : ""}/>
        </FieldBox>
      </Grid2>;
    } else {
      return <Grid2 size={12}>
        <IndentFields key={resultKey} name={resultKey}>
          <Variables values={value}/>
        </IndentFields>
      </Grid2>;
    }
  }

  for (const resultKey of keys) {
    const value = values[resultKey];
    elements.push(renderField(value, resultKey));
  }

  return <MainGrid container spacing={2} >{elements}</MainGrid>;
}