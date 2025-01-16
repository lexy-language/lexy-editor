import React from 'react';
import {useContext} from '../context/editorContext';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {CircularProgress, styled} from "@mui/material";
import Box from "@mui/material/Box";
import {StructureNode, NodeKind} from "../context/structure";
import {isLoading} from "../context/loading";
import CodeIcon from '@mui/icons-material/Code';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import GridOnIcon from '@mui/icons-material/GridOn';
import ListIcon from '@mui/icons-material/List';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import RuleIcon from '@mui/icons-material/Rule';
import DateRangeIcon from '@mui/icons-material/DateRange';
import TagIcon from '@mui/icons-material/Tag';
import ErrorIcon from '@mui/icons-material/Error';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import MoneyIcon from '@mui/icons-material/Money';

const indentValue = 16;

const NoPaddingListItemButton = styled(ListItemButton)`
  padding: 0;
`;

const NoPaddingListItemIcon = styled(ListItemIcon)`
  padding: 0;
  min-width: 30px
`;


function TreeNode(props: { node: StructureNode, indent: number, parent: Array<string> }) {

  const {node, indent, parent} = props;
  const path = [...parent, node.name];
  const {
    setEditorPosition,
    structureTreeState,
    setStructureTreeState,
    currentStructureNode,
    setCurrentStructureNode
  } = useContext();
  const open = structureTreeState.isOpen(path);
  const setOpen = (value: boolean) => setStructureTreeState(structureTreeState.setOpen(path, value));

  function icon(type: NodeKind) {
    switch (type) {
      case NodeKind.Code:
      case NodeKind.Function:
        return <CodeIcon/>;

      case NodeKind.Scenario:
        return <RuleIcon/>;
      case NodeKind.Table:
        return <GridOnIcon/>;

      case NodeKind.Results:
      case NodeKind.Parameters:
      case NodeKind.Type:
        return <ListIcon/>;

      case NodeKind.Enum:
        return <FormatListNumberedIcon/>;

      case NodeKind.Date:
        return <DateRangeIcon/>;

      case NodeKind.Errors:
        return <ErrorIcon/>;

      case NodeKind.EnumMember:
      case NodeKind.Number:
        return <TagIcon/>;

      case NodeKind.Boolean:
        return <MoneyIcon/>;

      case NodeKind.String:
        return <FormatQuoteIcon/>;

      case NodeKind.Unknown:
      default:
        return <QuestionMarkIcon/>;
    }
  }

  function onClick() {
    setEditorPosition({
      lineNumber: node.reference.lineNumber,
      column: node.reference.characterNumber,
      source: "state"
    });
    setCurrentStructureNode(node);
  }

  const children = [];
  if (open && node.children) {
    for (let index = 0; index < node.children.length; index++) {
      const structureNode: StructureNode = node.children[index];
      if (!!structureNode) {
        children.push(<TreeNode node={structureNode} indent={indent + 1} key={structureNode.name} parent={path}/>);
      }
    }
  }

  return (
    <>
      <ListItem disablePadding onClick={onClick} style={currentStructureNode == node ? {background: '#EEE'} : {}}>
        <NoPaddingListItemButton onClick={() => setOpen(!open)}
                                 style={indent > 0 ? ({marginLeft: (indentValue * indent) + 'px'}) : ({})}>
          <NoPaddingListItemIcon>
            {node.children.length == 0 ? <></>
              : open ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>}
          </NoPaddingListItemIcon>
          <NoPaddingListItemIcon>
            {icon(node.type)}
          </NoPaddingListItemIcon>
          <ListItemText primary={node.name}/>
        </NoPaddingListItemButton>
      </ListItem>
      {children}
    </>
  );
}

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
