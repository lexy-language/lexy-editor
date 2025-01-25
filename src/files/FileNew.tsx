import React from 'react';
import {styled} from "@mui/material/styles";

const TextBox = styled('div')`
  padding: 16px;
`;

export default function FileNew() {
  return (
    <TextBox>
      Not yet implemented. This will create a new project. Each project should have a dedicated git repository.
      New versions of a law can be implemented and tested on different branches and
      merged into the main branch once the law is taken into order.
      <TextBox>Select Go to introduction... in to top right corner to start the introdution.</TextBox>
    </TextBox>
  );
}
