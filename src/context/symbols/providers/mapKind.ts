import {languages} from "monaco-editor";
import {SymbolKind} from "lexy/dist/language/symbols/symbolKind"
import CompletionItemKind = languages.CompletionItemKind

export function mapKind(kind: SymbolKind): languages.CompletionItemKind {
  switch (kind) {
    case SymbolKind.Scenario:
    case SymbolKind.ValueType:
    case SymbolKind.Type:
    case SymbolKind.GeneratedType:
    case SymbolKind.Table:
      return CompletionItemKind.Class;
    case SymbolKind.Operator:
      return CompletionItemKind.Operator;
    case SymbolKind.Function:
    case SymbolKind.SystemFunction:
    case SymbolKind.TableFunction:
    case SymbolKind.LibraryFunction:
      return CompletionItemKind.Function;
    case SymbolKind.Enum:
      return CompletionItemKind.Enum;
    case SymbolKind.EnumMember:
      return CompletionItemKind.EnumMember;
    case SymbolKind.Constant:
      return CompletionItemKind.Constant;
    case SymbolKind.Variable:
    case SymbolKind.ObjectVariable:
    case SymbolKind.TableColumn:
    case SymbolKind.ResultVariable:
    case SymbolKind.ParameterVariable:
      return CompletionItemKind.Variable;
    case SymbolKind.Keyword:
    case SymbolKind.Comments:
    default:
      return CompletionItemKind.Keyword;
  }
}
