import React from 'react';
import List from "@mui/material/List";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import {isLoading} from "../../context/loading";
import {TreeNode} from "./TreeNode";
import {useProjectContext} from "../../context/project/context";

function Structure() {

  const {nodes} = useProjectContext();

  function content() {

    if (nodes === null) {
      return <Box>No structure.</Box>;
    }

    if (isLoading(nodes)) {
      return <CircularProgress/>;
    }

    const result = [];
    for (let index = 0 ; index < nodes.length ; index ++) {
      const node = nodes[index];
      if (node !== null) {
        result.push(<TreeNode node={node} indent={0} key={index} parent={[]} index={index} />);
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
