import type {INode} from "lexy/dist/language/node";

import {Function} from "lexy/dist/language/functions/function";
import {NodeType} from "lexy/dist/language/nodeType";
import {asComponentNode} from "lexy/dist/language/componentNode";
import {Assert} from "lexy";
import {asVariableDefinition} from "lexy/dist/language/variableDefinition";
import {asVariableDeclarationExpression} from "lexy/dist/language/expressions/variableDeclarationExpression";
import {asAssignmentDefinition} from "lexy/dist/language/scenarios/assignmentDefinition";
import {asColumnHeader} from "lexy/dist/language/tables/columnHeader";
import {nothing, Nothing} from "../../infrastructure/nothing";
import {asEnumMember} from "lexy/dist/language/enums/enumMember";
import {Type} from "lexy/dist/language/typeSystem/type";
import {TypeKind} from "lexy/dist/language/typeSystem/typeKind";
import {asValueType} from "lexy/dist/language/typeSystem/valueType";
import {asObjectType} from "lexy/dist/language/typeSystem/objects/objectType";
import {TypeNames} from "lexy/dist/language/typeSystem/typeNames";

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

export enum TypeModelKind {
  Unsupported,
  Primitive,
  Enum,
  Object,
}

export interface TypeModel {
  readonly kind: TypeModelKind;
  readonly name: string;
}

export interface EnumTypeModel extends TypeModel {
  readonly kind: TypeModelKind.Enum;
  readonly members: string[]
}

export interface ObjectTypeModel extends TypeModel {
  readonly kind: TypeModelKind.Object;
  readonly variables: VariableModel[];
}

export interface VariableModel {
  readonly name: string;
  readonly type: TypeModel;
}

export function mapNodes(nodes: readonly INode[]): NodeModel[] {

  const typesCache: {[key: string]: TypeModel} = {};

  function mapTypeToKind(variableType: Type | Nothing | undefined): NodeKind  {

    function mapValueType() {
      const valueType = asValueType(variableType);
      switch (valueType?.type) {
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

    switch (variableType?.typeKind) {
      case TypeKind.TableType:
        return NodeKind.Table;
      case TypeKind.EnumType:
        return NodeKind.Enum;
      case TypeKind.DeclaredType:
        return NodeKind.Type;
      case TypeKind.GeneratedType:
        return NodeKind.Type;
      case TypeKind.ValueType:
        return mapValueType();
      case TypeKind.FunctionType:
        return NodeKind.Function;

      case TypeKind.VoidType:
      case nothing:
      default:
        return NodeKind.Unknown;
    }
  }

  function mapType(type: Type | Nothing): TypeModel {

    function mapValueType(): TypeModel {
      let valueType = Assert.notNull(asValueType(type), "asValueType");
      return {
        kind: TypeModelKind.Primitive,
        name: valueType.type
      };
    }

    function fromCache<T extends TypeModel>(name: string, factory: () => T): T {
      if (typesCache[name]) return typesCache[name] as T;
      const type = factory();
      typesCache[name] = type;
      return type;
    }

    function mapObjectType () {
      let objectType = Assert.notNull(asObjectType(type), "asGeneratedType");
      return fromCache<ObjectTypeModel>(objectType.name, () => ({
        kind: TypeModelKind.Object,
        name: objectType.name,
        variables: objectType.members.map(member => ({name: member.name, type: mapType(member.type)}))
      }));
    }

    switch (type?.typeKind) {
      case TypeKind.ValueType:
        return mapValueType();
      case TypeKind.GeneratedType:
        return mapObjectType();
      case TypeKind.DeclaredType:
        return mapObjectType();
      case TypeKind.EnumType:
        return mapObjectType();

      case TypeKind.FunctionType:
      case TypeKind.TableType:
      default:
        return {kind: TypeModelKind.Unsupported, name: type?.typeKind ?? "nothing"}
    }
  }

  function mapParameters(functionNode: Function): readonly VariableModel[] {
    return functionNode.parameters.variables.map(variabel => ({
      name: variabel.name,
      type: mapType(variabel.type),
    }));
  }

  function mapFunction(node: INode): FunctionNodeModel {
    const functionNode = createNode(node, NodeKind.Function);
    const parameters = mapParameters(node as Function);
    return {...functionNode, kind: NodeKind.Function, parameters: parameters};
  }

  function createNode(node: INode, kind: NodeKind, name: string | Nothing = nothing,  mapChildren: boolean = true): NodeModel {

    const componentNode = asComponentNode(node);
    const componentNodeName = componentNode ? componentNode.name : "";

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
    return {...functionNode, kind: NodeKind.Function, type: mapType(definition.type)};
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
        return createNode(node, mapTypeToKind(expression.typeDeclaration.type), nothing, false);
      }
      case NodeType.AssignmentDefinition: {
        let definition = Assert.notNull(asAssignmentDefinition(node), "variableDefinition");
        return createNode(node, mapTypeToKind(definition.type), definition.variable.path.join("."), false);
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
        return createNode(node, mapTypeToKind(column.typeDeclaration?.type), column.name, false);
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
