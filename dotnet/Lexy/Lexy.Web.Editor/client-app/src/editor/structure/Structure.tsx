import React from 'react';
import {useContext} from '../../context/editorContext';
import List from "@mui/material/List";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import {isLoading} from "../../context/loading";
import {TreeNode} from "./TreeNode";

function Structure() {

  const {structure} = useContext();

  function content() {

    if (structure == null) {
      return <Box>No structure.</Box>;
    }

    if (isLoading(structure)) {
      return <CircularProgress/>;
    }

    const result = [];
    for (let index = 0 ; index < structure.length ; index ++) {
      const node = structure[index];
      if (node != null) {
        result.push(<TreeNode node={node} indent={0} key={index} parent={[]}/>);
      }
    }
    return result;
  }

  return (
    <List disablePadding>
      {content()}
    </List>
  );
}

export default Structure;
