import React from 'react';
import {styled} from "@mui/material/styles";

const TextBox = styled('div')`
  padding: 16px;
`;

export default function FileExamples() {
  return (
    <TextBox>
      Not yet implemented. This should fetch a list of examples from a
      github repository and lists them so a user can load them in the editor.
      Examples will be implementations of specific tax laws and basic examples to learn the language.
      <TextBox>Select Go to introduction... in to top right corner to start the introdution.</TextBox>
    </TextBox>
  );
}
