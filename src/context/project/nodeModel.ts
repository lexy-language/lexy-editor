import type {INode} from "lexy/dist/language/node";

import {Function} from "lexy/dist/language/functions/function";
import {NodeType} from "lexy/dist/language/nodeType";
import {VariableType} from "lexy/dist/language/variableTypes/variableType";
import {asPrimitiveType} from "lexy/dist/language/variableTypes/primitiveType";
import {TypeNames} from "lexy/dist/language/variableTypes/typeNames";
import {VariableTypeName} from "lexy/dist/language/variableTypes/variableTypeName";
import {asComponentNode} from "lexy/dist/language/componentNode";
import {Assert} from "lexy";
import {asVariableDefinition} from "lexy/dist/language/variableDefinition";
import {asVariableDeclarationExpression} from "lexy/dist/language/expressions/variableDeclarationExpression";
import {asAssignmentDefinition} from "lexy/dist/language/scenarios/assignmentDefinition";
import {asColumnHeader} from "lexy/dist/language/tables/columnHeader";
import {nothing, Nothing} from "../../infrastructure/nothing";
import {asGeneratedType} from "lexy/dist/language/variableTypes/generatedType";
import {asDeclaredType} from "lexy/dist/language/variableTypes/declaredType";
import {asEnumType} from "lexy/dist/language/variableTypes/enumType";
import {asEnumMember} from "lexy/dist/language/enums/enumMember";

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

  Expression = "Expression",
}

export interface NodeModel {
  readonly name: string;
  readonly kind: NodeKind;
  readonly fileName: string;
  readonly lineNumber: number;
  readonly characterNumber: number;
  readonly children: readonly NodeModel[];
  readonly nodeType: NodeType;
}

export interface FunctionNodeModel extends NodeModel {
  readonly kind: NodeKind.Function;
  readonly parameters: readonly VariableModel[];
}

export enum TypeKind {
  Unsupported,
  Primitive,
  Enum,
  Object,
}

export interface TypeModel {
  readonly kind: TypeKind;
  readonly name: string;
}

export interface EnumTypeModel extends TypeModel {
  readonly kind: TypeKind.Enum;
  readonly members: string[]
}

export interface ObjectTypeModel extends TypeModel {
  readonly kind: TypeKind.Object;
  readonly variables: VariableModel[];
}

export interface VariableModel {
  readonly name: string;
  readonly type: TypeModel;
}

