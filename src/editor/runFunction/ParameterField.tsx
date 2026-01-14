import React from 'react';
import {
  Checkbox,
  FormControl, FormControlLabel,
  InputLabel, MenuItem, Select,
  TextField,
} from "@mui/material";
import {styled} from "@mui/material/styles";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";
import ParameterFields from "./ParameterFields";
import IndentFields from "../indentFields/IndentFields";
import Box from "@mui/material/Box";
import {EnumTypeModel, ObjectTypeModel, TypeKind, TypeModel, VariableModel} from "../../context/project/nodeModel";
import {IdentifierPath} from "lexy/dist/language/identifierPath";
import {TypeNames} from "lexy/dist/language/variableTypes/typeNames";
import {CompilationContextState, useCompilationContext} from "../../context/compilation/context";

const ParameterTextField = styled(TextField)`
  width: 100%;
`;

const ParameterSelect = styled(Select)`
  width: 100%;
`;

const ParameterDatePicker = styled(DatePicker)`
  width: 100%;
`;

const FieldBox = styled(Box)`
  &:not(:last-child) {
    margin-bottom: 24px;
  }
`;

type ParameterFieldProps = {
  parent?: IdentifierPath
  parameter: VariableModel;
}

export default function ParameterField(props: ParameterFieldProps) {

  const {parameter, parent} = props;
  const {executeFunction, setExecuteFunction}: CompilationContextState = useCompilationContext();

  const path = !!parent ? parent.append([parameter.name]) : new IdentifierPath([parameter.name]);

  function enumValueChanged(event: any) {
    return setExecuteFunction(executeFunction.setParameter(path, event.target.value));
  }

  function dateValueChanged(value: any) {
    setExecuteFunction(executeFunction.setParameter(path, value));
  }

  function stringValueChanged(event: any) {
    setExecuteFunction(executeFunction.setParameter(path, event.target.value));
  }

  function booleanValueChanged(event: any) {
    setExecuteFunction(executeFunction.setParameter(path, event.target.checked));
  }

  function numberValueChanged(event: any) {
    setExecuteFunction(executeFunction.setParameter(path, parseInt(event.target.value)));
  }

  function getParameterOrDefault() {
    let value = executeFunction.getParameter(path);
    if (value === undefined) {
      value = "";
    }
    return value;
  }

  function renderPrimitiveType(primitiveType: TypeModel) {
    if (primitiveType.name === TypeNames.string) {
      const value = getParameterOrDefault();
      return <ParameterTextField label={parameter.name} variant="outlined"
                                 value={value} onChange={stringValueChanged}/>;
    }
    if (primitiveType.name === TypeNames.number) {
      const value = getParameterOrDefault();
      return <ParameterTextField label={parameter.name} variant="outlined"
                                 type="number"
                                 value={!!value ? value : ''} onChange={numberValueChanged}/>;
    }
    if (primitiveType.name === TypeNames.boolean) {
      const value = getParameterOrDefault();
      return <FormControlLabel control={<Checkbox value={value} onChange={booleanValueChanged}/>}
                               label={parameter.name}/>
    }
    if (primitiveType.name === TypeNames.date) {
      const value = getParameterOrDefault();
      return <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ParameterDatePicker label={parameter.name} value={value} onChange={dateValueChanged}
                             format="yyyy/MM/dd"/>
      </LocalizationProvider>;
    }

    return <div>Unknown primitive type: {primitiveType.name}</div>
  }

  function renderEnumType(enumType: EnumTypeModel) {
    const value = getParameterOrDefault();
    return <FormControl fullWidth>
      <InputLabel id={"label-select-" + parameter.name}>{parameter.name}</InputLabel>
      <ParameterSelect labelId={"label-select-" + parameter.name}
                       value={value} label={parameter.name} onChange={enumValueChanged}>
        {enumType.members.map((member, index) =>
          <MenuItem key={index} value={`${enumType.kind}.${member}`}>{member}</MenuItem>)}
      </ParameterSelect>
    </FormControl>
  }

  function renderObjectType(objectType: ObjectTypeModel) {
    return <IndentFields name={parameter.name}>
      <ParameterFields variables={objectType.variables} parent={path}/>
    </IndentFields>;
  }

  switch (parameter.type.kind) {
    case TypeKind.Primitive:
      return <FieldBox>{renderPrimitiveType(parameter.type)}</FieldBox>;
    case TypeKind.Enum:
      return <FieldBox>{renderEnumType(parameter.type as EnumTypeModel)}</FieldBox>;
    case TypeKind.Object:
      return renderObjectType(parameter.type as ObjectTypeModel);
    default:
      return <div>Unknown type: {parameter.name}({parameter.type.kind})</div>
  }
}
