import React, {useState} from 'react';
import {styled} from "@mui/material/styles";
import {Link} from "@mui/material";
import {clearLocalStorage} from "../api/codeStorage";

const TextBox = styled('div')`
  padding: 16px;
`;

const ResetLink = styled(Link)`
 cursor: pointer
`;

const Feedback = styled(TextBox)`
 color: green;
`;

export default function FileNew() {
  const [message, setMessage] = useState('');
  function reset() {
    clearLocalStorage();
    setMessage("Reset done....");
  }
  return (
    <TextBox>
      Not yet implemented. This will create a new project. Each project should have a dedicated git repository.
      New versions of a law can be implemented and tested on different branches and
      merged into the main branch once the law is taken into order.
      <TextBox>Select Go to introduction... in to top right corner to start the introdution.</TextBox>
      Currently changes in UI are stored locally in browser. If you'd like to revert all changes to the original files presse
      following link. WARNING: all local changes will be lost.
      Clear change from local storage: <ResetLink onClick={() => reset()}>Reset to initial files</ResetLink>
      <Feedback>{message}</Feedback>
    </TextBox>
  );
}
