import {NodeKind, NodeModel} from "../../context/project/nodeModel";
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
import {useProjectContext} from "../../context/project/context";
import {useEditorContext} from "../../context/editor/context";
import {Menu, MenuItem, styled} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ListItemButton from "@mui/material/ListItemButton";
import {MainContainer} from "../../context/editor/layoutState";
import DataObjectIcon from '@mui/icons-material/DataObject';

const indentValue = 16;

const NoPaddingListItemButton = styled(ListItemButton)`
  padding: 0;
`;

const NoPaddingListItemIcon = styled(ListItemIcon)`
  padding: 0;
  min-width: 30px
`;

type TreeNodeProps = {
  node: NodeModel,
  indent: number,
  parent: Array<string>,
  index: number
}

export function TreeNode(props: TreeNodeProps) {

  function icon(type: NodeKind) {
    switch (type) {
      case NodeKind.Code:
      case NodeKind.Function:
      case NodeKind.Expression:
        return <CodeIcon fontSize="small"/>;

      case NodeKind.Scenario:
        return <RuleIcon fontSize="small"/>;
      case NodeKind.Table:
        return <GridOnIcon fontSize="small"/>;

      case NodeKind.Results:
      case NodeKind.Parameters:
        return <ListIcon fontSize="small"/>;

      case NodeKind.Type:
        return <DataObjectIcon fontSize="small"/>

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
      lineNumber: node.lineNumber,
      column: node.characterNumber,
      source: "state"
    });
    setLayout(layout => layout.setMainContainer(MainContainer.Source));
    setCurrentNode(node);
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
    if (!(openChildren && node.children)) return [];
    const children = [];

    for (let index = 0; index < node.children.length; index++) {
      const nodeModel: NodeModel = node.children[index];
      if (!!nodeModel) {
        children.push(<TreeNode node={nodeModel} indent={indent + 1} key={index + "." + nodeModel.name} index={index}
                                parent={path}/>);
      }
    }
    return children;
  }

  const {node, indent, parent, index} = props;
  const path = node.kind === NodeKind.Expression ? [...parent, "" + index, node.name] : [...parent, node.name];
  const {setEditorPosition, setLayout} = useEditorContext();
  const {
    nodeTreeState,
    setNodeTreeState,
    currentNode,
    setCurrentNode
  } = useProjectContext();

  const openChildren = nodeTreeState.isOpen(path);
  const setOpenChildren = (value: boolean) => setNodeTreeState(nodeTreeState.setOpen(path, value));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const menuItems = renderMenuItems();
  const children = renderChildren();

  return (
    <>
      <ListItem disablePadding onClick={onClick} onContextMenu={onClick}
                style={currentNode === node ? {background: '#EEE'} : {}}>
        <NoPaddingListItemButton onClick={() => setOpenChildren(!openChildren)}
                                 style={indent > 0 ? ({paddingLeft: (indentValue * indent) + 'px'}) : ({})}>
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
