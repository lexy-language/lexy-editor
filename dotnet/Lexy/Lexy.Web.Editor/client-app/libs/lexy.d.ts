declare module "infrastructure/logger" {
    export enum LogLevel {
        Debug = "Debug",
        Information = "Information",
        Warning = "Warning",
        Error = "Error"
    }
    export interface ILogger {
        logDebug(message: string): void;
        logInformation(message: string): void;
        logError(message: string): void;
        isEnabled(level: LogLevel): boolean;
    }
    export class ConsoleLogger implements ILogger {
        isEnabled(level: LogLevel): boolean;
        logDebug(message: string): void;
        logError(message: string): void;
        logInformation(message: string): void;
    }
}
declare module "parser/sourceFile" {
    export class SourceFile {
        fileName: string;
        constructor(fileName: string);
    }
}
declare module "parser/sourceReference" {
    import { SourceFile } from "parser/sourceFile";
    export class SourceReference {
        private readonly characterNumber;
        private readonly lineNumber;
        readonly file: SourceFile;
        constructor(file: SourceFile, lineNumber: number, characterNumber: number);
        toString(): string;
    }
}
declare module "infrastructure/enumerableExtensions" {
    export function any<TItem>(array: Array<TItem>, where?: ((value: TItem) => boolean) | null): boolean;
    export function firstOrDefault<TItem>(array: ReadonlyArray<TItem>, where?: ((value: TItem) => boolean) | null): TItem | null;
    export function singleOrDefault<TItem>(array: ReadonlyArray<TItem>, where?: ((value: TItem) => boolean) | null): TItem | null;
    export function lastOrDefault<TItem>(array: ReadonlyArray<TItem>, where?: ((value: TItem) => boolean) | null): TItem | null;
    export function forEach<TItem>(array: ReadonlyArray<TItem>, action: (value: TItem) => void): ReadonlyArray<TItem>;
    export function contains<TItem>(array: ReadonlyArray<TItem>, value: TItem): boolean;
    export function where<TItem>(array: ReadonlyArray<TItem>, predicate: (value: TItem) => boolean): ReadonlyArray<TItem>;
}
declare module "infrastructure/formatting" {
    export function format<TItem>(enumerable: ReadonlyArray<TItem>, indentLevel: number): string;
    export function formatLine<TItem>(enumerable: ReadonlyArray<TItem>, separator: string): string;
}
declare module "language/nodeType" {
    export enum NodeType {
        AbsFunction = "AbsFunction",
        AssignmentDefinition = "AssignmentDefinition",
        AssignmentExpression = "AssignmentExpression",
        BinaryExpression = "BinaryExpression",
        BracketedExpression = "BracketedExpression",
        CaseExpression = "CaseExpression",
        ColumnHeader = "ColumnHeader",
        Comments = "Comments",
        CustomVariableDeclarationType = "CustomVariableDeclarationType",
        DayFunction = "DayFunction",
        DaysFunction = "DaysFunction",
        ElseExpression = "ElseExpression",
        EnumDefinition = "EnumDefinition",
        EnumMember = "EnumMember",
        EnumName = "EnumName",
        ExpressionList = "ExpressionList",
        ExtractResultsFunction = "ExtractResultsFunction",
        FillParametersFunction = "FillParametersFunction",
        Function = "Function",
        FunctionCallExpression = "FunctionCallExpression",
        FunctionCode = "FunctionCode",
        FunctionName = "FunctionName",
        FunctionParameters = "FunctionParameters",
        FunctionResults = "FunctionResults",
        HourFunction = "HourFunction",
        HoursFunction = "HoursFunction",
        IdentifierExpression = "IdentifierExpression",
        IfExpression = "IfExpression",
        ImplicitVariableDeclaration = "ImplicitVariableDeclaration",
        IntFunction = "IntFunction",
        LexyFunction = "LexyFunction",
        LiteralExpression = "LiteralExpression",
        LookupFunction = "LookupFunction",
        LookupRowFunction = "LookupRowFunction",
        MemberAccessExpression = "MemberAccessExpression",
        MinuteFunction = "MinuteFunction",
        MinutesFunction = "MinutesFunction",
        MonthFunction = "MonthFunction",
        MonthsFunction = "MonthsFunction",
        NewFunction = "NewFunction",
        NowFunction = "NowFunction",
        ParenthesizedExpression = "ParenthesizedExpression",
        PowerFunction = "PowerFunction",
        PrimitiveVariableDeclarationType = "PrimitiveVariableDeclarationType",
        RoundFunction = "RoundFunction",
        Scenario = "Scenario",
        ScenarioFunctionName = "ScenarioFunctionName",
        ScenarioName = "ScenarioName",
        ScenarioParameters = "ScenarioParameters",
        ScenarioResults = "ScenarioResults",
        ScenarioTable = "ScenarioTable",
        ScenarioExpectRootErrors = "ScenarioExpectRootErrors",
        ScenarioExpectError = "ScenarioExpectError",
        SecondFunction = "SecondFunction",
        SecondsFunction = "SecondsFunction",
        SourceCodeNode = "SourceCodeNode",
        SwitchExpression = "SwitchExpression",
        Table = "Table",
        TableHeader = "TableHeader",
        TableRow = "TableRow",
        TodayFunction = "TodayFunction",
        TypeDefinition = "TypeDefinition",
        VariableDeclarationExpression = "VariableDeclarationExpression",
        VariableDefinition = "VariableDefinition",
        YearFunction = "YearFunction",
        YearsFunction = "YearsFunction"
    }
}
declare module "parser/nodesLogger" {
    import type { INode } from "language/node";
    export class NodesLogger {
        private readonly builder;
        private indent;
        log(nodes: Array<INode>): void;
        private logNode;
        toString(): string;
        private instanceOfRootNode;
        private asRootNode;
    }
}
declare module "parser/parserLogger" {
    import type { IRootNode } from "language/rootNode";
    import type { INode } from "language/node";
    import type { ILogger } from "infrastructure/logger";
    import { SourceReference } from "parser/sourceReference";
    export interface IParserLogger {
        logInfo(message: string): void;
        log(reference: SourceReference, message: string): void;
        fail(reference: SourceReference, message: string): void;
        logNodes(nodes: Array<INode>): void;
        hasErrors(): boolean;
        hasRootErrors(): boolean;
        hasErrorMessage(expectedError: string): boolean;
        formatMessages(): string;
        nodeHasErrors(node: IRootNode): boolean;
        errorMessages(): string[];
        errorRootMessages(): string[];
        errorNodeMessages(node: IRootNode): string[];
        assertNoErrors(): void;
        setCurrentNode(node: IRootNode): void;
        resetCurrentNode(): void;
    }
    export class ParserLogger implements IParserLogger {
        private readonly logEntries;
        private readonly logger;
        private currentNode;
        private failedMessages;
        constructor(logger: ILogger);
        hasErrors(): boolean;
        hasRootErrors(): boolean;
        logInfo(message: string): void;
        log(reference: SourceReference, message: string): void;
        fail(reference: SourceReference, message: string): void;
        logNodes(nodes: Array<INode>): void;
        hasErrorMessage(expectedError: string): boolean;
        formatMessages(): string;
        setCurrentNode(node: IRootNode): void;
        resetCurrentNode(): void;
        nodeHasErrors(node: IRootNode): boolean;
        errorNodeMessages(node: IRootNode): string[];
        errorRootMessages(): string[];
        errorMessages(): string[];
        assertNoErrors(): void;
    }
}
declare module "language/variableTypes/typeWithMembers" {
    import { VariableType } from "language/variableTypes/variableType";
    import { ITypeWithMembers } from "language/variableTypes/ITypeWithMembers";
    import { IValidationContext } from "parser/validationContext";
    export abstract class TypeWithMembers extends VariableType implements ITypeWithMembers {
        typeWithMember: boolean;
        abstract memberType(name: string, context: IValidationContext): VariableType | null;
    }
}
declare module "parser/tokens/character" {
    export function isDigit(value: Character): boolean;
    export function isLetter(value: Character): boolean;
    export function isDigitOrLetter(value: Character): boolean;
    export function isWhitespace(value: Character): boolean;
    export function isValidIdentifier(value: string | null): boolean;
    export function isNullOrEmpty(value: string | null): value is "" | null;
    export type Character = number;
}
declare module "parser/tokens/tokenCharacter" {
    import { Character } from "parser/tokens/character";
    export class TokenCharacter {
        position: number;
        value: Character;
        constructor(value: number, position: number);
        toString(): string;
    }
}
declare module "parser/tokens/tokenType" {
    export enum TokenType {
        BooleanLiteral = "BooleanLiteral",
        BuildLiteralToken = "BuildLiteralToken",
        CommentToken = "CommentToken",
        DateTimeLiteral = "DateTimeLiteral",
        KeywordToken = "KeywordToken",
        MemberAccessLiteral = "MemberAccessLiteral",
        NumberLiteralToken = "NumberLiteralToken",
        OperatorToken = "OperatorToken",
        QuotedLiteralToken = "QuotedLiteralToken",
        StringLiteralToken = "StringLiteralToken",
        TableSeparatorToken = "TableSeparatorToken",
        WhitespaceToken = "WhitespaceToken"
    }
}
declare module "parser/tokens/token" {
    import { TokenCharacter } from "parser/tokens/tokenCharacter";
    import { TokenType } from "parser/tokens/tokenType";
    export function instanceOfToken(object: any): object is Token;
    export function asToken(object: any): Token | null;
    export interface IToken {
        tokenType: string;
        tokenIsLiteral: boolean;
        firstCharacter: TokenCharacter;
    }
    export abstract class Token implements IToken {
        abstract tokenIsLiteral: boolean;
        abstract tokenType: TokenType;
        abstract value: string;
        firstCharacter: TokenCharacter;
        protected constructor(firstCharacter: TokenCharacter);
    }
}
declare module "parser/tokens/ILiteralToken" {
    import { IToken } from "parser/tokens/token";
    import { VariableType } from "language/variableTypes/variableType";
    import type { IValidationContext } from "parser/validationContext";
    export interface ILiteralToken extends IToken {
        tokenIsLiteral: boolean;
        typedValue: Object;
        value: string;
        deriveType(context: IValidationContext): VariableType | null;
    }
}
declare module "parser/tokens/operatorType" {
    export enum OperatorType {
        NotSet = "NotSet",
        Assignment = "Assignment",
        Addition = "Addition",
        Subtraction = "Subtraction",
        Multiplication = "Multiplication",
        Division = "Division",
        Modulus = "Modulus",
        OpenParentheses = "OpenParentheses",
        CloseParentheses = "CloseParentheses",
        OpenBrackets = "OpenBrackets",
        CloseBrackets = "CloseBrackets",
        GreaterThan = "GreaterThan",
        LessThan = "LessThan",
        GreaterThanOrEqual = "GreaterThanOrEqual",
        LessThanOrEqual = "LessThanOrEqual",
        Equals = "Equals",
        NotEqual = "NotEqual",
        And = "And",
        Or = "Or",
        ArgumentSeparator = "ArgumentSeparator"
    }
}
declare module "parser/tokens/parseTokenResult" {
    import { Token } from "parser/tokens/token";
    import type { IParsableToken } from "parser/tokens/parsableToken";
    type ParseTokenInvalidResult = {
        state: "invalid";
        validationError: string;
    };
    export function newParseTokenInvalidResult(validationError: string): ParseTokenInvalidResult;
    type ParseTokenFinishedResult = {
        state: "finished";
        charProcessed: boolean;
        newToken: Token | null;
    };
    export function newParseTokenFinishedResult(charProcessed?: boolean, newToken?: Token | null): ParseTokenFinishedResult;
    type ParseTokenInProgressResult = {
        state: "inProgress";
        newToken: IParsableToken | null;
    };
    export function newParseTokenInProgressResult(newToken?: IParsableToken | null): ParseTokenInProgressResult;
    export type ParseTokenResult = ParseTokenInvalidResult | ParseTokenFinishedResult | ParseTokenInProgressResult;
}
declare module "parser/tokens/parsableToken" {
    import { ParseTokenResult } from "parser/tokens/parseTokenResult";
    import { Character } from "parser/tokens/character";
    import { TokenCharacter } from "parser/tokens/tokenCharacter";
    import { IToken, Token } from "parser/tokens/token";
    export interface IParsableToken extends IToken {
        parse(character: TokenCharacter): ParseTokenResult;
        finalize(): ParseTokenResult;
    }
    export abstract class ParsableToken extends Token {
        private valueBuilder;
        get value(): string;
        protected constructor(character: TokenCharacter, value?: string | null);
        protected appendValue(value: Character): void;
        abstract parse(character: TokenCharacter): ParseTokenResult;
        abstract finalize(): ParseTokenResult;
    }
}
declare module "parser/tokens/tokenValues" {
    export class TokenValues {
        static TableSeparator: number;
        static Quote: number;
        static Assignment: number;
        static MemberAccessString: string;
        static MemberAccess: number;
        static ArgumentSeparator: number;
        static Addition: number;
        static Subtraction: number;
        static Multiplication: number;
        static Division: number;
        static Modulus: number;
        static OpenParentheses: number;
        static CloseParentheses: number;
        static OpenBrackets: number;
        static CloseBrackets: number;
        static GreaterThan: number;
        static LessThan: number;
        static GreaterThanOrEqual: string;
        static LessThanOrEqual: string;
        static Equal: string;
        static NotEqual: string;
        static NotEqualStart: number;
        static And: number;
        static Or: number;
        static DecimalSeparator: number;
        static DateTimeStarter: string;
        static BooleanTrue: string;
        static BooleanFalse: string;
        static Dash: number;
        static Colon: number;
        static Space: number;
        static CommentChar: number;
    }
}
declare module "parser/tokens/tableSeparatorToken" {
    import { ParsableToken } from "parser/tokens/parsableToken";
    import { TokenCharacter } from "parser/tokens/tokenCharacter";
    import { ParseTokenResult } from "parser/tokens/parseTokenResult";
    import { TokenType } from "parser/tokens/tokenType";
    export function instanceOfTableSeparatorToken(object: any): object is TableSeparatorToken;
    export function asTableSeparatorToken(object: any): TableSeparatorToken | null;
    export class TableSeparatorToken extends ParsableToken {
        tokenIsLiteral: boolean;
        tokenType: TokenType;
        constructor(character: TokenCharacter);
        parse(character: TokenCharacter): ParseTokenResult;
        finalize(): ParseTokenResult;
    }
}
declare module "parser/tokens/operatorToken" {
    import type { IToken } from "parser/tokens/token";
    import { ParsableToken } from "parser/tokens/parsableToken";
    import { OperatorType } from "parser/tokens/operatorType";
    import { TokenCharacter } from "parser/tokens/tokenCharacter";
    import { ParseTokenResult } from "parser/tokens/parseTokenResult";
    import { TokenType } from "parser/tokens/tokenType";
    export function instanceOfOperatorToken(object: any): object is OperatorToken;
    export function asOperatorToken(object: any): OperatorToken | null;
    export interface IOperatorToken extends IToken {
        type: OperatorType;
    }
    export class OperatorToken extends ParsableToken implements IOperatorToken {
        tokenIsLiteral: boolean;
        tokenType: TokenType;
        type: OperatorType;
        private static readonly terminatorValues;
        private static readonly operatorCombinations;
        constructor(character: TokenCharacter);
        private terminatorValuescontains;
        parse(character: TokenCharacter): ParseTokenResult;
        finalize(): ParseTokenResult;
    }
}
declare module "parser/tokens/tokenList" {
    import { Token } from "parser/tokens/token";
    import type { ILiteralToken } from "parser/tokens/ILiteralToken";
    import { OperatorType } from "parser/tokens/operatorType";
    import type { IOperatorToken } from "parser/tokens/operatorToken";
    export class TokenList {
        private readonly values;
        get(index: number): Token;
        get length(): number;
        constructor(values: Array<Token>);
        asArray(): Array<Token>;
        isComment(): boolean;
        tokenValue(index: number): string | null;
        tokensFrom(index: number): TokenList;
        tokensFromStart(count: number): TokenList;
        tokensRange(start: number, last: number): TokenList;
        isTokenType<T>(index: number, type: any): boolean;
        token<T extends Token>(index: number, castFunction: (object: any) => T | null): T | null;
        literalToken(index: number): ILiteralToken | null;
        isLiteralToken(index: number): boolean;
        isQuotedString(index: number): boolean;
        isKeyword(index: number, keyword: string): boolean;
        isOperatorToken(index: number, type: OperatorType): boolean;
        operatorToken(index: number): IOperatorToken | null;
        toString(): string;
        private checkValidTokenIndex;
        characterPosition(tokenIndex: number): number | null;
        find<T extends Token>(func: ((where: T) => boolean), constr: Function): number;
    }
}
declare module "parser/tokens/parsableTokenResult" {
    import { SourceReference } from "parser/sourceReference";
    import { ParsableToken } from "parser/tokens/parsableToken";
    type ParsableTokenFailed = {
        state: "failed";
        errorMessage: string;
        reference: SourceReference;
    };
    export function newParsableTokenFailed(reference: SourceReference, errorMessage: string): ParsableTokenFailed;
    type ParsableTokenSuccess = {
        state: "success";
        result: ParsableToken;
    };
    export function newParsableTokenSuccess(result: ParsableToken): {
        readonly state: "success";
        readonly result: ParsableToken;
    };
    export type ParsableTokenResult = ParsableTokenFailed | ParsableTokenSuccess;
}
declare module "parser/tokens/tokenizeResult" {
    import { SourceReference } from "parser/sourceReference";
    import { TokenList } from "parser/tokens/tokenList";
    export type TokenizeFailed = {
        state: 'failed';
        reference: SourceReference;
        errorMessage: string;
    };
    export function newTokenizeFailed(reference: SourceReference, errorMessage: string): {
        readonly state: "failed";
        readonly reference: SourceReference;
        readonly errorMessage: string;
    };
    type TokenizeSuccess = {
        state: 'success';
        result: TokenList;
    };
    export function newTokenizeSuccess(result: TokenList): {
        readonly state: "success";
        readonly result: TokenList;
    };
    export type TokenizeResult = TokenizeFailed | TokenizeSuccess;
}
declare module "parser/tokens/commentToken" {
    import { ParsableToken } from "parser/tokens/parsableToken";
    import { TokenCharacter } from "parser/tokens/tokenCharacter";
    import { ParseTokenResult } from "parser/tokens/parseTokenResult";
    import { TokenType } from "parser/tokens/tokenType";
    export function instanceOfCommentToken(object: any): boolean;
    export function asCommentToken(object: any): CommentToken | null;
    export class CommentToken extends ParsableToken {
        tokenIsLiteral: boolean;
        tokenType: TokenType;
        constructor(character: TokenCharacter);
        parse(character: TokenCharacter): ParseTokenResult;
        finalize(): ParseTokenResult;
    }
}
declare module "language/variableTypes/typeNames" {
    export class TypeNames {
        static readonly number: string;
        static readonly boolean: string;
        static readonly date: string;
        static readonly string: string;
        private static readonly existing;
        static contains(parameterType: string): boolean;
    }
}
declare module "language/variableTypes/variableTypeName" {
    export enum VariableTypeName {
        ComplexType = "ComplexType",
        CustomType = "CustomType",
        EnumType = "EnumType",
        FunctionType = "FunctionType",
        PrimitiveType = "PrimitiveType",
        TableType = "TableType",
        VoidType = "VoidType"
    }
}
declare module "language/variableTypes/primitiveType" {
    import { VariableType } from "language/variableTypes/variableType";
    import { VariableTypeName } from "language/variableTypes/variableTypeName";
    export function instanceOfPrimitiveType(object: any): object is PrimitiveType;
    export function asPrimitiveType(object: any): PrimitiveType | null;
    export class PrimitiveType extends VariableType {
        static readonly boolean: PrimitiveType;
        static readonly string: PrimitiveType;
        static readonly number: PrimitiveType;
        static readonly date: PrimitiveType;
        readonly variableTypeName = VariableTypeName.PrimitiveType;
        type: string;
        private constructor();
        equals(other: VariableType | null): boolean;
        toString(): string;
        static parse(type: string): PrimitiveType;
    }
}
declare module "parser/tokens/quotedLiteralToken" {
    import { ParsableToken } from "parser/tokens/parsableToken";
    import { ILiteralToken } from "parser/tokens/ILiteralToken";
    import { TokenCharacter } from "parser/tokens/tokenCharacter";
    import { ParseTokenResult } from "parser/tokens/parseTokenResult";
    import { IValidationContext } from "parser/validationContext";
    import { VariableType } from "language/variableTypes/variableType";
    import { TokenType } from "parser/tokens/tokenType";
    export function instanceOfQuotedLiteralToken(object: any): object is QuotedLiteralToken;
    export function asQuotedLiteralToken(object: any): QuotedLiteralToken | null;
    export class QuotedLiteralToken extends ParsableToken implements ILiteralToken {
        private quoteClosed;
        tokenIsLiteral: boolean;
        tokenType: TokenType;
        constructor(character: TokenCharacter);
        get typedValue(): string;
        deriveType(context: IValidationContext): VariableType;
        parse(character: TokenCharacter): ParseTokenResult;
        finalize(): ParseTokenResult;
        toString(): string;
    }
}
declare module "parser/tokens/numberLiteralToken" {
    import type { IValidationContext } from "parser/validationContext";
    import type { ILiteralToken } from "parser/tokens/ILiteralToken";
    import { ParsableToken } from "parser/tokens/parsableToken";
    import { TokenCharacter } from "parser/tokens/tokenCharacter";
    import { ParseTokenResult } from "parser/tokens/parseTokenResult";
    import { VariableType } from "language/variableTypes/variableType";
    import { TokenType } from "parser/tokens/tokenType";
    export function instanceOfNumberLiteralToken(object: any): object is NumberLiteralToken;
    export function asNumberLiteralToken(object: any): NumberLiteralToken | null;
    export class NumberLiteralToken extends ParsableToken implements ILiteralToken {
        private allowedNextTokensValues;
        private hasDecimalSeparator;
        private numberValueValue;
        tokenIsLiteral: boolean;
        tokenType: TokenType;
        get numberValue(): number;
        constructor(value: number | null, character: TokenCharacter);
        get value(): string;
        get typedValue(): number;
        deriveType(context: IValidationContext): VariableType | null;
        parse(character: TokenCharacter): ParseTokenResult;
        finalize(): ParseTokenResult;
        isDecimal(): boolean;
        toString(): string;
    }
}
declare module "formatting/formatLine" {
    export function formatLine<T>(value: Array<T>, separator: string): string;
}
declare module "parser/tokens/dateTimeLiteral" {
    import { ParsableToken } from "parser/tokens/parsableToken";
    import { ILiteralToken } from "parser/tokens/ILiteralToken";
    import { ParseTokenResult } from "parser/tokens/parseTokenResult";
    import { TokenCharacter } from "parser/tokens/tokenCharacter";
    import { IValidationContext } from "parser/validationContext";
    import { VariableType } from "language/variableTypes/variableType";
    import { TokenType } from "parser/tokens/tokenType";
    export function instanceOfDateTimeLiteral(object: any): boolean;
    export function asDateTimeLiteral(object: any): DateTimeLiteral | null;
    export class DateTimeLiteral extends ParsableToken implements ILiteralToken {
        private static readonly DigitIndexes;
        private static readonly DashIndexes;
        private static readonly TIndexes;
        private static readonly ColonIndexes;
        private static readonly ValidLengths;
        private readonly validators;
        private index;
        dateTimeValue: Date | null;
        tokenIsLiteral: boolean;
        tokenType: TokenType;
        constructor(character: TokenCharacter);
        get typedValue(): object;
        deriveType(context: IValidationContext): VariableType;
        parse(character: TokenCharacter): ParseTokenResult;
        static parseValue(value: string): Date | null;
        private validateExact;
        private validate;
        finalize(): ParseTokenResult;
        toString(): string;
    }
}
declare module "parser/tokens/keywordToken" {
    import { Token } from "parser/tokens/token";
    import { TokenCharacter } from "parser/tokens/tokenCharacter";
    import { TokenType } from "parser/tokens/tokenType";
    export function instanceOfKeywordToken(object: any): boolean;
    export function asKeywordToken(object: any): KeywordToken | null;
    export class KeywordToken extends Token {
        tokenIsLiteral: boolean;
        tokenType: TokenType;
        value: string;
        constructor(keyword: string, character: TokenCharacter);
    }
}
declare module "language/variableReference" {
    export class VariableReference {
        readonly path: string[];
        get parentIdentifier(): string;
        get hasChildIdentifiers(): boolean;
        get parts(): number;
        constructor(variablePath: string[]);
        toString(): string;
        childrenReference(): VariableReference;
        static parse(key: string): VariableReference;
    }
}
declare module "parser/tokens/memberAccessLiteral" {
    import { Token } from "parser/tokens/token";
    import { ILiteralToken } from "parser/tokens/ILiteralToken";
    import { TokenCharacter } from "parser/tokens/tokenCharacter";
    import { VariableType } from "language/variableTypes/variableType";
    import { IValidationContext } from "parser/validationContext";
    import { TokenType } from "parser/tokens/tokenType";
    export function instanceOfMemberAccessLiteral(object: any): boolean;
    export function asMemberAccessLiteral(object: any): MemberAccessLiteral | null;
    export class MemberAccessLiteral extends Token implements ILiteralToken {
        get parent(): string;
        get member(): string;
        readonly parts: string[];
        tokenIsLiteral: boolean;
        tokenType: TokenType;
        constructor(value: string, character: TokenCharacter);
        value: string;
        get typedValue(): string;
        deriveType(context: IValidationContext): VariableType | null;
        toString(): string;
    }
}
declare module "parser/tokens/stringLiteralToken" {
    import { Token } from "parser/tokens/token";
    import { ILiteralToken } from "parser/tokens/ILiteralToken";
    import { TokenCharacter } from "parser/tokens/tokenCharacter";
    import { IValidationContext } from "parser/validationContext";
    import { VariableType } from "language/variableTypes/variableType";
    import { TokenType } from "parser/tokens/tokenType";
    export function instanceOfStringLiteralToken(object: any): boolean;
    export function asStringLiteralToken(object: any): StringLiteralToken | null;
    export class StringLiteralToken extends Token implements ILiteralToken {
        value: string;
        tokenIsLiteral: boolean;
        tokenType: TokenType;
        constructor(value: string, character: TokenCharacter);
        get typedValue(): string;
        deriveType(context: IValidationContext): VariableType | null;
        toString(): string;
    }
}
declare module "parser/tokens/booleanLiteral" {
    import { Token } from "parser/tokens/token";
    import { ILiteralToken } from "parser/tokens/ILiteralToken";
    import { TokenCharacter } from "parser/tokens/tokenCharacter";
    import { IValidationContext } from "parser/validationContext";
    import { VariableType } from "language/variableTypes/variableType";
    import { TokenType } from "parser/tokens/tokenType";
    export function instanceOfBooleanLiteral(object: any): boolean;
    export function asBooleanLiteral(object: any): BooleanLiteral | null;
    export class BooleanLiteral extends Token implements ILiteralToken {
        booleanValue: boolean;
        tokenIsLiteral: boolean;
        tokenType: TokenType;
        constructor(value: boolean, character: TokenCharacter);
        get typedValue(): boolean;
        get value(): string;
        deriveType(context: IValidationContext): VariableType;
        static parse(value: string, character: TokenCharacter): BooleanLiteral;
        static isValid(value: string): boolean;
        toString(): string;
    }
}
declare module "parser/Keywords" {
    export class Keywords {
        static readonly FunctionKeyword = "Function:";
        static readonly EnumKeyword = "Enum:";
        static readonly TableKeyword = "Table:";
        static readonly TypeKeyword = "Type:";
        static readonly ScenarioKeyword = "Scenario:";
        static readonly Function = "Function";
        static readonly ValidationTable = "ValidationTable";
        static readonly If = "if";
        static readonly Else = "else";
        static readonly Switch = "switch";
        static readonly Case = "case";
        static readonly Default = "default";
        static readonly For = "for";
        static readonly From = "from";
        static readonly To = "to";
        static readonly While = "while";
        static readonly Include = "Include";
        static readonly Parameters = "Parameters";
        static readonly Results = "Results";
        static readonly Code = "Code";
        static readonly ExpectError = "ExpectError";
        static readonly ExpectRootErrors = "ExpectRootErrors";
        static readonly ImplicitVariableDeclaration = "var";
        private static readonly values;
        static contains(keyword: string): boolean;
    }
}
declare module "parser/tokens/buildLiteralToken" {
    import { ParsableToken } from "parser/tokens/parsableToken";
    import { TokenCharacter } from "parser/tokens/tokenCharacter";
    import { ParseTokenResult } from "parser/tokens/parseTokenResult";
    import { TokenType } from "parser/tokens/tokenType";
    export class BuildLiteralToken extends ParsableToken {
        private static terminatorValues;
        tokenIsLiteral: boolean;
        tokenType: TokenType;
        private hasMemberAccessor;
        private lastMemberAccessor;
        constructor(character: TokenCharacter);
        parse(character: TokenCharacter): ParseTokenResult;
        finalize(): ParseTokenResult;
        private sealLiteral;
    }
}
declare module "parser/tokens/whitespaceToken" {
    import { ParseTokenResult } from "parser/tokens/parseTokenResult";
    import { ParsableToken } from "parser/tokens/parsableToken";
    import { TokenCharacter } from "parser/tokens/tokenCharacter";
    import { TokenType } from "parser/tokens/tokenType";
    export function instanceOfWhitespaceToken(object: any): object is WhitespaceToken;
    export function asTableSeparatorToken(object: any): WhitespaceToken | null;
    export class WhitespaceToken extends ParsableToken {
        tokenIsLiteral: boolean;
        tokenType: TokenType;
        constructor(character: TokenCharacter);
        parse(character: TokenCharacter | null): ParseTokenResult;
        finalize(): ParseTokenResult;
    }
}
declare module "parser/tokens/tokenizer" {
    import { Line } from "parser/line";
    import { ParsableTokenResult } from "parser/tokens/parsableTokenResult";
    import { TokenizeResult } from "parser/tokens/tokenizeResult";
    import { TokenCharacter } from "parser/tokens/tokenCharacter";
    export interface ITokenizer {
        tokenize(line: Line): TokenizeResult;
    }
    export class Tokenizer implements ITokenizer {
        private static discardWhitespace;
        startToken(character: TokenCharacter, index: number, line: Line): ParsableTokenResult;
        tokenize(line: Line): TokenizeResult;
    }
}
declare module "parser/line" {
    import type { ITokenizer } from "parser/tokens/tokenizer";
    import type { IParserLogger } from "parser/parserLogger";
    import { SourceFile } from "parser/sourceFile";
    import { SourceReference } from "parser/sourceReference";
    import { TokenizeResult } from "parser/tokens/tokenizeResult";
    import { TokenList } from "parser/tokens/tokenList";
    export class Line {
        tokensValues: TokenList | null;
        index: number;
        content: string;
        file: SourceFile;
        get tokens(): TokenList;
        constructor(index: number, content: string, file: SourceFile);
        indent(logger: IParserLogger): number | null;
        toString(): string;
        isEmpty(): boolean;
        firstCharacter(): number;
        tokenReference(tokenIndex: number): SourceReference;
        lineEndReference(): SourceReference;
        lineStartReference(): SourceReference;
        lineReference(characterIndex: number): SourceReference;
        tokenize(tokenizer: ITokenizer): TokenizeResult;
    }
}
declare module "language/expressions/expressionSource" {
    import { SourceFile } from "parser/sourceFile";
    import { Line } from "parser/line";
    import { TokenList } from "parser/tokens/tokenList";
    import { SourceReference } from "parser/sourceReference";
    export class ExpressionSource {
        file: SourceFile;
        line: Line;
        tokens: TokenList;
        constructor(line: Line, tokens: TokenList);
        createReference(tokenIndex?: number): SourceReference;
    }
}
declare module "language/expressions/expression" {
    import type { IValidationContext } from "parser/validationContext";
    import { Node } from "language/node";
    import { ExpressionSource } from "language/expressions/expressionSource";
    import { SourceReference } from "parser/sourceReference";
    import { VariableType } from "language/variableTypes/variableType";
    export abstract class Expression extends Node {
        source: ExpressionSource;
        protected constructor(source: ExpressionSource, reference: SourceReference);
        toString(): string;
        abstract deriveType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/expressions/parseExpressionResult" {
    import { Expression } from "language/expressions/expression";
    export type ParseExpressionFailed = {
        state: "failed";
        errorMessage: string;
    };
    export function newParseExpressionFailed(typeName: string, errorMessage: string): ParseExpressionFailed;
    export type ParseExpressionSuccess = {
        state: "success";
        result: Expression;
    };
    export function newParseExpressionSuccess(result: Expression): {
        readonly state: "success";
        readonly result: Expression;
    };
    export type ParseExpressionResult = ParseExpressionFailed | ParseExpressionSuccess;
}
declare module "parser/tokenValidator" {
    import { IParserLogger } from "parser/parserLogger";
    import { Line } from "parser/line";
    import { OperatorType } from "parser/tokens/operatorType";
    import { Token } from "parser/tokens/token";
    import { TokenType } from "parser/tokens/tokenType";
    export class TokenValidator {
        private readonly logger;
        private readonly line;
        private readonly parserName;
        private readonly tokens;
        private errorsExpected;
        isValid: boolean;
        constructor(parserName: string, line: Line, logger: IParserLogger);
        count(count: number): TokenValidator;
        countMinimum(count: number): TokenValidator;
        keyword(index: number, keyword?: string | null): TokenValidator;
        stringLiteral(index: number, value?: string | null): TokenValidator;
        operator(index: number, operatorType: OperatorType): TokenValidator;
        memberAccess(index: number, value: string | null): TokenValidator;
        comment(index: number): TokenValidator;
        quotedString(index: number, literal?: string | null): TokenValidator;
        numberLiteral(index: number, value?: number | null): TokenValidator;
        boolean(index: number, value: boolean): TokenValidator;
        dateTime(index: number, year: number, month: number, day: number, hours: number, minutes: number, seconds: number): TokenValidator;
        type<T extends Token>(index: number, tokenType: TokenType): this;
        isLiteralToken(index: number): TokenValidator;
        private validateType;
        value(index: number, expectedValue: string): TokenValidator;
        private checkValidTokenIndex;
        private fail;
        assert(): void;
    }
}
declare module "parser/ParseLineContext" {
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import type { IParserLogger } from "parser/parserLogger";
    import { Line } from "parser/line";
    import { TokenValidator } from "parser/tokenValidator";
    import { SourceReference } from "parser/sourceReference";
    export interface IParseLineContext {
        line: Line;
        logger: IParserLogger;
        expressionFactory: IExpressionFactory;
        validateTokens(name: string): TokenValidator;
        failed<T>(result: {
            state: string;
            errorMessage?: string;
        }, reference: SourceReference): boolean;
    }
    export class ParseLineContext implements IParseLineContext {
        readonly line: Line;
        readonly logger: IParserLogger;
        readonly expressionFactory: IExpressionFactory;
        constructor(line: Line, logger: IParserLogger, expressionFactory: IExpressionFactory);
        validateTokens(name: string): TokenValidator;
        failed<T>(result: {
            state: string;
            errorMessage: string;
        }, reference: SourceReference): boolean;
    }
}
declare module "language/expressions/IChildExpression" {
    import type { IParseLineContext } from "parser/ParseLineContext";
    import type { INode } from "language/node";
    export function instanceOfChildExpression(object: any): object is IChildExpression;
    export function asChildExpression(object: any): IChildExpression | null;
    export interface IChildExpression extends INode {
        isChildExpression: true;
        validateParentExpression(expression: IParentExpression | null, context: IParseLineContext): boolean;
    }
    export function instanceOfParentExpression(object: any): object is IParentExpression;
    export function asParentExpression(object: any): IParentExpression | null;
    export interface IParentExpression extends INode {
        isParentExpression: true;
        linkChildExpression(expression: IChildExpression): void;
    }
}
declare module "infrastructure/assert" {
    export class Assert {
        static notNull<TValue>(value: TValue | null, name: string): TValue;
    }
}
declare module "language/expressions/expressionList" {
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import type { IValidationContext } from "parser/validationContext";
    import type { IParseLineContext } from "parser/ParseLineContext";
    import type { INode } from "language/node";
    import { Expression } from "language/expressions/expression";
    import { Node } from "language/node";
    import { SourceReference } from "parser/sourceReference";
    import { ParseExpressionResult } from "language/expressions/parseExpressionResult";
    import { NodeType } from "language/nodeType";
    export class ExpressionList extends Node {
        private factory;
        private readonly values;
        nodeType: NodeType;
        get length(): number;
        constructor(reference: SourceReference, factory: IExpressionFactory);
        asArray(): Array<Expression>;
        get(index: number): Expression;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        validateTree(context: IValidationContext): void;
        parse(context: IParseLineContext): ParseExpressionResult;
        private add;
        private addToParent;
    }
}
declare module "language/expressions/elseExpression" {
    import type { INode } from "language/node";
    import type { IChildExpression, IParentExpression } from "language/expressions/IChildExpression";
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import type { IValidationContext } from "parser/validationContext";
    import type { IParseLineContext } from "parser/ParseLineContext";
    import { Expression } from "language/expressions/expression";
    import { IParsableNode } from "language/parsableNode";
    import { ExpressionSource } from "language/expressions/expressionSource";
    import { SourceReference } from "parser/sourceReference";
    import { ParseExpressionResult } from "language/expressions/parseExpressionResult";
    import { TokenList } from "parser/tokens/tokenList";
    import { VariableType } from "language/variableTypes/variableType";
    import { NodeType } from "language/nodeType";
    export function instanceOfElseExpression(object: any): object is ElseExpression;
    export function asElseExpression(object: any): ElseExpression | null;
    export class ElseExpression extends Expression implements IParsableNode, IChildExpression {
        private readonly falseExpressionsValue;
        readonly isParsableNode = true;
        readonly isChildExpression = true;
        readonly nodeType = NodeType.ElseExpression;
        get falseExpressions(): ReadonlyArray<Expression>;
        constructor(source: ExpressionSource, reference: SourceReference, factory: IExpressionFactory);
        validateParentExpression(expression: IParentExpression | null, context: IParseLineContext): boolean;
        getChildren(): Array<INode>;
        parse(context: IParseLineContext): IParsableNode;
        static parse(source: ExpressionSource, factory: IExpressionFactory): ParseExpressionResult;
        static isValid(tokens: TokenList): boolean;
        protected validate(context: IValidationContext): void;
        deriveType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/expressions/ifExpression" {
    import type { IParseLineContext } from "parser/ParseLineContext";
    import type { INode } from "language/node";
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import type { IValidationContext } from "parser/validationContext";
    import type { IChildExpression, IParentExpression } from "language/expressions/IChildExpression";
    import { Expression } from "language/expressions/expression";
    import { IParsableNode } from "language/parsableNode";
    import { ElseExpression } from "language/expressions/elseExpression";
    import { ExpressionSource } from "language/expressions/expressionSource";
    import { SourceReference } from "parser/sourceReference";
    import { ParseExpressionResult } from "language/expressions/parseExpressionResult";
    import { TokenList } from "parser/tokens/tokenList";
    import { VariableType } from "language/variableTypes/variableType";
    import { NodeType } from "language/nodeType";
    export function instanceOfIfExpression(object: any): boolean;
    export function asIfExpression(object: any): IfExpression | null;
    export class IfExpression extends Expression implements IParsableNode, IParentExpression {
        private readonly trueExpressionsValues;
        readonly isParentExpression = true;
        readonly isParsableNode = true;
        readonly nodeType = NodeType.IfExpression;
        condition: Expression;
        else: ElseExpression | null;
        get trueExpressions(): ReadonlyArray<Expression>;
        constructor(condition: Expression, source: ExpressionSource, reference: SourceReference, factory: IExpressionFactory);
        parse(context: IParseLineContext): IParsableNode;
        getChildren(): Array<INode>;
        static parse(source: ExpressionSource, factory: IExpressionFactory): ParseExpressionResult;
        static isValid(tokens: TokenList): boolean;
        protected validate(context: IValidationContext): void;
        linkElse(elseExpression: ElseExpression): void;
        deriveType(context: IValidationContext): VariableType | null;
        linkChildExpression(expression: IChildExpression): void;
    }
}
declare module "language/expressions/caseExpression" {
    import type { IParseLineContext } from "parser/ParseLineContext";
    import type { INode } from "language/node";
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import type { IValidationContext } from "parser/validationContext";
    import { Expression } from "language/expressions/expression";
    import { VariableType } from "language/variableTypes/variableType";
    import { IParsableNode } from "language/parsableNode";
    import { ExpressionSource } from "language/expressions/expressionSource";
    import { SourceReference } from "parser/sourceReference";
    import { ParseExpressionResult } from "language/expressions/parseExpressionResult";
    import { TokenList } from "parser/tokens/tokenList";
    import { NodeType } from "language/nodeType";
    export function instanceOfCaseExpression(object: any): object is CaseExpression;
    export function asCaseExpression(object: any): CaseExpression | null;
    export class CaseExpression extends Expression implements IParsableNode {
        private readonly expressionsValues;
        readonly isParsableNode = true;
        readonly isChildExpression = true;
        readonly isDefault: boolean;
        readonly nodeType = NodeType.CaseExpression;
        readonly value: Expression | null;
        get expressions(): Array<Expression>;
        constructor(value: Expression | null, isDefault: boolean, source: ExpressionSource, reference: SourceReference, factory: IExpressionFactory);
        parse(context: IParseLineContext): IParsableNode;
        getChildren(): Array<INode>;
        static parse(source: ExpressionSource, factory: IExpressionFactory): ParseExpressionResult;
        private static parseDefaultCase;
        static isValid(tokens: TokenList): boolean;
        protected validate(context: IValidationContext): void;
        deriveType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/expressions/switchExpression" {
    import type { INode } from "language/node";
    import type { IParseLineContext } from "parser/ParseLineContext";
    import type { IValidationContext } from "parser/validationContext";
    import type { IParsableNode } from "language/parsableNode";
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import { Expression } from "language/expressions/expression";
    import { CaseExpression } from "language/expressions/caseExpression";
    import { ExpressionSource } from "language/expressions/expressionSource";
    import { SourceReference } from "parser/sourceReference";
    import { ParseExpressionResult } from "language/expressions/parseExpressionResult";
    import { TokenList } from "parser/tokens/tokenList";
    import { VariableType } from "language/variableTypes/variableType";
    import { NodeType } from "language/nodeType";
    export function instanceOfSwitchExpression(object: any): boolean;
    export function asSwitchExpression(object: any): SwitchExpression | null;
    export class SwitchExpression extends Expression implements IParsableNode {
        private readonly factory;
        readonly isParsableNode = true;
        readonly nodeType = NodeType.SwitchExpression;
        readonly condition: Expression;
        readonly cases: Array<CaseExpression>;
        constructor(condition: Expression, source: ExpressionSource, reference: SourceReference, factory: IExpressionFactory);
        parse(context: IParseLineContext): IParsableNode;
        getChildren(): Array<INode>;
        static parse(source: ExpressionSource, factory: IExpressionFactory): ParseExpressionResult;
        static isValid(tokens: TokenList): boolean;
        protected validate(context: IValidationContext): void;
        deriveType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/variableTypes/variableDeclarationType" {
    import { VariableType } from "language/variableTypes/variableType";
    import { SourceReference } from "parser/sourceReference";
    import { Node } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    export abstract class VariableDeclarationType extends Node {
        private variableTypeValue;
        get variableType(): VariableType | null;
        protected constructor(reference: SourceReference);
        protected setVariableType(value: VariableType | null): void;
        abstract createVariableType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/variableTypes/implicitVariableDeclaration" {
    import { VariableDeclarationType } from "language/variableTypes/variableDeclarationType";
    import { VariableType } from "language/variableTypes/variableType";
    import { SourceReference } from "parser/sourceReference";
    import { IValidationContext } from "parser/validationContext";
    import { INode } from "language/node";
    import { NodeType } from "language/nodeType";
    export function instanceOfImplicitVariableDeclaration(object: any): boolean;
    export function asImplicitVariableDeclaration(object: any): ImplicitVariableDeclaration | null;
    export class ImplicitVariableDeclaration extends VariableDeclarationType {
        nodeType: NodeType;
        constructor(reference: SourceReference);
        createVariableType(context: IValidationContext): VariableType;
        define(variableType: VariableType): void;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
    }
}
declare module "language/variableSource" {
    export enum VariableSource {
        Unknown = "Unknown",
        Parameters = "Parameters",
        Results = "Results",
        Code = "Code",
        Type = "Type"
    }
}
declare module "language/variableTypes/primitiveVariableDeclarationType" {
    import { VariableDeclarationType } from "language/variableTypes/variableDeclarationType";
    import { SourceReference } from "parser/sourceReference";
    import { IValidationContext } from "parser/validationContext";
    import { VariableType } from "language/variableTypes/variableType";
    import { INode } from "language/node";
    import { NodeType } from "language/nodeType";
    export function instanceOfPrimitiveVariableDeclarationType(object: any): boolean;
    export function asPrimitiveVariableDeclarationType(object: any): PrimitiveVariableDeclarationType | null;
    export class PrimitiveVariableDeclarationType extends VariableDeclarationType {
        nodeType: NodeType;
        type: string;
        constructor(type: string, reference: SourceReference);
        protected equals(other: PrimitiveVariableDeclarationType): boolean;
        toString(): string;
        createVariableType(context: IValidationContext): VariableType;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
    }
}
declare module "language/IHasNodeDependencies" {
    import type { IRootNode } from "language/rootNode";
    import { RootNodeList } from "language/rootNodeList";
    export function instanceOfHasNodeDependencies(object: any): object is IHasNodeDependencies;
    export function asHasNodeDependencies(object: any): IHasNodeDependencies | null;
    export interface IHasNodeDependencies {
        hasNodeDependencies: true;
        getDependencies(rootNodeList: RootNodeList): ReadonlyArray<IRootNode>;
    }
}
declare module "language/types/typeName" {
    export class TypeName {
        private valueValue;
        get value(): string;
        parseName(parameter: string): void;
    }
}
declare module "language/enums/enumName" {
    import { SourceReference } from "parser/sourceReference";
    import { INode, Node } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    import { NodeType } from "language/nodeType";
    export class EnumName extends Node {
        private valueValue;
        nodeType: NodeType;
        get value(): string;
        constructor(sourceReference: SourceReference);
        parseName(parameter: string): void;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
    }
}
declare module "language/enums/enumMember" {
    import { NumberLiteralToken } from "parser/tokens/numberLiteralToken";
    import { SourceReference } from "parser/sourceReference";
    import { INode, Node } from "language/node";
    import { IParseLineContext } from "parser/ParseLineContext";
    import { IValidationContext } from "parser/validationContext";
    import { NodeType } from "language/nodeType";
    export class EnumMember extends Node {
        nodeType: NodeType;
        name: string;
        valueLiteral: NumberLiteralToken | null;
        numberValue: number;
        constructor(name: string, reference: SourceReference, valueLiteral: NumberLiteralToken | null, value: number);
        static parse(context: IParseLineContext, lastIndex: number): EnumMember | null;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        private validateMemberName;
        private validateMemberValues;
    }
}
declare module "parser/nodeName" {
    import { IParseLineContext } from "parser/ParseLineContext";
    export class NodeName {
        readonly name: string | null;
        readonly keyword: string;
        constructor(keyword: string, name: string | null);
        static parse(context: IParseLineContext): NodeName | null;
        toString(): string;
    }
}
declare module "language/duplicateChecker" {
    import type { IValidationContext } from "parser/validationContext";
    import { SourceReference } from "parser/sourceReference";
    export class DuplicateChecker {
        static validate<T>(context: IValidationContext, getReference: ((value: T) => SourceReference), getName: ((value: T) => string), getErrorMessage: ((value: T) => string), values: Array<T>): void;
    }
}
declare module "language/enums/enumDefinition" {
    import { RootNode } from "language/rootNode";
    import { EnumName } from "language/enums/enumName";
    import { EnumMember } from "language/enums/enumMember";
    import { SourceReference } from "parser/sourceReference";
    import { IParsableNode } from "language/parsableNode";
    import { IParseLineContext } from "parser/ParseLineContext";
    import { INode } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    import { NodeType } from "language/nodeType";
    export function instanceOfEnumDefinition(object: any): boolean;
    export function asEnumDefinition(object: any): EnumDefinition | null;
    export class EnumDefinition extends RootNode {
        name: EnumName;
        nodeType: NodeType;
        get nodeName(): string;
        readonly members: Array<EnumMember>;
        constructor(name: string, reference: SourceReference);
        static parse(name: string, reference: SourceReference): EnumDefinition;
        parse(context: IParseLineContext): IParsableNode;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        containsMember(name: string): boolean;
    }
}
declare module "language/variableTypes/enumType" {
    import type { IRootNode } from "language/rootNode";
    import type { IValidationContext } from "parser/validationContext";
    import { TypeWithMembers } from "language/variableTypes/typeWithMembers";
    import { EnumDefinition } from "language/enums/enumDefinition";
    import { VariableType } from "language/variableTypes/variableType";
    import { RootNodeList } from "language/rootNodeList";
    import { VariableTypeName } from "language/variableTypes/variableTypeName";
    export function instanceOfEnumType(object: any): object is EnumType;
    export function asEnumType(object: any): EnumType | null;
    export class EnumType extends TypeWithMembers {
        readonly variableTypeName = VariableTypeName.EnumType;
        type: string;
        enum: EnumDefinition;
        constructor(type: string, enumDefinition: EnumDefinition);
        equals(other: VariableType | null): boolean;
        toString(): string;
        memberType(name: string, context: IValidationContext): VariableType | null;
        getDependencies(rootNodeList: RootNodeList): Array<IRootNode>;
        firstMemberName(): string | undefined;
    }
}
declare module "language/expressions/memberAccessExpression" {
    import type { IRootNode } from "language/rootNode";
    import type { INode } from "language/node";
    import type { IValidationContext } from "parser/validationContext";
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import type { IHasNodeDependencies } from "language/IHasNodeDependencies";
    import { Expression } from "language/expressions/expression";
    import { VariableReference } from "language/variableReference";
    import { VariableType } from "language/variableTypes/variableType";
    import { SourceReference } from "parser/sourceReference";
    import { ExpressionSource } from "language/expressions/expressionSource";
    import { MemberAccessLiteral } from "parser/tokens/memberAccessLiteral";
    import { VariableSource } from "language/variableSource";
    import { RootNodeList } from "language/rootNodeList";
    import { ParseExpressionResult } from "language/expressions/parseExpressionResult";
    import { TokenList } from "parser/tokens/tokenList";
    import { NodeType } from "language/nodeType";
    export function asMemberAccessExpression(object: any): MemberAccessExpression | null;
    export class MemberAccessExpression extends Expression implements IHasNodeDependencies {
        readonly hasNodeDependencies = true;
        nodeType: NodeType;
        readonly memberAccessLiteral: MemberAccessLiteral;
        readonly variable: VariableReference;
        variableSource: VariableSource;
        variableType: VariableType | null;
        parentVariableType: VariableType | null;
        constructor(variable: VariableReference, literal: MemberAccessLiteral, source: ExpressionSource, reference: SourceReference);
        getDependencies(rootNodeList: RootNodeList): Array<IRootNode>;
        static parse(source: ExpressionSource, factory: IExpressionFactory): ParseExpressionResult;
        static isValid(tokens: TokenList): boolean;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        private validateMemberType;
        private setVariableSource;
        deriveType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/expressions/literalExpression" {
    import type { ILiteralToken } from "parser/tokens/ILiteralToken";
    import type { INode } from "language/node";
    import type { IValidationContext } from "parser/validationContext";
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import { Expression } from "language/expressions/expression";
    import { ExpressionSource } from "language/expressions/expressionSource";
    import { SourceReference } from "parser/sourceReference";
    import { ParseExpressionResult } from "language/expressions/parseExpressionResult";
    import { TokenList } from "parser/tokens/tokenList";
    import { VariableType } from "language/variableTypes/variableType";
    import { NodeType } from "language/nodeType";
    export function instanceOfLiteralExpression(object: any): boolean;
    export function asLiteralExpression(object: any): LiteralExpression | null;
    export class LiteralExpression extends Expression {
        nodeType: NodeType;
        literal: ILiteralToken;
        constructor(literal: ILiteralToken, source: ExpressionSource, reference: SourceReference);
        static parse(source: ExpressionSource, factory: IExpressionFactory): ParseExpressionResult;
        private static negativeNumeric;
        static isValid(tokens: TokenList): boolean;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        deriveType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/variableTypes/validationContextExtensions" {
    import type { IValidationContext } from "parser/validationContext";
    import type { SourceReference } from "parser/sourceReference";
    import { Expression } from "language/expressions/expression";
    import { VariableDeclarationType } from "language/variableTypes/variableDeclarationType";
    export function validateTypeAndDefault(context: IValidationContext, reference: SourceReference, type: VariableDeclarationType, defaultValueExpression: Expression | null): void;
}
declare module "language/variableDefinition" {
    import type { INode } from "language/node";
    import type { IHasNodeDependencies } from "language/IHasNodeDependencies";
    import type { IValidationContext } from "parser/validationContext";
    import type { IParseLineContext } from "parser/ParseLineContext";
    import type { IRootNode } from "language/rootNode";
    import { VariableType } from "language/variableTypes/variableType";
    import { VariableDeclarationType } from "language/variableTypes/variableDeclarationType";
    import { SourceReference } from "parser/sourceReference";
    import { Expression } from "language/expressions/expression";
    import { VariableSource } from "language/variableSource";
    import { Node } from "language/node";
    import { RootNodeList } from "language/rootNodeList";
    import { NodeType } from "language/nodeType";
    export class VariableDefinition extends Node implements IHasNodeDependencies {
        readonly hasNodeDependencies = true;
        readonly nodeType = NodeType.VariableDefinition;
        readonly defaultExpression: Expression | null;
        readonly source: VariableSource;
        readonly type: VariableDeclarationType;
        readonly name: string;
        private variableTypeValue;
        get variableType(): VariableType | null;
        constructor(name: string, type: VariableDeclarationType, source: VariableSource, reference: SourceReference, defaultExpression?: Expression | null);
        getDependencies(rootNodeList: RootNodeList): Array<IRootNode>;
        static parse(source: VariableSource, context: IParseLineContext): VariableDefinition | null;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
    }
}
declare module "language/types/typeDefinition" {
    import type { IValidationContext } from "parser/validationContext";
    import type { IParseLineContext } from "parser/ParseLineContext";
    import type { IParsableNode } from "language/parsableNode";
    import type { INode } from "language/node";
    import { RootNode } from "language/rootNode";
    import { TypeName } from "language/types/typeName";
    import { VariableDefinition } from "language/variableDefinition";
    import { SourceReference } from "parser/sourceReference";
    import { NodeType } from "language/nodeType";
    export function instanceOfTypeDefinition(object: any): boolean;
    export function asTypeDefinition(object: any): TypeDefinition | null;
    export class TypeDefinition extends RootNode {
        private variablesValue;
        readonly nodeType = NodeType.TypeDefinition;
        name: TypeName;
        get variables(): ReadonlyArray<VariableDefinition>;
        get nodeName(): string;
        constructor(name: string, reference: SourceReference);
        static parse(name: string, reference: SourceReference): TypeDefinition;
        parse(context: IParseLineContext): IParsableNode;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        validateTree(context: IValidationContext): void;
    }
}
declare module "language/variableTypes/customType" {
    import type { IRootNode } from "language/rootNode";
    import type { IValidationContext } from "parser/validationContext";
    import { TypeWithMembers } from "language/variableTypes/typeWithMembers";
    import { TypeDefinition } from "language/types/typeDefinition";
    import { VariableType } from "language/variableTypes/variableType";
    import { RootNodeList } from "language/rootNodeList";
    import { VariableTypeName } from "language/variableTypes/variableTypeName";
    export function instanceOfCustomType(object: any): object is CustomType;
    export function asCustomType(object: any): CustomType | null;
    export class CustomType extends TypeWithMembers {
        readonly variableTypeName = VariableTypeName.CustomType;
        type: string;
        typeDefinition: TypeDefinition;
        constructor(type: string, typeDefinition: TypeDefinition);
        equals(other: VariableType | null): boolean;
        toString(): string;
        memberType(name: string, context: IValidationContext): VariableType | null;
        getDependencies(rootNodeList: RootNodeList): Array<IRootNode>;
    }
}
declare module "language/variableTypes/complexTypeMember" {
    import { VariableType } from "language/variableTypes/variableType";
    export class ComplexTypeMember {
        readonly name: string;
        readonly type: VariableType | null;
        constructor(name: string, type: VariableType | null);
    }
}
declare module "language/variableTypes/complexTypeSource" {
    export enum ComplexTypeSource {
        FunctionParameters = "FunctionParameters",
        FunctionResults = "FunctionResults",
        TableRow = "TableRow"
    }
}
declare module "language/variableTypes/complexType" {
    import { VariableType } from "language/variableTypes/variableType";
    import { ITypeWithMembers } from "language/variableTypes/ITypeWithMembers";
    import { ComplexTypeMember } from "language/variableTypes/complexTypeMember";
    import { IValidationContext } from "parser/validationContext";
    import { ComplexTypeSource } from "language/variableTypes/complexTypeSource";
    import { VariableTypeName } from "language/variableTypes/variableTypeName";
    import { IRootNode } from "language/rootNode";
    export function instanceOfComplexType(object: any): object is ComplexType;
    export function asComplexType(object: any): ComplexType | null;
    export class ComplexType extends VariableType implements ITypeWithMembers {
        variableTypeName: VariableTypeName;
        typeWithMember: boolean;
        name: string;
        node: IRootNode;
        source: ComplexTypeSource;
        members: Array<ComplexTypeMember>;
        constructor(name: string, node: IRootNode, source: ComplexTypeSource, members: Array<ComplexTypeMember>);
        memberType(name: string, context: IValidationContext): VariableType | null;
        equals(other: VariableType | null): boolean;
    }
}
declare module "language/variableTypes/customVariableDeclarationType" {
    import { VariableDeclarationType } from "language/variableTypes/variableDeclarationType";
    import { SourceReference } from "parser/sourceReference";
    import { IValidationContext } from "parser/validationContext";
    import { VariableType } from "language/variableTypes/variableType";
    import { INode } from "language/node";
    import { NodeType } from "language/nodeType";
    import { IHasNodeDependencies } from "language/IHasNodeDependencies";
    import { RootNodeList } from "language/rootNodeList";
    import { IRootNode } from "language/rootNode";
    export function instanceOfCustomVariableDeclarationType(object: any): boolean;
    export function asCustomVariableDeclarationType(object: any): CustomVariableDeclarationType | null;
    export class CustomVariableDeclarationType extends VariableDeclarationType implements IHasNodeDependencies {
        readonly nodeType = NodeType.CustomVariableDeclarationType;
        readonly hasNodeDependencies = true;
        type: string;
        constructor(type: string, reference: SourceReference);
        private equals;
        toString(): string;
        getDependencies(rootNodeList: RootNodeList): ReadonlyArray<IRootNode>;
        createVariableType(context: IValidationContext): VariableType | null;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
    }
}
declare module "language/variableTypes/variableDeclarationTypeParser" {
    import { SourceReference } from "parser/sourceReference";
    import { VariableDeclarationType } from "language/variableTypes/variableDeclarationType";
    export class VariableDeclarationTypeParser {
        static parse(type: string, reference: SourceReference): VariableDeclarationType;
    }
}
declare module "language/expressions/variableDeclarationExpression" {
    import type { INode } from "language/node";
    import type { IValidationContext } from "parser/validationContext";
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import { Expression } from "language/expressions/expression";
    import { SourceReference } from "parser/sourceReference";
    import { ExpressionSource } from "language/expressions/expressionSource";
    import { VariableDeclarationType } from "language/variableTypes/variableDeclarationType";
    import { ParseExpressionResult } from "language/expressions/parseExpressionResult";
    import { TokenList } from "parser/tokens/tokenList";
    import { VariableType } from "language/variableTypes/variableType";
    import { NodeType } from "language/nodeType";
    export function asVariableDeclarationExpression(object: any): VariableDeclarationExpression | null;
    export class VariableDeclarationExpression extends Expression {
        nodeType: NodeType;
        type: VariableDeclarationType;
        name: string;
        assignment: Expression | null;
        constructor(variableType: VariableDeclarationType, variableName: string, assignment: Expression | null, source: ExpressionSource, reference: SourceReference);
        static parse(source: ExpressionSource, factory: IExpressionFactory): ParseExpressionResult;
        static isValid(tokens: TokenList): boolean;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        private getVariableType;
        deriveType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/expressions/identifierExpression" {
    import type { INode } from "language/node";
    import type { IValidationContext } from "parser/validationContext";
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import { Expression } from "language/expressions/expression";
    import { VariableSource } from "language/variableSource";
    import { ExpressionSource } from "language/expressions/expressionSource";
    import { SourceReference } from "parser/sourceReference";
    import { ParseExpressionResult } from "language/expressions/parseExpressionResult";
    import { TokenList } from "parser/tokens/tokenList";
    import { VariableType } from "language/variableTypes/variableType";
    import { NodeType } from "language/nodeType";
    export function asIdentifierExpression(object: any): IdentifierExpression | null;
    export class IdentifierExpression extends Expression {
        private variableSourceValue;
        readonly nodeType = NodeType.IdentifierExpression;
        readonly identifier: string;
        get variableSource(): VariableSource;
        constructor(identifier: string, source: ExpressionSource, reference: SourceReference);
        static parse(source: ExpressionSource, factory: IExpressionFactory): ParseExpressionResult;
        static isValid(tokens: TokenList): boolean;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        deriveType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/expressions/assignmentExpression" {
    import type { INode } from "language/node";
    import type { IValidationContext } from "parser/validationContext";
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import { Expression } from "language/expressions/expression";
    import { ExpressionSource } from "language/expressions/expressionSource";
    import { ParseExpressionResult } from "language/expressions/parseExpressionResult";
    import { TokenList } from "parser/tokens/tokenList";
    import { VariableType } from "language/variableTypes/variableType";
    import { NodeType } from "language/nodeType";
    export function instanceOfAssignmentExpression(object: any): object is AssignmentExpression;
    export function asAssignmentExpression(object: any): AssignmentExpression | null;
    export class AssignmentExpression extends Expression {
        nodeType: NodeType;
        variable: Expression;
        assignment: Expression;
        private constructor();
        static parse(source: ExpressionSource, factory: IExpressionFactory): ParseExpressionResult;
        static isValid(tokens: TokenList): boolean;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        private validateMemberAccess;
        deriveType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/expressions/parenthesizedExpression" {
    import type { INode } from "language/node";
    import type { IValidationContext } from "parser/validationContext";
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import { Expression } from "language/expressions/expression";
    import { SourceReference } from "parser/sourceReference";
    import { ExpressionSource } from "language/expressions/expressionSource";
    import { ParseExpressionResult } from "language/expressions/parseExpressionResult";
    import { TokenList } from "parser/tokens/tokenList";
    import { VariableType } from "language/variableTypes/variableType";
    import { NodeType } from "language/nodeType";
    export function instanceOfParenthesizedExpression(object: any): object is ParenthesizedExpression;
    export function asParenthesizedExpression(object: any): ParenthesizedExpression | null;
    export class ParenthesizedExpression extends Expression {
        nodeType: NodeType;
        expression: Expression;
        constructor(expression: Expression, source: ExpressionSource, reference: SourceReference);
        static parse(source: ExpressionSource, factory: IExpressionFactory): ParseExpressionResult;
        static findMatchingClosingParenthesis(tokens: TokenList): number;
        static isValid(tokens: TokenList): boolean;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        deriveType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/expressions/bracketedExpression" {
    import type { INode } from "language/node";
    import type { IValidationContext } from "parser/validationContext";
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import { Expression } from "language/expressions/expression";
    import { ExpressionSource } from "language/expressions/expressionSource";
    import { SourceReference } from "parser/sourceReference";
    import { ParseExpressionResult } from "language/expressions/parseExpressionResult";
    import { TokenList } from "parser/tokens/tokenList";
    import { VariableType } from "language/variableTypes/variableType";
    import { NodeType } from "language/nodeType";
    export function instanceOfBracketedExpression(object: any): object is BracketedExpression;
    export function asBracketedExpression(object: any): BracketedExpression | null;
    export class BracketedExpression extends Expression {
        nodeType: NodeType;
        functionName: string;
        expression: Expression;
        constructor(functionName: string, expression: Expression, source: ExpressionSource, reference: SourceReference);
        static parse(source: ExpressionSource, factory: IExpressionFactory): ParseExpressionResult;
        static isValid(tokens: TokenList): boolean;
        private static findMatchingClosingBracket;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        deriveType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/expressions/expressionOperator" {
    export enum ExpressionOperator {
        Addition = "Addition",
        Subtraction = "Subtraction",
        Multiplication = "Multiplication",
        Division = "Division",
        Modulus = "Modulus",
        GreaterThan = "GreaterThan",
        GreaterThanOrEqual = "GreaterThanOrEqual",
        LessThan = "LessThan",
        LessThanOrEqual = "LessThanOrEqual",
        And = "And",
        Or = "Or",
        Equals = "Equals",
        NotEqual = "NotEqual"
    }
}
declare module "language/expressions/binaryExpression" {
    import type { INode } from "language/node";
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import type { IValidationContext } from "parser/validationContext";
    import { Expression } from "language/expressions/expression";
    import { ExpressionOperator } from "language/expressions/expressionOperator";
    import { SourceReference } from "parser/sourceReference";
    import { ExpressionSource } from "language/expressions/expressionSource";
    import { ParseExpressionResult } from "language/expressions/parseExpressionResult";
    import { TokenList } from "parser/tokens/tokenList";
    import { VariableType } from "language/variableTypes/variableType";
    import { NodeType } from "language/nodeType";
    export function instanceOfBinaryExpression(object: any): object is BinaryExpression;
    export function asBinaryExpression(object: any): BinaryExpression | null;
    export class BinaryExpression extends Expression {
        private static readonly SupportedOperatorsByPriority;
        nodeType: NodeType;
        left: Expression;
        right: Expression;
        operator: ExpressionOperator;
        constructor(left: Expression, right: Expression, operatorValue: ExpressionOperator, source: ExpressionSource, reference: SourceReference);
        static parse(source: ExpressionSource, factory: IExpressionFactory): ParseExpressionResult;
        private static getLowestPriorityOperation;
        static isValid(tokens: TokenList): boolean;
        private static getCurrentLevelSupportedTokens;
        private static isSupported;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        deriveType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/expressions/functions/expressionFunction" {
    import { IValidationContext } from "parser/validationContext";
    import { VariableType } from "language/variableTypes/variableType";
    import { SourceReference } from "parser/sourceReference";
    import { Node } from "language/node";
    export abstract class ExpressionFunction extends Node {
        protected constructor(reference: SourceReference);
        equals(other: ExpressionFunction): boolean;
        abstract deriveReturnType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/expressions/argumentTokenParseResult" {
    import { TokenList } from "parser/tokens/tokenList";
    type ArgumentTokenParseFailed = {
        state: "failed";
        errorMessage: string;
    };
    export function newArgumentTokenParseFailed(errorMessage: string): ArgumentTokenParseFailed;
    type ArgumentTokenParseSuccess = {
        state: "success";
        result: Array<TokenList>;
    };
    export function newArgumentTokenParseSuccess(result: Array<TokenList>): {
        readonly state: "success";
        readonly result: TokenList[];
    };
    export type ArgumentTokenParseResult = ArgumentTokenParseFailed | ArgumentTokenParseSuccess;
}
declare module "language/expressions/argumentList" {
    import { TokenList } from "parser/tokens/tokenList";
    import { ArgumentTokenParseResult } from "language/expressions/argumentTokenParseResult";
    export class ArgumentList {
        static parse(tokens: TokenList): ArgumentTokenParseResult;
    }
}
declare module "language/expressions/parseExpressionFunctionsResult" {
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    type ParseExpressionFunctionsFailed = {
        state: "failed";
        errorMessage: string;
    };
    export function newParseExpressionFunctionsFailed(errorMessage: string): ParseExpressionFunctionsFailed;
    type ParseExpressionFunctionsSuccess = {
        state: "success";
        result: ExpressionFunction;
    };
    export function newParseExpressionFunctionsSuccess(result: ExpressionFunction): {
        readonly state: "success";
        readonly result: ExpressionFunction;
    };
    export type ParseExpressionFunctionsResult = ParseExpressionFunctionsFailed | ParseExpressionFunctionsSuccess;
}
declare module "language/expressions/functions/singleArgumentFunction" {
    import { Expression } from "language/expressions/expression";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { VariableType } from "language/variableTypes/variableType";
    import { SourceReference } from "parser/sourceReference";
    import { INode } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    export abstract class SingleArgumentFunction extends ExpressionFunction {
        protected abstract functionHelp: string;
        protected readonly argumentType: VariableType;
        protected readonly resultType: VariableType;
        readonly valueExpression: Expression;
        constructor(valueExpression: Expression, reference: SourceReference, argumentType: VariableType, resultType: VariableType);
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        deriveReturnType(context: IValidationContext): VariableType;
    }
}
declare module "language/expressions/functions/intFunction" {
    import { SingleArgumentFunction } from "language/expressions/functions/singleArgumentFunction";
    import { Expression } from "language/expressions/expression";
    import { SourceReference } from "parser/sourceReference";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { NodeType } from "language/nodeType";
    export function instanceOfIntFunction(object: any): object is IntFunction;
    export function asIntFunction(object: any): IntFunction | null;
    export class IntFunction extends SingleArgumentFunction {
        static readonly functionName: string;
        readonly nodeType = NodeType.IntFunction;
        protected get functionHelp(): string;
        constructor(valueExpression: Expression, reference: SourceReference);
        static create(reference: SourceReference, expression: Expression): ExpressionFunction;
    }
}
declare module "language/expressions/functions/absFunction" {
    import { SingleArgumentFunction } from "language/expressions/functions/singleArgumentFunction";
    import { SourceReference } from "parser/sourceReference";
    import { Expression } from "language/expressions/expression";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { NodeType } from "language/nodeType";
    export class AbsFunction extends SingleArgumentFunction {
        readonly nodeType = NodeType.AbsFunction;
        static readonly functionName: string;
        protected get functionHelp(): string;
        constructor(valueExpression: Expression, reference: SourceReference);
        static create(reference: SourceReference, expression: Expression): ExpressionFunction;
    }
}
declare module "language/expressions/functions/powerFunction" {
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { Expression } from "language/expressions/expression";
    import { SourceReference } from "parser/sourceReference";
    import { INode } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    import { VariableType } from "language/variableTypes/variableType";
    import { NodeType } from "language/nodeType";
    export class PowerFunction extends ExpressionFunction {
        static readonly functionName: string;
        private get functionHelp();
        readonly nodeType = NodeType.PowerFunction;
        numberExpression: Expression;
        powerExpression: Expression;
        constructor(numberExpression: Expression, powerExpression: Expression, reference: SourceReference);
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        deriveReturnType(context: IValidationContext): VariableType;
        static create(reference: SourceReference, numberExpression: Expression, powerExpression: Expression): ExpressionFunction;
    }
}
declare module "language/expressions/functions/roundFunction" {
    import { SourceReference } from "parser/sourceReference";
    import { INode } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { Expression } from "language/expressions/expression";
    import { VariableType } from "language/variableTypes/variableType";
    import { NodeType } from "language/nodeType";
    export class RoundFunction extends ExpressionFunction {
        static readonly functionName: string;
        private get functionHelp();
        readonly nodeType = NodeType.RoundFunction;
        numberExpression: Expression;
        digitsExpression: Expression;
        constructor(numberExpression: Expression, digitsExpression: Expression, reference: SourceReference);
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        deriveReturnType(context: IValidationContext): VariableType;
        static create(reference: SourceReference, numberExpression: Expression, powerExpression: Expression): ExpressionFunction;
    }
}
declare module "language/expressions/functions/noArgumentFunction" {
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { VariableType } from "language/variableTypes/variableType";
    import { SourceReference } from "parser/sourceReference";
    import { INode } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    export abstract class NoArgumentFunction extends ExpressionFunction {
        protected readonly resultType: VariableType;
        protected constructor(reference: SourceReference, resultType: VariableType);
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        deriveReturnType(context: IValidationContext): VariableType;
    }
}
declare module "language/expressions/functions/nowFunction" {
    import { NoArgumentFunction } from "language/expressions/functions/noArgumentFunction";
    import { SourceReference } from "parser/sourceReference";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { NodeType } from "language/nodeType";
    export class NowFunction extends NoArgumentFunction {
        static readonly functionName: string;
        readonly nodeType = NodeType.NowFunction;
        constructor(reference: SourceReference);
        static create(reference: SourceReference): ExpressionFunction;
    }
}
declare module "language/expressions/functions/todayFunction" {
    import { SourceReference } from "parser/sourceReference";
    import { NoArgumentFunction } from "language/expressions/functions/noArgumentFunction";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { NodeType } from "language/nodeType";
    export class TodayFunction extends NoArgumentFunction {
        static readonly functionName: string;
        readonly nodeType = NodeType.TodayFunction;
        constructor(reference: SourceReference);
        static create(reference: SourceReference): ExpressionFunction;
    }
}
declare module "language/expressions/functions/yearFunction" {
    import { SingleArgumentFunction } from "language/expressions/functions/singleArgumentFunction";
    import { SourceReference } from "parser/sourceReference";
    import { Expression } from "language/expressions/expression";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { NodeType } from "language/nodeType";
    export class YearFunction extends SingleArgumentFunction {
        static readonly functionName: string;
        readonly nodeType = NodeType.YearFunction;
        protected get functionHelp(): string;
        constructor(valueExpression: Expression, reference: SourceReference);
        static create(reference: SourceReference, expression: Expression): ExpressionFunction;
    }
}
declare module "language/expressions/functions/monthFunction" {
    import { SingleArgumentFunction } from "language/expressions/functions/singleArgumentFunction";
    import { Expression } from "language/expressions/expression";
    import { SourceReference } from "parser/sourceReference";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { NodeType } from "language/nodeType";
    export class MonthFunction extends SingleArgumentFunction {
        static readonly functionName: string;
        readonly nodeType = NodeType.MonthFunction;
        protected get functionHelp(): string;
        constructor(valueExpression: Expression, reference: SourceReference);
        static create(reference: SourceReference, expression: Expression): ExpressionFunction;
    }
}
declare module "language/expressions/functions/dayFunction" {
    import { SingleArgumentFunction } from "language/expressions/functions/singleArgumentFunction";
    import { Expression } from "language/expressions/expression";
    import { SourceReference } from "parser/sourceReference";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { NodeType } from "language/nodeType";
    export class DayFunction extends SingleArgumentFunction {
        readonly nodeType = NodeType.DayFunction;
        static readonly functionName: string;
        protected get functionHelp(): string;
        constructor(valueExpression: Expression, reference: SourceReference);
        static create(reference: SourceReference, expression: Expression): ExpressionFunction;
    }
}
declare module "language/expressions/functions/hourFunction" {
    import { SingleArgumentFunction } from "language/expressions/functions/singleArgumentFunction";
    import { Expression } from "language/expressions/expression";
    import { SourceReference } from "parser/sourceReference";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { NodeType } from "language/nodeType";
    export class HourFunction extends SingleArgumentFunction {
        readonly nodeType = NodeType.HourFunction;
        static readonly functionName: string;
        protected get functionHelp(): string;
        constructor(valueExpression: Expression, reference: SourceReference);
        static create(reference: SourceReference, expression: Expression): ExpressionFunction;
    }
}
declare module "language/expressions/functions/minuteFunction" {
    import { SingleArgumentFunction } from "language/expressions/functions/singleArgumentFunction";
    import { SourceReference } from "parser/sourceReference";
    import { Expression } from "language/expressions/expression";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { NodeType } from "language/nodeType";
    export class MinuteFunction extends SingleArgumentFunction {
        static readonly functionName: string;
        readonly nodeType = NodeType.MinuteFunction;
        protected get functionHelp(): string;
        constructor(valueExpression: Expression, reference: SourceReference);
        static create(reference: SourceReference, expression: Expression): ExpressionFunction;
    }
}
declare module "language/expressions/functions/secondFunction" {
    import { SingleArgumentFunction } from "language/expressions/functions/singleArgumentFunction";
    import { SourceReference } from "parser/sourceReference";
    import { Expression } from "language/expressions/expression";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { NodeType } from "language/nodeType";
    export class SecondFunction extends SingleArgumentFunction {
        static readonly functionName: string;
        protected get functionHelp(): string;
        readonly nodeType = NodeType.SecondFunction;
        constructor(valueExpression: Expression, reference: SourceReference);
        static create(reference: SourceReference, expression: Expression): ExpressionFunction;
    }
}
declare module "language/expressions/functions/endStartDateFunction" {
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { Expression } from "language/expressions/expression";
    import { SourceReference } from "parser/sourceReference";
    import { INode } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    import { VariableType } from "language/variableTypes/variableType";
    export abstract class EndStartDateFunction extends ExpressionFunction {
        private get functionHelp();
        protected abstract functionName: string;
        endDateExpression: Expression;
        startDateExpression: Expression;
        protected constructor(endDateExpression: Expression, startDateExpression: Expression, reference: SourceReference);
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        deriveReturnType(context: IValidationContext): VariableType;
    }
}
declare module "language/expressions/functions/yearsFunction" {
    import { EndStartDateFunction } from "language/expressions/functions/endStartDateFunction";
    import { Expression } from "language/expressions/expression";
    import { SourceReference } from "parser/sourceReference";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { NodeType } from "language/nodeType";
    export class YearsFunction extends EndStartDateFunction {
        static readonly functionName: string;
        readonly nodeType = NodeType.YearsFunction;
        protected get functionName(): string;
        constructor(endDateExpression: Expression, startDateExpression: Expression, reference: SourceReference);
        static create(reference: SourceReference, endDateExpression: Expression, startDateExpression: Expression): ExpressionFunction;
    }
}
declare module "language/expressions/functions/monthsFunction" {
    import { EndStartDateFunction } from "language/expressions/functions/endStartDateFunction";
    import { Expression } from "language/expressions/expression";
    import { SourceReference } from "parser/sourceReference";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { NodeType } from "language/nodeType";
    export class MonthsFunction extends EndStartDateFunction {
        static readonly functionName: string;
        readonly nodeType = NodeType.MonthsFunction;
        protected get functionName(): string;
        constructor(endDateExpression: Expression, startDateExpression: Expression, reference: SourceReference);
        static create(reference: SourceReference, endDateExpression: Expression, startDateExpression: Expression): ExpressionFunction;
    }
}
declare module "language/expressions/functions/daysFunction" {
    import { EndStartDateFunction } from "language/expressions/functions/endStartDateFunction";
    import { Expression } from "language/expressions/expression";
    import { SourceReference } from "parser/sourceReference";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { NodeType } from "language/nodeType";
    export class DaysFunction extends EndStartDateFunction {
        static readonly functionName: string;
        readonly nodeType = NodeType.DaysFunction;
        protected get functionName(): string;
        constructor(endDateExpression: Expression, startDateExpression: Expression, reference: SourceReference);
        static create(reference: SourceReference, endDateExpression: Expression, startDateExpression: Expression): ExpressionFunction;
    }
}
declare module "language/expressions/functions/hoursFunction" {
    import { EndStartDateFunction } from "language/expressions/functions/endStartDateFunction";
    import { Expression } from "language/expressions/expression";
    import { SourceReference } from "parser/sourceReference";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { NodeType } from "language/nodeType";
    export class HoursFunction extends EndStartDateFunction {
        static readonly functionName: string;
        readonly nodeType = NodeType.HoursFunction;
        protected get functionName(): string;
        constructor(endDateExpression: Expression, startDateExpression: Expression, reference: SourceReference);
        static create(reference: SourceReference, endDateExpression: Expression, startDateExpression: Expression): ExpressionFunction;
    }
}
declare module "language/expressions/functions/minutesFunction" {
    import { EndStartDateFunction } from "language/expressions/functions/endStartDateFunction";
    import { SourceReference } from "parser/sourceReference";
    import { Expression } from "language/expressions/expression";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { NodeType } from "language/nodeType";
    export class MinutesFunction extends EndStartDateFunction {
        static readonly functionName: string;
        readonly nodeType = NodeType.MinutesFunction;
        protected get functionName(): string;
        constructor(endDateExpression: Expression, startDateExpression: Expression, reference: SourceReference);
        static create(reference: SourceReference, endDateExpression: Expression, startDateExpression: Expression): ExpressionFunction;
    }
}
declare module "language/expressions/functions/secondsFunction" {
    import { EndStartDateFunction } from "language/expressions/functions/endStartDateFunction";
    import { Expression } from "language/expressions/expression";
    import { SourceReference } from "parser/sourceReference";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { NodeType } from "language/nodeType";
    export class SecondsFunction extends EndStartDateFunction {
        static readonly functionName: string;
        readonly nodeType = NodeType.SecondsFunction;
        protected get functionName(): string;
        constructor(endDateExpression: Expression, startDateExpression: Expression, reference: SourceReference);
        static create(reference: SourceReference, endDateExpression: Expression, startDateExpression: Expression): ExpressionFunction;
    }
}
declare module "language/expressions/functions/lookupFunction" {
    import { IHasNodeDependencies } from "language/IHasNodeDependencies";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { Expression } from "language/expressions/expression";
    import { MemberAccessLiteral } from "parser/tokens/memberAccessLiteral";
    import { VariableType } from "language/variableTypes/variableType";
    import { SourceReference } from "parser/sourceReference";
    import { IRootNode } from "language/rootNode";
    import { RootNodeList } from "language/rootNodeList";
    import { ParseExpressionFunctionsResult } from "language/expressions/parseExpressionFunctionsResult";
    import { INode } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    import { NodeType } from "language/nodeType";
    export class LookupFunction extends ExpressionFunction implements IHasNodeDependencies {
        static readonly functionName: string;
        private resultColumnTypeValue;
        private searchValueColumnTypeValue;
        readonly hasNodeDependencies = true;
        readonly nodeType = NodeType.LookupFunction;
        readonly table: string;
        readonly valueExpression: Expression;
        readonly resultColumn: MemberAccessLiteral;
        readonly searchValueColumn: MemberAccessLiteral;
        get resultColumnType(): VariableType;
        get searchValueColumnType(): VariableType;
        constructor(tableType: string, valueExpression: Expression, resultColumn: MemberAccessLiteral, searchValueColumn: MemberAccessLiteral, tableNameArgumentReference: SourceReference);
        getDependencies(rootNodeList: RootNodeList): Array<IRootNode>;
        static parse(name: string, functionCallReference: SourceReference, argumentValues: Array<Expression>): ParseExpressionFunctionsResult;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        private validateColumn;
        deriveReturnType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/expressions/functions/lookupRowFunction" {
    import type { IHasNodeDependencies } from "language/IHasNodeDependencies";
    import type { IRootNode } from "language/rootNode";
    import type { INode } from "language/node";
    import type { IValidationContext } from "parser/validationContext";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { VariableType } from "language/variableTypes/variableType";
    import { MemberAccessLiteral } from "parser/tokens/memberAccessLiteral";
    import { Expression } from "language/expressions/expression";
    import { RootNodeList } from "language/rootNodeList";
    import { SourceReference } from "parser/sourceReference";
    import { ParseExpressionFunctionsResult } from "language/expressions/parseExpressionFunctionsResult";
    import { NodeType } from "language/nodeType";
    export class LookupRowFunction extends ExpressionFunction implements IHasNodeDependencies {
        private searchValueColumnTypeValue;
        readonly hasNodeDependencies = true;
        static readonly functionName: string;
        readonly nodeType = NodeType.LookupRowFunction;
        readonly table: string;
        readonly valueExpression: Expression;
        readonly searchValueColumn: MemberAccessLiteral;
        get searchValueColumnType(): VariableType;
        constructor(tableType: string, valueExpression: Expression, searchValueColumn: MemberAccessLiteral, tableNameArgumentReference: SourceReference);
        getDependencies(rootNodeList: RootNodeList): Array<IRootNode>;
        static parse(name: string, functionCallReference: SourceReference, argumentValues: Array<Expression>): ParseExpressionFunctionsResult;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        private validateColumn;
        deriveReturnType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/expressions/functions/newFunction" {
    import { IHasNodeDependencies } from "language/IHasNodeDependencies";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { Expression } from "language/expressions/expression";
    import { MemberAccessLiteral } from "parser/tokens/memberAccessLiteral";
    import { SourceReference } from "parser/sourceReference";
    import { RootNodeList } from "language/rootNodeList";
    import { IRootNode } from "language/rootNode";
    import { INode } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    import { VariableType } from "language/variableTypes/variableType";
    import { NodeType } from "language/nodeType";
    import { ComplexType } from "language/variableTypes/complexType";
    export function instanceOfNewFunction(object: any): object is NewFunction;
    export function asNewFunction(object: any): NewFunction | null;
    export class NewFunction extends ExpressionFunction implements IHasNodeDependencies {
        private typeValue;
        readonly hasNodeDependencies = true;
        readonly nodeType = NodeType.NewFunction;
        static readonly functionName: string;
        protected get functionHelp(): string;
        typeLiteral: MemberAccessLiteral;
        valueExpression: Expression;
        get type(): ComplexType;
        constructor(valueExpression: Expression, reference: SourceReference);
        getDependencies(rootNodeList: RootNodeList): Array<IRootNode>;
        static create(reference: SourceReference, expression: Expression): ExpressionFunction;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        deriveReturnType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/expressions/functions/mapping" {
    import { VariableType } from "language/variableTypes/variableType";
    import { VariableSource } from "language/variableSource";
    export class Mapping {
        variableName: string;
        variableType: VariableType;
        variableSource: VariableSource;
        constructor(variableName: string, variableType: VariableType, variableSource: VariableSource);
    }
}
declare module "language/expressions/functions/fillParametersFunction" {
    import type { IRootNode } from "language/rootNode";
    import type { INode } from "language/node";
    import type { IValidationContext } from "parser/validationContext";
    import type { IHasNodeDependencies } from "language/IHasNodeDependencies";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { Mapping } from "language/expressions/functions/mapping";
    import { MemberAccessLiteral } from "parser/tokens/memberAccessLiteral";
    import { Expression } from "language/expressions/expression";
    import { SourceReference } from "parser/sourceReference";
    import { RootNodeList } from "language/rootNodeList";
    import { ComplexType } from "language/variableTypes/complexType";
    import { VariableType } from "language/variableTypes/variableType";
    import { NodeType } from "language/nodeType";
    export function instanceOfFillParametersFunction(object: any): object is FillParametersFunction;
    export function asFillParametersFunction(object: any): FillParametersFunction | null;
    export class FillParametersFunction extends ExpressionFunction implements IHasNodeDependencies {
        static readonly functionName: string;
        private typeValue;
        readonly hasNodeDependencies = true;
        readonly nodeType = NodeType.FillParametersFunction;
        readonly typeLiteral: MemberAccessLiteral | undefined;
        readonly valueExpression: Expression;
        get type(): ComplexType;
        readonly mapping: Array<Mapping>;
        protected get functionHelp(): string;
        constructor(valueExpression: Expression, reference: SourceReference);
        getDependencies(rootNodeList: RootNodeList): Array<IRootNode>;
        static create(reference: SourceReference, expression: Expression): ExpressionFunction;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        static getMapping(reference: SourceReference, context: IValidationContext, complexType: ComplexType, mapping: Array<Mapping>): void;
        deriveReturnType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/variableTypes/voidType" {
    import { VariableType } from "language/variableTypes/variableType";
    import { VariableTypeName } from "language/variableTypes/variableTypeName";
    export class VoidType extends VariableType {
        readonly variableTypeName = VariableTypeName.VoidType;
        equals(other: VariableType | null): boolean;
    }
}
declare module "language/expressions/functions/extractResultsFunction" {
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { Mapping } from "language/expressions/functions/mapping";
    import { Expression } from "language/expressions/expression";
    import { SourceReference } from "parser/sourceReference";
    import { INode } from "language/node";
    import { ComplexType } from "language/variableTypes/complexType";
    import { IValidationContext } from "parser/validationContext";
    import { VariableType } from "language/variableTypes/variableType";
    import { NodeType } from "language/nodeType";
    export function instanceOfExtractResultsFunction(object: any): object is ExtractResultsFunction;
    export function asExtractResultsFunction(object: any): ExtractResultsFunction | null;
    export class ExtractResultsFunction extends ExpressionFunction {
        readonly nodeType = NodeType.ExtractResultsFunction;
        static readonly functionName: string;
        protected get functionHelp(): string;
        functionResultVariable: string | null;
        valueExpression: Expression;
        readonly mapping: Array<Mapping>;
        constructor(valueExpression: Expression, reference: SourceReference);
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        static getMapping(reference: SourceReference, context: IValidationContext, complexType: ComplexType | null, mapping: Array<Mapping>): void;
        deriveReturnType(context: IValidationContext): VariableType;
        static create(reference: SourceReference, expression: Expression): ExpressionFunction;
    }
}
declare module "language/expressions/functions/builtInExpressionFunctions" {
    import { SourceReference } from "parser/sourceReference";
    import { ParseExpressionFunctionsResult } from "language/expressions/parseExpressionFunctionsResult";
    import { Expression } from "language/expressions/expression";
    export class BuiltInExpressionFunctions {
        private static readonly values;
        static parse(functionName: string, reference: SourceReference, argumentValues: Array<Expression>): ParseExpressionFunctionsResult | null;
        private static create0;
        private static create1;
        private static create2;
    }
}
declare module "language/expressions/functions/lexyFunction" {
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { IHasNodeDependencies } from "language/IHasNodeDependencies";
    import { Expression } from "language/expressions/expression";
    import { Mapping } from "language/expressions/functions/mapping";
    import { ComplexType } from "language/variableTypes/complexType";
    import { SourceReference } from "parser/sourceReference";
    import { RootNodeList } from "language/rootNodeList";
    import { IRootNode } from "language/rootNode";
    import { INode } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    import { VariableType } from "language/variableTypes/variableType";
    import { NodeType } from "language/nodeType";
    export function instanceOfLexyFunction(object: any): object is LexyFunction;
    export function asLexyFunction(object: any): LexyFunction | null;
    export class LexyFunction extends ExpressionFunction implements IHasNodeDependencies {
        private variableNameValue;
        private functionParametersTypeValue;
        private functionResultsTypeValue;
        readonly hasNodeDependencies = true;
        readonly nodeType = NodeType.LexyFunction;
        readonly functionName: string;
        readonly argumentValues: Array<Expression>;
        get variableName(): string | null;
        private readonly mappingParametersValue;
        private readonly mappingResultsValue;
        get functionParametersType(): ComplexType;
        get mappingParameters(): ReadonlyArray<Mapping>;
        get mappingResults(): ReadonlyArray<Mapping>;
        constructor(functionName: string, argumentValues: Array<Expression>, reference: SourceReference);
        getDependencies(rootNodeList: RootNodeList): Array<IRootNode>;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        deriveReturnType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/expressions/functionCallExpression" {
    import type { INode } from "language/node";
    import type { IValidationContext } from "parser/validationContext";
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import { Expression } from "language/expressions/expression";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { SourceReference } from "parser/sourceReference";
    import { ExpressionSource } from "language/expressions/expressionSource";
    import { ParseExpressionResult } from "language/expressions/parseExpressionResult";
    import { TokenList } from "parser/tokens/tokenList";
    import { VariableType } from "language/variableTypes/variableType";
    import { NodeType } from "language/nodeType";
    export function instanceOfFunctionCallExpression(object: any): object is FunctionCallExpression;
    export function asFunctionCallExpression(object: any): FunctionCallExpression | null;
    export class FunctionCallExpression extends Expression {
        readonly nodeType = NodeType.FunctionCallExpression;
        readonly functionName: string;
        readonly arguments: Array<Expression>;
        readonly expressionFunction: ExpressionFunction;
        constructor(functionName: string, argumentValues: Array<Expression>, expressionFunction: ExpressionFunction, source: ExpressionSource, reference: SourceReference);
        static parse(source: ExpressionSource, factory: IExpressionFactory): ParseExpressionResult;
        static isValid(tokens: TokenList): boolean;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        deriveType(context: IValidationContext): VariableType | null;
    }
}
declare module "language/expressions/expressionFactory" {
    import { TokenList } from "parser/tokens/tokenList";
    import { ParseExpressionResult } from "language/expressions/parseExpressionResult";
    import { Line } from "parser/line";
    export interface IExpressionFactory {
        parse(tokens: TokenList, currentLine: Line): ParseExpressionResult;
    }
    export class ExpressionFactory implements IExpressionFactory {
        private static factories;
        parse(tokens: TokenList, currentLine: Line): ParseExpressionResult;
    }
}
declare module "language/functions/functionName" {
    import { INode, Node } from "language/node";
    import { SourceReference } from "parser/sourceReference";
    import { IValidationContext } from "parser/validationContext";
    import { NodeType } from "language/nodeType";
    export class FunctionName extends Node {
        private valueValue;
        readonly nodeType = NodeType.FunctionName;
        get value(): string;
        constructor(reference: SourceReference);
        parseName(name: string): void;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
    }
}
declare module "language/functions/functionParameters" {
    import { IParsableNode, ParsableNode } from "language/parsableNode";
    import { VariableDefinition } from "language/variableDefinition";
    import { SourceReference } from "parser/sourceReference";
    import { IParseLineContext } from "parser/ParseLineContext";
    import { INode } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    import { NodeType } from "language/nodeType";
    export class FunctionParameters extends ParsableNode {
        private variablesValue;
        readonly nodeType = NodeType.FunctionParameters;
        get variables(): ReadonlyArray<VariableDefinition>;
        constructor(reference: SourceReference);
        parse(context: IParseLineContext): IParsableNode;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
    }
}
declare module "language/functions/functionResults" {
    import { VariableDefinition } from "language/variableDefinition";
    import { SourceReference } from "parser/sourceReference";
    import { IParseLineContext } from "parser/ParseLineContext";
    import { IParsableNode, ParsableNode } from "language/parsableNode";
    import { INode } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    import { NodeType } from "language/nodeType";
    export class FunctionResults extends ParsableNode {
        private variablesValue;
        readonly nodeType = NodeType.FunctionResults;
        get variables(): ReadonlyArray<VariableDefinition>;
        constructor(reference: SourceReference);
        parse(context: IParseLineContext): IParsableNode;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
    }
}
declare module "language/functions/functionCode" {
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import type { IParseLineContext } from "parser/ParseLineContext";
    import type { IValidationContext } from "parser/validationContext";
    import type { INode } from "language/node";
    import { IParsableNode, ParsableNode } from "language/parsableNode";
    import { Expression } from "language/expressions/expression";
    import { SourceReference } from "parser/sourceReference";
    import { NodeType } from "language/nodeType";
    export class FunctionCode extends ParsableNode {
        private readonly expressionsValue;
        readonly nodeType = NodeType.FunctionCode;
        get expressions(): ReadonlyArray<Expression>;
        constructor(reference: SourceReference, factory: IExpressionFactory);
        parse(context: IParseLineContext): IParsableNode;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
    }
}
declare module "language/nodesWalker" {
    import { INode } from "language/node";
    export class NodesWalker {
        static walkNodes(nodes: Array<INode>, action: (node: INode) => void): void;
        static walk(node: INode, action: (node: INode) => void): void;
        static walkWithBoolean(nodes: Array<INode>, functionValue: (node: INode) => boolean): boolean;
        static walkWithResult<T>(nodes: ReadonlyArray<INode>, action: (node: INode) => T | null): Array<T>;
        private static walkWithResultNode;
        private static walkWithResultNodes;
    }
}
declare module "language/functions/function" {
    import type { IRootNode } from "language/rootNode";
    import type { INode } from "language/node";
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import type { IParseLineContext } from "parser/ParseLineContext";
    import type { IParsableNode } from "language/parsableNode";
    import { RootNode } from "language/rootNode";
    import { IHasNodeDependencies } from "language/IHasNodeDependencies";
    import { FunctionName } from "language/functions/functionName";
    import { FunctionParameters } from "language/functions/functionParameters";
    import { FunctionResults } from "language/functions/functionResults";
    import { FunctionCode } from "language/functions/functionCode";
    import { SourceReference } from "parser/sourceReference";
    import { RootNodeList } from "language/rootNodeList";
    import { IValidationContext } from "parser/validationContext";
    import { ComplexType } from "language/variableTypes/complexType";
    import { NodeType } from "language/nodeType";
    export function instanceOfFunction(object: any): boolean;
    export function asFunction(object: any): Function | null;
    export class Function extends RootNode implements IHasNodeDependencies {
        static readonly parameterName = "Parameters";
        static readonly resultsName = "Results";
        readonly hasNodeDependencies = true;
        readonly nodeType = NodeType.Function;
        readonly name: FunctionName;
        readonly parameters: FunctionParameters;
        readonly results: FunctionResults;
        readonly code: FunctionCode;
        get nodeName(): string;
        constructor(name: string, reference: SourceReference, factory: IExpressionFactory);
        getDependencies(rootNodeList: RootNodeList): Array<IRootNode>;
        static create(name: string, reference: SourceReference, factory: IExpressionFactory): Function;
        parse(context: IParseLineContext): IParsableNode;
        private invalidToken;
        getFunctionAndDependencies(rootNodeList: RootNodeList): Array<IRootNode>;
        private addDependentNodes;
        private static addNodeDependencies;
        private static addEnumTypes;
        validateTree(context: IValidationContext): void;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        getParametersType(context: IValidationContext): ComplexType;
        getResultsType(context: IValidationContext): ComplexType;
    }
}
declare module "language/tables/tableName" {
    export class TableName {
        private valueValue;
        get value(): string;
        parseName(parameter: string): void;
    }
}
declare module "language/tables/columnHeader" {
    import { VariableDeclarationType } from "language/variableTypes/variableDeclarationType";
    import { SourceReference } from "parser/sourceReference";
    import { INode, Node } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    import { NodeType } from "language/nodeType";
    export class ColumnHeader extends Node {
        nodeType: NodeType;
        name: string;
        type: VariableDeclarationType;
        constructor(name: string, type: VariableDeclarationType, reference: SourceReference);
        static parse(name: string, typeName: string, reference: SourceReference): ColumnHeader;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
    }
}
declare module "language/tables/tableHeader" {
    import { INode, Node } from "language/node";
    import { ColumnHeader } from "language/tables/columnHeader";
    import { SourceReference } from "parser/sourceReference";
    import { IParseLineContext } from "parser/ParseLineContext";
    import { IValidationContext } from "parser/validationContext";
    import { MemberAccessLiteral } from "parser/tokens/memberAccessLiteral";
    import { NodeType } from "language/nodeType";
    export class TableHeader extends Node {
        private readonly columnsValue;
        readonly nodeType = NodeType.TableHeader;
        get columns(): ReadonlyArray<ColumnHeader>;
        constructor(columns: ColumnHeader[], reference: SourceReference);
        static parse(context: IParseLineContext): TableHeader | null;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        get(memberAccess: MemberAccessLiteral): ColumnHeader | null;
    }
}
declare module "language/tables/tableRow" {
    import type { IValidationContext } from "parser/validationContext";
    import type { IParseLineContext } from "parser/ParseLineContext";
    import type { INode } from "language/node";
    import { Node } from "language/node";
    import { Expression } from "language/expressions/expression";
    import { SourceReference } from "parser/sourceReference";
    import { NodeType } from "language/nodeType";
    export class TableRow extends Node {
        private readonly valuesValue;
        readonly nodeType = NodeType.TableRow;
        get values(): ReadonlyArray<Expression>;
        constructor(values: Expression[], reference: SourceReference);
        static parse(context: IParseLineContext): TableRow | null;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
    }
}
declare module "language/tables/table" {
    import { RootNode } from "language/rootNode";
    import { TableName } from "language/tables/tableName";
    import { TableHeader } from "language/tables/tableHeader";
    import { TableRow } from "language/tables/tableRow";
    import { SourceReference } from "parser/sourceReference";
    import { IParseLineContext } from "parser/ParseLineContext";
    import { IParsableNode } from "language/parsableNode";
    import { INode } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    import { ComplexType } from "language/variableTypes/complexType";
    import { NodeType } from "language/nodeType";
    export function instanceOfTable(object: any): boolean;
    export function asTable(object: any): Table | null;
    export class Table extends RootNode {
        static readonly rowName: string;
        readonly nodeType = NodeType.Table;
        readonly name: TableName;
        private rowsValue;
        private headerValue;
        get header(): TableHeader | null;
        get rows(): Array<TableRow>;
        get nodeName(): string;
        constructor(name: string, reference: SourceReference);
        static parse(name: string, reference: SourceReference): Table;
        parse(context: IParseLineContext): IParsableNode;
        private isFirstLine;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        validateTree(context: IValidationContext): void;
        getRowType(context: IValidationContext): ComplexType;
    }
}
declare module "language/scenarios/scenarioName" {
    import { INode, Node } from "language/node";
    import { SourceReference } from "parser/sourceReference";
    import { IValidationContext } from "parser/validationContext";
    import { NodeType } from "language/nodeType";
    export class ScenarioName extends Node {
        private valueValue;
        readonly nodeType = NodeType.ScenarioName;
        get value(): string;
        constructor(reference: SourceReference);
        parseName(name: string): void;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        toString(): string;
    }
}
declare module "language/scenarios/scenarioExpectError" {
    import type { IParsableNode } from "language/parsableNode";
    import type { IParseLineContext } from "parser/ParseLineContext";
    import type { IValidationContext } from "parser/validationContext";
    import { ParsableNode } from "language/parsableNode";
    import { SourceReference } from "parser/sourceReference";
    import { INode } from "language/node";
    import { NodeType } from "language/nodeType";
    export class ScenarioExpectError extends ParsableNode {
        private messageValue;
        readonly nodeType = NodeType.ScenarioExpectError;
        get message(): string;
        get hasValue(): boolean;
        constructor(reference: SourceReference);
        parse(context: IParseLineContext): IParsableNode;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
    }
}
declare module "language/scenarios/scenarioExpectRootErrors" {
    import { IParsableNode, ParsableNode } from "language/parsableNode";
    import { SourceReference } from "parser/sourceReference";
    import { IParseLineContext } from "parser/ParseLineContext";
    import { INode } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    import { NodeType } from "language/nodeType";
    export class ScenarioExpectRootErrors extends ParsableNode {
        private readonly messagesValue;
        readonly nodeType = NodeType.ScenarioExpectRootErrors;
        get messages(): ReadonlyArray<string>;
        get hasValues(): boolean;
        constructor(reference: SourceReference);
        parse(context: IParseLineContext): IParsableNode;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
    }
}
declare module "language/scenarios/scenarioTable" {
    import { IParsableNode, ParsableNode } from "language/parsableNode";
    import { TableHeader } from "language/tables/tableHeader";
    import { TableRow } from "language/tables/tableRow";
    import { SourceReference } from "parser/sourceReference";
    import { IParseLineContext } from "parser/ParseLineContext";
    import { INode } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    import { NodeType } from "language/nodeType";
    export class ScenarioTable extends ParsableNode {
        private headerValue;
        private rowsValue;
        nodeType: NodeType;
        get rows(): ReadonlyArray<TableRow>;
        get header(): TableHeader | null;
        constructor(reference: SourceReference);
        parse(context: IParseLineContext): IParsableNode;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
    }
}
declare module "language/scenarios/constantValue" {
    export class ConstantValue {
        value: any;
        constructor(value: any);
    }
}
declare module "language/scenarios/variableReferenceParseResult" {
    import { VariableReference } from "language/variableReference";
    export type VariableReferenceParseFailed = {
        state: "failed";
        errorMessage: string;
    };
    export function newVariableReferenceParseFailed(errorMessage: string): VariableReferenceParseFailed;
    export type VariableReferenceParseSuccess = {
        state: "success";
        result: VariableReference;
    };
    export function newVariableReferenceParseSuccess(result: VariableReference): {
        readonly state: "success";
        readonly result: VariableReference;
    };
    export type VariableReferenceParseResult = VariableReferenceParseFailed | VariableReferenceParseSuccess;
}
declare module "language/scenarios/variableReferenceParser" {
    import { VariableReferenceParseResult } from "language/scenarios/variableReferenceParseResult";
    import { Expression } from "language/expressions/expression";
    export class VariableReferenceParser {
        static parse(parts: string[]): VariableReferenceParseResult;
        static parseExpression(expression: Expression): VariableReferenceParseResult;
        private static parseLiteralExpression;
        private static parseMemberAccessExpression;
    }
}
declare module "language/scenarios/constantValueParseResult" {
    import { ConstantValue } from "language/scenarios/constantValue";
    type ConstantValueParseFailed = {
        state: "failed";
        errorMessage: string;
    };
    export function newConstantValueParseFailed(errorMessage: string): ConstantValueParseFailed;
    type ConstantValueParseSuccess = {
        state: "success";
        result: ConstantValue;
    };
    export function newConstantValueParseSuccess(result: ConstantValue): {
        readonly state: "success";
        readonly result: ConstantValue;
    };
    export type ConstantValueParseResult = ConstantValueParseFailed | ConstantValueParseSuccess;
}
declare module "language/scenarios/constantValueParser" {
    import { Expression } from "language/expressions/expression";
    import { ConstantValueParseResult } from "language/scenarios/constantValueParseResult";
    export class ConstantValueParser {
        static parse(expression: Expression): ConstantValueParseResult;
        private static parseLiteralExpression;
        private static parseMemberAccessExpression;
    }
}
declare module "language/scenarios/assignmentDefinition" {
    import type { IParseLineContext } from "parser/ParseLineContext";
    import type { IValidationContext } from "parser/validationContext";
    import { Expression } from "language/expressions/expression";
    import { INode, Node } from "language/node";
    import { ConstantValue } from "language/scenarios/constantValue";
    import { VariableReference } from "language/variableReference";
    import { VariableType } from "language/variableTypes/variableType";
    import { SourceReference } from "parser/sourceReference";
    import { NodeType } from "language/nodeType";
    export class AssignmentDefinition extends Node {
        readonly nodeType = NodeType.AssignmentDefinition;
        private readonly valueExpression;
        private readonly variableExpression;
        private variableTypeValue;
        readonly constantValue: ConstantValue;
        readonly variable: VariableReference;
        get variableType(): VariableType;
        constructor(variable: VariableReference, constantValue: ConstantValue, variableExpression: Expression, valueExpression: Expression, reference: SourceReference);
        static parse(context: IParseLineContext): AssignmentDefinition | null;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
    }
}
declare module "language/scenarios/scenarioResults" {
    import { IParsableNode, ParsableNode } from "language/parsableNode";
    import { AssignmentDefinition } from "language/scenarios/assignmentDefinition";
    import { SourceReference } from "parser/sourceReference";
    import { IParseLineContext } from "parser/ParseLineContext";
    import { INode } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    import { NodeType } from "language/nodeType";
    export class ScenarioResults extends ParsableNode {
        private assignmentsValue;
        nodeType: NodeType;
        get assignments(): ReadonlyArray<AssignmentDefinition>;
        constructor(reference: SourceReference);
        parse(context: IParseLineContext): IParsableNode;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
    }
}
declare module "language/scenarios/scenarioParameters" {
    import { IParsableNode, ParsableNode } from "language/parsableNode";
    import { AssignmentDefinition } from "language/scenarios/assignmentDefinition";
    import { SourceReference } from "parser/sourceReference";
    import { IParseLineContext } from "parser/ParseLineContext";
    import { INode } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    import { NodeType } from "language/nodeType";
    export class ScenarioParameters extends ParsableNode {
        private assignmentsValue;
        nodeType: NodeType;
        get assignments(): ReadonlyArray<AssignmentDefinition>;
        constructor(reference: SourceReference);
        parse(context: IParseLineContext): IParsableNode;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
    }
}
declare module "language/scenarios/scenarioFunctionName" {
    import type { IParseLineContext } from "parser/ParseLineContext";
    import type { IValidationContext } from "parser/validationContext";
    import { INode, Node } from "language/node";
    import { SourceReference } from "parser/sourceReference";
    import { NodeType } from "language/nodeType";
    export class ScenarioFunctionName extends Node {
        private valueValue;
        readonly nodeType = NodeType.ScenarioFunctionName;
        get hasValue(): boolean;
        get value(): string;
        constructor(reference: SourceReference);
        parse(context: IParseLineContext): void;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        isEmpty(): boolean;
        toString(): string | null;
    }
}
declare module "language/scenarios/scenario" {
    import { Function } from "language/functions/function";
    import { RootNode } from "language/rootNode";
    import { ScenarioName } from "language/scenarios/scenarioName";
    import { EnumDefinition } from "language/enums/enumDefinition";
    import { Table } from "language/tables/table";
    import { ScenarioExpectError } from "language/scenarios/scenarioExpectError";
    import { ScenarioExpectRootErrors } from "language/scenarios/scenarioExpectRootErrors";
    import { ScenarioTable } from "language/scenarios/scenarioTable";
    import { ScenarioResults } from "language/scenarios/scenarioResults";
    import { ScenarioParameters } from "language/scenarios/scenarioParameters";
    import { ScenarioFunctionName } from "language/scenarios/scenarioFunctionName";
    import { SourceReference } from "parser/sourceReference";
    import { IParseLineContext } from "parser/ParseLineContext";
    import { IParsableNode } from "language/parsableNode";
    import { INode } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    import { NodeType } from "language/nodeType";
    export function instanceOfScenario(object: any): boolean;
    export function asScenario(object: any): Scenario | null;
    export class Scenario extends RootNode {
        readonly nodeType = NodeType.Scenario;
        readonly name: ScenarioName;
        private functionNodeValue;
        private enumValue;
        private tableValue;
        get functionNode(): Function | null;
        get enum(): EnumDefinition | null;
        get table(): Table | null;
        readonly functionName: ScenarioFunctionName;
        readonly parameters: ScenarioParameters;
        readonly results: ScenarioResults;
        readonly validationTable: ScenarioTable;
        readonly expectError: ScenarioExpectError;
        readonly expectRootErrors: ScenarioExpectRootErrors;
        get nodeName(): string;
        constructor(name: string, reference: SourceReference);
        static parse(name: string, reference: SourceReference): Scenario;
        parse(context: IParseLineContext): IParsableNode;
        private resetRootNode;
        private parseFunctionName;
        private parseFunction;
        private parseEnum;
        private parseTable;
        private invalidToken;
        getChildren(): Array<INode>;
        protected validateNodeTree(context: IValidationContext, child: INode): void;
        private validateParameterOrResultNode;
        private addFunctionParametersAndResultsForValidation;
        private static addVariablesForValidation;
        protected validate(context: IValidationContext): void;
    }
}
declare module "language/variableTypes/tableType" {
    import type { IValidationContext } from "parser/validationContext";
    import { TypeWithMembers } from "language/variableTypes/typeWithMembers";
    import { Table } from "language/tables/table";
    import { VariableType } from "language/variableTypes/variableType";
    import { VariableTypeName } from "language/variableTypes/variableTypeName";
    export function instanceOfTableType(object: any): object is TableType;
    export function asTableType(object: any): TableType | null;
    export class TableType extends TypeWithMembers {
        readonly variableTypeName = VariableTypeName.TableType;
        readonly tableName: string;
        readonly table: Table;
        constructor(tableName: string, table: Table);
        equals(other: VariableType): boolean;
        toString(): string;
        memberType(name: string, context: IValidationContext): VariableType | null;
        private tableRowType;
    }
}
declare module "language/variableTypes/functionType" {
    import { TypeWithMembers } from "language/variableTypes/typeWithMembers";
    import { VariableType } from "language/variableTypes/variableType";
    import { Function } from "language/functions/function";
    import { IValidationContext } from "parser/validationContext";
    import { VariableTypeName } from "language/variableTypes/variableTypeName";
    export function instanceOfFunctionType(object: any): object is FunctionType;
    export function asFunctionType(object: any): FunctionType | null;
    export class FunctionType extends TypeWithMembers {
        readonly variableTypeName = VariableTypeName.FunctionType;
        type: string;
        functionValue: Function;
        constructor(type: string, functionValue: Function);
        equals(other: VariableType | null): boolean;
        toString(): string;
        memberType(name: string, context: IValidationContext): VariableType | null;
        private functionParametersType;
        private functionResultsType;
    }
}
declare module "language/rootNodeList" {
    import type { IRootNode } from "language/rootNode";
    import type { INode } from "language/node";
    import { TypeWithMembers } from "language/variableTypes/typeWithMembers";
    import { Function } from "language/functions/function";
    import { Table } from "language/tables/table";
    import { EnumDefinition } from "language/enums/enumDefinition";
    import { TypeDefinition } from "language/types/typeDefinition";
    import { Scenario } from "language/scenarios/scenario";
    export class RootNodeList {
        private readonly values;
        get length(): number;
        asArray(): IRootNode[];
        add(rootNode: IRootNode): void;
        containsEnum(enumName: string): boolean;
        getNode(name: string | null): IRootNode | null;
        contains(name: string): boolean;
        getFunction(name: string): Function | null;
        getTable(name: string): Table | null;
        getCustomType(name: string): TypeDefinition | null;
        getScenarios(): Array<Scenario>;
        getEnum(name: string): EnumDefinition | null;
        addIfNew(node: IRootNode): void;
        first(): INode | null;
        getType(name: string): TypeWithMembers | null;
    }
}
declare module "language/variableTypes/variableType" {
    import type { IRootNode } from "language/rootNode";
    import { RootNodeList } from "language/rootNodeList";
    import { VariableTypeName } from "language/variableTypes/variableTypeName";
    export abstract class VariableType {
        abstract readonly variableTypeName: VariableTypeName;
        abstract equals(other: VariableType | null): boolean;
        getDependencies(rootNodeList: RootNodeList): Array<IRootNode>;
    }
}
declare module "language/variableTypes/ITypeWithMembers" {
    import { VariableType } from "language/variableTypes/variableType";
    import type { IValidationContext } from "parser/validationContext";
    export function instanceOfTypeWithMembers(object: any): object is ITypeWithMembers;
    export function asTypeWithMembers(object: any): ITypeWithMembers | null;
    export interface ITypeWithMembers {
        typeWithMember: boolean;
        memberType(name: string, context: IValidationContext): VariableType | null;
    }
}
declare module "parser/variableEntry" {
    import { VariableSource } from "language/variableSource";
    import { VariableType } from "language/variableTypes/variableType";
    export class VariableEntry {
        variableType: VariableType | null;
        variableSource: VariableSource;
        constructor(variableType: VariableType | null, variableSource: VariableSource);
    }
}
declare module "parser/variableContext" {
    import type { IParserLogger } from "parser/parserLogger";
    import type { IValidationContext } from "parser/validationContext";
    import { VariableType } from "language/variableTypes/variableType";
    import { SourceReference } from "parser/sourceReference";
    import { VariableEntry } from "parser/variableEntry";
    import { VariableReference } from "language/variableReference";
    import { VariableSource } from "language/variableSource";
    export interface IVariableContext {
        addVariable(variableName: string, type: VariableType, source: VariableSource): void;
        registerVariableAndVerifyUnique(reference: SourceReference, variableName: string, type: VariableType | null, source: VariableSource): void;
        ensureVariableExists(reference: SourceReference, variableName: string): boolean;
        containsName(variableName: string): boolean;
        containsReference(reference: VariableReference, context: IValidationContext): boolean;
        getVariableTypeByName(variableName: string): VariableType | null;
        getVariableTypeByReference(reference: VariableReference, context: IValidationContext): VariableType | null;
        getVariableSource(variableName: string): VariableSource | null;
        getVariable(variableName: string): VariableEntry | null;
    }
    export class VariableContext implements IVariableContext {
        private readonly logger;
        private readonly parentContext;
        private readonly variables;
        constructor(logger: IParserLogger, parentContext: IVariableContext | null);
        addVariable(name: string, type: VariableType, source: VariableSource): void;
        registerVariableAndVerifyUnique(reference: SourceReference, name: string, type: VariableType | null, source: VariableSource): void;
        containsName(name: string): boolean;
        containsReference(reference: VariableReference, context: IValidationContext): boolean;
        ensureVariableExists(reference: SourceReference, name: string): boolean;
        getVariableTypeByName(name: string): VariableType | null;
        getVariableTypeByReference(reference: VariableReference, context: IValidationContext): VariableType | null;
        getVariableSource(name: string): VariableSource | null;
        getVariable(name: string): VariableEntry | null;
        private containChild;
        private getVariableType;
    }
}
declare module "infrastructure/stack" {
    export interface IStack<T> {
        push(item: T): void;
        pop(): T | undefined;
        peek(): T | undefined;
        size(): number;
    }
    export class Stack<T> implements IStack<T> {
        private capacity;
        private storage;
        constructor(capacity?: number);
        push(item: T): void;
        pop(): T | undefined;
        peek(): T | undefined;
        size(): number;
    }
}
declare module "parser/validationContext" {
    import type { IParserLogger } from "parser/parserLogger";
    import type { IVariableContext } from "parser/variableContext";
    import { RootNodeList } from "language/rootNodeList";
    import { Expression } from "language/expressions/expression";
    import { VariableType } from "language/variableTypes/variableType";
    import { SourceReference } from "parser/sourceReference";
    export interface IValidationContext {
        logger: IParserLogger;
        rootNodes: RootNodeList;
        variableContext: IVariableContext;
        createVariableScope(): {
            [Symbol.dispose]: () => void;
        };
        validateType(expression: Expression, argumentIndex: number, name: string, type: VariableType, reference: SourceReference, functionHelp: string): IValidationContext;
    }
    export class ValidationContext implements IValidationContext {
        private contexts;
        private variableContextValue;
        logger: IParserLogger;
        rootNodes: RootNodeList;
        constructor(logger: IParserLogger, rootNodes: RootNodeList);
        get variableContext(): IVariableContext;
        dispose(): void;
        createVariableScope(): {
            [Symbol.dispose]: () => void;
        };
        validateType(expression: Expression, argumentIndex: number, name: string, type: VariableType, reference: SourceReference, functionHelp: string): IValidationContext;
    }
}
declare module "language/node" {
    import type { IValidationContext } from "parser/validationContext";
    import type { NodeType } from "language/nodeType";
    import { SourceReference } from "parser/sourceReference";
    export interface INode {
        nodeType: NodeType;
        reference: SourceReference;
        validateTree(context: IValidationContext): void;
        getChildren(): Array<INode>;
    }
    export abstract class Node implements INode {
        reference: SourceReference;
        protected constructor(reference: SourceReference);
        validateTree(context: IValidationContext): void;
        abstract nodeType: NodeType;
        abstract getChildren(): Array<INode>;
        protected validateNodeTree(context: IValidationContext, child: INode | null): void;
        protected abstract validate(context: IValidationContext): void;
    }
}
declare module "language/parsableNode" {
    import type { INode } from "language/node";
    import type { IParseLineContext } from "parser/ParseLineContext";
    import { Node } from "language/node";
    import { SourceReference } from "parser/sourceReference";
    export function instanceOfParsableNode(object: any): object is IParsableNode;
    export function asParsableNode(object: any): IParsableNode | null;
    export interface IParsableNode extends INode {
        isParsableNode: boolean;
        parse(context: IParseLineContext): IParsableNode;
    }
    export abstract class ParsableNode extends Node implements IParsableNode {
        protected constructor(reference: SourceReference);
        readonly isParsableNode = true;
        abstract parse(context: IParseLineContext): IParsableNode;
    }
}
declare module "language/rootNode" {
    import type { IParsableNode } from "language/parsableNode";
    import { ParsableNode } from "language/parsableNode";
    import { SourceReference } from "parser/sourceReference";
    import { IValidationContext } from "parser/validationContext";
    import { INode } from "language/node";
    export function instanceOfRootNode(object: any): object is IRootNode;
    export function asRootNode(object: any): IRootNode | null;
    export interface IRootNode extends IParsableNode {
        isRootNode: true;
        nodeName: string;
    }
    export abstract class RootNode extends ParsableNode implements IRootNode {
        readonly isRootNode = true;
        abstract readonly nodeName: string;
        protected constructor(reference: SourceReference);
        protected validateNodeTree(context: IValidationContext, child: INode | null): void;
    }
}
declare module "runTime/executionContext" {
    import type { ILogger } from "infrastructure/logger";
    export interface IExecutionContext {
        logDebug(message: string): void;
        logVariable<T>(name: string, value: T): void;
    }
    export class ExecutionContext implements IExecutionContext {
        private readonly logger;
        constructor(logger: ILogger);
        logDebug(message: string): void;
        logVariable<T>(name: string, value: T): void;
    }
}
declare module "runTime/functionResult" {
    import { VariableReference } from "language/variableReference";
    export class FunctionResult {
        private readonly valueObject;
        constructor(valueObject: any);
        number(name: string): number;
        getValue(expectedVariable: VariableReference): any;
    }
}
declare module "compiler/executableFunction" {
    import { IExecutionContext } from "runTime/executionContext";
    import { FunctionResult } from "runTime/functionResult";
    export class ExecutableFunction {
        private functionReference;
        constructor(functionReference: Function);
        run(executionContext: IExecutionContext, values?: {
            [key: string]: any;
        } | null): FunctionResult;
        private getParameters;
        private getParameterSetter;
    }
}
declare module "compiler/generatedType" {
    import type { IRootNode } from "language/rootNode";
    import { ExecutableFunction } from "compiler/executableFunction";
    export enum GeneratedTypeKind {
        Function = "Function",
        Enum = "Enum",
        Type = "Type",
        Table = "Table"
    }
    export class GeneratedType {
        readonly kind: GeneratedTypeKind;
        readonly node: IRootNode;
        readonly name: string;
        readonly initializationFunction: string;
        readonly executableFunction: ExecutableFunction | null;
        constructor(kind: GeneratedTypeKind, node: IRootNode, name: string, initializationFunction: string, executableFunction?: ExecutableFunction | null);
    }
}
declare module "compiler/IRootTokenWriter" {
    import type { IRootNode } from "language/rootNode";
    import { GeneratedType } from "compiler/generatedType";
    export interface IRootTokenWriter {
        createCode(generateNode: IRootNode): GeneratedType;
    }
}
declare module "compiler/compilerResult" {
    import type { ICompilationEnvironment } from "compiler/compilationEnvironment";
    import { ExecutableFunction } from "compiler/executableFunction";
    import { Function } from "language/functions/function";
    import { GeneratedType } from "compiler/generatedType";
    import { IExecutionContext } from "runTime/executionContext";
    import { ILogger } from "infrastructure/logger";
    export class CompilerResult implements Disposable {
        private enums;
        private executables;
        private environment;
        private executionLogger;
        constructor(executables: {
            [key: string]: ExecutableFunction;
        }, enums: {
            [key: string]: GeneratedType;
        }, environment: ICompilationEnvironment, executionLogger: ILogger);
        getFunction(functionNode: Function): ExecutableFunction;
        getEnumType(type: string): any;
        createContext(): IExecutionContext;
        [Symbol.dispose](): void;
    }
}
declare module "compiler/lexyCodeConstants" {
    export class LexyCodeConstants {
        static readonly namespace = "lexyRuntime";
        static readonly resultsType = "__Result";
        static readonly parametersType = "__Parameters";
        static readonly rowType = "__Row";
        static readonly runMethod = "__run";
        static readonly parameterVariable = "__parameters";
        static readonly resultsVariable = "__result";
        static readonly contextVariable = "__context";
        static readonly valuesVariable = "__values";
        static readonly functionClassPrefix = "function__";
        static readonly tableClassPrefix = "table__";
        static readonly enumClassPrefix = "enum__";
        static readonly typeClassPrefix = "type__";
    }
}
declare module "compiler/JavaScript/classNames" {
    export function functionClassName(functionName: string): string;
    export function tableClassName(tableTypeName: string): string;
    export function enumClassName(enumName: string): string;
    export function typeClassName(enumName: string): string;
    export function normalize(functionName: string, functionClassPrefix?: string | null): string;
}
declare module "runTime/builtInDateFunctions" {
    export class BuiltInDateFunctions {
        private static readonly millisecondsInDay;
        private static readonly millisecondsInHour;
        private static readonly millisecondsInMinute;
        static now(): Date;
        static today(): Date;
        static year(value: Date): number;
        static month(value: Date): number;
        static day(value: Date): number;
        static hour(value: Date): number;
        static minute(value: Date): number;
        static second(value: Date): number;
        static years(end: Date, start: Date): number;
        static months(end: Date, start: Date): number;
        static days(end: Date, start: Date): number;
        static hours(end: Date, start: Date): number;
        static minutes(end: Date, start: Date): number;
        static seconds(end: Date, start: Date): number;
        static milliseconds(end: Date, start: Date): number;
        private static differenceInCalendarYears;
        private static compareAsc;
        private static startOfDay;
        private static endOfDay;
        private static endOfMonth;
        private static isLastDayOfMonth;
        private static round;
        private static getTimezoneOffsetInMilliseconds;
        private static differenceInYears;
        private static differenceInCalendarMonths;
        private static differenceInMonths;
        private static differenceInCalendarDays;
        private static differenceInDays;
        private static compareLocalAsc;
        private static differenceInHours;
        private static differenceInMinutes;
        private static differenceInSeconds;
        private static differenceInMilliseconds;
    }
}
declare module "runTime/builtInNumberFunctions" {
    export class BuiltInNumberFunctions {
        static int(value: number): number;
        static abs(value: number): number;
        static power(number: number, power: number): number;
        static round(number: number, digits: number): number;
    }
}
declare module "runTime/builtInTableFunctions" {
    import { IExecutionContext } from "runTime/executionContext";
    export class BuiltInTableFunctions {
        static lookUp(resultName: string, valueName: string, tableName: string, tableValues: any, condition: any, context: IExecutionContext): any;
        static lookUpRow(valueName: string, tableName: string, tableValues: any, condition: any, context: IExecutionContext): any;
    }
}
declare module "runTime/systemFunctions" {
    export class SystemFunctions {
        static populate(parameters: any, values: any): void;
    }
}
declare module "compiler/compilationEnvironment" {
    import type { ILogger } from "infrastructure/logger";
    import { GeneratedType } from "compiler/generatedType";
    import { CompilerResult } from "compiler/compilerResult";
    export interface ICompilationEnvironment extends Disposable {
        namespace: string;
        fullNamespace: string;
        addType(generatedType: GeneratedType): void;
        initialize(): void;
        result(): CompilerResult;
    }
    export class CompilationEnvironment implements ICompilationEnvironment, Disposable {
        private readonly generatedTypes;
        private readonly enums;
        private readonly executables;
        private readonly tables;
        private readonly types;
        private readonly executionLogger;
        private readonly compilationLogger;
        readonly namespace: string;
        readonly fullNamespace: string;
        constructor(compilationLogger: ILogger, executionLogger: ILogger);
        initialize(): void;
        addType(generatedType: GeneratedType): void;
        result(): CompilerResult;
        private initializeNamespace;
        private initializeType;
        private createExecutableFunction;
        [Symbol.dispose](): void;
    }
}
declare module "compiler/JavaScript/writers/codeWriter" {
    export class CodeWriter {
        private readonly builder;
        private readonly namespace;
        private indent;
        private currentLineValue;
        constructor(namespace: string);
        get currentLine(): number;
        startLine(value?: string | null): void;
        endLine(value?: string | null): void;
        writeLine(value: string): void;
        write(value: string): void;
        writeNamespace(value?: string | null): void;
        openScope(value?: string | null): void;
        openInlineScope(value: string): void;
        closeScope(suffix?: string | null): void;
        openBrackets(name: string): void;
        closeBrackets(suffix?: string | null): void;
        toString(): string;
        private indentString;
        identifierFromNamespace(value: string): string;
    }
}
declare module "compiler/JavaScript/types" {
    import { VariableType } from "language/variableTypes/variableType";
    import { ComplexType } from "language/variableTypes/complexType";
    export function translateType(variableType: VariableType): string;
    export function translateComplexType(complexType: ComplexType): string;
}
declare module "compiler/JavaScript/renderers/renderVariableClass" {
    import { VariableDefinition } from "language/variableDefinition";
    import { CodeWriter } from "compiler/JavaScript/writers/codeWriter";
    import { VariableDeclarationType } from "language/variableTypes/variableDeclarationType";
    export function createVariableClass(className: string, variables: ReadonlyArray<VariableDefinition>, codeWriter: CodeWriter): void;
    export function renderTypeDefaultExpression(variableDeclarationType: VariableDeclarationType, codeWriter: CodeWriter): void;
}
declare module "compiler/JavaScript/builtInFunctions/functionCall" {
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { CodeWriter } from "compiler/JavaScript/writers/codeWriter";
    export abstract class FunctionCall<TFunctionExpression extends ExpressionFunction> {
        renderCustomFunction(expression: TFunctionExpression, codeWriter: CodeWriter): void;
        abstract renderExpression(expression: TFunctionExpression, codeWriter: CodeWriter): void;
    }
}
declare module "compiler/JavaScript/builtInFunctions/lookUpFunctionCall" {
    import { FunctionCall } from "compiler/JavaScript/builtInFunctions/functionCall";
    import { LookupFunction } from "language/expressions/functions/lookupFunction";
    import { CodeWriter } from "compiler/JavaScript/writers/codeWriter";
    export class LookUpFunctionCall extends FunctionCall<LookupFunction> {
        renderExpression(expression: LookupFunction, codeWriter: CodeWriter): void;
    }
}
declare module "compiler/JavaScript/builtInFunctions/lookUpRowFunctionCall" {
    import { FunctionCall } from "compiler/JavaScript/builtInFunctions/functionCall";
    import { LookupRowFunction } from "language/expressions/functions/lookupRowFunction";
    import { CodeWriter } from "compiler/JavaScript/writers/codeWriter";
    export class LookUpRowFunctionCall extends FunctionCall<LookupRowFunction> {
        renderExpression(expression: LookupRowFunction, codeWriter: CodeWriter): void;
    }
}
declare module "compiler/JavaScript/builtInFunctions/methodFunctionCall" {
    import { FunctionCall } from "compiler/JavaScript/builtInFunctions/functionCall";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    import { CodeWriter } from "compiler/JavaScript/writers/codeWriter";
    export abstract class MethodFunctionCall<TFunctionExpression extends ExpressionFunction> extends FunctionCall<TFunctionExpression> {
        protected abstract className: string;
        protected abstract methodName: string;
        renderExpression(expression: TFunctionExpression, codeWriter: CodeWriter): void;
        protected abstract renderArguments(expression: TFunctionExpression, codeWriter: CodeWriter): void;
    }
}
declare module "compiler/JavaScript/builtInFunctions/singleArgumentFunctionCall" {
    import { MethodFunctionCall } from "compiler/JavaScript/builtInFunctions/methodFunctionCall";
    import { SingleArgumentFunction } from "language/expressions/functions/singleArgumentFunction";
    import { CodeWriter } from "compiler/JavaScript/writers/codeWriter";
    export abstract class SingleArgumentFunctionCall<TFunctionExpression extends SingleArgumentFunction> extends MethodFunctionCall<TFunctionExpression> {
        protected renderArguments(expression: TFunctionExpression, codeWriter: CodeWriter): void;
    }
}
declare module "compiler/JavaScript/builtInFunctions/intFunctionCall" {
    import { SingleArgumentFunctionCall } from "compiler/JavaScript/builtInFunctions/singleArgumentFunctionCall";
    import { IntFunction } from "language/expressions/functions/intFunction";
    export class IntFunctionCall extends SingleArgumentFunctionCall<IntFunction> {
        protected className: string;
        protected methodName: string;
    }
}
declare module "compiler/JavaScript/builtInFunctions/absFunctionCall" {
    import { AbsFunction } from "language/expressions/functions/absFunction";
    import { SingleArgumentFunctionCall } from "compiler/JavaScript/builtInFunctions/singleArgumentFunctionCall";
    export class AbsFunctionCall extends SingleArgumentFunctionCall<AbsFunction> {
        protected className: string;
        protected methodName: string;
    }
}
declare module "compiler/JavaScript/builtInFunctions/powerFunctionCall" {
    import { MethodFunctionCall } from "compiler/JavaScript/builtInFunctions/methodFunctionCall";
    import { PowerFunction } from "language/expressions/functions/powerFunction";
    import { CodeWriter } from "compiler/JavaScript/writers/codeWriter";
    export class PowerFunctionCall extends MethodFunctionCall<PowerFunction> {
        protected className: string;
        protected methodName: string;
        protected renderArguments(expression: PowerFunction, codeWriter: CodeWriter): void;
    }
}
declare module "compiler/JavaScript/builtInFunctions/roundFunctionCall" {
    import { MethodFunctionCall } from "compiler/JavaScript/builtInFunctions/methodFunctionCall";
    import { RoundFunction } from "language/expressions/functions/roundFunction";
    import { CodeWriter } from "compiler/JavaScript/writers/codeWriter";
    export class RoundFunctionCall extends MethodFunctionCall<RoundFunction> {
        protected className: string;
        protected methodName: string;
        protected renderArguments(expression: RoundFunction, codeWriter: CodeWriter): void;
    }
}
declare module "compiler/JavaScript/builtInFunctions/noArgumentFunctionCall" {
    import { CodeWriter } from "compiler/JavaScript/writers/codeWriter";
    import { FunctionCall } from "compiler/JavaScript/builtInFunctions/functionCall";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    export abstract class NoArgumentFunctionCall<TFunctionExpression extends ExpressionFunction> extends FunctionCall<TFunctionExpression> {
        protected abstract className: string;
        protected abstract methodName: string;
        renderExpression(expresion: TFunctionExpression, codeWriter: CodeWriter): void;
    }
}
declare module "compiler/JavaScript/builtInFunctions/nowFunctionCall" {
    import { NoArgumentFunctionCall } from "compiler/JavaScript/builtInFunctions/noArgumentFunctionCall";
    import { NowFunction } from "language/expressions/functions/nowFunction";
    export class NowFunctionCall extends NoArgumentFunctionCall<NowFunction> {
        protected className: string;
        protected methodName: string;
    }
}
declare module "compiler/JavaScript/builtInFunctions/todayFunctionCall" {
    import { NoArgumentFunctionCall } from "compiler/JavaScript/builtInFunctions/noArgumentFunctionCall";
    import { TodayFunction } from "language/expressions/functions/todayFunction";
    export class TodayFunctionCall extends NoArgumentFunctionCall<TodayFunction> {
        protected className: string;
        protected methodName: string;
    }
}
declare module "compiler/JavaScript/builtInFunctions/yearFunctionCall" {
    import { YearFunction } from "language/expressions/functions/yearFunction";
    import { SingleArgumentFunctionCall } from "compiler/JavaScript/builtInFunctions/singleArgumentFunctionCall";
    export class YearFunctionCall extends SingleArgumentFunctionCall<YearFunction> {
        protected className: string;
        protected methodName: string;
    }
}
declare module "compiler/JavaScript/builtInFunctions/monthFunctionCall" {
    import { SingleArgumentFunctionCall } from "compiler/JavaScript/builtInFunctions/singleArgumentFunctionCall";
    import { MonthFunction } from "language/expressions/functions/monthFunction";
    export class MonthFunctionCall extends SingleArgumentFunctionCall<MonthFunction> {
        protected className: string;
        protected methodName: string;
    }
}
declare module "compiler/JavaScript/builtInFunctions/dayFunctionCall" {
    import { SingleArgumentFunctionCall } from "compiler/JavaScript/builtInFunctions/singleArgumentFunctionCall";
    import { DayFunction } from "language/expressions/functions/dayFunction";
    export class DayFunctionCall extends SingleArgumentFunctionCall<DayFunction> {
        protected className: string;
        protected methodName: string;
    }
}
declare module "compiler/JavaScript/builtInFunctions/hourFunctionCall" {
    import { SingleArgumentFunctionCall } from "compiler/JavaScript/builtInFunctions/singleArgumentFunctionCall";
    import { HourFunction } from "language/expressions/functions/hourFunction";
    export class HourFunctionCall extends SingleArgumentFunctionCall<HourFunction> {
        protected className: string;
        protected methodName: string;
    }
}
declare module "compiler/JavaScript/builtInFunctions/minuteFunctionCall" {
    import { SingleArgumentFunctionCall } from "compiler/JavaScript/builtInFunctions/singleArgumentFunctionCall";
    import { MinuteFunction } from "language/expressions/functions/minuteFunction";
    export class MinuteFunctionCall extends SingleArgumentFunctionCall<MinuteFunction> {
        protected className: string;
        protected methodName: string;
    }
}
declare module "compiler/JavaScript/builtInFunctions/secondFunctionCall" {
    import { SingleArgumentFunctionCall } from "compiler/JavaScript/builtInFunctions/singleArgumentFunctionCall";
    import { SecondFunction } from "language/expressions/functions/secondFunction";
    export class SecondFunctionCall extends SingleArgumentFunctionCall<SecondFunction> {
        protected className: string;
        protected methodName: string;
    }
}
declare module "compiler/JavaScript/builtInFunctions/endStartDateFunctionCall" {
    import { EndStartDateFunction } from "language/expressions/functions/endStartDateFunction";
    import { MethodFunctionCall } from "compiler/JavaScript/builtInFunctions/methodFunctionCall";
    import { CodeWriter } from "compiler/JavaScript/writers/codeWriter";
    export abstract class EndStartDateFunctionCall<TFunctionExpression extends EndStartDateFunction> extends MethodFunctionCall<TFunctionExpression> {
        protected renderArguments(expression: TFunctionExpression, codeWriter: CodeWriter): void;
    }
}
declare module "compiler/JavaScript/builtInFunctions/yearsFunctionCall" {
    import { EndStartDateFunctionCall } from "compiler/JavaScript/builtInFunctions/endStartDateFunctionCall";
    import { YearsFunction } from "language/expressions/functions/yearsFunction";
    export class YearsFunctionCall extends EndStartDateFunctionCall<YearsFunction> {
        protected className: string;
        protected methodName: string;
    }
}
declare module "compiler/JavaScript/builtInFunctions/monthsFunctionCall" {
    import { EndStartDateFunctionCall } from "compiler/JavaScript/builtInFunctions/endStartDateFunctionCall";
    import { MonthsFunction } from "language/expressions/functions/monthsFunction";
    export class MonthsFunctionCall extends EndStartDateFunctionCall<MonthsFunction> {
        protected className: string;
        protected methodName: string;
    }
}
declare module "compiler/JavaScript/builtInFunctions/daysFunctionCall" {
    import { EndStartDateFunctionCall } from "compiler/JavaScript/builtInFunctions/endStartDateFunctionCall";
    import { DaysFunction } from "language/expressions/functions/daysFunction";
    export class DaysFunctionCall extends EndStartDateFunctionCall<DaysFunction> {
        protected className: string;
        protected methodName: string;
    }
}
declare module "compiler/JavaScript/builtInFunctions/hoursFunctionCall" {
    import { EndStartDateFunctionCall } from "compiler/JavaScript/builtInFunctions/endStartDateFunctionCall";
    import { HoursFunction } from "language/expressions/functions/hoursFunction";
    export class HoursFunctionCall extends EndStartDateFunctionCall<HoursFunction> {
        protected className: string;
        protected methodName: string;
    }
}
declare module "compiler/JavaScript/builtInFunctions/minutesFunctionCall" {
    import { EndStartDateFunctionCall } from "compiler/JavaScript/builtInFunctions/endStartDateFunctionCall";
    import { MinutesFunction } from "language/expressions/functions/minutesFunction";
    export class MinutesFunctionCall extends EndStartDateFunctionCall<MinutesFunction> {
        protected className: string;
        protected methodName: string;
    }
}
declare module "compiler/JavaScript/builtInFunctions/secondsFunctionCall" {
    import { EndStartDateFunctionCall } from "compiler/JavaScript/builtInFunctions/endStartDateFunctionCall";
    import { SecondsFunction } from "language/expressions/functions/secondsFunction";
    export class SecondsFunctionCall extends EndStartDateFunctionCall<SecondsFunction> {
        protected className: string;
        protected methodName: string;
    }
}
declare module "compiler/JavaScript/builtInFunctions/lexyFunctionCall" {
    import { FunctionCall } from "compiler/JavaScript/builtInFunctions/functionCall";
    import { LexyFunction } from "language/expressions/functions/lexyFunction";
    import { CodeWriter } from "compiler/JavaScript/writers/codeWriter";
    export class LexyFunctionCall extends FunctionCall<LexyFunction> {
        renderExpression(expression: LexyFunction, codeWriter: CodeWriter): void;
        static renderFunction(functionName: string, variableName: string | null, codeWriter: CodeWriter): void;
    }
}
declare module "compiler/JavaScript/builtInFunctions/createFunctionCall" {
    import { CodeWriter } from "compiler/JavaScript/writers/codeWriter";
    import { ExpressionFunction } from "language/expressions/functions/expressionFunction";
    export function renderCustomBuiltInFunctions(expression: ExpressionFunction, codeWriter: CodeWriter): void;
    export function renderFunctionCall(expression: ExpressionFunction, codeWriter: CodeWriter): void;
}
declare module "compiler/JavaScript/lineExpressionExceptions/ILineExpressionException" {
    import { Expression } from "language/expressions/expression";
    import { CodeWriter } from "compiler/JavaScript/writers/codeWriter";
    export interface ILineExpressionException {
        matches(expression: Expression): boolean;
        render(expression: Expression, codeWriter: CodeWriter): void;
    }
}
declare module "compiler/JavaScript/lineExpressionExceptions/newFunctionExpressionStatementException" {
    import { ILineExpressionException } from "compiler/JavaScript/lineExpressionExceptions/ILineExpressionException";
    import { Expression } from "language/expressions/expression";
    import { CodeWriter } from "compiler/JavaScript/writers/codeWriter";
    export class NewFunctionExpressionStatementException implements ILineExpressionException {
        matches(expression: Expression): boolean;
        render(expression: Expression, codeWriter: CodeWriter): void;
    }
}
declare module "compiler/JavaScript/lineExpressionExceptions/fillFunctionExpressionStatementException" {
    import { ILineExpressionException } from "compiler/JavaScript/lineExpressionExceptions/ILineExpressionException";
    import { Expression } from "language/expressions/expression";
    import { VariableType } from "language/variableTypes/variableType";
    import { Mapping } from "language/expressions/functions/mapping";
    import { CodeWriter } from "compiler/JavaScript/writers/codeWriter";
    export class FillFunctionExpressionStatementException implements ILineExpressionException {
        matches(expression: Expression): boolean;
        render(expression: Expression, codeWriter: CodeWriter): void;
        static renderFill(variableName: string, type: VariableType, mappings: ReadonlyArray<Mapping>, codeWriter: CodeWriter): void;
    }
}
declare module "compiler/JavaScript/lineExpressionExceptions/extractFunctionExpressionStatementException" {
    import { ILineExpressionException } from "compiler/JavaScript/lineExpressionExceptions/ILineExpressionException";
    import { Expression } from "language/expressions/expression";
    import { CodeWriter } from "compiler/JavaScript/writers/codeWriter";
    import { Mapping } from "language/expressions/functions/mapping";
    export class ExtractFunctionExpressionStatementException implements ILineExpressionException {
        matches(expression: Expression): boolean;
        render(expression: Expression, codeWriter: CodeWriter): void;
        static renderExtract(mappings: ReadonlyArray<Mapping>, functionResultVariable: string, codeWriter: CodeWriter): void;
        private static renderMapping;
    }
}
declare module "compiler/JavaScript/lineExpressionExceptions/simpleLexyFunctionFunctionExpressionStatementException" {
    import { ILineExpressionException } from "compiler/JavaScript/lineExpressionExceptions/ILineExpressionException";
    import { Expression } from "language/expressions/expression";
    import { CodeWriter } from "compiler/JavaScript/writers/codeWriter";
    export class SimpleLexyFunctionFunctionExpressionStatementException implements ILineExpressionException {
        matches(expression: Expression): boolean;
        render(expression: Expression, codeWriter: CodeWriter): void;
        private renderRunFunction;
    }
}
declare module "compiler/JavaScript/lineExpressionExceptions/matchesLineExpressionException" {
    import { Expression } from "language/expressions/expression";
    import { ILineExpressionException } from "compiler/JavaScript/lineExpressionExceptions/ILineExpressionException";
    export function matchesLineExpressionException(expression: Expression): ILineExpressionException | null;
}
declare module "compiler/JavaScript/renderers/renderExpression" {
    import { Expression } from "language/expressions/expression";
    import { CodeWriter } from "compiler/JavaScript/writers/codeWriter";
    import { CustomVariableDeclarationType } from "language/variableTypes/customVariableDeclarationType";
    export function renderExpressions(expressions: ReadonlyArray<Expression>, codeWriter: CodeWriter): void;
    export function renderValueExpression(expression: Expression, codeWriter: CodeWriter): void;
    export function renderExpression(expression: Expression, codeWriter: CodeWriter): void;
    export function customVariableIdentifier(customVariable: CustomVariableDeclarationType, codeWriter: CodeWriter): string;
}
declare module "compiler/JavaScript/writers/functionWriter" {
    import type { IRootTokenWriter } from "compiler/IRootTokenWriter";
    import type { IRootNode } from "language/rootNode";
    import { GeneratedType } from "compiler/generatedType";
    export class FunctionWriter implements IRootTokenWriter {
        private readonly namespace;
        constructor(namespace: string);
        createCode(node: IRootNode): GeneratedType;
        private createFunction;
        private renderRunFunction;
        private renderCode;
        private renderResults;
        private renderCustomBuiltInFunctions;
    }
}
declare module "compiler/JavaScript/writers/typeWriter" {
    import type { IRootTokenWriter } from "compiler/IRootTokenWriter";
    import type { IRootNode } from "language/rootNode";
    import { GeneratedType } from "compiler/generatedType";
    export class TypeWriter implements IRootTokenWriter {
        private readonly namespace;
        constructor(namespace: string);
        createCode(node: IRootNode): GeneratedType;
    }
}
declare module "compiler/JavaScript/writers/tableWriter" {
    import type { IRootNode } from "language/rootNode";
    import type { IRootTokenWriter } from "compiler/IRootTokenWriter";
    import { GeneratedType } from "compiler/generatedType";
    export class TableWriter implements IRootTokenWriter {
        private readonly namespace;
        constructor(namespace: string);
        createCode(node: IRootNode): GeneratedType;
        private renderRowClass;
        private renderValues;
    }
}
declare module "compiler/JavaScript/writers/enumWriter" {
    import { IRootNode } from "language/rootNode";
    import { IRootTokenWriter } from "compiler/IRootTokenWriter";
    import { GeneratedType } from "compiler/generatedType";
    export class EnumWriter implements IRootTokenWriter {
        private readonly namespace;
        constructor(namespace: string);
        createCode(node: IRootNode): GeneratedType;
    }
}
declare module "compiler/JavaScript/JavaScriptCode" {
    import { IRootNode } from "language/rootNode";
    import { IRootTokenWriter } from "compiler/IRootTokenWriter";
    export class JavaScriptCode {
        static getWriter(rootNode: IRootNode, namespace: string): IRootTokenWriter | null;
    }
}
declare module "compiler/lexyCompiler" {
    import type { ILogger } from "infrastructure/logger";
    import { IRootNode } from "language/rootNode";
    import { CompilerResult } from "compiler/compilerResult";
    export interface ILexyCompiler {
        compile(nodes: Array<IRootNode>): CompilerResult;
    }
    export class LexyCompiler implements ILexyCompiler {
        private readonly compilationLogger;
        private readonly executionLogger;
        constructor(compilationLogger: ILogger, executionLogger: ILogger);
        compile(nodes: Array<IRootNode>): CompilerResult;
        private generateCode;
        private generateType;
    }
}
declare module "dependencyGraph/dependencyNode" {
    export class DependencyNode {
        private readonly dependenciesValue;
        private readonly parentNode;
        name: string;
        type: string;
        get dependencies(): ReadonlyArray<DependencyNode>;
        constructor(name: string, type: string, parentNode: DependencyNode | null);
        addDependency(dependency: DependencyNode): void;
        protected equals(other: DependencyNode): boolean;
        existsInLineage(name: string, type: string): boolean;
    }
}
declare module "dependencyGraph/dependencies" {
    import type { IRootNode } from "language/rootNode";
    import { RootNodeList } from "language/rootNodeList";
    import { DependencyNode } from "dependencyGraph/dependencyNode";
    export class Dependencies {
        private readonly circularReferencesValue;
        private readonly rootNodes;
        nodes: Array<DependencyNode>;
        get hasCircularReferences(): boolean;
        get circularReferences(): IRootNode[];
        constructor(rootNodes: RootNodeList);
        build(): void;
        private processNodes;
        private processNode;
        private newDependencyNode;
        private getDependencies;
        private processDependencies;
        private validateDependency;
        private dependencyExists;
    }
}
declare module "dependencyGraph/dependencyGraphFactory" {
    import { RootNodeList } from "language/rootNodeList";
    import { Dependencies } from "dependencyGraph/dependencies";
    export class DependencyGraphFactory {
        static create(rootNodes: RootNodeList): Dependencies;
    }
}
declare module "infrastructure/nameOf" {
    export const nameOf: <T>(name: keyof T) => keyof T;
}
declare module "language/comments" {
    import { IParsableNode, ParsableNode } from "language/parsableNode";
    import { SourceReference } from "parser/sourceReference";
    import { IParseLineContext } from "parser/ParseLineContext";
    import { INode } from "language/node";
    import { IValidationContext } from "parser/validationContext";
    import { NodeType } from "language/nodeType";
    export class Comments extends ParsableNode {
        private readonly lines;
        nodeType: NodeType;
        constructor(sourceReference: SourceReference);
        parse(context: IParseLineContext): IParsableNode;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
    }
}
declare module "parser/IFileSystem" {
    export interface IFileSystem {
        readAllLines(fileName: string): Array<string>;
        getFileName(fullFileName: string): string;
        getDirectoryName(parentFullFileName: string): string;
        getFullPath(directName: string): string;
        combine(fullPath: string, fileName: string): string;
        fileExists(fullFinName: string): boolean;
        directoryExists(absoluteFolder: string): boolean;
        isPathRooted(folder: string): boolean;
        getDirectoryFiles(folder: string, filter: string): Array<string>;
        getDirectories(folder: string): Array<string>;
    }
}
declare module "language/sourceCodeNode" {
    import type { IParseLineContext } from "parser/ParseLineContext";
    import type { IParsableNode } from "language/parsableNode";
    import type { INode } from "language/node";
    import type { IValidationContext } from "parser/validationContext";
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import { RootNode } from "language/rootNode";
    import { Comments } from "language/comments";
    import { Include } from "language/include";
    import { RootNodeList } from "language/rootNodeList";
    import { NodeType } from "language/nodeType";
    export class SourceCodeNode extends RootNode {
        private readonly includes;
        private readonly expressionFactory;
        readonly nodeType = NodeType.SourceCodeNode;
        readonly nodeName = "SourceCodeNode";
        readonly comments: Comments;
        readonly rootNodes: RootNodeList;
        constructor(expressionFactory: IExpressionFactory);
        parse(context: IParseLineContext): IParsableNode;
        private parseRootNode;
        private invalidNode;
        getChildren(): Array<INode>;
        protected validate(context: IValidationContext): void;
        getDueIncludes(): ReadonlyArray<Include>;
    }
}
declare module "parser/parserContext" {
    import type { IParserLogger } from "parser/parserLogger";
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import type { IFileSystem } from "parser/IFileSystem";
    import type { ILogger } from "infrastructure/logger";
    import { SourceCodeNode } from "language/sourceCodeNode";
    import { RootNodeList } from "language/rootNodeList";
    export interface IParserContext {
        logger: IParserLogger;
        fileSystem: IFileSystem;
        nodes: RootNodeList;
        rootNode: SourceCodeNode;
        addFileIncluded(fileName: string): void;
        isFileIncluded(fileName: string): boolean;
    }
    export class ParserContext implements IParserContext {
        private readonly includedFiles;
        get nodes(): RootNodeList;
        readonly rootNode: SourceCodeNode;
        readonly logger: IParserLogger;
        readonly fileSystem: IFileSystem;
        constructor(logger: ILogger, fileSystem: IFileSystem, expressionFactory: IExpressionFactory);
        addFileIncluded(fileName: string): void;
        isFileIncluded(fileName: string): boolean;
        private normalizePath;
    }
}
declare module "parser/lexySourceDocument" {
    export class LexySourceDocument {
        static readonly fileExtension: string;
    }
}
declare module "language/include" {
    import type { IParseLineContext } from "parser/ParseLineContext";
    import type { IParserContext } from "parser/parserContext";
    import { SourceReference } from "parser/sourceReference";
    import { Line } from "parser/line";
    export class Include {
        private isProcessedValue;
        private readonly reference;
        readonly fileName: string;
        get isProcessed(): boolean;
        constructor(fileName: string, reference: SourceReference);
        static isValid(line: Line): boolean;
        static parse(context: IParseLineContext): Include | null;
        process(parentFullFileName: string, context: IParserContext): string | null;
    }
}
declare module "language/parsableNodeArray" {
    import { IParsableNode } from "language/parsableNode";
    export class ParsableNodeArray {
        private values;
        constructor(rootNode: IParsableNode);
        get(indent: number): IParsableNode | null;
        set(indent: number, node: IParsableNode): void;
        private resize;
    }
}
declare module "parser/sourceCodeDocument" {
    import { Line } from "parser/line";
    export interface ISourceCodeDocument {
        currentLine: Line;
        setCode(lines: string[], fileName: string): void;
        hasMoreLines(): boolean;
        nextLine(): Line;
        reset(): void;
    }
    export class SourceCodeDocument implements ISourceCodeDocument {
        private code;
        private file;
        private currentLineValue;
        private index;
        get currentLine(): Line;
        setCode(lines: string[], fileName: string): void;
        hasMoreLines(): boolean;
        nextLine(): Line;
        reset(): void;
    }
}
declare module "parser/parserResult" {
    import { RootNodeList } from "language/rootNodeList";
    import { IParserLogger } from "parser/parserLogger";
    export class ParserResult {
        readonly rootNodes: RootNodeList;
        readonly logger: IParserLogger;
        constructor(rootNodes: RootNodeList, logger: IParserLogger);
    }
}
declare module "parser/lexyParser" {
    import type { ITokenizer } from "parser/tokens/tokenizer";
    import type { IExpressionFactory } from "language/expressions/expressionFactory";
    import type { IFileSystem } from "parser/IFileSystem";
    import type { ILogger } from "infrastructure/logger";
    import { ParserResult } from "parser/parserResult";
    export interface ILexyParser {
        parseFile(fileName: string, throwException: boolean): ParserResult;
        parse(code: string[], fileName: string, throwException: boolean): ParserResult;
    }
    export class LexyParser implements ILexyParser {
        private readonly tokenizer;
        private readonly baseLogger;
        private readonly sourceCode;
        private readonly fileSystem;
        private readonly expressionFactory;
        constructor(baseLogger: ILogger, tokenizer: ITokenizer, fileSystem: IFileSystem, expressionFactory: IExpressionFactory);
        parseFile(fileName: string, throwException?: boolean): ParserResult;
        parse(code: string[], fullFileName: string, throwException?: boolean): ParserResult;
        private parseDocument;
        private processLine;
        private loadIncludedFiles;
        private includeFiles;
        private validateNodesTree;
        private detectCircularDependencies;
        private reset;
        private parseLine;
        private instanceOfRootNode;
        private asRootNode;
    }
}
declare module "specifications/specificationFileRunner" {
    import { ISpecificationRunnerContext } from "specifications/specificationRunnerContext";
    import { ILexyParser } from "parser/lexyParser";
    import { IScenarioRunner } from "specifications/scenarioRunner";
    import { ILexyCompiler } from "compiler/lexyCompiler";
    export interface ISpecificationFileRunner {
        scenarioRunners: ReadonlyArray<IScenarioRunner>;
        countScenarioRunners(): number;
        run(): void;
    }
    export class SpecificationFileRunner implements ISpecificationFileRunner {
        private readonly compiler;
        private readonly parser;
        private readonly fileName;
        private readonly runnerContext;
        private readonly scenarioRunnersValue;
        private result;
        get scenarioRunners(): ReadonlyArray<IScenarioRunner>;
        constructor(fileName: string, compiler: ILexyCompiler, parser: ILexyParser, runnerContext: ISpecificationRunnerContext);
        initialize(): void;
        run(): void;
        private getScenarioRunner;
        countScenarioRunners(): number;
        private validateHasScenarioCheckingRootErrors;
    }
}
declare module "specifications/specificationRunnerContext" {
    import type { ISpecificationFileRunner } from "specifications/specificationFileRunner";
    import type { IScenarioRunner } from "specifications/scenarioRunner";
    import type { ILogger } from "infrastructure/logger";
    import { Scenario } from "language/scenarios/scenario";
    export interface ISpecificationRunnerContext {
        failed: number;
        fileRunners: ReadonlyArray<ISpecificationFileRunner>;
        fail(scenario: Scenario, message: string): void;
        success(scenario: Scenario): void;
        logGlobal(message: string): void;
        logTimeSpent(): void;
        add(fileRunner: ISpecificationFileRunner): void;
        failedScenariosRunners(): ReadonlyArray<IScenarioRunner>;
        countScenarios(): number;
        formatGlobalLog(): string;
    }
    export class SpecificationRunnerContext implements ISpecificationRunnerContext {
        private globalLog;
        private readonly fileRunnersValue;
        private readonly logger;
        private failedValues;
        private startTimestamp;
        constructor(logger: ILogger);
        get failed(): number;
        get fileRunners(): ISpecificationFileRunner[];
        fail(scenario: Scenario, message: string): void;
        logGlobal(message: string): void;
        logTimeSpent(): void;
        success(scenario: Scenario): void;
        add(fileRunner: ISpecificationFileRunner): void;
        failedScenariosRunners(): Array<IScenarioRunner>;
        countScenarios(): number;
        formatGlobalLog(): string;
    }
}
declare module "specifications/typeConverter" {
    import { CompilerResult } from "compiler/compilerResult";
    import { VariableType } from "language/variableTypes/variableType";
    export class TypeConverter {
        static convert(compilerResult: CompilerResult, value: object, type: VariableType): any;
        private static convertEnum;
        private static convertPrimitive;
    }
}
declare module "specifications/scenarioRunner" {
    import type { ILexyCompiler } from "compiler/lexyCompiler";
    import type { IParserLogger } from "parser/parserLogger";
    import type { ISpecificationRunnerContext } from "specifications/specificationRunnerContext";
    import { Scenario } from "language/scenarios/scenario";
    import { RootNodeList } from "language/rootNodeList";
    export interface IScenarioRunner {
        failed: boolean;
        scenario: Scenario;
        run(): void;
        parserLogging(): string;
    }
    export class ScenarioRunner implements IScenarioRunner {
        private readonly context;
        private readonly compiler;
        private readonly fileName;
        private readonly functionNode;
        private readonly parserLogger;
        private readonly rootNodeList;
        private failedValue;
        get failed(): boolean;
        readonly scenario: Scenario;
        constructor(fileName: string, compiler: ILexyCompiler, rootNodeList: RootNodeList, scenario: Scenario, context: ISpecificationRunnerContext, parserLogger: IParserLogger);
        private static getFunctionNode;
        run(): void;
        private runFunction;
        private compile;
        parserLogging(): string;
        private fail;
        private getValidationResult;
        private validateErrors;
        private validateRootErrors;
        private getValues;
        private setParameter;
        private static getValue;
        private static compare;
    }
}
declare module "specifications/specificationsRunner" {
    import type { ILogger } from "infrastructure/logger";
    import { IFileSystem } from "parser/IFileSystem";
    import { ILexyParser } from "parser/lexyParser";
    import { ILexyCompiler } from "compiler/lexyCompiler";
    export interface ISpecificationsRunner {
        run(folder: string): void;
        runAll(file: string): void;
    }
    export class SpecificationsRunner implements ISpecificationsRunner {
        private readonly parser;
        private readonly compiler;
        private readonly logger;
        private readonly fileSystem;
        constructor(logger: ILogger, fileSystem: IFileSystem, parser: ILexyParser, compiler: ILexyCompiler);
        run(file: string): void;
        runAll(folder: string): void;
        private static runScenarios;
        private static failed;
        private getRunners;
        private addFolder;
        private createFileRunner;
        private getAbsoluteFolder;
    }
}
//# sourceMappingURL=lexy.d.ts.map