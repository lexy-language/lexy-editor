import React from 'react';
import {
  Checkbox,
  FormControl, FormControlLabel,
  InputLabel, MenuItem, Select,
  TextField,
} from "@mui/material";
import {useContext} from "../../context/editorContext";
import {styled} from "@mui/material/styles";
import {VariableDefinition} from "lexy/dist/language/variableDefinition";
import {TypeNames} from "lexy/dist/language/variableTypes/typeNames";
import {VariableTypeName} from "lexy/dist/language/variableTypes/variableTypeName";
import {asPrimitiveType} from "lexy/dist/language/variableTypes/primitiveType";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";
import {Assert} from "lexy";
import {asEnumType} from "lexy/dist/language/variableTypes/enumType";
import {firstOrDefault} from "lexy/dist/infrastructure/enumerableExtensions";
import ParameterFields from "./ParameterFields";
import {asCustomType} from "lexy/dist/language/variableTypes/customType";
import IndentFields from "./IndentFields";
import {VariableReference} from "lexy/dist/language/variableReference";
import Box from "@mui/material/Box";

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
  margin-bottom: 24px;
`;

type ParameterFieldProps = {
  parent?: VariableReference
  parameter: VariableDefinition;
}

export default function ParameterField(props: ParameterFieldProps) {

  const {parameter, parent} = props;
  const {executeFunction, setExecuteFunction} = useContext();
  const path = parent != null ? parent.append([parameter.name]) : new VariableReference([parameter.name]);

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
    if (value == undefined) {
      value = null;
    }
    return value;
  }

  function renderPrimitiveType() {
    const primitiveType = Assert.notNull(asPrimitiveType(parameter.variableType), "primitiveType");
    if (primitiveType.type == TypeNames.string) {
      const value = getParameterOrDefault();
      return <ParameterTextField label={parameter.name} variant="outlined"
                                 value={value} onChange={stringValueChanged}/>;
    }
    if (primitiveType.type == TypeNames.number) {
      const value = getParameterOrDefault();
      return <ParameterTextField label={parameter.name} variant="outlined"
                                 type="number"
                                 value={!!value ? value : ''} onChange={numberValueChanged}/>;
    }
    if (primitiveType.type == TypeNames.boolean) {
      const value = getParameterOrDefault();
      return <FormControlLabel control={<Checkbox value={value} onChange={booleanValueChanged}/>}
                               label={parameter.name}/>
    }
    if (primitiveType.type == TypeNames.date) {
      const value = getParameterOrDefault();
      return <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ParameterDatePicker label={parameter.name} value={value} onChange={dateValueChanged}
                             format="yyyy/MM/dd"/>
      </LocalizationProvider>;
    }

    return <div>Unknown primitive type: {primitiveType.type}</div>
  }

  function renderEnumType() {
    const enumType = Assert.notNull(asEnumType(parameter.variableType), "enumType");
    const value = getParameterOrDefault();
    return <FormControl fullWidth>
      <InputLabel id={"label-select-" + parameter.name}>{parameter.name}</InputLabel>
      <ParameterSelect labelId={"label-select-" + parameter.name}
                       value={value} label={parameter.name} onChange={enumValueChanged}>
        {enumType.enum.members.map((member, index) =>
          <MenuItem key={index} value={`${enumType.type}.${member.name}`}>{member.name}</MenuItem>)}
      </ParameterSelect>
    </FormControl>
  }

  function renderCustomType() {
    const customType = Assert.notNull(asCustomType(parameter.variableType), "enumType");
    return <IndentFields name={parameter.name}>
      <ParameterFields variables={customType.typeDefinition.variables} parent={path}/>
    </IndentFields>;
  }

  switch (parameter.variableType?.variableTypeName) {
    case VariableTypeName.PrimitiveType:
      return <FieldBox>{renderPrimitiveType()}</FieldBox>;
    case VariableTypeName.EnumType:
      return <FieldBox>{renderEnumType()}</FieldBox>;
    case VariableTypeName.CustomType:
      return renderCustomType();
    default:
      return <div>Unknown type: {parameter.name}</div>
  }
}