export function mapNodes(nodes: readonly INode[]): NodeModel[] {

  const typesCache: {[key: string]: TypeModel} = {};

  function mapTypeToKind(variableType: VariableType | Nothing | undefined): NodeKind  {

    function mapValueType() {
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
    }

    switch (variableType?.variableTypeName) {
      case VariableTypeName.TableType:
        return NodeKind.Table;
      case VariableTypeName.EnumType:
        return NodeKind.Enum;
      case VariableTypeName.DeclaredType:
        return NodeKind.Type;
      case VariableTypeName.GeneratedType:
        return NodeKind.Type;
      case VariableTypeName.PrimitiveType:
        return mapValueType();
      case VariableTypeName.FunctionType:
        return NodeKind.Function;

      case VariableTypeName.VoidType:
      case nothing:
      default:
        return NodeKind.Unknown;
    }
  }

  function mapType(variableType: VariableType | Nothing): TypeModel {

    function mapPrimitiveType(): TypeModel {
      let primitiveType = Assert.notNull(asPrimitiveType(variableType), "asPrimitiveType");
      return {
        kind: TypeKind.Primitive,
        name: primitiveType.type
      };
    }

    function fromCache<T extends TypeModel>(name: string, factory: () => T): T {
      if (typesCache[name]) return typesCache[name] as T;
      const type = factory();
      typesCache[name] = type;
      return type;
    }

    function mapGeneratedType () {
      let objectType = Assert.notNull(asGeneratedType(variableType), "asGeneratedType");
      return fromCache<ObjectTypeModel>(objectType.name, () => ({
        kind: TypeKind.Object,
        name: objectType.name,
        variables: objectType.members.map(member => ({name: member.name, type: mapType(member.type)}))
      }));
    }

    function mapDeclaredType() {
      let objectType = Assert.notNull(asDeclaredType(variableType), "asDeclaredType");
      return fromCache<ObjectTypeModel>(objectType.type, () => ({
        kind: TypeKind.Object,
        name: objectType.type,
        variables: objectType.typeDefinition.variables.map(member => ({name: member.name, type: mapType(member.variableType)}))
      }));
    }

    function mapEnumType() {
      let enumType = Assert.notNull(asEnumType(variableType), "asGeneratedType");
      return fromCache<EnumTypeModel>(enumType.type, () => ({
        kind: TypeKind.Enum,
        name: enumType.type,
        members: enumType.enum.members.map(member => member.name)
      }));
    }

    switch (variableType?.variableTypeName) {
      case VariableTypeName.PrimitiveType:
        return mapPrimitiveType();
      case VariableTypeName.GeneratedType:
        return mapGeneratedType();
      case VariableTypeName.DeclaredType:
        return mapDeclaredType();
      case VariableTypeName.EnumType:
        return mapEnumType();

      case VariableTypeName.FunctionType:
      case VariableTypeName.TableType:
      default:
        return {kind: TypeKind.Unsupported, name: variableType?.variableTypeName ?? "nothing"}
    }
  }

  function mapParameters(functionNode: Function): readonly VariableModel[] {
    return functionNode.parameters.variables.map(variabel => ({
      name: variabel.name,
      type: mapType(variabel.variableType),
    }));
  }

  function mapFunction(node: INode): FunctionNodeModel {
    const functionNode = createNode(node, NodeKind.Function);
    const parameters = mapParameters(node as Function);
    return {...functionNode, kind: NodeKind.Function, parameters: parameters};
  }

  function createNode(node: INode, kind: NodeKind, name: string | Nothing = nothing,  mapChildren: boolean = true): NodeModel {

    const componentNode = asComponentNode(node);
    const componentNodeName = componentNode ? componentNode.nodeName : "";

    const children = mapChildren ? mapNodes(node.getChildren()) : [];

    return {
      name: name ?? componentNodeName,
      kind: kind,
      children: children,
      fileName: node.reference.file.fileName,
      lineNumber: node.reference.lineNumber,
      characterNumber: node.reference.characterNumber,
      nodeType: node.nodeType
    }
  }

  function mapVariableDefinition(node: INode) {
    const definition = Assert.notNull(asVariableDefinition(node), "variableDefinition");
    const functionNode = createNode(node, NodeKind.Function, definition.name);
    return {...functionNode, kind: NodeKind.Function, type: mapType(definition.variableType)};
  }

  function mapNode(node: INode): NodeModel | Nothing {

    switch (node.nodeType) {
      case NodeType.FunctionName:
      case NodeType.ScenarioName:
      case NodeType.ScenarioFunctionName:
      case NodeType.EnumName:
      case NodeType.TableRow:
        return null;

      case NodeType.Function:
        return mapFunction(node);
      case NodeType.Scenario:
        return createNode(node, NodeKind.Scenario);
      case NodeType.Table:
        return createNode(node, NodeKind.Table);
      case NodeType.TypeDefinition:
        return createNode(node, NodeKind.Type);
      case NodeType.EnumDefinition:
        return createNode(node, NodeKind.Enum);

      case NodeType.FunctionResults:
      case NodeType.ScenarioResults:
        return createNode(node, NodeKind.Results, "Results");

      case NodeType.FunctionParameters:
      case NodeType.ScenarioParameters:
        return createNode(node, NodeKind.Parameters, "Parameters");
      case NodeType.FunctionCode:
        return createNode(node, NodeKind.Code, "Code");
      case NodeType.VariableDefinition: {
        return mapVariableDefinition(node);
      }
      case NodeType.VariableDeclarationExpression: {
        let expression = Assert.notNull(asVariableDeclarationExpression(node), "variableDeclarationExpression");
        return createNode(node, mapTypeToKind(expression.type.variableType), nothing, false);
      }
      case NodeType.AssignmentDefinition: {
        let definition = Assert.notNull(asAssignmentDefinition(node), "variableDefinition");
        return createNode(node, mapTypeToKind(definition.variableType), definition.variable.path.join("."), false);
      }

      case NodeType.EnumMember: {
        let enumMember = Assert.notNull(asEnumMember(node), "enumMember");
        return createNode(node, NodeKind.EnumMember, enumMember.name, false);
      }

      case NodeType.ScenarioExpectErrors:
        return createNode(node, NodeKind.Errors, "Expect Errors", true);
      case NodeType.ScenarioExpectComponentErrors:
        return createNode(node, NodeKind.Errors, "Expect Component Error", true);

      case NodeType.TableHeader:
        return createNode(node, NodeKind.Table, "Header", true);

      case NodeType.ColumnHeader: {
        const column = Assert.notNull(asColumnHeader(node), "columnHeader");
        return createNode(node, mapTypeToKind(column.type?.variableType), column.name, false);
      }

      default: {
        if (node.nodeType.endsWith("Expression")) {
          return createNode(node, NodeKind.Expression, node.nodeType, true);
        }
        return createNode(node, NodeKind.Unknown, node.nodeType, true);
      }
    }
  }

  function mapNodeValues(children: readonly INode[]) {
    const result = new Array<NodeModel>();
    for (const node of children) {
      const nodeModel = mapNode(node);
      if (nodeModel !== null) {
        result.push(nodeModel);
      }
    }
    return result;
  }

  return mapNodeValues(nodes);
}
