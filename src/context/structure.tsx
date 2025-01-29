import {SourceReference} from "lexy/dist/parser/sourceReference";
import {asRootNode} from "lexy/dist/language/rootNode";
import {NodeType} from "lexy/dist/language/nodeType";
import {INode} from "lexy/dist/language/node";
import {asVariableDefinition} from "lexy/dist/language/variableDefinition";
import {Assert} from "lexy";
import {asAssignmentDefinition} from "lexy/dist/language/scenarios/assignmentDefinition";
import {asEnumMember} from "lexy/dist/language/enums/enumMember";
import {asVariableDeclarationExpression} from "lexy/dist/language/expressions/variableDeclarationExpression";
import {VariableType} from "lexy/dist/language/variableTypes/variableType";
import {VariableTypeName} from "lexy/dist/language/variableTypes/variableTypeName";
import {asPrimitiveType} from "lexy/dist/language/variableTypes/primitiveType";
import {TypeNames} from "lexy/dist/language/variableTypes/typeNames";
import {asColumnHeader} from "lexy/dist/language/tables/columnHeader";

export enum NodeKind {
  Unknown = "Unknown",
  Function = "Function",
  Scenario = "Scenario",
  Table = "Table",
  Type = "Type",
  Enum = "Enum",

  Code = "Code",
  Results = "Results",
  Parameters = "Parameters",
  EnumMember = "EnumMember",
  Errors = "Errors",
  Number = "Number",
  Boolean = "Boolean",
  Date = "Date",
  String = "String",
}

export type StructureNode = {
  name: string;
  kind: NodeKind;
  nodeType: NodeType;
  reference: SourceReference;
  children: Array<StructureNode>;
  node: INode;
}

function mapType(variableType: VariableType | null | undefined): NodeKind  {
  switch (variableType?.variableTypeName) {
    case VariableTypeName.TableType:
      return NodeKind.Table;
    case VariableTypeName.EnumType:
      return NodeKind.Enum;
    case VariableTypeName.ComplexType:
      return NodeKind.Type;
    case VariableTypeName.CustomType:
      return NodeKind.Type;
    case VariableTypeName.PrimitiveType:
      const primitiveType = asPrimitiveType(variableType);
      switch (primitiveType?.type) {
        case TypeNames.number:
          return NodeKind.Number;
        case TypeNames.boolean:
          return NodeKind.Boolean;
        case TypeNames.date:
          return NodeKind.Date;
        case TypeNames.string:
          return NodeKind.String;
        default:
            return NodeKind.Unknown;
      }
    case VariableTypeName.FunctionType:
      return NodeKind.Function;

    case VariableTypeName.VoidType:
    case null:
    case undefined:
    default:
      return NodeKind.Unknown;
  }
}

function getName(node: INode): {name: string, mapChildren: boolean, kind: NodeKind} | null {
  const rootNode = asRootNode(node);
  const rootNodeName = rootNode ? rootNode.nodeName : "";

  switch (node.nodeType) {
    case NodeType.FunctionName:
    case NodeType.ScenarioName:
    case NodeType.ScenarioFunctionName:
    case NodeType.EnumName:
    case NodeType.AssignmentExpression:
    case NodeType.FunctionCallExpression:
    case NodeType.TableRow:
      return null;

    case NodeType.Function:
      return {name: rootNodeName, kind: NodeKind.Code, mapChildren: true};
    case NodeType.Scenario:
      return {name: rootNodeName, kind: NodeKind.Scenario, mapChildren: true};
    case NodeType.Table:
      return {name: rootNodeName, kind: NodeKind.Table, mapChildren: true};
    case NodeType.TypeDefinition:
      return {name: rootNodeName, kind: NodeKind.Type, mapChildren: true};
    case NodeType.EnumDefinition:
      return {name: rootNodeName, kind: NodeKind.Enum, mapChildren: true};

    case NodeType.FunctionResults:
    case NodeType.ScenarioResults:
      return {name: "Results", kind: NodeKind.Results, mapChildren: true};

    case NodeType.FunctionParameters:
    case NodeType.ScenarioParameters:
      return {name: "Parameters", kind: NodeKind.Parameters, mapChildren: true};

    case NodeType.FunctionCode:
      return {name: "Code", kind: NodeKind.Code, mapChildren: true};

    case NodeType.VariableDefinition: {
      const definition = Assert.notNull(asVariableDefinition(node), "variableDefinition");
      return {name: definition.name, kind: mapType(definition.variableType), mapChildren: false};
    }
    case NodeType.VariableDeclarationExpression: {
      let expression = Assert.notNull(asVariableDeclarationExpression(node), "variableDeclarationExpression");
      return {name: expression.name, kind: mapType(expression.type.variableType), mapChildren: false};
    }
    case NodeType.AssignmentDefinition: {
      let definition = Assert.notNull(asAssignmentDefinition(node), "variableDefinition");
      return {name: definition.variable.path.join("."), kind: mapType(definition.variableType), mapChildren: false};
    }
    case NodeType.EnumMember: {
      let member = Assert.notNull(asEnumMember(node), "enumMember");
      return {name: member.name, kind: NodeKind.EnumMember, mapChildren: false};
    }
    case NodeType.ScenarioExpectErrors: {
      return {name: "Expect Errors", kind: NodeKind.Errors, mapChildren: false};
    }
    case NodeType.ScenarioExpectRootErrors: {
      return {name: "Expect Root Error", kind: NodeKind.Errors, mapChildren: false};
    }

    case NodeType.TableHeader:
      return {name: "Header", kind: NodeKind.Table, mapChildren: true};

    case NodeType.ColumnHeader:
      const column = Assert.notNull(asColumnHeader(node), "columnHeader");
      return {name: column.name, kind: mapType(column.type?.variableType), mapChildren: false};


    default:
      return {name: node.nodeType, kind: NodeKind.Unknown, mapChildren: true};
  }
}

function mapNode(node: INode): StructureNode | null {
  const result = getName(node);
  if (result === null) return null;

  const {name, mapChildren, kind} = result;
  const children = mapChildren ? createStructure(node.getChildren()) : [];

  return {
    name: name,
    kind: kind,
    children: children,
    reference: node.reference,
    nodeType: node.nodeType,
    node: node
  }
}

export function createStructure(nodes: Array<INode>): Array<StructureNode> {
  const result = new Array<StructureNode>();
  for (const node of nodes) {
    const structureNode = mapNode(node);
    if (structureNode !== null) {
      result.push(structureNode);
    }
  }
  return result;
}