import {NodeKind, StructureNode} from "../../context/structure";
import CodeIcon from "@mui/icons-material/Code";
import RuleIcon from "@mui/icons-material/Rule";
import GridOnIcon from "@mui/icons-material/GridOn";
import ListIcon from "@mui/icons-material/List";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ErrorIcon from "@mui/icons-material/Error";
import TagIcon from "@mui/icons-material/Tag";
import MoneyIcon from "@mui/icons-material/Money";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import React from "react";
import {NodeType} from "lexy/dist/language/nodeType";
import {MainContainer, useContext} from "../../context/editorContext";
import {Menu, MenuItem, styled} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ListItemButton from "@mui/material/ListItemButton";

const indentValue = 16;

const NoPaddingListItemButton = styled(ListItemButton)`
  padding: 0;
`;

const NoPaddingListItemIcon = styled(ListItemIcon)`
  padding: 0;
  min-width: 30px
`;

type TreeNodeProps = {
  node: StructureNode,
  indent: number,
  parent: Array<string>
}

export function TreeNode(props: TreeNodeProps) {

  function icon(type: NodeKind) {
    switch (type) {
      case NodeKind.Code:
      case NodeKind.Function:
        return <CodeIcon fontSize="small"/>;

      case NodeKind.Scenario:
        return <RuleIcon fontSize="small"/>;
      case NodeKind.Table:
        return <GridOnIcon fontSize="small"/>;

      case NodeKind.Results:
      case NodeKind.Parameters:
      case NodeKind.Type:
        return <ListIcon fontSize="small"/>;

      case NodeKind.Enum:
        return <FormatListNumberedIcon fontSize="small"/>;

      case NodeKind.Date:
        return <DateRangeIcon fontSize="small"/>;

      case NodeKind.Errors:
        return <ErrorIcon fontSize="small"/>;

      case NodeKind.EnumMember:
      case NodeKind.Number:
        return <TagIcon fontSize="small"/>;

      case NodeKind.Boolean:
        return <MoneyIcon/>;

      case NodeKind.String:
        return <FormatQuoteIcon fontSize="small"/>;

      case NodeKind.Unknown:
      default:
        return <QuestionMarkIcon fontSize="small"/>;
    }
  }

  function onClick(event: React.MouseEvent<HTMLLIElement>) {
    setEditorPosition({
      lineNumber: node.reference.lineNumber,
      column: node.reference.characterNumber,
      source: "state"
    });
    setCurrentStructureNode(node);
    if (event.type === 'contextmenu') {
      setAnchorEl(event.currentTarget);
      event.preventDefault();
    }
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  function renderMenuItems() {
    if (node.nodeType !== NodeType.Function) return [];

    const handleClickMenu = () => {
      setMainContainer(MainContainer.Run);
      handleCloseMenu();
    };

    return [
      <MenuItem onClick={handleClickMenu} key="execute">
        <ListItemIcon>
          <PlayArrowIcon fontSize="small"/>
        </ListItemIcon>
        <ListItemText>Execute</ListItemText>
      </MenuItem>
    ];
  }

  function renderChildren() {
    const children = [];
    if (openChildren && node.children) {
      for (let index = 0; index < node.children.length; index++) {
        const structureNode: StructureNode = node.children[index];
        if (!!structureNode) {
          children.push(<TreeNode node={structureNode} indent={indent + 1} key={structureNode.name} parent={path}/>);
        }
      }
    }
    return children;
  }

  const {node, indent, parent} = props;
  const path = [...parent, node.name];
  const {
    setEditorPosition,
    structureTreeState,
    setStructureTreeState,
    currentStructureNode,
    setCurrentStructureNode,
    setMainContainer
  } = useContext();
  const openChildren = structureTreeState.isOpen(path);
  const setOpenChildren = (value: boolean) => setStructureTreeState(structureTreeState.setOpen(path, value));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const menuItems = renderMenuItems();
  const children = renderChildren();

  return (
    <>
      <ListItem disablePadding onClick={onClick} onContextMenu={onClick}
                style={currentStructureNode === node ? {background: '#EEE'} : {}}>
        <NoPaddingListItemButton onClick={() => setOpenChildren(!openChildren)}
                                 style={indent > 0 ? ({marginLeft: (indentValue * indent) + 'px'}) : ({})}>
          <NoPaddingListItemIcon>
            {node.children.length === 0 ? <></>
              : openChildren ? <KeyboardArrowDownIcon fontSize="small"/> : <KeyboardArrowRightIcon fontSize="small"/>}
          </NoPaddingListItemIcon>
          <NoPaddingListItemIcon>
            {icon(node.kind)}
          </NoPaddingListItemIcon>
          <ListItemText primary={node.name}/>
        </NoPaddingListItemButton>
      </ListItem>
      {children}
      <Menu
        id="node-menu"
        anchorEl={anchorEl}
        open={menuItems.length > 0 && openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menuItems}
      </Menu>
    </>
  );
}