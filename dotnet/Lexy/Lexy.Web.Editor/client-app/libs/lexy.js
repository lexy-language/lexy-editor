"use strict";
System.register("infrastructure/logger", [], function (exports_1, context_1) {
    "use strict";
    var LogLevel, ConsoleLogger;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (LogLevel) {
                LogLevel["Debug"] = "Debug";
                LogLevel["Information"] = "Information";
                LogLevel["Warning"] = "Warning";
                LogLevel["Error"] = "Error";
            })(LogLevel || (exports_1("LogLevel", LogLevel = {})));
            ConsoleLogger = class ConsoleLogger {
                isEnabled(level) {
                    return true;
                }
                logDebug(message) {
                    console.log(`[DBG] - ${message}`);
                }
                logError(message) {
                    console.log(`[ERR] - ${message}`);
                }
                logInformation(message) {
                    console.log(`[INF]  - ${message}`);
                }
            };
            exports_1("ConsoleLogger", ConsoleLogger);
        }
    };
});
System.register("parser/sourceFile", [], function (exports_2, context_2) {
    "use strict";
    var SourceFile;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            SourceFile = class SourceFile {
                constructor(fileName) {
                    this.fileName = fileName;
                }
            };
            exports_2("SourceFile", SourceFile);
        }
    };
});
System.register("parser/sourceReference", [], function (exports_3, context_3) {
    "use strict";
    var SourceReference;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            SourceReference = class SourceReference {
                constructor(file, lineNumber, characterNumber) {
                    this.file = file;
                    this.lineNumber = lineNumber;
                    this.characterNumber = characterNumber;
                }
                toString() {
                    return `${this.file.fileName}(${this.lineNumber}, ${this.characterNumber})`;
                }
            };
            exports_3("SourceReference", SourceReference);
        }
    };
});
System.register("infrastructure/enumerableExtensions", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    function any(array, where = null) {
        for (const item of array) {
            if (where == null || where(item))
                return true;
        }
        return false;
    }
    exports_4("any", any);
    function firstOrDefault(array, where = null) {
        if (where == null)
            return array.length > 0 ? array[0] : null;
        for (const item of array) {
            if (where(item))
                return item;
        }
        return null;
    }
    exports_4("firstOrDefault", firstOrDefault);
    function singleOrDefault(array, where = null) {
        if (where == null) {
            if (array.length > 1)
                throw new Error("More as one element found in array.");
            return array.length == 1 ? array[0] : null;
        }
        let value = null;
        for (const item of array) {
            if (where(item)) {
                if (value == null) {
                    value = item;
                }
                else {
                    throw new Error("More as one element found in array.");
                }
            }
        }
        return value;
    }
    exports_4("singleOrDefault", singleOrDefault);
    function lastOrDefault(array, where = null) {
        if (where == null)
            return array.length > 0 ? array[array.length - 1] : null;
        for (let i = array.length - 1; i >= 0; i--) {
            const item = array[i];
            if (where(item))
                return item;
        }
        return null;
    }
    exports_4("lastOrDefault", lastOrDefault);
    function forEach(array, action) {
        for (const value of array) {
            action(value);
        }
        return array;
    }
    exports_4("forEach", forEach);
    function contains(array, value) {
        for (const item of array) {
            if (item == value)
                return true;
        }
        return false;
    }
    exports_4("contains", contains);
    function where(array, predicate) {
        const results = [];
        for (const item of array) {
            if (predicate(item)) {
                results.push(item);
            }
        }
        return results;
    }
    exports_4("where", where);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("infrastructure/formatting", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    function format(enumerable, indentLevel) {
        const indent = indentLevel > 0 ? ' '.repeat(indentLevel * 2) : '';
        const builder = [];
        builder.push('\n');
        for (const item of enumerable) {
            builder.push(indent + item + "\n");
        }
        return builder.join('');
    }
    exports_5("format", format);
    function formatLine(enumerable, separator) {
        const builder = [];
        for (const item of enumerable) {
            if (builder.length > 0)
                builder.push(separator);
            builder.push(item === null || item === void 0 ? void 0 : item.toString());
        }
        return builder.join('');
    }
    exports_5("formatLine", formatLine);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("language/nodeType", [], function (exports_6, context_6) {
    "use strict";
    var NodeType;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            (function (NodeType) {
                NodeType["AbsFunction"] = "AbsFunction";
                NodeType["AssignmentDefinition"] = "AssignmentDefinition";
                NodeType["AssignmentExpression"] = "AssignmentExpression";
                NodeType["BinaryExpression"] = "BinaryExpression";
                NodeType["BracketedExpression"] = "BracketedExpression";
                NodeType["CaseExpression"] = "CaseExpression";
                NodeType["ColumnHeader"] = "ColumnHeader";
                NodeType["Comments"] = "Comments";
                NodeType["CustomVariableDeclarationType"] = "CustomVariableDeclarationType";
                NodeType["DayFunction"] = "DayFunction";
                NodeType["DaysFunction"] = "DaysFunction";
                NodeType["ElseExpression"] = "ElseExpression";
                NodeType["EnumDefinition"] = "EnumDefinition";
                NodeType["EnumMember"] = "EnumMember";
                NodeType["EnumName"] = "EnumName";
                NodeType["ExpressionList"] = "ExpressionList";
                NodeType["ExtractResultsFunction"] = "ExtractResultsFunction";
                NodeType["FillParametersFunction"] = "FillParametersFunction";
                NodeType["Function"] = "Function";
                NodeType["FunctionCallExpression"] = "FunctionCallExpression";
                NodeType["FunctionCode"] = "FunctionCode";
                NodeType["FunctionName"] = "FunctionName";
                NodeType["FunctionParameters"] = "FunctionParameters";
                NodeType["FunctionResults"] = "FunctionResults";
                NodeType["HourFunction"] = "HourFunction";
                NodeType["HoursFunction"] = "HoursFunction";
                NodeType["IdentifierExpression"] = "IdentifierExpression";
                NodeType["IfExpression"] = "IfExpression";
                NodeType["ImplicitVariableDeclaration"] = "ImplicitVariableDeclaration";
                NodeType["IntFunction"] = "IntFunction";
                NodeType["LexyFunction"] = "LexyFunction";
                NodeType["LiteralExpression"] = "LiteralExpression";
                NodeType["LookupFunction"] = "LookupFunction";
                NodeType["LookupRowFunction"] = "LookupRowFunction";
                NodeType["MemberAccessExpression"] = "MemberAccessExpression";
                NodeType["MinuteFunction"] = "MinuteFunction";
                NodeType["MinutesFunction"] = "MinutesFunction";
                NodeType["MonthFunction"] = "MonthFunction";
                NodeType["MonthsFunction"] = "MonthsFunction";
                NodeType["NewFunction"] = "NewFunction";
                NodeType["NowFunction"] = "NowFunction";
                NodeType["ParenthesizedExpression"] = "ParenthesizedExpression";
                NodeType["PowerFunction"] = "PowerFunction";
                NodeType["PrimitiveVariableDeclarationType"] = "PrimitiveVariableDeclarationType";
                NodeType["RoundFunction"] = "RoundFunction";
                NodeType["Scenario"] = "Scenario";
                NodeType["ScenarioFunctionName"] = "ScenarioFunctionName";
                NodeType["ScenarioName"] = "ScenarioName";
                NodeType["ScenarioParameters"] = "ScenarioParameters";
                NodeType["ScenarioResults"] = "ScenarioResults";
                NodeType["ScenarioTable"] = "ScenarioTable";
                NodeType["ScenarioExpectRootErrors"] = "ScenarioExpectRootErrors";
                NodeType["ScenarioExpectError"] = "ScenarioExpectError";
                NodeType["SecondFunction"] = "SecondFunction";
                NodeType["SecondsFunction"] = "SecondsFunction";
                NodeType["SourceCodeNode"] = "SourceCodeNode";
                NodeType["SwitchExpression"] = "SwitchExpression";
                NodeType["Table"] = "Table";
                NodeType["TableHeader"] = "TableHeader";
                NodeType["TableRow"] = "TableRow";
                NodeType["TodayFunction"] = "TodayFunction";
                NodeType["TypeDefinition"] = "TypeDefinition";
                NodeType["VariableDeclarationExpression"] = "VariableDeclarationExpression";
                NodeType["VariableDefinition"] = "VariableDefinition";
                NodeType["YearFunction"] = "YearFunction";
                NodeType["YearsFunction"] = "YearsFunction";
            })(NodeType || (exports_6("NodeType", NodeType = {})));
        }
    };
});
System.register("parser/nodesLogger", [], function (exports_7, context_7) {
    "use strict";
    var NodesLogger;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
            NodesLogger = class NodesLogger {
                constructor() {
                    this.builder = [];
                    this.indent = 0;
                }
                log(nodes) {
                    for (const node of nodes) {
                        this.logNode(node);
                    }
                }
                logNode(node) {
                    this.builder.push(' '.repeat(this.indent));
                    if (node == null) {
                        throw new Error("node.getChildren should never return null.");
                    }
                    else {
                        const rootNode = this.asRootNode(node);
                        if (rootNode != null) {
                            this.builder.push(`${rootNode.nodeType}: ${rootNode.nodeName}`);
                        }
                        else {
                            this.builder.push(node.nodeType);
                        }
                    }
                    this.builder.push("\n");
                    const children = node.getChildren();
                    this.indent += 2;
                    this.log(children);
                    this.indent -= 2;
                }
                toString() {
                    return this.builder.join('');
                }
                instanceOfRootNode(object) {
                    return (object === null || object === void 0 ? void 0 : object.isRootNode) == true;
                }
                asRootNode(object) {
                    return this.instanceOfRootNode(object) ? object : null;
                }
            };
            exports_7("NodesLogger", NodesLogger);
        }
    };
});
System.register("parser/parserLogger", ["infrastructure/enumerableExtensions", "infrastructure/logger", "infrastructure/formatting", "parser/nodesLogger"], function (exports_8, context_8) {
    "use strict";
    var enumerableExtensions_1, logger_1, formatting_1, nodesLogger_1, LogEntry, ParserLogger;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (enumerableExtensions_1_1) {
                enumerableExtensions_1 = enumerableExtensions_1_1;
            },
            function (logger_1_1) {
                logger_1 = logger_1_1;
            },
            function (formatting_1_1) {
                formatting_1 = formatting_1_1;
            },
            function (nodesLogger_1_1) {
                nodesLogger_1 = nodesLogger_1_1;
            }
        ],
        execute: function () {
            LogEntry = class LogEntry {
                constructor(node, isError, message) {
                    this.node = node;
                    this.isError = isError;
                    this.message = message;
                }
                toString() {
                    return this.message;
                }
            };
            ParserLogger = class ParserLogger {
                constructor(logger) {
                    this.logEntries = [];
                    this.currentNode = null;
                    this.failedMessages = 0;
                    this.logger = logger;
                }
                hasErrors() {
                    return this.failedMessages > 0;
                }
                hasRootErrors() {
                    return enumerableExtensions_1.any(this.logEntries, entry => entry.isError && entry.node == null);
                }
                logInfo(message) {
                    this.logger.logInformation(message);
                }
                log(reference, message) {
                    this.logger.logDebug(`${reference}: ${message}`);
                    this.logEntries.push(new LogEntry(this.currentNode, false, `${reference}: ${message}`));
                }
                fail(reference, message) {
                    this.failedMessages++;
                    this.logger.logError(`${reference}: ERROR - ${message}`);
                    this.logEntries.push(new LogEntry(this.currentNode, true, `${reference}: ERROR - ${message}`));
                }
                logNodes(nodes) {
                    if (!this.logger.isEnabled(logger_1.LogLevel.Debug))
                        return;
                    let nodeLogger = new nodesLogger_1.NodesLogger();
                    nodeLogger.log(nodes);
                    this.logger.logDebug(`Parsed nodes:\n${nodeLogger.toString()}`);
                }
                hasErrorMessage(expectedError) {
                    return enumerableExtensions_1.any(this.logEntries, message => message.isError && message.message.includes(expectedError));
                }
                formatMessages() {
                    return `${formatting_1.format(this.logEntries, 0)}\n`;
                }
                setCurrentNode(node) {
                    this.currentNode = node;
                }
                resetCurrentNode() {
                    this.currentNode = null;
                }
                nodeHasErrors(node) {
                    return enumerableExtensions_1.any(this.logEntries, message => message.isError && message.node === node);
                }
                errorNodeMessages(node) {
                    return enumerableExtensions_1.where(this.logEntries, entry => entry.isError && entry.node === node)
                        .map(entry => entry.message);
                }
                errorRootMessages() {
                    return enumerableExtensions_1.where(this.logEntries, entry => entry.isError && entry.node === null)
                        .map(entry => entry.message);
                }
                errorMessages() {
                    return enumerableExtensions_1.where(this.logEntries, entry => entry.isError)
                        .map(entry => entry.message);
                }
                assertNoErrors() {
                    if (this.hasErrors()) {
                        throw new Error(`Parsing failed: ${this.formatMessages()}`);
                    }
                }
            };
            exports_8("ParserLogger", ParserLogger);
        }
    };
});
System.register("language/variableTypes/typeWithMembers", ["language/variableTypes/variableType"], function (exports_9, context_9) {
    "use strict";
    var variableType_1, TypeWithMembers;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (variableType_1_1) {
                variableType_1 = variableType_1_1;
            }
        ],
        execute: function () {
            TypeWithMembers = class TypeWithMembers extends variableType_1.VariableType {
                constructor() {
                    super(...arguments);
                    this.typeWithMember = true;
                }
            };
            exports_9("TypeWithMembers", TypeWithMembers);
        }
    };
});
System.register("parser/tokens/character", [], function (exports_10, context_10) {
    "use strict";
    var digit0, digit9, letterSmallA, letterSmallZ, letterA, letterZ, space, tab, underscore;
    var __moduleName = context_10 && context_10.id;
    function isDigit(value) {
        return value >= digit0 && value <= digit9;
    }
    exports_10("isDigit", isDigit);
    function isLetter(value) {
        return (value >= letterSmallA && value <= letterSmallZ)
            || (value >= letterA && value <= letterZ);
    }
    exports_10("isLetter", isLetter);
    function isDigitOrLetter(value) {
        return isDigit(value) || isLetter(value);
    }
    exports_10("isDigitOrLetter", isDigitOrLetter);
    function isWhitespace(value) {
        return value == space || value == tab;
    }
    exports_10("isWhitespace", isWhitespace);
    function isValidIdentifier(value) {
        if (value == null || value == '')
            return false;
        let startCharacter = value.charCodeAt(0);
        if (!isLetter(startCharacter))
            return false;
        for (let index = 1; index < value.length; index++) {
            let character = value.charCodeAt(index);
            if (!isLetter(character) && !isDigit(character) && character != underscore) {
                return false;
            }
        }
        return true;
    }
    exports_10("isValidIdentifier", isValidIdentifier);
    function isNullOrEmpty(value) {
        return value == null || value == '';
    }
    exports_10("isNullOrEmpty", isNullOrEmpty);
    return {
        setters: [],
        execute: function () {
            digit0 = '0'.charCodeAt(0);
            digit9 = '9'.charCodeAt(0);
            letterSmallA = 'a'.charCodeAt(0);
            letterSmallZ = 'z'.charCodeAt(0);
            letterA = 'A'.charCodeAt(0);
            letterZ = 'Z'.charCodeAt(0);
            space = ' '.charCodeAt(0);
            tab = '\t'.charCodeAt(0);
            underscore = '_'.charCodeAt(0);
        }
    };
});
System.register("parser/tokens/tokenCharacter", [], function (exports_11, context_11) {
    "use strict";
    var TokenCharacter;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [],
        execute: function () {
            TokenCharacter = class TokenCharacter {
                constructor(value, position) {
                    this.position = 0;
                    this.value = value;
                    this.position = position;
                }
                toString() {
                    return String.fromCharCode(this.value);
                }
            };
            exports_11("TokenCharacter", TokenCharacter);
        }
    };
});
System.register("parser/tokens/tokenType", [], function (exports_12, context_12) {
    "use strict";
    var TokenType;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [],
        execute: function () {
            (function (TokenType) {
                TokenType["BooleanLiteral"] = "BooleanLiteral";
                TokenType["BuildLiteralToken"] = "BuildLiteralToken";
                TokenType["CommentToken"] = "CommentToken";
                TokenType["DateTimeLiteral"] = "DateTimeLiteral";
                TokenType["KeywordToken"] = "KeywordToken";
                TokenType["MemberAccessLiteral"] = "MemberAccessLiteral";
                TokenType["NumberLiteralToken"] = "NumberLiteralToken";
                TokenType["OperatorToken"] = "OperatorToken";
                TokenType["QuotedLiteralToken"] = "QuotedLiteralToken";
                TokenType["StringLiteralToken"] = "StringLiteralToken";
                TokenType["TableSeparatorToken"] = "TableSeparatorToken";
                TokenType["WhitespaceToken"] = "WhitespaceToken";
            })(TokenType || (exports_12("TokenType", TokenType = {})));
        }
    };
});
System.register("parser/tokens/token", [], function (exports_13, context_13) {
    "use strict";
    var Token;
    var __moduleName = context_13 && context_13.id;
    function instanceOfToken(object) {
        return !!(object === null || object === void 0 ? void 0 : object.tokenType);
    }
    exports_13("instanceOfToken", instanceOfToken);
    function asToken(object) {
        return instanceOfToken(object) ? object : null;
    }
    exports_13("asToken", asToken);
    return {
        setters: [],
        execute: function () {
            Token = class Token {
                constructor(firstCharacter) {
                    this.firstCharacter = firstCharacter;
                }
            };
            exports_13("Token", Token);
        }
    };
});
System.register("parser/tokens/ILiteralToken", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("parser/tokens/operatorType", [], function (exports_15, context_15) {
    "use strict";
    var OperatorType;
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [],
        execute: function () {
            (function (OperatorType) {
                OperatorType["NotSet"] = "NotSet";
                OperatorType["Assignment"] = "Assignment";
                OperatorType["Addition"] = "Addition";
                OperatorType["Subtraction"] = "Subtraction";
                OperatorType["Multiplication"] = "Multiplication";
                OperatorType["Division"] = "Division";
                OperatorType["Modulus"] = "Modulus";
                OperatorType["OpenParentheses"] = "OpenParentheses";
                OperatorType["CloseParentheses"] = "CloseParentheses";
                OperatorType["OpenBrackets"] = "OpenBrackets";
                OperatorType["CloseBrackets"] = "CloseBrackets";
                OperatorType["GreaterThan"] = "GreaterThan";
                OperatorType["LessThan"] = "LessThan";
                OperatorType["GreaterThanOrEqual"] = "GreaterThanOrEqual";
                OperatorType["LessThanOrEqual"] = "LessThanOrEqual";
                OperatorType["Equals"] = "Equals";
                OperatorType["NotEqual"] = "NotEqual";
                OperatorType["And"] = "And";
                OperatorType["Or"] = "Or";
                OperatorType["ArgumentSeparator"] = "ArgumentSeparator";
            })(OperatorType || (exports_15("OperatorType", OperatorType = {})));
        }
    };
});
System.register("parser/tokens/parseTokenResult", [], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    function newParseTokenInvalidResult(validationError) {
        return {
            state: "invalid",
            validationError: validationError
        };
    }
    exports_16("newParseTokenInvalidResult", newParseTokenInvalidResult);
    function newParseTokenFinishedResult(charProcessed = false, newToken = null) {
        return {
            state: "finished",
            charProcessed: charProcessed,
            newToken: newToken
        };
    }
    exports_16("newParseTokenFinishedResult", newParseTokenFinishedResult);
    function newParseTokenInProgressResult(newToken = null) {
        return {
            state: "inProgress",
            newToken: newToken
        };
    }
    exports_16("newParseTokenInProgressResult", newParseTokenInProgressResult);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("parser/tokens/parsableToken", ["parser/tokens/token"], function (exports_17, context_17) {
    "use strict";
    var token_1, ParsableToken;
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [
            function (token_1_1) {
                token_1 = token_1_1;
            }
        ],
        execute: function () {
            ParsableToken = class ParsableToken extends token_1.Token {
                get value() {
                    return this.valueBuilder.join('');
                }
                constructor(character, value = null) {
                    super(character);
                    this.valueBuilder = [value != null ? value : String.fromCharCode(character.value)];
                }
                appendValue(value) {
                    this.valueBuilder.push(String.fromCharCode(value));
                }
            };
            exports_17("ParsableToken", ParsableToken);
        }
    };
});
System.register("parser/tokens/tokenValues", [], function (exports_18, context_18) {
    "use strict";
    var TokenValues;
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [],
        execute: function () {
            TokenValues = class TokenValues {
            };
            exports_18("TokenValues", TokenValues);
            TokenValues.TableSeparator = '|'.charCodeAt(0);
            TokenValues.Quote = '\"'.charCodeAt(0);
            TokenValues.Assignment = '='.charCodeAt(0);
            TokenValues.MemberAccessString = '.';
            TokenValues.MemberAccess = '.'.charCodeAt(0);
            TokenValues.ArgumentSeparator = ','.charCodeAt(0);
            TokenValues.Addition = '+'.charCodeAt(0);
            TokenValues.Subtraction = '-'.charCodeAt(0);
            TokenValues.Multiplication = '*'.charCodeAt(0);
            TokenValues.Division = '/'.charCodeAt(0);
            TokenValues.Modulus = '%'.charCodeAt(0);
            TokenValues.OpenParentheses = '('.charCodeAt(0);
            TokenValues.CloseParentheses = ')'.charCodeAt(0);
            TokenValues.OpenBrackets = '['.charCodeAt(0);
            TokenValues.CloseBrackets = ']'.charCodeAt(0);
            TokenValues.GreaterThan = '>'.charCodeAt(0);
            TokenValues.LessThan = '<'.charCodeAt(0);
            TokenValues.GreaterThanOrEqual = `>=`;
            TokenValues.LessThanOrEqual = `<=`;
            TokenValues.Equal = `==`;
            TokenValues.NotEqual = `!=`;
            TokenValues.NotEqualStart = '!'.charCodeAt(0);
            TokenValues.And = '&'.charCodeAt(0);
            TokenValues.Or = '|'.charCodeAt(0);
            TokenValues.DecimalSeparator = '.'.charCodeAt(0);
            TokenValues.DateTimeStarter = `d`;
            TokenValues.BooleanTrue = `true`;
            TokenValues.BooleanFalse = `false`;
            TokenValues.Dash = '-'.charCodeAt(0);
            TokenValues.Colon = ':'.charCodeAt(0);
            TokenValues.Space = ' '.charCodeAt(0);
            TokenValues.CommentChar = '#'.charCodeAt(0);
        }
    };
});
System.register("parser/tokens/tableSeparatorToken", ["parser/tokens/parsableToken", "parser/tokens/parseTokenResult", "parser/tokens/tokenType"], function (exports_19, context_19) {
    "use strict";
    var parsableToken_1, parseTokenResult_1, tokenType_1, TableSeparatorToken;
    var __moduleName = context_19 && context_19.id;
    function instanceOfTableSeparatorToken(object) {
        return (object === null || object === void 0 ? void 0 : object.tokenType) == tokenType_1.TokenType.TableSeparatorToken;
    }
    exports_19("instanceOfTableSeparatorToken", instanceOfTableSeparatorToken);
    function asTableSeparatorToken(object) {
        return instanceOfTableSeparatorToken(object) ? object : null;
    }
    exports_19("asTableSeparatorToken", asTableSeparatorToken);
    return {
        setters: [
            function (parsableToken_1_1) {
                parsableToken_1 = parsableToken_1_1;
            },
            function (parseTokenResult_1_1) {
                parseTokenResult_1 = parseTokenResult_1_1;
            },
            function (tokenType_1_1) {
                tokenType_1 = tokenType_1_1;
            }
        ],
        execute: function () {
            TableSeparatorToken = class TableSeparatorToken extends parsableToken_1.ParsableToken {
                constructor(character) {
                    super(character);
                    this.tokenIsLiteral = false;
                    this.tokenType = tokenType_1.TokenType.TableSeparatorToken;
                }
                parse(character) {
                    return parseTokenResult_1.newParseTokenFinishedResult(true);
                }
                finalize() {
                    return parseTokenResult_1.newParseTokenFinishedResult(true);
                }
            };
            exports_19("TableSeparatorToken", TableSeparatorToken);
        }
    };
});
System.register("parser/tokens/operatorToken", ["parser/tokens/parsableToken", "parser/tokens/operatorType", "parser/tokens/tokenValues", "parser/tokens/parseTokenResult", "parser/tokens/tableSeparatorToken", "parser/tokens/character", "parser/tokens/tokenType"], function (exports_20, context_20) {
    "use strict";
    var parsableToken_2, operatorType_1, tokenValues_1, parseTokenResult_2, tableSeparatorToken_1, character_1, tokenType_2, OperatorCombinations, OperatorToken;
    var __moduleName = context_20 && context_20.id;
    function instanceOfOperatorToken(object) {
        return (object === null || object === void 0 ? void 0 : object.tokenType) == tokenType_2.TokenType.OperatorToken;
    }
    exports_20("instanceOfOperatorToken", instanceOfOperatorToken);
    function asOperatorToken(object) {
        return instanceOfOperatorToken(object) ? object : null;
    }
    exports_20("asOperatorToken", asOperatorToken);
    return {
        setters: [
            function (parsableToken_2_1) {
                parsableToken_2 = parsableToken_2_1;
            },
            function (operatorType_1_1) {
                operatorType_1 = operatorType_1_1;
            },
            function (tokenValues_1_1) {
                tokenValues_1 = tokenValues_1_1;
            },
            function (parseTokenResult_2_1) {
                parseTokenResult_2 = parseTokenResult_2_1;
            },
            function (tableSeparatorToken_1_1) {
                tableSeparatorToken_1 = tableSeparatorToken_1_1;
            },
            function (character_1_1) {
                character_1 = character_1_1;
            },
            function (tokenType_2_1) {
                tokenType_2 = tokenType_2_1;
            }
        ],
        execute: function () {
            OperatorCombinations = class OperatorCombinations {
                constructor(firstChar, secondChar, type) {
                    this.firstChar = firstChar;
                    this.secondChar = secondChar;
                    this.type = type;
                }
            };
            OperatorToken = class OperatorToken extends parsableToken_2.ParsableToken {
                constructor(character) {
                    super(character);
                    this.tokenIsLiteral = false;
                    this.tokenType = tokenType_2.TokenType.OperatorToken;
                    this.type = operatorType_1.OperatorType.NotSet;
                    let operatorValue = character.value;
                    OperatorToken.operatorCombinations.forEach(combination => {
                        if (!combination.secondChar && combination.firstChar == operatorValue)
                            this.type = combination.type;
                    });
                }
                terminatorValuescontains(value) {
                    return OperatorToken.terminatorValues.findIndex(terminator => terminator == value) >= 0;
                }
                parse(character) {
                    let value = character.value;
                    if (this.value.length == 1) {
                        for (let index = 0; index < OperatorToken.operatorCombinations.length; index++) {
                            let combination = OperatorToken.operatorCombinations[index];
                            if (combination.secondChar
                                && combination.secondChar == value
                                && combination.firstChar == this.value.charCodeAt(0)) {
                                this.type = combination.type;
                                return parseTokenResult_2.newParseTokenFinishedResult(true);
                            }
                        }
                    }
                    if (character_1.isDigitOrLetter(value) || this.terminatorValuescontains(value)) {
                        if (this.value.length == 1 && this.value.charCodeAt(0) == tokenValues_1.TokenValues.TableSeparator) {
                            return { state: 'finished', charProcessed: false, newToken: new tableSeparatorToken_1.TableSeparatorToken(this.firstCharacter) };
                        }
                    }
                    return { state: 'finished', charProcessed: false, newToken: null };
                }
                finalize() {
                    if (this.value.length == 1 && this.value.charCodeAt(0) == tokenValues_1.TokenValues.TableSeparator) {
                        return { state: 'finished', charProcessed: false, newToken: new tableSeparatorToken_1.TableSeparatorToken(this.firstCharacter) };
                    }
                    return { state: 'finished', charProcessed: false, newToken: null };
                }
            };
            exports_20("OperatorToken", OperatorToken);
            OperatorToken.terminatorValues = [
                tokenValues_1.TokenValues.Space,
                tokenValues_1.TokenValues.ArgumentSeparator,
                tokenValues_1.TokenValues.Subtraction,
                tokenValues_1.TokenValues.OpenParentheses,
                tokenValues_1.TokenValues.OpenBrackets,
                tokenValues_1.TokenValues.CloseParentheses,
                tokenValues_1.TokenValues.CloseBrackets
            ];
            OperatorToken.operatorCombinations = [
                new OperatorCombinations(tokenValues_1.TokenValues.Assignment, null, operatorType_1.OperatorType.Assignment),
                new OperatorCombinations(tokenValues_1.TokenValues.Addition, null, operatorType_1.OperatorType.Addition),
                new OperatorCombinations(tokenValues_1.TokenValues.Subtraction, null, operatorType_1.OperatorType.Subtraction),
                new OperatorCombinations(tokenValues_1.TokenValues.Multiplication, null, operatorType_1.OperatorType.Multiplication),
                new OperatorCombinations(tokenValues_1.TokenValues.Division, null, operatorType_1.OperatorType.Division),
                new OperatorCombinations(tokenValues_1.TokenValues.Modulus, null, operatorType_1.OperatorType.Modulus),
                new OperatorCombinations(tokenValues_1.TokenValues.OpenParentheses, null, operatorType_1.OperatorType.OpenParentheses),
                new OperatorCombinations(tokenValues_1.TokenValues.CloseParentheses, null, operatorType_1.OperatorType.CloseParentheses),
                new OperatorCombinations(tokenValues_1.TokenValues.OpenBrackets, null, operatorType_1.OperatorType.OpenBrackets),
                new OperatorCombinations(tokenValues_1.TokenValues.CloseBrackets, null, operatorType_1.OperatorType.CloseBrackets),
                new OperatorCombinations(tokenValues_1.TokenValues.GreaterThan, null, operatorType_1.OperatorType.GreaterThan),
                new OperatorCombinations(tokenValues_1.TokenValues.LessThan, null, operatorType_1.OperatorType.LessThan),
                new OperatorCombinations(tokenValues_1.TokenValues.ArgumentSeparator, null, operatorType_1.OperatorType.ArgumentSeparator),
                new OperatorCombinations(tokenValues_1.TokenValues.GreaterThan, tokenValues_1.TokenValues.Assignment, operatorType_1.OperatorType.GreaterThanOrEqual),
                new OperatorCombinations(tokenValues_1.TokenValues.LessThan, tokenValues_1.TokenValues.Assignment, operatorType_1.OperatorType.LessThanOrEqual),
                new OperatorCombinations(tokenValues_1.TokenValues.Assignment, tokenValues_1.TokenValues.Assignment, operatorType_1.OperatorType.Equals),
                new OperatorCombinations(tokenValues_1.TokenValues.NotEqualStart, tokenValues_1.TokenValues.Assignment, operatorType_1.OperatorType.NotEqual),
                new OperatorCombinations(tokenValues_1.TokenValues.And, tokenValues_1.TokenValues.And, operatorType_1.OperatorType.And),
                new OperatorCombinations(tokenValues_1.TokenValues.Or, tokenValues_1.TokenValues.Or, operatorType_1.OperatorType.Or)
            ];
        }
    };
});
System.register("parser/tokens/tokenList", [], function (exports_21, context_21) {
    "use strict";
    var TokenList;
    var __moduleName = context_21 && context_21.id;
    return {
        setters: [],
        execute: function () {
            TokenList = class TokenList {
                get(index) {
                    return this.values[index];
                }
                get length() {
                    return this.values.length;
                }
                constructor(values) {
                    this.values = values;
                }
                asArray() {
                    return [...this.values];
                }
                isComment() {
                    return this.values.length == 1 && this.values[0].tokenType == "CommentToken";
                }
                tokenValue(index) {
                    return index >= 0 && index <= this.values.length - 1 ? this.values[index].value : null;
                }
                tokensFrom(index) {
                    this.checkValidTokenIndex(index);
                    return this.tokensRange(index, this.values.length - 1);
                }
                tokensFromStart(count) {
                    return this.tokensRange(0, count - 1);
                }
                tokensRange(start, last) {
                    let range = this.values.slice(start, last + 1);
                    return new TokenList(range);
                }
                isTokenType(index, type) {
                    return index >= 0 && index <= this.values.length - 1 && this.values[index] instanceof type;
                }
                token(index, castFunction) {
                    this.checkValidTokenIndex(index);
                    return castFunction(this.values[index]);
                }
                literalToken(index) {
                    this.checkValidTokenIndex(index);
                    return index >= 0
                        && index <= this.values.length - 1
                        && this.values[index].tokenIsLiteral
                        ? this.values[index]
                        : null;
                }
                isLiteralToken(index) {
                    return index >= 0 && index <= this.values.length - 1 && this.values[index].tokenIsLiteral;
                }
                isQuotedString(index) {
                    return index >= 0 && index <= this.values.length - 1 && this.values[index].tokenType == 'QuotedLiteralToken';
                }
                isKeyword(index, keyword) {
                    var _a;
                    return index >= 0
                        && index <= this.values.length - 1
                        && this.values[index].tokenType == 'KeywordToken'
                        && ((_a = this.values[index]) === null || _a === void 0 ? void 0 : _a.value) == keyword;
                }
                isOperatorToken(index, type) {
                    return index >= 0
                        && index <= this.values.length - 1
                        && this.values[index].tokenType == 'OperatorToken'
                        && this.values[index].type == type;
                }
                operatorToken(index) {
                    return index >= 0
                        && index <= this.values.length - 1
                        && this.values[index].tokenType == 'OperatorToken'
                        ? this.values[index]
                        : null;
                }
                toString() {
                    let builder = new Array();
                    this.values.map(value => {
                        builder.push(`${value.tokenType}('${value.value}') `);
                    });
                    return builder.join('');
                }
                checkValidTokenIndex(index) {
                    if (index < 0 || index >= this.values.length)
                        throw new Error(`Invalid token index ${index} (length: ${this.values.length})`);
                }
                characterPosition(tokenIndex) {
                    if (tokenIndex < 0 || tokenIndex >= this.values.length)
                        return null;
                    return this.values[tokenIndex].firstCharacter.position;
                }
                find(func, constr) {
                    for (let index = 0; index < this.values.length; index++) {
                        let value = this.values[index];
                        if (value.tokenType == constr.name && func(value)) {
                            return index;
                        }
                    }
                    return -1;
                }
            };
            exports_21("TokenList", TokenList);
        }
    };
});
System.register("parser/tokens/parsableTokenResult", [], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    function newParsableTokenFailed(reference, errorMessage) {
        return {
            state: "failed",
            errorMessage: errorMessage,
            reference: reference
        };
    }
    exports_22("newParsableTokenFailed", newParsableTokenFailed);
    function newParsableTokenSuccess(result) {
        return {
            state: "success",
            result: result
        };
    }
    exports_22("newParsableTokenSuccess", newParsableTokenSuccess);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("parser/tokens/tokenizeResult", [], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    function newTokenizeFailed(reference, errorMessage) {
        return {
            state: 'failed',
            reference: reference,
            errorMessage: errorMessage
        };
    }
    exports_23("newTokenizeFailed", newTokenizeFailed);
    function newTokenizeSuccess(result) {
        return {
            state: 'success',
            result: result,
        };
    }
    exports_23("newTokenizeSuccess", newTokenizeSuccess);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("parser/tokens/commentToken", ["parser/tokens/parsableToken", "parser/tokens/parseTokenResult", "parser/tokens/tokenType"], function (exports_24, context_24) {
    "use strict";
    var parsableToken_3, parseTokenResult_3, tokenType_3, CommentToken;
    var __moduleName = context_24 && context_24.id;
    function instanceOfCommentToken(object) {
        return (object === null || object === void 0 ? void 0 : object.tokenType) == tokenType_3.TokenType.CommentToken;
    }
    exports_24("instanceOfCommentToken", instanceOfCommentToken);
    function asCommentToken(object) {
        return instanceOfCommentToken(object) ? object : null;
    }
    exports_24("asCommentToken", asCommentToken);
    return {
        setters: [
            function (parsableToken_3_1) {
                parsableToken_3 = parsableToken_3_1;
            },
            function (parseTokenResult_3_1) {
                parseTokenResult_3 = parseTokenResult_3_1;
            },
            function (tokenType_3_1) {
                tokenType_3 = tokenType_3_1;
            }
        ],
        execute: function () {
            CommentToken = class CommentToken extends parsableToken_3.ParsableToken {
                constructor(character) {
                    super(character);
                    this.tokenIsLiteral = false;
                    this.tokenType = tokenType_3.TokenType.CommentToken;
                }
                parse(character) {
                    this.appendValue(character.value);
                    return parseTokenResult_3.newParseTokenInProgressResult();
                }
                finalize() {
                    return parseTokenResult_3.newParseTokenFinishedResult(true);
                }
            };
            exports_24("CommentToken", CommentToken);
        }
    };
});
System.register("language/variableTypes/typeNames", [], function (exports_25, context_25) {
    "use strict";
    var TypeNames;
    var __moduleName = context_25 && context_25.id;
    return {
        setters: [],
        execute: function () {
            TypeNames = class TypeNames {
                static contains(parameterType) {
                    return this.existing.indexOf(parameterType) > -1;
                }
            };
            exports_25("TypeNames", TypeNames);
            TypeNames.number = "number";
            TypeNames.boolean = "boolean";
            TypeNames.date = "date";
            TypeNames.string = "string";
            TypeNames.existing = [
                TypeNames.number,
                TypeNames.boolean,
                TypeNames.date,
                TypeNames.string
            ];
        }
    };
});
System.register("language/variableTypes/variableTypeName", [], function (exports_26, context_26) {
    "use strict";
    var VariableTypeName;
    var __moduleName = context_26 && context_26.id;
    return {
        setters: [],
        execute: function () {
            (function (VariableTypeName) {
                VariableTypeName["ComplexType"] = "ComplexType";
                VariableTypeName["CustomType"] = "CustomType";
                VariableTypeName["EnumType"] = "EnumType";
                VariableTypeName["FunctionType"] = "FunctionType";
                VariableTypeName["PrimitiveType"] = "PrimitiveType";
                VariableTypeName["TableType"] = "TableType";
                VariableTypeName["VoidType"] = "VoidType";
            })(VariableTypeName || (exports_26("VariableTypeName", VariableTypeName = {})));
        }
    };
});
System.register("language/variableTypes/primitiveType", ["language/variableTypes/typeNames", "language/variableTypes/variableType", "language/variableTypes/variableTypeName"], function (exports_27, context_27) {
    "use strict";
    var typeNames_1, variableType_2, variableTypeName_1, PrimitiveType;
    var __moduleName = context_27 && context_27.id;
    function instanceOfPrimitiveType(object) {
        return (object === null || object === void 0 ? void 0 : object.variableTypeName) == variableTypeName_1.VariableTypeName.PrimitiveType;
    }
    exports_27("instanceOfPrimitiveType", instanceOfPrimitiveType);
    function asPrimitiveType(object) {
        return instanceOfPrimitiveType(object) ? object : null;
    }
    exports_27("asPrimitiveType", asPrimitiveType);
    return {
        setters: [
            function (typeNames_1_1) {
                typeNames_1 = typeNames_1_1;
            },
            function (variableType_2_1) {
                variableType_2 = variableType_2_1;
            },
            function (variableTypeName_1_1) {
                variableTypeName_1 = variableTypeName_1_1;
            }
        ],
        execute: function () {
            PrimitiveType = class PrimitiveType extends variableType_2.VariableType {
                constructor(type) {
                    super();
                    this.variableTypeName = variableTypeName_1.VariableTypeName.PrimitiveType;
                    this.type = type;
                }
                equals(other) {
                    return other != null && instanceOfPrimitiveType(other) && this.type == other.type;
                }
                toString() {
                    return this.type;
                }
                static parse(type) {
                    switch (type) {
                        case typeNames_1.TypeNames.boolean:
                            return PrimitiveType.boolean;
                        case typeNames_1.TypeNames.string:
                            return PrimitiveType.string;
                        case typeNames_1.TypeNames.number:
                            return PrimitiveType.number;
                        case typeNames_1.TypeNames.date:
                            return PrimitiveType.date;
                        default:
                            throw new Error(`Invalid primitive type: '${type}'`);
                    }
                }
            };
            exports_27("PrimitiveType", PrimitiveType);
            PrimitiveType.boolean = new PrimitiveType(typeNames_1.TypeNames.boolean);
            PrimitiveType.string = new PrimitiveType(typeNames_1.TypeNames.string);
            PrimitiveType.number = new PrimitiveType(typeNames_1.TypeNames.number);
            PrimitiveType.date = new PrimitiveType(typeNames_1.TypeNames.date);
        }
    };
});
System.register("parser/tokens/quotedLiteralToken", ["parser/tokens/parsableToken", "parser/tokens/tokenValues", "parser/tokens/parseTokenResult", "language/variableTypes/primitiveType", "parser/tokens/tokenType"], function (exports_28, context_28) {
    "use strict";
    var parsableToken_4, tokenValues_2, parseTokenResult_4, primitiveType_1, tokenType_4, QuotedLiteralToken;
    var __moduleName = context_28 && context_28.id;
    function instanceOfQuotedLiteralToken(object) {
        return (object === null || object === void 0 ? void 0 : object.tokenType) == tokenType_4.TokenType.QuotedLiteralToken;
    }
    exports_28("instanceOfQuotedLiteralToken", instanceOfQuotedLiteralToken);
    function asQuotedLiteralToken(object) {
        return instanceOfQuotedLiteralToken(object) ? object : null;
    }
    exports_28("asQuotedLiteralToken", asQuotedLiteralToken);
    return {
        setters: [
            function (parsableToken_4_1) {
                parsableToken_4 = parsableToken_4_1;
            },
            function (tokenValues_2_1) {
                tokenValues_2 = tokenValues_2_1;
            },
            function (parseTokenResult_4_1) {
                parseTokenResult_4 = parseTokenResult_4_1;
            },
            function (primitiveType_1_1) {
                primitiveType_1 = primitiveType_1_1;
            },
            function (tokenType_4_1) {
                tokenType_4 = tokenType_4_1;
            }
        ],
        execute: function () {
            QuotedLiteralToken = class QuotedLiteralToken extends parsableToken_4.ParsableToken {
                constructor(character) {
                    super(character, '');
                    this.quoteClosed = false;
                    this.tokenIsLiteral = true;
                    this.tokenType = tokenType_4.TokenType.QuotedLiteralToken;
                    let value = character.value;
                    if (value != tokenValues_2.TokenValues.Quote)
                        throw new Error("QuotedLiteralToken should start with a quote");
                }
                get typedValue() {
                    return this.value;
                }
                deriveType(context) {
                    return primitiveType_1.PrimitiveType.string;
                }
                parse(character) {
                    let value = character.value;
                    if (this.quoteClosed)
                        throw new Error("No characters allowed after closing quote.");
                    if (value == tokenValues_2.TokenValues.Quote) {
                        this.quoteClosed = true;
                        return parseTokenResult_4.newParseTokenFinishedResult(true, this);
                    }
                    this.appendValue(value);
                    return parseTokenResult_4.newParseTokenInProgressResult();
                }
                finalize() {
                    if (!this.quoteClosed)
                        return parseTokenResult_4.newParseTokenInvalidResult("Closing quote expected.");
                    return parseTokenResult_4.newParseTokenFinishedResult(true, this);
                }
                toString() {
                    return this.value;
                }
            };
            exports_28("QuotedLiteralToken", QuotedLiteralToken);
        }
    };
});
System.register("parser/tokens/numberLiteralToken", ["parser/tokens/parsableToken", "parser/tokens/tokenValues", "parser/tokens/parseTokenResult", "parser/tokens/character", "language/variableTypes/primitiveType", "parser/tokens/tokenType"], function (exports_29, context_29) {
    "use strict";
    var parsableToken_5, tokenValues_3, parseTokenResult_5, character_2, primitiveType_2, tokenType_5, NumberLiteralToken;
    var __moduleName = context_29 && context_29.id;
    function instanceOfNumberLiteralToken(object) {
        return (object === null || object === void 0 ? void 0 : object.tokenType) == tokenType_5.TokenType.NumberLiteralToken;
    }
    exports_29("instanceOfNumberLiteralToken", instanceOfNumberLiteralToken);
    function asNumberLiteralToken(object) {
        return instanceOfNumberLiteralToken(object) ? object : null;
    }
    exports_29("asNumberLiteralToken", asNumberLiteralToken);
    return {
        setters: [
            function (parsableToken_5_1) {
                parsableToken_5 = parsableToken_5_1;
            },
            function (tokenValues_3_1) {
                tokenValues_3 = tokenValues_3_1;
            },
            function (parseTokenResult_5_1) {
                parseTokenResult_5 = parseTokenResult_5_1;
            },
            function (character_2_1) {
                character_2 = character_2_1;
            },
            function (primitiveType_2_1) {
                primitiveType_2 = primitiveType_2_1;
            },
            function (tokenType_5_1) {
                tokenType_5 = tokenType_5_1;
            }
        ],
        execute: function () {
            NumberLiteralToken = class NumberLiteralToken extends parsableToken_5.ParsableToken {
                get numberValue() {
                    if (this.numberValueValue == null)
                        throw new Error("NumberLiteralToken not finalized.");
                    return this.numberValueValue;
                }
                constructor(value, character) {
                    super(character);
                    this.allowedNextTokensValues = [
                        tokenValues_3.TokenValues.TableSeparator,
                        tokenValues_3.TokenValues.Space,
                        tokenValues_3.TokenValues.Assignment,
                        tokenValues_3.TokenValues.Addition,
                        tokenValues_3.TokenValues.Subtraction,
                        tokenValues_3.TokenValues.Multiplication,
                        tokenValues_3.TokenValues.Division,
                        tokenValues_3.TokenValues.Modulus,
                        tokenValues_3.TokenValues.CloseParentheses,
                        tokenValues_3.TokenValues.CloseBrackets,
                        tokenValues_3.TokenValues.GreaterThan,
                        tokenValues_3.TokenValues.LessThan,
                        tokenValues_3.TokenValues.ArgumentSeparator
                    ];
                    this.hasDecimalSeparator = false;
                    this.tokenIsLiteral = true;
                    this.tokenType = tokenType_5.TokenType.NumberLiteralToken;
                    this.numberValueValue = value;
                }
                get value() {
                    return this.numberValue != null
                        ? this.numberValue.toString()
                        : super.value;
                }
                get typedValue() {
                    return this.numberValue;
                }
                deriveType(context) {
                    return primitiveType_2.PrimitiveType.number;
                }
                parse(character) {
                    let value = character.value;
                    if (character_2.isDigit(value)) {
                        this.appendValue(value);
                        return parseTokenResult_5.newParseTokenInProgressResult();
                    }
                    if (value == tokenValues_3.TokenValues.DecimalSeparator) {
                        if (this.hasDecimalSeparator) {
                            return { state: 'invalid', validationError: "Only one decimal separator expected" };
                        }
                        this.hasDecimalSeparator = true;
                        this.appendValue(value);
                        return parseTokenResult_5.newParseTokenInProgressResult();
                    }
                    return this.allowedNextTokensValues.findIndex(allowed => allowed == value) >= 0
                        ? this.finalize()
                        : parseTokenResult_5.newParseTokenInvalidResult(`Invalid number token character: '${String.fromCharCode(value)}'`);
                }
                finalize() {
                    this.numberValueValue = parseFloat(super.value);
                    return parseTokenResult_5.newParseTokenFinishedResult(false);
                }
                isDecimal() {
                    return this.numberValue != null && this.numberValue % 1 != 0;
                }
                toString() {
                    return this.value;
                }
            };
            exports_29("NumberLiteralToken", NumberLiteralToken);
        }
    };
});
System.register("formatting/formatLine", [], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    function formatLine(value, separator) {
        return value.join(separator);
    }
    exports_30("formatLine", formatLine);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("parser/tokens/dateTimeLiteral", ["parser/tokens/parsableToken", "parser/tokens/parseTokenResult", "parser/tokens/tokenValues", "formatting/formatLine", "parser/tokens/character", "language/variableTypes/primitiveType", "parser/tokens/tokenType"], function (exports_31, context_31) {
    "use strict";
    var parsableToken_6, parseTokenResult_6, tokenValues_4, formatLine_1, character_3, primitiveType_3, tokenType_6, DateTimeLiteral;
    var __moduleName = context_31 && context_31.id;
    function instanceOfDateTimeLiteral(object) {
        return (object === null || object === void 0 ? void 0 : object.tokenType) == tokenType_6.TokenType.DateTimeLiteral;
    }
    exports_31("instanceOfDateTimeLiteral", instanceOfDateTimeLiteral);
    function asDateTimeLiteral(object) {
        return instanceOfDateTimeLiteral(object) ? object : null;
    }
    exports_31("asDateTimeLiteral", asDateTimeLiteral);
    return {
        setters: [
            function (parsableToken_6_1) {
                parsableToken_6 = parsableToken_6_1;
            },
            function (parseTokenResult_6_1) {
                parseTokenResult_6 = parseTokenResult_6_1;
            },
            function (tokenValues_4_1) {
                tokenValues_4 = tokenValues_4_1;
            },
            function (formatLine_1_1) {
                formatLine_1 = formatLine_1_1;
            },
            function (character_3_1) {
                character_3 = character_3_1;
            },
            function (primitiveType_3_1) {
                primitiveType_3 = primitiveType_3_1;
            },
            function (tokenType_6_1) {
                tokenType_6 = tokenType_6_1;
            }
        ],
        execute: function () {
            DateTimeLiteral = class DateTimeLiteral extends parsableToken_6.ParsableToken {
                constructor(character) {
                    super(character, '');
                    this.index = 0;
                    this.dateTimeValue = null;
                    this.tokenIsLiteral = true;
                    this.tokenType = tokenType_6.TokenType.DateTimeLiteral;
                    this.validators = [
                        value => this.validate(value, character_3.isDigit(value), DateTimeLiteral.DigitIndexes),
                        value => this.validateExact(value, tokenValues_4.TokenValues.Dash, DateTimeLiteral.DashIndexes),
                        value => this.validateExact(value, tokenValues_4.TokenValues.Colon, DateTimeLiteral.ColonIndexes),
                        value => this.validateExact(value, 'T'.charCodeAt(0), DateTimeLiteral.TIndexes)
                    ];
                }
                get typedValue() {
                    return this.dateTimeValue;
                }
                deriveType(context) {
                    return primitiveType_3.PrimitiveType.date;
                }
                parse(character) {
                    let value = character.value;
                    if (value == tokenValues_4.TokenValues.Quote) {
                        if (DateTimeLiteral.ValidLengths.findIndex(item => item == this.value.length) < 0) {
                            return parseTokenResult_6.newParseTokenInvalidResult(`Invalid date time format length '${this.value.length}'. 
          Expected: '${formatLine_1.formatLine(DateTimeLiteral.ValidLengths, ',')}'`);
                        }
                        this.dateTimeValue = DateTimeLiteral.parseValue(this.value);
                        return parseTokenResult_6.newParseTokenFinishedResult(true);
                    }
                    for (let index = 0; index < this.validators.length; index++) {
                        let validator = this.validators[index];
                        let result = validator(value);
                        if (result != null) {
                            this.appendValue(value);
                            this.index++;
                            return result;
                        }
                    }
                    return parseTokenResult_6.newParseTokenInvalidResult(`Unexpected character: '${String.fromCharCode(value)}'. Format: d""2024-12-18T14:17:30""`);
                }
                static parseValue(value) {
                    if (value.length != 19)
                        return null;
                    return new Date(value);
                }
                validateExact(value, match, indexes) {
                    return this.validate(value, value == match, indexes);
                }
                validate(value, match, indexes) {
                    if (!match)
                        return null;
                    if (indexes.findIndex(where => where == this.index) < 0) {
                        return parseTokenResult_6.newParseTokenInvalidResult(`Unexpected character: '${String.fromCharCode(value)}'. Format: d"2024-12-18T14:17:30"`);
                    }
                    return parseTokenResult_6.newParseTokenInProgressResult();
                }
                finalize() {
                    return parseTokenResult_6.newParseTokenInvalidResult('Unexpected end of line. Closing quote expected. Format: d"2024-12-18T14:17:30"');
                }
                toString() {
                    return this.dateTimeValue != null ? this.dateTimeValue.toISOString() : '';
                }
            };
            exports_31("DateTimeLiteral", DateTimeLiteral);
            DateTimeLiteral.DigitIndexes = [0, 1, 2, 3, 5, 6, 8, 9, 11, 12, 14, 15, 17, 18];
            DateTimeLiteral.DashIndexes = [4, 7];
            DateTimeLiteral.TIndexes = [10];
            DateTimeLiteral.ColonIndexes = [13, 16];
            DateTimeLiteral.ValidLengths = [19];
        }
    };
});
System.register("parser/tokens/keywordToken", ["parser/tokens/token", "parser/tokens/tokenType"], function (exports_32, context_32) {
    "use strict";
    var token_2, tokenType_7, KeywordToken;
    var __moduleName = context_32 && context_32.id;
    function instanceOfKeywordToken(object) {
        return (object === null || object === void 0 ? void 0 : object.tokenType) == tokenType_7.TokenType.KeywordToken;
    }
    exports_32("instanceOfKeywordToken", instanceOfKeywordToken);
    function asKeywordToken(object) {
        return instanceOfKeywordToken(object) ? object : null;
    }
    exports_32("asKeywordToken", asKeywordToken);
    return {
        setters: [
            function (token_2_1) {
                token_2 = token_2_1;
            },
            function (tokenType_7_1) {
                tokenType_7 = tokenType_7_1;
            }
        ],
        execute: function () {
            KeywordToken = class KeywordToken extends token_2.Token {
                constructor(keyword, character) {
                    super(character);
                    this.tokenIsLiteral = true;
                    this.tokenType = tokenType_7.TokenType.KeywordToken;
                    this.value = keyword;
                }
            };
            exports_32("KeywordToken", KeywordToken);
        }
    };
});
System.register("language/variableReference", ["parser/tokens/character"], function (exports_33, context_33) {
    "use strict";
    var character_4, VariableReference;
    var __moduleName = context_33 && context_33.id;
    return {
        setters: [
            function (character_4_1) {
                character_4 = character_4_1;
            }
        ],
        execute: function () {
            VariableReference = class VariableReference {
                get parentIdentifier() {
                    return this.path[0];
                }
                get hasChildIdentifiers() {
                    return this.path.length > 1;
                }
                get parts() {
                    return this.path.length;
                }
                constructor(variablePath) {
                    this.path = variablePath;
                }
                toString() {
                    const builder = [];
                    for (const value of this.path) {
                        if (builder.length > 0)
                            builder.push('.');
                        builder.push(value);
                    }
                    return builder.join('');
                }
                childrenReference() {
                    const parts = this.path.slice(1);
                    return new VariableReference(parts);
                }
                static parse(key) {
                    if (character_4.isNullOrEmpty(key))
                        throw new Error("Invalid empty variable reference.");
                    const parts = key.split(".");
                    return new VariableReference(parts);
                }
            };
            exports_33("VariableReference", VariableReference);
        }
    };
});
System.register("parser/tokens/memberAccessLiteral", ["parser/tokens/token", "parser/tokens/tokenValues", "language/variableReference", "language/variableTypes/ITypeWithMembers", "parser/tokens/tokenType"], function (exports_34, context_34) {
    "use strict";
    var token_3, tokenValues_5, variableReference_1, ITypeWithMembers_1, tokenType_8, MemberAccessLiteral;
    var __moduleName = context_34 && context_34.id;
    function instanceOfMemberAccessLiteral(object) {
        return (object === null || object === void 0 ? void 0 : object.tokenType) == tokenType_8.TokenType.MemberAccessLiteral;
    }
    exports_34("instanceOfMemberAccessLiteral", instanceOfMemberAccessLiteral);
    function asMemberAccessLiteral(object) {
        return instanceOfMemberAccessLiteral(object) ? object : null;
    }
    exports_34("asMemberAccessLiteral", asMemberAccessLiteral);
    return {
        setters: [
            function (token_3_1) {
                token_3 = token_3_1;
            },
            function (tokenValues_5_1) {
                tokenValues_5 = tokenValues_5_1;
            },
            function (variableReference_1_1) {
                variableReference_1 = variableReference_1_1;
            },
            function (ITypeWithMembers_1_1) {
                ITypeWithMembers_1 = ITypeWithMembers_1_1;
            },
            function (tokenType_8_1) {
                tokenType_8 = tokenType_8_1;
            }
        ],
        execute: function () {
            MemberAccessLiteral = class MemberAccessLiteral extends token_3.Token {
                get parent() {
                    return this.parts.length >= 1 ? this.parts[0] : '';
                }
                get member() {
                    return this.parts.length >= 2 ? this.parts[1] : '';
                }
                constructor(value, character) {
                    super(character);
                    this.tokenIsLiteral = true;
                    this.tokenType = tokenType_8.TokenType.MemberAccessLiteral;
                    this.value = value;
                    this.parts = value.split(tokenValues_5.TokenValues.MemberAccessString);
                }
                get typedValue() {
                    return this.value;
                }
                deriveType(context) {
                    let variableReference = new variableReference_1.VariableReference(this.parts);
                    let variableType = context.variableContext.getVariableTypeByReference(variableReference, context);
                    if (variableType != null)
                        return variableType;
                    if (this.parts.length != 2)
                        return null;
                    let rootType = context.rootNodes.getType(this.parent);
                    if (!ITypeWithMembers_1.instanceOfTypeWithMembers(rootType))
                        return null;
                    const typeWithMembers = rootType;
                    return typeWithMembers.memberType(this.member, context);
                }
                toString() {
                    return this.value;
                }
            };
            exports_34("MemberAccessLiteral", MemberAccessLiteral);
        }
    };
});
System.register("parser/tokens/stringLiteralToken", ["parser/tokens/token", "parser/tokens/tokenType"], function (exports_35, context_35) {
    "use strict";
    var token_4, tokenType_9, StringLiteralToken;
    var __moduleName = context_35 && context_35.id;
    function instanceOfStringLiteralToken(object) {
        return (object === null || object === void 0 ? void 0 : object.tokenType) == tokenType_9.TokenType.StringLiteralToken;
    }
    exports_35("instanceOfStringLiteralToken", instanceOfStringLiteralToken);
    function asStringLiteralToken(object) {
        return instanceOfStringLiteralToken(object) ? object : null;
    }
    exports_35("asStringLiteralToken", asStringLiteralToken);
    return {
        setters: [
            function (token_4_1) {
                token_4 = token_4_1;
            },
            function (tokenType_9_1) {
                tokenType_9 = tokenType_9_1;
            }
        ],
        execute: function () {
            StringLiteralToken = class StringLiteralToken extends token_4.Token {
                constructor(value, character) {
                    super(character);
                    this.tokenIsLiteral = true;
                    this.tokenType = tokenType_9.TokenType.StringLiteralToken;
                    this.value = value;
                }
                get typedValue() {
                    return this.value;
                }
                deriveType(context) {
                    throw new Error("Not supported. Type should be defined by node or expression.");
                }
                toString() {
                    return this.value;
                }
            };
            exports_35("StringLiteralToken", StringLiteralToken);
        }
    };
});
System.register("parser/tokens/booleanLiteral", ["parser/tokens/token", "parser/tokens/tokenValues", "language/variableTypes/primitiveType", "parser/tokens/tokenType"], function (exports_36, context_36) {
    "use strict";
    var token_5, tokenValues_6, primitiveType_4, tokenType_10, BooleanLiteral;
    var __moduleName = context_36 && context_36.id;
    function instanceOfBooleanLiteral(object) {
        return (object === null || object === void 0 ? void 0 : object.tokenType) == tokenType_10.TokenType.BooleanLiteral;
    }
    exports_36("instanceOfBooleanLiteral", instanceOfBooleanLiteral);
    function asBooleanLiteral(object) {
        return instanceOfBooleanLiteral(object) ? object : null;
    }
    exports_36("asBooleanLiteral", asBooleanLiteral);
    return {
        setters: [
            function (token_5_1) {
                token_5 = token_5_1;
            },
            function (tokenValues_6_1) {
                tokenValues_6 = tokenValues_6_1;
            },
            function (primitiveType_4_1) {
                primitiveType_4 = primitiveType_4_1;
            },
            function (tokenType_10_1) {
                tokenType_10 = tokenType_10_1;
            }
        ],
        execute: function () {
            BooleanLiteral = class BooleanLiteral extends token_5.Token {
                constructor(value, character) {
                    super(character);
                    this.tokenIsLiteral = true;
                    this.tokenType = tokenType_10.TokenType.BooleanLiteral;
                    this.booleanValue = value;
                }
                get typedValue() {
                    return this.booleanValue;
                }
                get value() {
                    return this.booleanValue ? tokenValues_6.TokenValues.BooleanTrue : tokenValues_6.TokenValues.BooleanFalse;
                }
                deriveType(context) {
                    return primitiveType_4.PrimitiveType.boolean;
                }
                static parse(value, character) {
                    switch (value) {
                        case tokenValues_6.TokenValues.BooleanTrue:
                            return new BooleanLiteral(true, character);
                        case tokenValues_6.TokenValues.BooleanFalse:
                            return new BooleanLiteral(false, character);
                        default:
                            throw new Error(`Couldn't parse boolean: ${value}`);
                    }
                }
                static isValid(value) {
                    return value == tokenValues_6.TokenValues.BooleanTrue || value == tokenValues_6.TokenValues.BooleanFalse;
                }
                toString() {
                    return this.value;
                }
            };
            exports_36("BooleanLiteral", BooleanLiteral);
        }
    };
});
System.register("parser/Keywords", [], function (exports_37, context_37) {
    "use strict";
    var Keywords;
    var __moduleName = context_37 && context_37.id;
    return {
        setters: [],
        execute: function () {
            Keywords = class Keywords {
                static contains(keyword) {
                    return Keywords.values.findIndex(value => value == keyword) >= 0;
                }
            };
            exports_37("Keywords", Keywords);
            Keywords.FunctionKeyword = "Function:";
            Keywords.EnumKeyword = "Enum:";
            Keywords.TableKeyword = "Table:";
            Keywords.TypeKeyword = "Type:";
            Keywords.ScenarioKeyword = "Scenario:";
            Keywords.Function = "Function";
            Keywords.ValidationTable = "ValidationTable";
            Keywords.If = "if";
            Keywords.Else = "else";
            Keywords.Switch = "switch";
            Keywords.Case = "case";
            Keywords.Default = "default";
            Keywords.For = "for";
            Keywords.From = "from";
            Keywords.To = "to";
            Keywords.While = "while";
            Keywords.Include = "Include";
            Keywords.Parameters = "Parameters";
            Keywords.Results = "Results";
            Keywords.Code = "Code";
            Keywords.ExpectError = "ExpectError";
            Keywords.ExpectRootErrors = "ExpectRootErrors";
            Keywords.ImplicitVariableDeclaration = "var";
            Keywords.values = [
                Keywords.FunctionKeyword,
                Keywords.EnumKeyword,
                Keywords.TableKeyword,
                Keywords.TypeKeyword,
                Keywords.ScenarioKeyword,
                Keywords.Function,
                Keywords.ValidationTable,
                Keywords.If,
                Keywords.Else,
                Keywords.Switch,
                Keywords.Case,
                Keywords.Default,
                Keywords.For,
                Keywords.From,
                Keywords.To,
                Keywords.While,
                Keywords.Include,
                Keywords.Parameters,
                Keywords.Results,
                Keywords.Code,
                Keywords.ExpectError,
                Keywords.ExpectRootErrors,
                Keywords.ImplicitVariableDeclaration
            ];
        }
    };
});
System.register("parser/tokens/buildLiteralToken", ["parser/tokens/parsableToken", "parser/tokens/tokenValues", "parser/tokens/parseTokenResult", "parser/tokens/dateTimeLiteral", "parser/tokens/keywordToken", "parser/tokens/memberAccessLiteral", "parser/tokens/stringLiteralToken", "parser/tokens/booleanLiteral", "parser/Keywords", "parser/tokens/character", "parser/tokens/tokenType"], function (exports_38, context_38) {
    "use strict";
    var parsableToken_7, tokenValues_7, parseTokenResult_7, dateTimeLiteral_1, keywordToken_1, memberAccessLiteral_1, stringLiteralToken_1, booleanLiteral_1, Keywords_1, character_5, tokenType_11, point, colon, BuildLiteralToken;
    var __moduleName = context_38 && context_38.id;
    return {
        setters: [
            function (parsableToken_7_1) {
                parsableToken_7 = parsableToken_7_1;
            },
            function (tokenValues_7_1) {
                tokenValues_7 = tokenValues_7_1;
            },
            function (parseTokenResult_7_1) {
                parseTokenResult_7 = parseTokenResult_7_1;
            },
            function (dateTimeLiteral_1_1) {
                dateTimeLiteral_1 = dateTimeLiteral_1_1;
            },
            function (keywordToken_1_1) {
                keywordToken_1 = keywordToken_1_1;
            },
            function (memberAccessLiteral_1_1) {
                memberAccessLiteral_1 = memberAccessLiteral_1_1;
            },
            function (stringLiteralToken_1_1) {
                stringLiteralToken_1 = stringLiteralToken_1_1;
            },
            function (booleanLiteral_1_1) {
                booleanLiteral_1 = booleanLiteral_1_1;
            },
            function (Keywords_1_1) {
                Keywords_1 = Keywords_1_1;
            },
            function (character_5_1) {
                character_5 = character_5_1;
            },
            function (tokenType_11_1) {
                tokenType_11 = tokenType_11_1;
            }
        ],
        execute: function () {
            point = '.'.charCodeAt(0);
            colon = ':'.charCodeAt(0);
            BuildLiteralToken = class BuildLiteralToken extends parsableToken_7.ParsableToken {
                constructor(character) {
                    super(character);
                    this.tokenIsLiteral = false;
                    this.tokenType = tokenType_11.TokenType.BuildLiteralToken;
                    this.hasMemberAccessor = false;
                    this.lastMemberAccessor = false;
                }
                parse(character) {
                    let value = character.value;
                    if (BuildLiteralToken.terminatorValues.findIndex(terminator => terminator == value) >= 0) {
                        return parseTokenResult_7.newParseTokenFinishedResult(false, this.sealLiteral());
                    }
                    if (value == point) {
                        if (this.lastMemberAccessor) {
                            return parseTokenResult_7.newParseTokenInvalidResult(`Unexpected character: '${String.fromCharCode(value)}'. Member accessor should be followed by member name.`);
                        }
                        this.hasMemberAccessor = true;
                        this.lastMemberAccessor = true;
                        this.appendValue(value);
                        return parseTokenResult_7.newParseTokenInProgressResult();
                    }
                    if (character_5.isDigitOrLetter(value) || value == colon) {
                        this.lastMemberAccessor = false;
                        this.appendValue(value);
                        return parseTokenResult_7.newParseTokenInProgressResult();
                    }
                    if (value == tokenValues_7.TokenValues.Quote && this.value == tokenValues_7.TokenValues.DateTimeStarter)
                        return parseTokenResult_7.newParseTokenInProgressResult(new dateTimeLiteral_1.DateTimeLiteral(this.firstCharacter));
                    return parseTokenResult_7.newParseTokenInvalidResult(`Unexpected character: '${String.fromCharCode(value)}'`);
                }
                finalize() {
                    if (this.lastMemberAccessor)
                        return parseTokenResult_7.newParseTokenInvalidResult("Unexpected end of line. Member accessor should be followed by member name.");
                    return parseTokenResult_7.newParseTokenFinishedResult(true, this.sealLiteral());
                }
                sealLiteral() {
                    let value = this.value;
                    if (Keywords_1.Keywords.contains(value))
                        return new keywordToken_1.KeywordToken(value, this.firstCharacter);
                    if (booleanLiteral_1.BooleanLiteral.isValid(value))
                        return booleanLiteral_1.BooleanLiteral.parse(value, this.firstCharacter);
                    if (this.hasMemberAccessor)
                        return new memberAccessLiteral_1.MemberAccessLiteral(value, this.firstCharacter);
                    return new stringLiteralToken_1.StringLiteralToken(value, this.firstCharacter);
                }
            };
            exports_38("BuildLiteralToken", BuildLiteralToken);
            BuildLiteralToken.terminatorValues = [
                tokenValues_7.TokenValues.Space,
                tokenValues_7.TokenValues.OpenParentheses,
                tokenValues_7.TokenValues.OpenBrackets,
                tokenValues_7.TokenValues.CloseParentheses,
                tokenValues_7.TokenValues.CloseBrackets,
                tokenValues_7.TokenValues.ArgumentSeparator
            ];
        }
    };
});
System.register("parser/tokens/whitespaceToken", ["parser/tokens/parseTokenResult", "parser/tokens/parsableToken", "parser/tokens/tokenType"], function (exports_39, context_39) {
    "use strict";
    var parseTokenResult_8, parsableToken_8, tokenType_12, WhitespaceToken;
    var __moduleName = context_39 && context_39.id;
    function instanceOfWhitespaceToken(object) {
        return (object === null || object === void 0 ? void 0 : object.tokenType) == tokenType_12.TokenType.WhitespaceToken;
    }
    exports_39("instanceOfWhitespaceToken", instanceOfWhitespaceToken);
    function asTableSeparatorToken(object) {
        return instanceOfWhitespaceToken(object) ? object : null;
    }
    exports_39("asTableSeparatorToken", asTableSeparatorToken);
    return {
        setters: [
            function (parseTokenResult_8_1) {
                parseTokenResult_8 = parseTokenResult_8_1;
            },
            function (parsableToken_8_1) {
                parsableToken_8 = parsableToken_8_1;
            },
            function (tokenType_12_1) {
                tokenType_12 = tokenType_12_1;
            }
        ],
        execute: function () {
            WhitespaceToken = class WhitespaceToken extends parsableToken_8.ParsableToken {
                constructor(character) {
                    super(character);
                    this.tokenIsLiteral = false;
                    this.tokenType = tokenType_12.TokenType.WhitespaceToken;
                }
                parse(character) {
                    let value = character != null ? character.value.toString() : '';
                    return value != ' ' ? parseTokenResult_8.newParseTokenFinishedResult(false) : parseTokenResult_8.newParseTokenInProgressResult();
                }
                finalize() {
                    return parseTokenResult_8.newParseTokenFinishedResult(true);
                }
            };
            exports_39("WhitespaceToken", WhitespaceToken);
        }
    };
});
System.register("parser/tokens/tokenizer", ["parser/tokens/parsableTokenResult", "parser/tokens/tokenizeResult", "parser/tokens/tokenList", "parser/tokens/tokenCharacter", "parser/tokens/commentToken", "parser/tokens/tokenValues", "parser/tokens/quotedLiteralToken", "parser/tokens/operatorToken", "parser/tokens/numberLiteralToken", "parser/tokens/buildLiteralToken", "parser/tokens/whitespaceToken", "parser/tokens/character"], function (exports_40, context_40) {
    "use strict";
    var parsableTokenResult_1, tokenizeResult_1, tokenList_1, tokenCharacter_1, commentToken_1, tokenValues_8, quotedLiteralToken_1, operatorToken_1, numberLiteralToken_1, buildLiteralToken_1, whitespaceToken_1, character_6, KnownTokens, TokensValidators, Tokenizer;
    var __moduleName = context_40 && context_40.id;
    return {
        setters: [
            function (parsableTokenResult_1_1) {
                parsableTokenResult_1 = parsableTokenResult_1_1;
            },
            function (tokenizeResult_1_1) {
                tokenizeResult_1 = tokenizeResult_1_1;
            },
            function (tokenList_1_1) {
                tokenList_1 = tokenList_1_1;
            },
            function (tokenCharacter_1_1) {
                tokenCharacter_1 = tokenCharacter_1_1;
            },
            function (commentToken_1_1) {
                commentToken_1 = commentToken_1_1;
            },
            function (tokenValues_8_1) {
                tokenValues_8 = tokenValues_8_1;
            },
            function (quotedLiteralToken_1_1) {
                quotedLiteralToken_1 = quotedLiteralToken_1_1;
            },
            function (operatorToken_1_1) {
                operatorToken_1 = operatorToken_1_1;
            },
            function (numberLiteralToken_1_1) {
                numberLiteralToken_1 = numberLiteralToken_1_1;
            },
            function (buildLiteralToken_1_1) {
                buildLiteralToken_1 = buildLiteralToken_1_1;
            },
            function (whitespaceToken_1_1) {
                whitespaceToken_1 = whitespaceToken_1_1;
            },
            function (character_6_1) {
                character_6 = character_6_1;
            }
        ],
        execute: function () {
            KnownTokens = [
                { value: tokenValues_8.TokenValues.CommentChar, factory: value => new commentToken_1.CommentToken(value) },
                { value: tokenValues_8.TokenValues.Quote, factory: value => new quotedLiteralToken_1.QuotedLiteralToken(value) },
                { value: tokenValues_8.TokenValues.Assignment, factory: value => new operatorToken_1.OperatorToken(value) },
                { value: tokenValues_8.TokenValues.Addition, factory: value => new operatorToken_1.OperatorToken(value) },
                { value: tokenValues_8.TokenValues.Subtraction, factory: value => new operatorToken_1.OperatorToken(value) },
                { value: tokenValues_8.TokenValues.Multiplication, factory: value => new operatorToken_1.OperatorToken(value) },
                { value: tokenValues_8.TokenValues.Division, factory: value => new operatorToken_1.OperatorToken(value) },
                { value: tokenValues_8.TokenValues.Modulus, factory: value => new operatorToken_1.OperatorToken(value) },
                { value: tokenValues_8.TokenValues.ArgumentSeparator, factory: value => new operatorToken_1.OperatorToken(value) },
                { value: tokenValues_8.TokenValues.OpenParentheses, factory: value => new operatorToken_1.OperatorToken(value) },
                { value: tokenValues_8.TokenValues.CloseParentheses, factory: value => new operatorToken_1.OperatorToken(value) },
                { value: tokenValues_8.TokenValues.OpenBrackets, factory: value => new operatorToken_1.OperatorToken(value) },
                { value: tokenValues_8.TokenValues.CloseBrackets, factory: value => new operatorToken_1.OperatorToken(value) },
                { value: tokenValues_8.TokenValues.GreaterThan, factory: value => new operatorToken_1.OperatorToken(value) },
                { value: tokenValues_8.TokenValues.LessThan, factory: value => new operatorToken_1.OperatorToken(value) },
                { value: tokenValues_8.TokenValues.NotEqualStart, factory: value => new operatorToken_1.OperatorToken(value) },
                { value: tokenValues_8.TokenValues.And, factory: value => new operatorToken_1.OperatorToken(value) },
                { value: tokenValues_8.TokenValues.Or, factory: value => new operatorToken_1.OperatorToken(value) }
            ];
            TokensValidators = [
                { isValid: character_6.isDigit, factory: value => new numberLiteralToken_1.NumberLiteralToken(null, value) },
                { isValid: character_6.isLetter, factory: value => new buildLiteralToken_1.BuildLiteralToken(value) },
                { isValid: character_6.isWhitespace, factory: value => new whitespaceToken_1.WhitespaceToken(value) },
            ];
            Tokenizer = class Tokenizer {
                static discardWhitespace(tokens) {
                    const newTokens = new Array();
                    for (let token of tokens) {
                        if (token instanceof commentToken_1.CommentToken)
                            break;
                        if (!(token instanceof whitespaceToken_1.WhitespaceToken)) {
                            newTokens.push(token);
                        }
                    }
                    return new tokenList_1.TokenList(newTokens);
                }
                startToken(character, index, line) {
                    let value = character.value;
                    for (let knownToken of KnownTokens) {
                        if (knownToken.value == value) {
                            return parsableTokenResult_1.newParsableTokenSuccess(knownToken.factory(character));
                        }
                    }
                    for (let validator of TokensValidators) {
                        if (validator.isValid(value)) {
                            return parsableTokenResult_1.newParsableTokenSuccess(validator.factory(character));
                        }
                    }
                    return parsableTokenResult_1.newParsableTokenFailed(line.lineReference(index), `Invalid character at ${index} '${String.fromCharCode(value)}'`);
                }
                tokenize(line) {
                    var _a, _b;
                    let tokens = new Array();
                    let current = null;
                    for (let index = 0; index < line.content.length; index++) {
                        let value = line.content.charCodeAt(index);
                        let tokenCharacter = new tokenCharacter_1.TokenCharacter(value, index);
                        let valueProcessed = false;
                        if (current != null) {
                            let result = current.parse(tokenCharacter);
                            switch (result.state) {
                                case "invalid": {
                                    return tokenizeResult_1.newTokenizeFailed(line.lineReference(index), result.validationError);
                                }
                                case "finished": {
                                    tokens.push((_a = result.newToken) !== null && _a !== void 0 ? _a : current);
                                    current = null;
                                    valueProcessed = result.charProcessed;
                                    break;
                                }
                                case 'inProgress': {
                                    if (result.newToken != null) {
                                        current = result.newToken;
                                        if (current == null) {
                                            throw new Error('New token can only be a parsable token when in progress');
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                        if (current == null && !valueProcessed) {
                            let parsableTokenResult = this.startToken(tokenCharacter, index, line);
                            if (parsableTokenResult.state === "failed") {
                                return tokenizeResult_1.newTokenizeFailed(line.lineEndReference(), parsableTokenResult.errorMessage);
                            }
                            current = parsableTokenResult.result;
                        }
                    }
                    if (current != null) {
                        let result = current.finalize();
                        if (result.state === 'invalid') {
                            return tokenizeResult_1.newTokenizeFailed(line.lineEndReference(), `Invalid token at end of line. ${result.validationError}`);
                        }
                        if (result.state === 'inProgress') {
                            return tokenizeResult_1.newTokenizeFailed(line.lineEndReference(), "Parser error: result should be 'finished'");
                        }
                        tokens.push((_b = result.newToken) !== null && _b !== void 0 ? _b : current);
                    }
                    return tokenizeResult_1.newTokenizeSuccess(Tokenizer.discardWhitespace(tokens));
                }
            };
            exports_40("Tokenizer", Tokenizer);
        }
    };
});
System.register("parser/line", ["parser/sourceFile", "parser/sourceReference"], function (exports_41, context_41) {
    "use strict";
    var sourceFile_1, sourceReference_1, Line;
    var __moduleName = context_41 && context_41.id;
    return {
        setters: [
            function (sourceFile_1_1) {
                sourceFile_1 = sourceFile_1_1;
            },
            function (sourceReference_1_1) {
                sourceReference_1 = sourceReference_1_1;
            }
        ],
        execute: function () {
            Line = class Line {
                get tokens() {
                    if (!this.tokensValues) {
                        throw new Error("Tokens not set");
                    }
                    return this.tokensValues;
                }
                constructor(index, content, file) {
                    this.tokensValues = null;
                    this.index = index;
                    this.content = content;
                    this.file = file;
                }
                indent(logger) {
                    let spaces = 0;
                    let tabs = 0;
                    let index = 0;
                    for (; index < this.content.length; index++) {
                        let value = this.content[index];
                        if (value == ' ') {
                            spaces++;
                        }
                        else if (value == '\t') {
                            tabs++;
                        }
                        else {
                            break;
                        }
                    }
                    if (spaces > 0 && tabs > 0) {
                        logger.fail(this.lineReference(index), `Don't mix spaces and tabs for indentations. Use 2 spaces or tabs.`);
                        return null;
                    }
                    if (spaces % 2 != 0) {
                        logger.fail(this.lineReference(index), `Wrong number of indent spaces ${spaces}. Should be multiplication of 2.`);
                        return null;
                    }
                    return tabs > 0 ? tabs : spaces / 2;
                }
                toString() {
                    return `${this.index + 1}: ${this.content}`;
                }
                isEmpty() {
                    return this.tokens != null && this.tokens.length == 0;
                }
                firstCharacter() {
                    for (let index = 0; index < this.content.length; index++) {
                        if (this.content[index] != ' ' && this.content[index] != '\\') {
                            return index;
                        }
                    }
                    return 0;
                }
                tokenReference(tokenIndex) {
                    var _a;
                    return new sourceReference_1.SourceReference(this.file, this.index + 1, this.tokens != null
                        ? ((_a = this.tokens.characterPosition(tokenIndex)) !== null && _a !== void 0 ? _a : 0) + 1
                        : 1);
                }
                lineEndReference() {
                    return new sourceReference_1.SourceReference(this.file, this.index + 1, this.content.length);
                }
                lineStartReference() {
                    let lineStart = this.firstCharacter();
                    return new sourceReference_1.SourceReference(this.file, this.index + 1, lineStart + 1);
                }
                lineReference(characterIndex) {
                    var _a;
                    return new sourceReference_1.SourceReference((_a = this.file) !== null && _a !== void 0 ? _a : new sourceFile_1.SourceFile('runtime'), this.index + 1, characterIndex + 1);
                }
                tokenize(tokenizer) {
                    let tokenizeResult = tokenizer.tokenize(this);
                    if (tokenizeResult.state == 'success') {
                        this.tokensValues = tokenizeResult.result;
                    }
                    return tokenizeResult;
                }
            };
            exports_41("Line", Line);
        }
    };
});
System.register("language/expressions/expressionSource", ["parser/sourceReference"], function (exports_42, context_42) {
    "use strict";
    var sourceReference_2, ExpressionSource;
    var __moduleName = context_42 && context_42.id;
    return {
        setters: [
            function (sourceReference_2_1) {
                sourceReference_2 = sourceReference_2_1;
            }
        ],
        execute: function () {
            ExpressionSource = class ExpressionSource {
                constructor(line, tokens) {
                    if (tokens.length == 0)
                        throw new Error("No tokens.");
                    this.line = line;
                    this.file = line.file;
                    this.tokens = tokens;
                }
                createReference(tokenIndex = 0) {
                    let token = this.tokens.get(tokenIndex);
                    if (!token)
                        throw new Error(`No token at: ${tokenIndex}` + JSON.stringify(this.tokens));
                    return new sourceReference_2.SourceReference(this.file, this.line.index + 1, token.firstCharacter.position + 1);
                }
            };
            exports_42("ExpressionSource", ExpressionSource);
        }
    };
});
System.register("language/expressions/expression", ["language/node"], function (exports_43, context_43) {
    "use strict";
    var node_1, Expression;
    var __moduleName = context_43 && context_43.id;
    return {
        setters: [
            function (node_1_1) {
                node_1 = node_1_1;
            }
        ],
        execute: function () {
            Expression = class Expression extends node_1.Node {
                constructor(source, reference) {
                    super(reference);
                    this.source = source;
                }
                toString() {
                    let writer = new Array();
                    for (let index = 0; index < this.source.tokens.length; index++) {
                        let token = this.source.tokens.get(index);
                        writer.push(token.value);
                    }
                    return writer.join('');
                }
            };
            exports_43("Expression", Expression);
        }
    };
});
System.register("language/expressions/parseExpressionResult", [], function (exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    function newParseExpressionFailed(typeName, errorMessage) {
        return {
            state: "failed",
            errorMessage: `(${typeName}) ${errorMessage}`,
        };
    }
    exports_44("newParseExpressionFailed", newParseExpressionFailed);
    function newParseExpressionSuccess(result) {
        return {
            state: "success",
            result: result
        };
    }
    exports_44("newParseExpressionSuccess", newParseExpressionSuccess);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("parser/tokenValidator", ["parser/tokens/tokenType"], function (exports_45, context_45) {
    "use strict";
    var tokenType_13, TokenValidator;
    var __moduleName = context_45 && context_45.id;
    return {
        setters: [
            function (tokenType_13_1) {
                tokenType_13 = tokenType_13_1;
            }
        ],
        execute: function () {
            TokenValidator = class TokenValidator {
                constructor(parserName, line, logger) {
                    this.errorsExpected = false;
                    if (line.tokens == null)
                        throw new Error("line and line.tokens should not be null.");
                    this.parserName = parserName;
                    this.logger = logger;
                    this.line = line;
                    this.tokens = line.tokens;
                    this.isValid = true;
                }
                count(count) {
                    if (this.tokens.length != count) {
                        fail(`Invalid number of tokens '${this.tokens.length}', should be '${this.count}'.`);
                        this.isValid = false;
                    }
                    return this;
                }
                countMinimum(count) {
                    if (this.tokens.length < count) {
                        this.fail(`Invalid number of tokens '${this.tokens.length}', should be at least '${this.count}'.`);
                        this.isValid = false;
                    }
                    return this;
                }
                keyword(index, keyword = null) {
                    this.type(index, tokenType_13.TokenType.KeywordToken);
                    if (keyword != null)
                        this.value(index, keyword);
                    return this;
                }
                stringLiteral(index, value = null) {
                    this.type(index, tokenType_13.TokenType.StringLiteralToken);
                    if (value != null)
                        this.value(index, value);
                    return this;
                }
                operator(index, operatorType) {
                    if (!this.checkValidTokenIndex(index))
                        return this;
                    this.type(index, tokenType_13.TokenType.OperatorToken);
                    const token = this.tokens.get(index);
                    if ((token === null || token === void 0 ? void 0 : token.type) != operatorType) {
                        this.fail(`Invalid operator token {index} value. Expected: '${operatorType}' Actual: '${token === null || token === void 0 ? void 0 : token.type}'`);
                        this.isValid = false;
                    }
                    return this;
                }
                memberAccess(index, value) {
                    this.type(index, tokenType_13.TokenType.MemberAccessLiteral);
                    if (value != null)
                        this.value(index, value);
                    return this;
                }
                comment(index) {
                    this.type(index, tokenType_13.TokenType.CommentToken);
                    return this;
                }
                quotedString(index, literal = null) {
                    const token = this.validateType(index, tokenType_13.TokenType.QuotedLiteralToken);
                    if (token != null && literal != null && token.value != literal) {
                        this.fail(`Invalid token ${index} value. Expected: '${literal}' Actual: '${token === null || token === void 0 ? void 0 : token.value}'`);
                        this.isValid = false;
                    }
                    return this;
                }
                numberLiteral(index, value = null) {
                    let token = this.validateType(index, tokenType_13.TokenType.NumberLiteralToken);
                    if (token != null && value != null && token.numberValue != value) {
                        this.fail(`Invalid token ${index} value. Expected: '${value}' Actual: '${token.value}'`);
                        this.isValid = false;
                    }
                    return this;
                }
                boolean(index, value) {
                    const token = this.validateType(index, tokenType_13.TokenType.BooleanLiteral);
                    if (token != null && token.booleanValue != value) {
                        this.fail(`Invalid token ${index} value. Expected: '${value}' Actual: '${token.value}'`);
                        this.isValid = false;
                    }
                    return this;
                }
                dateTime(index, year, month, day, hours, minutes, seconds) {
                    let token = this.validateType(index, tokenType_13.TokenType.DateTimeLiteral);
                    let expected = new Date(year, month - 1, day, hours, minutes, seconds);
                    if (token != null && token.dateTimeValue != null && token.dateTimeValue.getTime() != expected.getTime()) {
                        this.fail(`Invalid token value at ${index}. Expected: '${expected.toISOString()}' Actual: '${token.dateTimeValue.toISOString()}'`);
                        this.isValid = false;
                    }
                    return this;
                }
                type(index, tokenType) {
                    this.validateType(index, tokenType);
                    return this;
                }
                isLiteralToken(index) {
                    var _a;
                    if (!this.checkValidTokenIndex(index))
                        return this;
                    let token = this.tokens.get(index);
                    let literalToken = token.tokenIsLiteral ? token : null;
                    if (literalToken == null) {
                        this.fail(`Invalid token type as ${index}. Expected: 'ILiteralToken' Actual: '${(_a = this.tokens.get(index)) === null || _a === void 0 ? void 0 : _a.tokenType}'`);
                        this.isValid = false;
                        return this;
                    }
                    return this;
                }
                validateType(index, tokenType) {
                    if (!this.checkValidTokenIndex(index))
                        return null;
                    let token = this.tokens.get(index);
                    if (token.tokenType != tokenType) {
                        this.fail(`Invalid token ${index} type. Expected: '${tokenType}' Actual: '${this.type.name}(${token.value})'`);
                        this.isValid = false;
                        return null;
                    }
                    return token;
                }
                value(index, expectedValue) {
                    if (!this.checkValidTokenIndex(index))
                        return this;
                    const token = this.tokens.get(index);
                    if (token.value != expectedValue) {
                        this.fail(`Invalid token value as ${index}. Expected: '${expectedValue}' Actual: '${token.value}'`);
                        this.isValid = false;
                    }
                    return this;
                }
                checkValidTokenIndex(index) {
                    if (index < this.tokens.length)
                        return true;
                    this.fail(`Token expected at '${index}' but not found. Length: '${this.tokens.length}'`);
                    this.isValid = false;
                    return false;
                }
                fail(error) {
                    this.logger.fail(this.line.lineStartReference(), `(${this.parserName}) ${error}`);
                }
                assert() {
                    if (!this.errorsExpected && this.logger.hasErrors()) {
                        throw new Error(this.logger.formatMessages());
                    }
                    if (!this.isValid)
                        throw new Error(this.logger.formatMessages());
                }
            };
            exports_45("TokenValidator", TokenValidator);
        }
    };
});
System.register("parser/ParseLineContext", ["parser/tokenValidator"], function (exports_46, context_46) {
    "use strict";
    var tokenValidator_1, ParseLineContext;
    var __moduleName = context_46 && context_46.id;
    return {
        setters: [
            function (tokenValidator_1_1) {
                tokenValidator_1 = tokenValidator_1_1;
            }
        ],
        execute: function () {
            ParseLineContext = class ParseLineContext {
                constructor(line, logger, expressionFactory) {
                    this.line = line;
                    this.logger = logger;
                    this.expressionFactory = expressionFactory;
                }
                validateTokens(name) {
                    return new tokenValidator_1.TokenValidator(name, this.line, this.logger);
                }
                failed(result, reference) {
                    if (result.state == "Success")
                        return false;
                    this.logger.fail(reference, result.errorMessage);
                    return true;
                }
            };
            exports_46("ParseLineContext", ParseLineContext);
        }
    };
});
System.register("language/expressions/IChildExpression", [], function (exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    function instanceOfChildExpression(object) {
        return (object === null || object === void 0 ? void 0 : object.isChildExpression) == true;
    }
    exports_47("instanceOfChildExpression", instanceOfChildExpression);
    function asChildExpression(object) {
        return instanceOfChildExpression(object) ? object : null;
    }
    exports_47("asChildExpression", asChildExpression);
    function instanceOfParentExpression(object) {
        return (object === null || object === void 0 ? void 0 : object.isParentExpression) == true;
    }
    exports_47("instanceOfParentExpression", instanceOfParentExpression);
    function asParentExpression(object) {
        return instanceOfParentExpression(object) ? object : null;
    }
    exports_47("asParentExpression", asParentExpression);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("infrastructure/assert", [], function (exports_48, context_48) {
    "use strict";
    var Assert;
    var __moduleName = context_48 && context_48.id;
    return {
        setters: [],
        execute: function () {
            Assert = class Assert {
                static notNull(value, name) {
                    if (!value) {
                        throw new Error(`Value '${name}' is null.`);
                    }
                    return value;
                }
            };
            exports_48("Assert", Assert);
        }
    };
});
System.register("language/expressions/expressionList", ["language/node", "language/expressions/IChildExpression", "infrastructure/enumerableExtensions", "language/nodeType"], function (exports_49, context_49) {
    "use strict";
    var node_2, IChildExpression_1, enumerableExtensions_2, nodeType_1, ExpressionList;
    var __moduleName = context_49 && context_49.id;
    return {
        setters: [
            function (node_2_1) {
                node_2 = node_2_1;
            },
            function (IChildExpression_1_1) {
                IChildExpression_1 = IChildExpression_1_1;
            },
            function (enumerableExtensions_2_1) {
                enumerableExtensions_2 = enumerableExtensions_2_1;
            },
            function (nodeType_1_1) {
                nodeType_1 = nodeType_1_1;
            }
        ],
        execute: function () {
            ExpressionList = class ExpressionList extends node_2.Node {
                get length() {
                    return this.values.length;
                }
                constructor(reference, factory) {
                    super(reference);
                    this.values = [];
                    this.nodeType = nodeType_1.NodeType.ExpressionList;
                    this.factory = factory;
                }
                asArray() {
                    return [...this.values];
                }
                get(index) {
                    return this.values[index];
                }
                getChildren() {
                    return this.values;
                }
                validate(context) {
                }
                validateTree(context) {
                    const scope = context.createVariableScope();
                    try {
                        super.validateTree(context);
                    }
                    finally {
                        scope[Symbol.dispose]();
                    }
                }
                parse(context) {
                    let line = context.line;
                    let expression = this.factory.parse(line.tokens, line);
                    if (expression.state != 'success') {
                        context.logger.fail(line.lineStartReference(), expression.errorMessage);
                        return expression;
                    }
                    this.add(expression.result, context);
                    return expression;
                }
                add(expression, context) {
                    const childExpression = IChildExpression_1.asChildExpression(expression);
                    if (childExpression != null) {
                        this.addToParent(childExpression, context);
                    }
                    else {
                        this.values.push(expression);
                    }
                }
                addToParent(childExpression, context) {
                    const parentExpression = IChildExpression_1.asParentExpression(enumerableExtensions_2.lastOrDefault(this.values));
                    if (childExpression.validateParentExpression(parentExpression, context)) {
                        parentExpression === null || parentExpression === void 0 ? void 0 : parentExpression.linkChildExpression(childExpression);
                    }
                }
            };
            exports_49("ExpressionList", ExpressionList);
        }
    };
});
System.register("language/expressions/elseExpression", ["language/expressions/expression", "language/parsableNode", "language/expressions/expressionList", "language/expressions/parseExpressionResult", "parser/Keywords", "language/nodeType"], function (exports_50, context_50) {
    "use strict";
    var expression_1, parsableNode_1, expressionList_1, parseExpressionResult_1, Keywords_2, nodeType_2, ElseExpression;
    var __moduleName = context_50 && context_50.id;
    function instanceOfElseExpression(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_2.NodeType.ElseExpression;
    }
    exports_50("instanceOfElseExpression", instanceOfElseExpression);
    function asElseExpression(object) {
        return instanceOfElseExpression(object) ? object : null;
    }
    exports_50("asElseExpression", asElseExpression);
    return {
        setters: [
            function (expression_1_1) {
                expression_1 = expression_1_1;
            },
            function (parsableNode_1_1) {
                parsableNode_1 = parsableNode_1_1;
            },
            function (expressionList_1_1) {
                expressionList_1 = expressionList_1_1;
            },
            function (parseExpressionResult_1_1) {
                parseExpressionResult_1 = parseExpressionResult_1_1;
            },
            function (Keywords_2_1) {
                Keywords_2 = Keywords_2_1;
            },
            function (nodeType_2_1) {
                nodeType_2 = nodeType_2_1;
            }
        ],
        execute: function () {
            ElseExpression = class ElseExpression extends expression_1.Expression {
                get falseExpressions() {
                    return this.falseExpressionsValue.asArray();
                }
                constructor(source, reference, factory) {
                    super(source, reference);
                    this.isParsableNode = true;
                    this.isChildExpression = true;
                    this.nodeType = nodeType_2.NodeType.ElseExpression;
                    this.falseExpressionsValue = new expressionList_1.ExpressionList(reference, factory);
                }
                validateParentExpression(expression, context) {
                    if (expression == null || expression.nodeType != "IfExpression") {
                        context.logger.fail(this.reference, `Else should be following an If statement. No if statement found.`);
                        return false;
                    }
                    return true;
                }
                getChildren() {
                    return [this.falseExpressionsValue];
                }
                parse(context) {
                    let expression = this.falseExpressionsValue.parse(context);
                    if (expression.state != "success")
                        return this;
                    const node = parsableNode_1.asParsableNode(expression.result);
                    return node != null ? node : this;
                }
                static parse(source, factory) {
                    let tokens = source.tokens;
                    if (!ElseExpression.isValid(tokens))
                        return parseExpressionResult_1.newParseExpressionFailed("ElseExpression", `Not valid.`);
                    if (tokens.length > 1)
                        return parseExpressionResult_1.newParseExpressionFailed("ElseExpression", `No tokens expected.`);
                    let reference = source.createReference();
                    let expression = new ElseExpression(source, reference, factory);
                    return parseExpressionResult_1.newParseExpressionSuccess(expression);
                }
                static isValid(tokens) {
                    return tokens.isKeyword(0, Keywords_2.Keywords.Else);
                }
                validate(context) {
                }
                deriveType(context) {
                    return null;
                }
            };
            exports_50("ElseExpression", ElseExpression);
        }
    };
});
System.register("language/expressions/ifExpression", ["language/expressions/expression", "language/parsableNode", "language/expressions/expressionList", "language/expressions/elseExpression", "language/expressions/parseExpressionResult", "parser/Keywords", "language/variableTypes/primitiveType", "language/nodeType"], function (exports_51, context_51) {
    "use strict";
    var expression_2, parsableNode_2, expressionList_2, elseExpression_1, parseExpressionResult_2, Keywords_3, primitiveType_5, nodeType_3, IfExpression;
    var __moduleName = context_51 && context_51.id;
    function instanceOfIfExpression(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_3.NodeType.IfExpression;
    }
    exports_51("instanceOfIfExpression", instanceOfIfExpression);
    function asIfExpression(object) {
        return instanceOfIfExpression(object) ? object : null;
    }
    exports_51("asIfExpression", asIfExpression);
    return {
        setters: [
            function (expression_2_1) {
                expression_2 = expression_2_1;
            },
            function (parsableNode_2_1) {
                parsableNode_2 = parsableNode_2_1;
            },
            function (expressionList_2_1) {
                expressionList_2 = expressionList_2_1;
            },
            function (elseExpression_1_1) {
                elseExpression_1 = elseExpression_1_1;
            },
            function (parseExpressionResult_2_1) {
                parseExpressionResult_2 = parseExpressionResult_2_1;
            },
            function (Keywords_3_1) {
                Keywords_3 = Keywords_3_1;
            },
            function (primitiveType_5_1) {
                primitiveType_5 = primitiveType_5_1;
            },
            function (nodeType_3_1) {
                nodeType_3 = nodeType_3_1;
            }
        ],
        execute: function () {
            IfExpression = class IfExpression extends expression_2.Expression {
                get trueExpressions() {
                    return this.trueExpressionsValues.asArray();
                }
                constructor(condition, source, reference, factory) {
                    super(source, reference);
                    this.isParentExpression = true;
                    this.isParsableNode = true;
                    this.nodeType = nodeType_3.NodeType.IfExpression;
                    this.else = null;
                    this.condition = condition;
                    this.trueExpressionsValues = new expressionList_2.ExpressionList(reference, factory);
                }
                parse(context) {
                    let expression = this.trueExpressionsValues.parse(context);
                    if (expression.state != "success")
                        return this;
                    const parsableNode = parsableNode_2.asParsableNode(expression.result);
                    return parsableNode != null ? parsableNode : this;
                }
                getChildren() {
                    const result = [this.condition, this.trueExpressionsValues];
                    if (this.else != null)
                        result.push(this.else);
                    return result;
                }
                static parse(source, factory) {
                    let tokens = source.tokens;
                    if (!IfExpression.isValid(tokens))
                        return parseExpressionResult_2.newParseExpressionFailed("IfExpression", `Not valid.`);
                    if (tokens.length == 1)
                        return parseExpressionResult_2.newParseExpressionFailed("IfExpression", `No condition found`);
                    let condition = tokens.tokensFrom(1);
                    let conditionExpression = factory.parse(condition, source.line);
                    if (conditionExpression.state != 'success')
                        return conditionExpression;
                    let reference = source.createReference();
                    let expression = new IfExpression(conditionExpression.result, source, reference, factory);
                    return parseExpressionResult_2.newParseExpressionSuccess(expression);
                }
                static isValid(tokens) {
                    return tokens.isKeyword(0, Keywords_3.Keywords.If);
                }
                validate(context) {
                    let type = this.condition.deriveType(context);
                    if (type == null || !type.equals(primitiveType_5.PrimitiveType.boolean)) {
                        context.logger.fail(this.reference, `'if' condition expression should be 'boolean', is of wrong type '${type}'.`);
                    }
                }
                linkElse(elseExpression) {
                    if (this.else != null)
                        throw new Error("'else' can only be set once");
                    this.else = elseExpression;
                }
                deriveType(context) {
                    return null;
                }
                linkChildExpression(expression) {
                    if (this.else != null)
                        throw new Error(`'else' already linked.`);
                    const elseExpression = elseExpression_1.asElseExpression(expression);
                    if (elseExpression == null)
                        throw new Error(`Invalid node type: ${expression.nodeType}`);
                    this.else = elseExpression;
                }
            };
            exports_51("IfExpression", IfExpression);
        }
    };
});
System.register("language/expressions/caseExpression", ["language/expressions/expression", "language/parsableNode", "language/expressions/expressionList", "language/expressions/parseExpressionResult", "parser/Keywords", "language/nodeType"], function (exports_52, context_52) {
    "use strict";
    var expression_3, parsableNode_3, expressionList_3, parseExpressionResult_3, Keywords_4, nodeType_4, CaseExpression;
    var __moduleName = context_52 && context_52.id;
    function instanceOfCaseExpression(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_4.NodeType.CaseExpression;
    }
    exports_52("instanceOfCaseExpression", instanceOfCaseExpression);
    function asCaseExpression(object) {
        return instanceOfCaseExpression(object) ? object : null;
    }
    exports_52("asCaseExpression", asCaseExpression);
    return {
        setters: [
            function (expression_3_1) {
                expression_3 = expression_3_1;
            },
            function (parsableNode_3_1) {
                parsableNode_3 = parsableNode_3_1;
            },
            function (expressionList_3_1) {
                expressionList_3 = expressionList_3_1;
            },
            function (parseExpressionResult_3_1) {
                parseExpressionResult_3 = parseExpressionResult_3_1;
            },
            function (Keywords_4_1) {
                Keywords_4 = Keywords_4_1;
            },
            function (nodeType_4_1) {
                nodeType_4 = nodeType_4_1;
            }
        ],
        execute: function () {
            CaseExpression = class CaseExpression extends expression_3.Expression {
                get expressions() {
                    return this.expressionsValues.asArray();
                }
                constructor(value, isDefault, source, reference, factory) {
                    super(source, reference);
                    this.isParsableNode = true;
                    this.isChildExpression = true;
                    this.nodeType = nodeType_4.NodeType.CaseExpression;
                    this.value = value;
                    this.isDefault = isDefault;
                    this.expressionsValues = new expressionList_3.ExpressionList(reference, factory);
                }
                parse(context) {
                    const expression = this.expressionsValues.parse(context);
                    if (expression.state != "success")
                        return this;
                    const node = parsableNode_3.asParsableNode(expression.result);
                    return node != null ? node : this;
                }
                getChildren() {
                    return this.value != null ? [this.value, this.expressionsValues] : [this.expressionsValues];
                }
                static parse(source, factory) {
                    let tokens = source.tokens;
                    if (!CaseExpression.isValid(tokens))
                        return parseExpressionResult_3.newParseExpressionFailed("CaseExpression", `Not valid.`);
                    if (tokens.isKeyword(0, Keywords_4.Keywords.Default))
                        return CaseExpression.parseDefaultCase(source, tokens, factory);
                    if (tokens.length == 1)
                        return parseExpressionResult_3.newParseExpressionFailed("CaseExpression", `Invalid 'case'. No parameters found.`);
                    let value = tokens.tokensFrom(1);
                    let valueExpression = factory.parse(value, source.line);
                    if (valueExpression.state != 'success')
                        return valueExpression;
                    let reference = source.createReference();
                    let expression = new CaseExpression(valueExpression.result, false, source, reference, factory);
                    return parseExpressionResult_3.newParseExpressionSuccess(expression);
                }
                static parseDefaultCase(source, tokens, factory) {
                    if (tokens.length != 1)
                        return parseExpressionResult_3.newParseExpressionFailed("CaseExpression", `Invalid 'default' case. No parameters expected.`);
                    let reference = source.createReference();
                    let expression = new CaseExpression(null, true, source, reference, factory);
                    return parseExpressionResult_3.newParseExpressionSuccess(expression);
                }
                static isValid(tokens) {
                    return tokens.isKeyword(0, Keywords_4.Keywords.Case)
                        || tokens.isKeyword(0, Keywords_4.Keywords.Default);
                }
                validate(context) {
                }
                deriveType(context) {
                    return this.value != null ? this.value.deriveType(context) : null;
                }
            };
            exports_52("CaseExpression", CaseExpression);
        }
    };
});
System.register("language/expressions/switchExpression", ["language/expressions/expression", "language/expressions/caseExpression", "language/expressions/parseExpressionResult", "parser/Keywords", "language/nodeType"], function (exports_53, context_53) {
    "use strict";
    var expression_4, caseExpression_1, parseExpressionResult_4, Keywords_5, nodeType_5, SwitchExpression;
    var __moduleName = context_53 && context_53.id;
    function instanceOfSwitchExpression(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_5.NodeType.SwitchExpression;
    }
    exports_53("instanceOfSwitchExpression", instanceOfSwitchExpression);
    function asSwitchExpression(object) {
        return instanceOfSwitchExpression(object) ? object : null;
    }
    exports_53("asSwitchExpression", asSwitchExpression);
    return {
        setters: [
            function (expression_4_1) {
                expression_4 = expression_4_1;
            },
            function (caseExpression_1_1) {
                caseExpression_1 = caseExpression_1_1;
            },
            function (parseExpressionResult_4_1) {
                parseExpressionResult_4 = parseExpressionResult_4_1;
            },
            function (Keywords_5_1) {
                Keywords_5 = Keywords_5_1;
            },
            function (nodeType_5_1) {
                nodeType_5 = nodeType_5_1;
            }
        ],
        execute: function () {
            SwitchExpression = class SwitchExpression extends expression_4.Expression {
                constructor(condition, source, reference, factory) {
                    super(source, reference);
                    this.isParsableNode = true;
                    this.nodeType = nodeType_5.NodeType.SwitchExpression;
                    this.cases = [];
                    this.condition = condition;
                    this.factory = factory;
                }
                parse(context) {
                    let line = context.line;
                    let expression = this.factory.parse(line.tokens, line);
                    if (expression.state != 'success') {
                        context.logger.fail(line.lineStartReference(), expression.errorMessage);
                        return this;
                    }
                    const caseExpression = caseExpression_1.asCaseExpression(expression.result);
                    if (caseExpression != null) {
                        this.cases.push(caseExpression);
                        return caseExpression;
                    }
                    context.logger.fail(expression.result.reference, `Invalid expression. 'case' or 'default' expected.`);
                    return this;
                }
                getChildren() {
                    const result = [this.condition];
                    this.cases.forEach(caseValue => result.push(caseValue));
                    return result;
                }
                static parse(source, factory) {
                    let tokens = source.tokens;
                    if (!SwitchExpression.isValid(tokens))
                        return parseExpressionResult_4.newParseExpressionFailed("SwitchExpression", `Not valid.`);
                    if (tokens.length == 1)
                        return parseExpressionResult_4.newParseExpressionFailed("SwitchExpression", `No condition found`);
                    let condition = tokens.tokensFrom(1);
                    let conditionExpression = factory.parse(condition, source.line);
                    if (conditionExpression.state != 'success')
                        return conditionExpression;
                    let reference = source.createReference();
                    let expression = new SwitchExpression(conditionExpression.result, source, reference, factory);
                    return parseExpressionResult_4.newParseExpressionSuccess(expression);
                }
                static isValid(tokens) {
                    return tokens.isKeyword(0, Keywords_5.Keywords.Switch);
                }
                validate(context) {
                    let type = this.condition.deriveType(context);
                    if (type == null
                        || type.variableTypeName != "PrimitiveType" && type.variableTypeName != "EnumType") {
                        context.logger.fail(this.reference, `'Switch' condition expression should have a primitive or enum type. Not: '${type}'.`);
                        return;
                    }
                    this.cases.forEach(caseExpression => {
                        if (caseExpression.isDefault)
                            return;
                        let caseType = caseExpression.deriveType(context);
                        if (caseType == null || !(type === null || type === void 0 ? void 0 : type.equals(caseType)))
                            context.logger.fail(this.reference, `'case' condition expression should be of type '${type}', is of wrong type '${caseType}'.`);
                    });
                }
                deriveType(context) {
                    return null;
                }
            };
            exports_53("SwitchExpression", SwitchExpression);
        }
    };
});
System.register("language/variableTypes/variableDeclarationType", ["language/node"], function (exports_54, context_54) {
    "use strict";
    var node_3, VariableDeclarationType;
    var __moduleName = context_54 && context_54.id;
    return {
        setters: [
            function (node_3_1) {
                node_3 = node_3_1;
            }
        ],
        execute: function () {
            VariableDeclarationType = class VariableDeclarationType extends node_3.Node {
                get variableType() {
                    return this.variableTypeValue;
                }
                constructor(reference) {
                    super(reference);
                    this.variableTypeValue = null;
                }
                setVariableType(value) {
                    this.variableTypeValue = value;
                }
            };
            exports_54("VariableDeclarationType", VariableDeclarationType);
        }
    };
});
System.register("language/variableTypes/implicitVariableDeclaration", ["language/variableTypes/variableDeclarationType", "language/nodeType"], function (exports_55, context_55) {
    "use strict";
    var variableDeclarationType_1, nodeType_6, ImplicitVariableDeclaration;
    var __moduleName = context_55 && context_55.id;
    function instanceOfImplicitVariableDeclaration(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_6.NodeType.ImplicitVariableDeclaration;
    }
    exports_55("instanceOfImplicitVariableDeclaration", instanceOfImplicitVariableDeclaration);
    function asImplicitVariableDeclaration(object) {
        return instanceOfImplicitVariableDeclaration(object) ? object : null;
    }
    exports_55("asImplicitVariableDeclaration", asImplicitVariableDeclaration);
    return {
        setters: [
            function (variableDeclarationType_1_1) {
                variableDeclarationType_1 = variableDeclarationType_1_1;
            },
            function (nodeType_6_1) {
                nodeType_6 = nodeType_6_1;
            }
        ],
        execute: function () {
            ImplicitVariableDeclaration = class ImplicitVariableDeclaration extends variableDeclarationType_1.VariableDeclarationType {
                constructor(reference) {
                    super(reference);
                    this.nodeType = nodeType_6.NodeType.ImplicitVariableDeclaration;
                }
                createVariableType(context) {
                    if (this.variableType == null) {
                        throw new Error(`Not supported. Nodes should be Validated first.`);
                    }
                    return this.variableType;
                }
                define(variableType) {
                    super.setVariableType(variableType);
                }
                getChildren() {
                    return [];
                }
                validate(context) {
                }
            };
            exports_55("ImplicitVariableDeclaration", ImplicitVariableDeclaration);
        }
    };
});
System.register("language/variableSource", [], function (exports_56, context_56) {
    "use strict";
    var VariableSource;
    var __moduleName = context_56 && context_56.id;
    return {
        setters: [],
        execute: function () {
            (function (VariableSource) {
                VariableSource["Unknown"] = "Unknown";
                VariableSource["Parameters"] = "Parameters";
                VariableSource["Results"] = "Results";
                VariableSource["Code"] = "Code";
                VariableSource["Type"] = "Type";
            })(VariableSource || (exports_56("VariableSource", VariableSource = {})));
        }
    };
});
System.register("language/variableTypes/primitiveVariableDeclarationType", ["language/variableTypes/variableDeclarationType", "language/variableTypes/primitiveType", "language/nodeType"], function (exports_57, context_57) {
    "use strict";
    var variableDeclarationType_2, primitiveType_6, nodeType_7, PrimitiveVariableDeclarationType;
    var __moduleName = context_57 && context_57.id;
    function instanceOfPrimitiveVariableDeclarationType(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_7.NodeType.PrimitiveVariableDeclarationType;
    }
    exports_57("instanceOfPrimitiveVariableDeclarationType", instanceOfPrimitiveVariableDeclarationType);
    function asPrimitiveVariableDeclarationType(object) {
        return instanceOfPrimitiveVariableDeclarationType(object) ? object : null;
    }
    exports_57("asPrimitiveVariableDeclarationType", asPrimitiveVariableDeclarationType);
    return {
        setters: [
            function (variableDeclarationType_2_1) {
                variableDeclarationType_2 = variableDeclarationType_2_1;
            },
            function (primitiveType_6_1) {
                primitiveType_6 = primitiveType_6_1;
            },
            function (nodeType_7_1) {
                nodeType_7 = nodeType_7_1;
            }
        ],
        execute: function () {
            PrimitiveVariableDeclarationType = class PrimitiveVariableDeclarationType extends variableDeclarationType_2.VariableDeclarationType {
                constructor(type, reference) {
                    super(reference);
                    this.nodeType = nodeType_7.NodeType.PrimitiveVariableDeclarationType;
                    this.type = type;
                }
                equals(other) {
                    return this.type == other.type;
                }
                toString() {
                    return this.type;
                }
                createVariableType(context) {
                    return primitiveType_6.PrimitiveType.parse(this.type);
                }
                getChildren() {
                    return [];
                }
                validate(context) {
                }
            };
            exports_57("PrimitiveVariableDeclarationType", PrimitiveVariableDeclarationType);
        }
    };
});
System.register("language/IHasNodeDependencies", [], function (exports_58, context_58) {
    "use strict";
    var __moduleName = context_58 && context_58.id;
    function instanceOfHasNodeDependencies(object) {
        return (object === null || object === void 0 ? void 0 : object.hasNodeDependencies) == true;
    }
    exports_58("instanceOfHasNodeDependencies", instanceOfHasNodeDependencies);
    function asHasNodeDependencies(object) {
        return instanceOfHasNodeDependencies(object) ? object : null;
    }
    exports_58("asHasNodeDependencies", asHasNodeDependencies);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("language/types/typeName", ["infrastructure/assert"], function (exports_59, context_59) {
    "use strict";
    var assert_1, TypeName;
    var __moduleName = context_59 && context_59.id;
    return {
        setters: [
            function (assert_1_1) {
                assert_1 = assert_1_1;
            }
        ],
        execute: function () {
            TypeName = class TypeName {
                constructor() {
                    this.valueValue = null;
                }
                get value() {
                    return assert_1.Assert.notNull(this.valueValue, "value");
                }
                parseName(parameter) {
                    this.valueValue = parameter;
                }
            };
            exports_59("TypeName", TypeName);
        }
    };
});
System.register("language/enums/enumName", ["language/node", "parser/tokens/character", "language/nodeType", "infrastructure/assert"], function (exports_60, context_60) {
    "use strict";
    var node_4, character_7, nodeType_8, assert_2, EnumName;
    var __moduleName = context_60 && context_60.id;
    return {
        setters: [
            function (node_4_1) {
                node_4 = node_4_1;
            },
            function (character_7_1) {
                character_7 = character_7_1;
            },
            function (nodeType_8_1) {
                nodeType_8 = nodeType_8_1;
            },
            function (assert_2_1) {
                assert_2 = assert_2_1;
            }
        ],
        execute: function () {
            EnumName = class EnumName extends node_4.Node {
                get value() {
                    return assert_2.Assert.notNull(this.valueValue, "value");
                }
                constructor(sourceReference) {
                    super(sourceReference);
                    this.valueValue = null;
                    this.nodeType = nodeType_8.NodeType.EnumName;
                }
                parseName(parameter) {
                    this.valueValue = parameter;
                }
                getChildren() {
                    return [];
                }
                validate(context) {
                    if (character_7.isNullOrEmpty(this.value)) {
                        context.logger.fail(this.reference, `Invalid enum name: ${this.value}. name should not be empty.`);
                    }
                    else if (!character_7.isValidIdentifier(this.value)) {
                        context.logger.fail(this.reference, `Invalid enum name: ${this.value}.`);
                    }
                }
            };
            exports_60("EnumName", EnumName);
        }
    };
});
System.register("language/enums/enumMember", ["parser/tokens/numberLiteralToken", "language/node", "parser/tokens/operatorType", "parser/tokens/character", "language/nodeType"], function (exports_61, context_61) {
    "use strict";
    var numberLiteralToken_2, node_5, operatorType_2, character_8, nodeType_9, EnumMember;
    var __moduleName = context_61 && context_61.id;
    return {
        setters: [
            function (numberLiteralToken_2_1) {
                numberLiteralToken_2 = numberLiteralToken_2_1;
            },
            function (node_5_1) {
                node_5 = node_5_1;
            },
            function (operatorType_2_1) {
                operatorType_2 = operatorType_2_1;
            },
            function (character_8_1) {
                character_8 = character_8_1;
            },
            function (nodeType_9_1) {
                nodeType_9 = nodeType_9_1;
            }
        ],
        execute: function () {
            EnumMember = class EnumMember extends node_5.Node {
                constructor(name, reference, valueLiteral, value) {
                    super(reference);
                    this.nodeType = nodeType_9.NodeType.EnumMember;
                    this.numberValue = value;
                    this.name = name;
                    this.valueLiteral = valueLiteral;
                }
                static parse(context, lastIndex) {
                    let valid = context.validateTokens("EnumMember")
                        .countMinimum(1)
                        .stringLiteral(0)
                        .isValid;
                    if (!valid)
                        return null;
                    let line = context.line;
                    let tokens = line.tokens;
                    let name = tokens.tokenValue(0);
                    if (!name)
                        return null;
                    let reference = line.lineStartReference();
                    if (tokens.length == 1)
                        return new EnumMember(name, reference, null, lastIndex + 1);
                    if (tokens.length != 3) {
                        context.logger.fail(line.lineEndReference(), `Invalid number of tokens: ${tokens.length}. Should be 1 or 3.`);
                        return null;
                    }
                    valid = context.validateTokens("EnumMember")
                        .operator(1, operatorType_2.OperatorType.Assignment)
                        .numberLiteral(2)
                        .isValid;
                    if (!valid)
                        return null;
                    let value = tokens.token(2, numberLiteralToken_2.asNumberLiteralToken);
                    if (value == null)
                        return null;
                    return new EnumMember(name, reference, value, value.numberValue);
                }
                getChildren() {
                    return [];
                }
                validate(context) {
                    this.validateMemberName(context);
                    this.validateMemberValues(context);
                }
                validateMemberName(context) {
                    if (this.name == null || this.name == '') {
                        context.logger.fail(this.reference, `Enum member name should not be null or empty.`);
                    }
                    else if (!character_8.isValidIdentifier(this.name)) {
                        context.logger.fail(this.reference, `Invalid enum member name: ${this.name}.`);
                    }
                }
                validateMemberValues(context) {
                    if (this.valueLiteral == null)
                        return;
                    if (this.valueLiteral.numberValue < 0) {
                        context.logger.fail(this.reference, `Enum member value should not be < 0: ${this.valueLiteral}`);
                    }
                    if (this.valueLiteral.isDecimal()) {
                        context.logger.fail(this.reference, `Enum member value should not be decimal: ${this.valueLiteral}`);
                    }
                }
            };
            exports_61("EnumMember", EnumMember);
        }
    };
});
System.register("parser/nodeName", [], function (exports_62, context_62) {
    "use strict";
    var NodeName;
    var __moduleName = context_62 && context_62.id;
    return {
        setters: [],
        execute: function () {
            NodeName = class NodeName {
                constructor(keyword, name) {
                    this.name = name;
                    this.keyword = keyword;
                }
                static parse(context) {
                    let line = context.line;
                    let tokens = line.tokens;
                    if (tokens.length < 1 || tokens.length > 2)
                        return null;
                    let valid = context.validateTokens("NodeName")
                        .keyword(0)
                        .isValid;
                    if (!valid)
                        return null;
                    let keyword = tokens.tokenValue(0);
                    if (keyword == null)
                        return null;
                    if (tokens.length == 1)
                        return new NodeName(keyword, null);
                    valid = context.validateTokens("NodeName")
                        .stringLiteral(1)
                        .isValid;
                    if (!valid)
                        return null;
                    let parameter = tokens.tokenValue(1);
                    return new NodeName(keyword, parameter);
                }
                toString() {
                    return `${this.keyword} {this.name}`;
                }
            };
            exports_62("NodeName", NodeName);
        }
    };
});
System.register("language/duplicateChecker", ["infrastructure/enumerableExtensions"], function (exports_63, context_63) {
    "use strict";
    var enumerableExtensions_3, DuplicateChecker;
    var __moduleName = context_63 && context_63.id;
    return {
        setters: [
            function (enumerableExtensions_3_1) {
                enumerableExtensions_3 = enumerableExtensions_3_1;
            }
        ],
        execute: function () {
            DuplicateChecker = class DuplicateChecker {
                static validate(context, getReference, getName, getErrorMessage, values) {
                    const found = new Array();
                    for (const item of values) {
                        const name = getName(item);
                        if (enumerableExtensions_3.contains(found, name)) {
                            context.logger;
                            context.logger.fail(getReference(item), getErrorMessage(item));
                        }
                        else {
                            found.push(name);
                        }
                    }
                }
            };
            exports_63("DuplicateChecker", DuplicateChecker);
        }
    };
});
System.register("language/enums/enumDefinition", ["language/rootNode", "language/enums/enumName", "language/enums/enumMember", "infrastructure/enumerableExtensions", "language/duplicateChecker", "language/nodeType"], function (exports_64, context_64) {
    "use strict";
    var rootNode_1, enumName_1, enumMember_1, enumerableExtensions_4, duplicateChecker_1, nodeType_10, EnumDefinition;
    var __moduleName = context_64 && context_64.id;
    function instanceOfEnumDefinition(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_10.NodeType.EnumDefinition;
    }
    exports_64("instanceOfEnumDefinition", instanceOfEnumDefinition);
    function asEnumDefinition(object) {
        return instanceOfEnumDefinition(object) ? object : null;
    }
    exports_64("asEnumDefinition", asEnumDefinition);
    return {
        setters: [
            function (rootNode_1_1) {
                rootNode_1 = rootNode_1_1;
            },
            function (enumName_1_1) {
                enumName_1 = enumName_1_1;
            },
            function (enumMember_1_1) {
                enumMember_1 = enumMember_1_1;
            },
            function (enumerableExtensions_4_1) {
                enumerableExtensions_4 = enumerableExtensions_4_1;
            },
            function (duplicateChecker_1_1) {
                duplicateChecker_1 = duplicateChecker_1_1;
            },
            function (nodeType_10_1) {
                nodeType_10 = nodeType_10_1;
            }
        ],
        execute: function () {
            EnumDefinition = class EnumDefinition extends rootNode_1.RootNode {
                get nodeName() {
                    return this.name.value;
                }
                constructor(name, reference) {
                    super(reference);
                    this.nodeType = nodeType_10.NodeType.EnumDefinition;
                    this.members = [];
                    this.name = new enumName_1.EnumName(reference);
                    this.name.parseName(name);
                }
                static parse(name, reference) {
                    return new EnumDefinition(name, reference);
                }
                parse(context) {
                    var _a, _b;
                    let lastIndex = (_b = (_a = enumerableExtensions_4.lastOrDefault(this.members)) === null || _a === void 0 ? void 0 : _a.numberValue) !== null && _b !== void 0 ? _b : -1;
                    let member = enumMember_1.EnumMember.parse(context, lastIndex);
                    if (member != null)
                        this.members.push(member);
                    return this;
                }
                getChildren() {
                    return [this.name, ...this.members];
                }
                validate(context) {
                    if (this.members.length == 0) {
                        context.logger.fail(this.reference, `Enum has no members defined.`);
                        return;
                    }
                    duplicateChecker_1.DuplicateChecker.validate(context, member => member.reference, member => member.name, member => `Enum member name should be unique. Duplicate name: '${member.name}'`, this.members);
                }
                containsMember(name) {
                    return enumerableExtensions_4.any(this.members, member => member.name == name);
                }
            };
            exports_64("EnumDefinition", EnumDefinition);
        }
    };
});
System.register("language/variableTypes/enumType", ["language/variableTypes/typeWithMembers", "infrastructure/enumerableExtensions", "language/variableTypes/variableTypeName"], function (exports_65, context_65) {
    "use strict";
    var typeWithMembers_1, enumerableExtensions_5, variableTypeName_2, EnumType;
    var __moduleName = context_65 && context_65.id;
    function instanceOfEnumType(object) {
        return (object === null || object === void 0 ? void 0 : object.variableTypeName) == variableTypeName_2.VariableTypeName.EnumType;
    }
    exports_65("instanceOfEnumType", instanceOfEnumType);
    function asEnumType(object) {
        return instanceOfEnumType(object) ? object : null;
    }
    exports_65("asEnumType", asEnumType);
    return {
        setters: [
            function (typeWithMembers_1_1) {
                typeWithMembers_1 = typeWithMembers_1_1;
            },
            function (enumerableExtensions_5_1) {
                enumerableExtensions_5 = enumerableExtensions_5_1;
            },
            function (variableTypeName_2_1) {
                variableTypeName_2 = variableTypeName_2_1;
            }
        ],
        execute: function () {
            EnumType = class EnumType extends typeWithMembers_1.TypeWithMembers {
                constructor(type, enumDefinition) {
                    super();
                    this.variableTypeName = variableTypeName_2.VariableTypeName.EnumType;
                    this.type = type;
                    this.enum = enumDefinition;
                }
                equals(other) {
                    return other != null && instanceOfEnumType(other) && this.type == other.type;
                }
                toString() {
                    return this.type;
                }
                memberType(name, context) {
                    return enumerableExtensions_5.any(this.enum.members, member => member.name == name) ? this : null;
                }
                getDependencies(rootNodeList) {
                    const enumDefinition = rootNodeList.getEnum(this.type);
                    return enumDefinition != null ? [enumDefinition] : [];
                }
                firstMemberName() {
                    var _a;
                    return (_a = enumerableExtensions_5.firstOrDefault(this.enum.members)) === null || _a === void 0 ? void 0 : _a.name;
                }
            };
            exports_65("EnumType", EnumType);
        }
    };
});
System.register("language/expressions/memberAccessExpression", ["language/expressions/expression", "language/variableReference", "parser/tokens/memberAccessLiteral", "language/variableSource", "language/expressions/parseExpressionResult", "language/variableTypes/ITypeWithMembers", "language/nodeType"], function (exports_66, context_66) {
    "use strict";
    var expression_5, variableReference_2, memberAccessLiteral_2, variableSource_1, parseExpressionResult_5, ITypeWithMembers_2, nodeType_11, MemberAccessExpression;
    var __moduleName = context_66 && context_66.id;
    function asMemberAccessExpression(object) {
        return object.nodeType == nodeType_11.NodeType.MemberAccessExpression ? object : null;
    }
    exports_66("asMemberAccessExpression", asMemberAccessExpression);
    return {
        setters: [
            function (expression_5_1) {
                expression_5 = expression_5_1;
            },
            function (variableReference_2_1) {
                variableReference_2 = variableReference_2_1;
            },
            function (memberAccessLiteral_2_1) {
                memberAccessLiteral_2 = memberAccessLiteral_2_1;
            },
            function (variableSource_1_1) {
                variableSource_1 = variableSource_1_1;
            },
            function (parseExpressionResult_5_1) {
                parseExpressionResult_5 = parseExpressionResult_5_1;
            },
            function (ITypeWithMembers_2_1) {
                ITypeWithMembers_2 = ITypeWithMembers_2_1;
            },
            function (nodeType_11_1) {
                nodeType_11 = nodeType_11_1;
            }
        ],
        execute: function () {
            MemberAccessExpression = class MemberAccessExpression extends expression_5.Expression {
                constructor(variable, literal, source, reference) {
                    super(source, reference);
                    this.hasNodeDependencies = true;
                    this.nodeType = nodeType_11.NodeType.MemberAccessExpression;
                    this.variableSource = variableSource_1.VariableSource.Unknown;
                    this.variableType = null;
                    this.parentVariableType = null;
                    this.memberAccessLiteral = literal;
                    this.variable = variable;
                }
                getDependencies(rootNodeList) {
                    let rootNode = rootNodeList.getNode(this.memberAccessLiteral.parent);
                    return rootNode != null ? [rootNode] : [];
                }
                static parse(source, factory) {
                    let tokens = source.tokens;
                    if (!MemberAccessExpression.isValid(tokens))
                        return parseExpressionResult_5.newParseExpressionFailed("MemberAccessExpression", `Invalid expression.`);
                    let literal = tokens.token(0, memberAccessLiteral_2.asMemberAccessLiteral);
                    if (!literal)
                        return parseExpressionResult_5.newParseExpressionFailed("MemberAccessExpression", `Invalid expression.`);
                    let variable = new variableReference_2.VariableReference(literal.parts);
                    let reference = source.createReference();
                    let accessExpression = new MemberAccessExpression(variable, literal, source, reference);
                    return parseExpressionResult_5.newParseExpressionSuccess(accessExpression);
                }
                static isValid(tokens) {
                    return tokens.length == 1
                        && tokens.isTokenType(0, memberAccessLiteral_2.MemberAccessLiteral);
                }
                getChildren() {
                    return [];
                }
                validate(context) {
                    this.variableType = context.variableContext.getVariableTypeByReference(this.variable, context);
                    this.parentVariableType = context.rootNodes.getType(this.variable.parentIdentifier);
                    this.setVariableSource(context);
                    if (this.variableType != null)
                        return;
                    this.validateMemberType(context);
                }
                validateMemberType(context) {
                    if (this.variableType == null && this.parentVariableType == null) {
                        context.logger.fail(this.reference, `Invalid member access '${this.variable}'. Variable '${this.variable}' not found.`);
                        return;
                    }
                    const typeWithMembers = ITypeWithMembers_2.asTypeWithMembers(this.parentVariableType);
                    if (typeWithMembers == null) {
                        context.logger.fail(this.reference, `Invalid member access '${this.variable}'. Variable '${this.variable.parentIdentifier}' not found.`);
                        return;
                    }
                    let memberType = typeWithMembers.memberType(this.memberAccessLiteral.member, context);
                    if (memberType == null) {
                        context.logger.fail(this.reference, `Invalid member access '${this.variable}'. Member '${this.memberAccessLiteral.member}' not found on '${this.variable.parentIdentifier}'.`);
                    }
                }
                setVariableSource(context) {
                    if (this.parentVariableType != null) {
                        this.variableSource = variableSource_1.VariableSource.Type;
                        return;
                    }
                    let variableSource = context.variableContext.getVariableSource(this.variable.parentIdentifier);
                    if (variableSource == null) {
                        context.logger.fail(this.reference, `Can't define source of variable: ${this.variable.parentIdentifier}`);
                    }
                    else {
                        this.variableSource = variableSource;
                    }
                }
                deriveType(context) {
                    return this.memberAccessLiteral.deriveType(context);
                }
            };
            exports_66("MemberAccessExpression", MemberAccessExpression);
        }
    };
});
System.register("language/expressions/literalExpression", ["language/expressions/expression", "language/expressions/parseExpressionResult", "parser/tokens/numberLiteralToken", "parser/tokens/operatorType", "language/nodeType"], function (exports_67, context_67) {
    "use strict";
    var expression_6, parseExpressionResult_6, numberLiteralToken_3, operatorType_3, nodeType_12, LiteralExpression;
    var __moduleName = context_67 && context_67.id;
    function instanceOfLiteralExpression(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_12.NodeType.LiteralExpression;
    }
    exports_67("instanceOfLiteralExpression", instanceOfLiteralExpression);
    function asLiteralExpression(object) {
        return instanceOfLiteralExpression(object) ? object : null;
    }
    exports_67("asLiteralExpression", asLiteralExpression);
    return {
        setters: [
            function (expression_6_1) {
                expression_6 = expression_6_1;
            },
            function (parseExpressionResult_6_1) {
                parseExpressionResult_6 = parseExpressionResult_6_1;
            },
            function (numberLiteralToken_3_1) {
                numberLiteralToken_3 = numberLiteralToken_3_1;
            },
            function (operatorType_3_1) {
                operatorType_3 = operatorType_3_1;
            },
            function (nodeType_12_1) {
                nodeType_12 = nodeType_12_1;
            }
        ],
        execute: function () {
            LiteralExpression = class LiteralExpression extends expression_6.Expression {
                constructor(literal, source, reference) {
                    super(source, reference);
                    this.nodeType = nodeType_12.NodeType.LiteralExpression;
                    this.literal = literal;
                }
                static parse(source, factory) {
                    let tokens = source.tokens;
                    if (!LiteralExpression.isValid(tokens))
                        return parseExpressionResult_6.newParseExpressionFailed("LiteralExpression", `Invalid expression.`);
                    let reference = source.createReference();
                    if (tokens.length == 2)
                        return LiteralExpression.negativeNumeric(source, tokens, reference);
                    let literalToken = tokens.literalToken(0);
                    if (!literalToken)
                        return parseExpressionResult_6.newParseExpressionFailed("LiteralExpression", "Invalid token");
                    let expression = new LiteralExpression(literalToken, source, reference);
                    return parseExpressionResult_6.newParseExpressionSuccess(expression);
                }
                static negativeNumeric(source, tokens, reference) {
                    let operatorToken = tokens.operatorToken(0);
                    if (!operatorToken)
                        return parseExpressionResult_6.newParseExpressionFailed("LiteralExpression", "Invalid token");
                    let numericLiteralToken = tokens.literalToken(1);
                    let value = -numericLiteralToken.numberValue;
                    let negatedLiteral = new numberLiteralToken_3.NumberLiteralToken(value, operatorToken.firstCharacter);
                    let negatedExpression = new LiteralExpression(negatedLiteral, source, reference);
                    return parseExpressionResult_6.newParseExpressionSuccess(negatedExpression);
                }
                static isValid(tokens) {
                    return tokens.length == 1
                        && tokens.isLiteralToken(0)
                        || tokens.length == 2
                            && tokens.isOperatorToken(0, operatorType_3.OperatorType.Subtraction)
                            && tokens.isLiteralToken(1)
                            && numberLiteralToken_3.instanceOfNumberLiteralToken(tokens.literalToken(1));
                }
                getChildren() {
                    return [];
                }
                validate(context) {
                }
                deriveType(context) {
                    return this.literal.deriveType(context);
                }
            };
            exports_67("LiteralExpression", LiteralExpression);
        }
    };
});
System.register("language/variableTypes/validationContextExtensions", ["language/variableTypes/customVariableDeclarationType", "language/variableTypes/primitiveVariableDeclarationType", "language/variableTypes/enumType", "language/expressions/memberAccessExpression", "language/variableTypes/typeNames", "language/expressions/literalExpression"], function (exports_68, context_68) {
    "use strict";
    var customVariableDeclarationType_1, primitiveVariableDeclarationType_1, enumType_1, memberAccessExpression_1, typeNames_2, literalExpression_1;
    var __moduleName = context_68 && context_68.id;
    function validateCustomVariableType(context, reference, customVariableDeclarationType, defaultValueExpression) {
        let type = context.rootNodes.getType(customVariableDeclarationType.type);
        if (type == null || !enumType_1.instanceOfEnumType(type) && type.variableTypeName != "CustomType") {
            context.logger.fail(reference, `Unknown type: '${customVariableDeclarationType.type}'`);
            return;
        }
        if (defaultValueExpression == null)
            return;
        if (!(enumType_1.instanceOfEnumType(type))) {
            context.logger.fail(reference, `Invalid default value '${defaultValueExpression}'. Type: '${customVariableDeclarationType.type}' does not support a default value.`);
            return;
        }
        const memberAccessLiteralExpression = memberAccessExpression_1.asMemberAccessExpression(defaultValueExpression);
        if (memberAccessLiteralExpression == null) {
            context.logger.fail(reference, `Invalid default value '${defaultValueExpression}'. (type: '${customVariableDeclarationType.type}')`);
            return;
        }
        const variableReference = memberAccessLiteralExpression.variable;
        if (variableReference.parts != 2) {
            context.logger.fail(reference, `Invalid default value '${defaultValueExpression}'. (type: '${customVariableDeclarationType.type}')`);
        }
        if (variableReference.parentIdentifier != customVariableDeclarationType.type) {
            context.logger.fail(reference, `Invalid default value '${defaultValueExpression}'. Invalid enum type. (type: '${customVariableDeclarationType.type}')`);
        }
        const enumDeclaration = context.rootNodes.getEnum(variableReference.parentIdentifier);
        if (enumDeclaration == null || !enumDeclaration.containsMember(variableReference.path[1])) {
            context.logger.fail(reference, `Invalid default value '${defaultValueExpression}'. Invalid member. (type: '${customVariableDeclarationType.type}')`);
        }
    }
    function validatePrimitiveVariableType(context, reference, primitiveVariableDeclarationType, defaultValueExpression) {
        if (defaultValueExpression == null)
            return;
        switch (primitiveVariableDeclarationType.type) {
            case typeNames_2.TypeNames.number:
                validateDefaultLiteral("NumberLiteralToken", context, reference, primitiveVariableDeclarationType, defaultValueExpression);
                break;
            case typeNames_2.TypeNames.string:
                validateDefaultLiteral("QuotedLiteralToken", context, reference, primitiveVariableDeclarationType, defaultValueExpression);
                break;
            case typeNames_2.TypeNames.boolean:
                validateDefaultLiteral("BooleanLiteral", context, reference, primitiveVariableDeclarationType, defaultValueExpression);
                break;
            case typeNames_2.TypeNames.date:
                validateDefaultLiteral("DateTimeLiteral", context, reference, primitiveVariableDeclarationType, defaultValueExpression);
                break;
            default:
                throw new Error(`Unexpected type: ${primitiveVariableDeclarationType.type}`);
        }
    }
    function validateDefaultLiteral(literalType, context, reference, primitiveVariableDeclarationType, defaultValueExpression) {
        const literalExpression = literalExpression_1.asLiteralExpression(defaultValueExpression);
        if (literalExpression == null) {
            context.logger.fail(reference, `Invalid default value '${defaultValueExpression}'. (type: '${primitiveVariableDeclarationType.type}')`);
            return;
        }
        if (literalExpression.literal.tokenType != literalType) {
            context.logger.fail(reference, `Invalid default value '${defaultValueExpression}'. (type: '${primitiveVariableDeclarationType.type}')`);
        }
    }
    function validateTypeAndDefault(context, reference, type, defaultValueExpression) {
        const customVariableType = customVariableDeclarationType_1.asCustomVariableDeclarationType(type);
        if (customVariableType != null) {
            validateCustomVariableType(context, reference, customVariableType, defaultValueExpression);
            return;
        }
        const primitiveVariableType = primitiveVariableDeclarationType_1.asPrimitiveVariableDeclarationType(type);
        if (primitiveVariableType != null) {
            validatePrimitiveVariableType(context, reference, primitiveVariableType, defaultValueExpression);
            return;
        }
        throw new Error(`Invalid Type: ${type.nodeType}`);
    }
    exports_68("validateTypeAndDefault", validateTypeAndDefault);
    return {
        setters: [
            function (customVariableDeclarationType_1_1) {
                customVariableDeclarationType_1 = customVariableDeclarationType_1_1;
            },
            function (primitiveVariableDeclarationType_1_1) {
                primitiveVariableDeclarationType_1 = primitiveVariableDeclarationType_1_1;
            },
            function (enumType_1_1) {
                enumType_1 = enumType_1_1;
            },
            function (memberAccessExpression_1_1) {
                memberAccessExpression_1 = memberAccessExpression_1_1;
            },
            function (typeNames_2_1) {
                typeNames_2 = typeNames_2_1;
            },
            function (literalExpression_1_1) {
                literalExpression_1 = literalExpression_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("language/variableDefinition", ["language/node", "parser/tokens/operatorType", "parser/tokens/operatorToken", "language/variableTypes/validationContextExtensions", "language/variableTypes/variableDeclarationTypeParser", "language/nodeType"], function (exports_69, context_69) {
    "use strict";
    var node_6, operatorType_4, operatorToken_2, validationContextExtensions_1, variableDeclarationTypeParser_1, nodeType_13, VariableDefinition;
    var __moduleName = context_69 && context_69.id;
    return {
        setters: [
            function (node_6_1) {
                node_6 = node_6_1;
            },
            function (operatorType_4_1) {
                operatorType_4 = operatorType_4_1;
            },
            function (operatorToken_2_1) {
                operatorToken_2 = operatorToken_2_1;
            },
            function (validationContextExtensions_1_1) {
                validationContextExtensions_1 = validationContextExtensions_1_1;
            },
            function (variableDeclarationTypeParser_1_1) {
                variableDeclarationTypeParser_1 = variableDeclarationTypeParser_1_1;
            },
            function (nodeType_13_1) {
                nodeType_13 = nodeType_13_1;
            }
        ],
        execute: function () {
            VariableDefinition = class VariableDefinition extends node_6.Node {
                get variableType() {
                    return this.variableTypeValue;
                }
                constructor(name, type, source, reference, defaultExpression = null) {
                    super(reference);
                    this.hasNodeDependencies = true;
                    this.nodeType = nodeType_13.NodeType.VariableDefinition;
                    this.variableTypeValue = null;
                    this.type = type;
                    this.name = name;
                    this.defaultExpression = defaultExpression;
                    this.source = source;
                }
                getDependencies(rootNodeList) {
                    var _a;
                    const dependencies = (_a = this.variableType) === null || _a === void 0 ? void 0 : _a.getDependencies(rootNodeList);
                    return !!dependencies ? dependencies : [];
                }
                static parse(source, context) {
                    var _a;
                    let line = context.line;
                    let result = context.validateTokens("VariableDefinition")
                        .countMinimum(2)
                        .stringLiteral(0)
                        .stringLiteral(1)
                        .isValid;
                    if (!result)
                        return null;
                    let tokens = line.tokens;
                    let name = tokens.tokenValue(1);
                    let type = tokens.tokenValue(0);
                    if (name == null || type == null)
                        return null;
                    let variableType = variableDeclarationTypeParser_1.VariableDeclarationTypeParser.parse(type, line.tokenReference(0));
                    if (variableType == null)
                        return null;
                    if (tokens.length == 2)
                        return new VariableDefinition(name, variableType, source, line.lineStartReference());
                    if (((_a = tokens.token(2, operatorToken_2.asOperatorToken)) === null || _a === void 0 ? void 0 : _a.type) != operatorType_4.OperatorType.Assignment) {
                        context.logger.fail(line.tokenReference(2), `Invalid variable declaration token. Expected '='.`);
                        return null;
                    }
                    if (tokens.length != 4) {
                        context.logger.fail(line.lineEndReference(), `Invalid variable declaration. Expected literal token.`);
                        return null;
                    }
                    const defaultValue = context.expressionFactory.parse(tokens.tokensFrom(3), line);
                    if (defaultValue.state == "failed") {
                        context.logger.fail(line.tokenReference(3), defaultValue.errorMessage);
                        return null;
                    }
                    return new VariableDefinition(name, variableType, source, line.lineStartReference(), defaultValue.result);
                }
                getChildren() {
                    return this.defaultExpression != null ? [this.defaultExpression, this.type] : [this.type];
                }
                validate(context) {
                    this.variableTypeValue = this.type.createVariableType(context);
                    context.variableContext.registerVariableAndVerifyUnique(this.reference, this.name, this.variableTypeValue, this.source);
                    validationContextExtensions_1.validateTypeAndDefault(context, this.reference, this.type, this.defaultExpression);
                }
            };
            exports_69("VariableDefinition", VariableDefinition);
        }
    };
});
System.register("language/types/typeDefinition", ["language/rootNode", "language/types/typeName", "language/variableDefinition", "language/variableSource", "language/nodeType"], function (exports_70, context_70) {
    "use strict";
    var rootNode_2, typeName_1, variableDefinition_1, variableSource_2, nodeType_14, TypeDefinition;
    var __moduleName = context_70 && context_70.id;
    function instanceOfTypeDefinition(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_14.NodeType.TypeDefinition;
    }
    exports_70("instanceOfTypeDefinition", instanceOfTypeDefinition);
    function asTypeDefinition(object) {
        return instanceOfTypeDefinition(object) ? object : null;
    }
    exports_70("asTypeDefinition", asTypeDefinition);
    return {
        setters: [
            function (rootNode_2_1) {
                rootNode_2 = rootNode_2_1;
            },
            function (typeName_1_1) {
                typeName_1 = typeName_1_1;
            },
            function (variableDefinition_1_1) {
                variableDefinition_1 = variableDefinition_1_1;
            },
            function (variableSource_2_1) {
                variableSource_2 = variableSource_2_1;
            },
            function (nodeType_14_1) {
                nodeType_14 = nodeType_14_1;
            }
        ],
        execute: function () {
            TypeDefinition = class TypeDefinition extends rootNode_2.RootNode {
                get variables() {
                    return this.variablesValue;
                }
                get nodeName() {
                    return this.name.value;
                }
                constructor(name, reference) {
                    super(reference);
                    this.variablesValue = [];
                    this.nodeType = nodeType_14.NodeType.TypeDefinition;
                    this.name = new typeName_1.TypeName();
                    this.name.parseName(name);
                }
                static parse(name, reference) {
                    return new TypeDefinition(name, reference);
                }
                parse(context) {
                    let variableDefinition = variableDefinition_1.VariableDefinition.parse(variableSource_2.VariableSource.Parameters, context);
                    if (variableDefinition != null)
                        this.variablesValue.push(variableDefinition);
                    return this;
                }
                getChildren() {
                    return [...this.variables];
                }
                validate(context) {
                }
                validateTree(context) {
                    const scope = context.createVariableScope();
                    try {
                        super.validateTree(context);
                    }
                    finally {
                        scope[Symbol.dispose]();
                    }
                }
            };
            exports_70("TypeDefinition", TypeDefinition);
        }
    };
});
System.register("language/variableTypes/customType", ["language/variableTypes/typeWithMembers", "infrastructure/enumerableExtensions", "language/variableTypes/variableTypeName"], function (exports_71, context_71) {
    "use strict";
    var typeWithMembers_2, enumerableExtensions_6, variableTypeName_3, CustomType;
    var __moduleName = context_71 && context_71.id;
    function instanceOfCustomType(object) {
        return (object === null || object === void 0 ? void 0 : object.variableTypeName) == variableTypeName_3.VariableTypeName.CustomType;
    }
    exports_71("instanceOfCustomType", instanceOfCustomType);
    function asCustomType(object) {
        return instanceOfCustomType(object) ? object : null;
    }
    exports_71("asCustomType", asCustomType);
    return {
        setters: [
            function (typeWithMembers_2_1) {
                typeWithMembers_2 = typeWithMembers_2_1;
            },
            function (enumerableExtensions_6_1) {
                enumerableExtensions_6 = enumerableExtensions_6_1;
            },
            function (variableTypeName_3_1) {
                variableTypeName_3 = variableTypeName_3_1;
            }
        ],
        execute: function () {
            CustomType = class CustomType extends typeWithMembers_2.TypeWithMembers {
                constructor(type, typeDefinition) {
                    super();
                    this.variableTypeName = variableTypeName_3.VariableTypeName.CustomType;
                    this.type = type;
                    this.typeDefinition = typeDefinition;
                }
                equals(other) {
                    return other != null && instanceOfCustomType(other) && this.type == other.type;
                }
                toString() {
                    return this.type;
                }
                memberType(name, context) {
                    const definition = enumerableExtensions_6.firstOrDefault(this.typeDefinition.variables, variable => variable.name == name);
                    const variableType = definition === null || definition === void 0 ? void 0 : definition.type.createVariableType(context);
                    return variableType ? variableType : null;
                }
                getDependencies(rootNodeList) {
                    return [this.typeDefinition];
                }
            };
            exports_71("CustomType", CustomType);
        }
    };
});
System.register("language/variableTypes/complexTypeMember", [], function (exports_72, context_72) {
    "use strict";
    var ComplexTypeMember;
    var __moduleName = context_72 && context_72.id;
    return {
        setters: [],
        execute: function () {
            ComplexTypeMember = class ComplexTypeMember {
                constructor(name, type) {
                    this.name = name;
                    this.type = type;
                }
            };
            exports_72("ComplexTypeMember", ComplexTypeMember);
        }
    };
});
System.register("language/variableTypes/complexTypeSource", [], function (exports_73, context_73) {
    "use strict";
    var ComplexTypeSource;
    var __moduleName = context_73 && context_73.id;
    return {
        setters: [],
        execute: function () {
            (function (ComplexTypeSource) {
                ComplexTypeSource["FunctionParameters"] = "FunctionParameters";
                ComplexTypeSource["FunctionResults"] = "FunctionResults";
                ComplexTypeSource["TableRow"] = "TableRow";
            })(ComplexTypeSource || (exports_73("ComplexTypeSource", ComplexTypeSource = {})));
        }
    };
});
System.register("language/variableTypes/complexType", ["language/variableTypes/variableType", "language/variableTypes/variableTypeName"], function (exports_74, context_74) {
    "use strict";
    var variableType_3, variableTypeName_4, ComplexType;
    var __moduleName = context_74 && context_74.id;
    function instanceOfComplexType(object) {
        return object.variableTypeName == variableTypeName_4.VariableTypeName.ComplexType;
    }
    exports_74("instanceOfComplexType", instanceOfComplexType);
    function asComplexType(object) {
        return instanceOfComplexType(object) ? object : null;
    }
    exports_74("asComplexType", asComplexType);
    return {
        setters: [
            function (variableType_3_1) {
                variableType_3 = variableType_3_1;
            },
            function (variableTypeName_4_1) {
                variableTypeName_4 = variableTypeName_4_1;
            }
        ],
        execute: function () {
            ComplexType = class ComplexType extends variableType_3.VariableType {
                constructor(name, node, source, members) {
                    super();
                    this.variableTypeName = variableTypeName_4.VariableTypeName.ComplexType;
                    this.typeWithMember = true;
                    this.name = name;
                    this.node = node;
                    this.source = source;
                    this.members = members;
                }
                memberType(name, context) {
                    for (let index = 0; index < this.members.length; index++) {
                        const member = this.members[index];
                        if (member.name == name) {
                            return member.type;
                        }
                    }
                    return null;
                }
                equals(other) {
                    return other != null && instanceOfComplexType(other) && this.name == other.name && this.source == other.source;
                }
            };
            exports_74("ComplexType", ComplexType);
        }
    };
});
System.register("language/variableTypes/customVariableDeclarationType", ["language/variableTypes/variableDeclarationType", "language/nodeType", "language/variableTypes/variableTypeName", "language/variableTypes/customType", "language/variableTypes/complexType"], function (exports_75, context_75) {
    "use strict";
    var variableDeclarationType_3, nodeType_15, variableTypeName_5, customType_1, complexType_1, CustomVariableDeclarationType;
    var __moduleName = context_75 && context_75.id;
    function instanceOfCustomVariableDeclarationType(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_15.NodeType.CustomVariableDeclarationType;
    }
    exports_75("instanceOfCustomVariableDeclarationType", instanceOfCustomVariableDeclarationType);
    function asCustomVariableDeclarationType(object) {
        return instanceOfCustomVariableDeclarationType(object) ? object : null;
    }
    exports_75("asCustomVariableDeclarationType", asCustomVariableDeclarationType);
    return {
        setters: [
            function (variableDeclarationType_3_1) {
                variableDeclarationType_3 = variableDeclarationType_3_1;
            },
            function (nodeType_15_1) {
                nodeType_15 = nodeType_15_1;
            },
            function (variableTypeName_5_1) {
                variableTypeName_5 = variableTypeName_5_1;
            },
            function (customType_1_1) {
                customType_1 = customType_1_1;
            },
            function (complexType_1_1) {
                complexType_1 = complexType_1_1;
            }
        ],
        execute: function () {
            CustomVariableDeclarationType = class CustomVariableDeclarationType extends variableDeclarationType_3.VariableDeclarationType {
                constructor(type, reference) {
                    super(reference);
                    this.nodeType = nodeType_15.NodeType.CustomVariableDeclarationType;
                    this.hasNodeDependencies = true;
                    this.type = type;
                }
                equals(other) {
                    return this.type == other.type;
                }
                toString() {
                    return this.type;
                }
                getDependencies(rootNodeList) {
                    var _a;
                    switch ((_a = this.variableType) === null || _a === void 0 ? void 0 : _a.variableTypeName) {
                        case variableTypeName_5.VariableTypeName.CustomType: {
                            const customType = customType_1.asCustomType(this.variableType);
                            if (customType == null)
                                throw new Error("this.variableType is not CustomType");
                            return [customType.typeDefinition];
                        }
                        case variableTypeName_5.VariableTypeName.ComplexType: {
                            const complexType = complexType_1.asComplexType(this.variableType);
                            if (complexType == null)
                                throw new Error("this.variableType is not ComplexType");
                            return [complexType.node];
                        }
                        default: {
                            return [];
                        }
                    }
                }
                createVariableType(context) {
                    if (!this.type.includes(".")) {
                        return context.rootNodes.getType(this.type);
                    }
                    const parts = this.type.split(".");
                    if (parts.length > 2) {
                        context.logger.fail(this.reference, "Invalid type: '" + this.type + "'");
                        return null;
                    }
                    const parent = context.rootNodes.getType(parts[0]);
                    if (parent == null) {
                        context.logger.fail(this.reference, "Invalid type: '" + this.type + "'");
                        return null;
                    }
                    return parent.memberType(parts[1], context);
                }
                getChildren() {
                    return [];
                }
                validate(context) {
                    this.setVariableType(this.createVariableType(context));
                }
            };
            exports_75("CustomVariableDeclarationType", CustomVariableDeclarationType);
        }
    };
});
System.register("language/variableTypes/variableDeclarationTypeParser", ["parser/Keywords", "language/variableTypes/implicitVariableDeclaration", "language/variableTypes/typeNames", "language/variableTypes/primitiveVariableDeclarationType", "language/variableTypes/customVariableDeclarationType"], function (exports_76, context_76) {
    "use strict";
    var Keywords_6, implicitVariableDeclaration_1, typeNames_3, primitiveVariableDeclarationType_2, customVariableDeclarationType_2, VariableDeclarationTypeParser;
    var __moduleName = context_76 && context_76.id;
    return {
        setters: [
            function (Keywords_6_1) {
                Keywords_6 = Keywords_6_1;
            },
            function (implicitVariableDeclaration_1_1) {
                implicitVariableDeclaration_1 = implicitVariableDeclaration_1_1;
            },
            function (typeNames_3_1) {
                typeNames_3 = typeNames_3_1;
            },
            function (primitiveVariableDeclarationType_2_1) {
                primitiveVariableDeclarationType_2 = primitiveVariableDeclarationType_2_1;
            },
            function (customVariableDeclarationType_2_1) {
                customVariableDeclarationType_2 = customVariableDeclarationType_2_1;
            }
        ],
        execute: function () {
            VariableDeclarationTypeParser = class VariableDeclarationTypeParser {
                static parse(type, reference) {
                    if (type == Keywords_6.Keywords.ImplicitVariableDeclaration)
                        return new implicitVariableDeclaration_1.ImplicitVariableDeclaration(reference);
                    if (typeNames_3.TypeNames.contains(type))
                        return new primitiveVariableDeclarationType_2.PrimitiveVariableDeclarationType(type, reference);
                    return new customVariableDeclarationType_2.CustomVariableDeclarationType(type, reference);
                }
            };
            exports_76("VariableDeclarationTypeParser", VariableDeclarationTypeParser);
        }
    };
});
System.register("language/expressions/variableDeclarationExpression", ["language/expressions/expression", "language/expressions/parseExpressionResult", "parser/Keywords", "parser/tokens/stringLiteralToken", "parser/tokens/operatorType", "language/variableSource", "language/variableTypes/variableDeclarationTypeParser", "language/nodeType", "parser/tokens/memberAccessLiteral"], function (exports_77, context_77) {
    "use strict";
    var expression_7, parseExpressionResult_7, Keywords_7, stringLiteralToken_2, operatorType_5, variableSource_3, variableDeclarationTypeParser_2, nodeType_16, memberAccessLiteral_3, VariableDeclarationExpression;
    var __moduleName = context_77 && context_77.id;
    function asVariableDeclarationExpression(object) {
        return object.nodeType == nodeType_16.NodeType.VariableDeclarationExpression ? object : null;
    }
    exports_77("asVariableDeclarationExpression", asVariableDeclarationExpression);
    return {
        setters: [
            function (expression_7_1) {
                expression_7 = expression_7_1;
            },
            function (parseExpressionResult_7_1) {
                parseExpressionResult_7 = parseExpressionResult_7_1;
            },
            function (Keywords_7_1) {
                Keywords_7 = Keywords_7_1;
            },
            function (stringLiteralToken_2_1) {
                stringLiteralToken_2 = stringLiteralToken_2_1;
            },
            function (operatorType_5_1) {
                operatorType_5 = operatorType_5_1;
            },
            function (variableSource_3_1) {
                variableSource_3 = variableSource_3_1;
            },
            function (variableDeclarationTypeParser_2_1) {
                variableDeclarationTypeParser_2 = variableDeclarationTypeParser_2_1;
            },
            function (nodeType_16_1) {
                nodeType_16 = nodeType_16_1;
            },
            function (memberAccessLiteral_3_1) {
                memberAccessLiteral_3 = memberAccessLiteral_3_1;
            }
        ],
        execute: function () {
            VariableDeclarationExpression = class VariableDeclarationExpression extends expression_7.Expression {
                constructor(variableType, variableName, assignment, source, reference) {
                    super(source, reference);
                    this.nodeType = nodeType_16.NodeType.VariableDeclarationExpression;
                    this.type = variableType;
                    this.name = variableName;
                    this.assignment = assignment;
                }
                static parse(source, factory) {
                    var _a;
                    let tokens = source.tokens;
                    if (!VariableDeclarationExpression.isValid(tokens)) {
                        return parseExpressionResult_7.newParseExpressionFailed("VariableDeclarationExpression", `Invalid expression.`);
                    }
                    const typeName = tokens.tokenValue(0);
                    if (typeName == null) {
                        return parseExpressionResult_7.newParseExpressionFailed("VariableDeclarationExpression", `Invalid type name.`);
                    }
                    let type = variableDeclarationTypeParser_2.VariableDeclarationTypeParser.parse(typeName, source.createReference());
                    let name = tokens.tokenValue(1);
                    if (name == null) {
                        return parseExpressionResult_7.newParseExpressionFailed("VariableDeclarationExpression", `Invalid name.`);
                    }
                    let assignment = tokens.length > 3
                        ? factory.parse(tokens.tokensFrom(3), source.line)
                        : null;
                    if ((assignment === null || assignment === void 0 ? void 0 : assignment.state) == "failed")
                        return assignment;
                    let reference = source.createReference();
                    let expression = new VariableDeclarationExpression(type, name, (_a = assignment === null || assignment === void 0 ? void 0 : assignment.result) !== null && _a !== void 0 ? _a : null, source, reference);
                    return parseExpressionResult_7.newParseExpressionSuccess(expression);
                }
                static isValid(tokens) {
                    return tokens.length == 2
                        && tokens.isKeyword(0, Keywords_7.Keywords.ImplicitVariableDeclaration)
                        && tokens.isTokenType(1, stringLiteralToken_2.StringLiteralToken)
                        || tokens.length == 2
                            && tokens.isTokenType(0, stringLiteralToken_2.StringLiteralToken)
                            && tokens.isTokenType(1, stringLiteralToken_2.StringLiteralToken)
                        || tokens.length == 2
                            && tokens.isTokenType(0, memberAccessLiteral_3.MemberAccessLiteral)
                            && tokens.isTokenType(1, stringLiteralToken_2.StringLiteralToken)
                        || tokens.length >= 4
                            && tokens.isKeyword(0, Keywords_7.Keywords.ImplicitVariableDeclaration)
                            && tokens.isTokenType(1, stringLiteralToken_2.StringLiteralToken)
                            && tokens.isOperatorToken(2, operatorType_5.OperatorType.Assignment)
                        || tokens.length >= 4
                            && tokens.isTokenType(0, stringLiteralToken_2.StringLiteralToken)
                            && tokens.isTokenType(1, stringLiteralToken_2.StringLiteralToken)
                            && tokens.isOperatorToken(2, operatorType_5.OperatorType.Assignment);
                }
                getChildren() {
                    const result = [this.type];
                    if (this.assignment != null)
                        result.push(this.assignment);
                    return result;
                }
                validate(context) {
                    var _a, _b;
                    let assignmentType = (_a = this.assignment) === null || _a === void 0 ? void 0 : _a.deriveType(context);
                    if (this.assignment != null && assignmentType == null) {
                        context.logger.fail(this.reference, `Invalid expression. Could not derive type.`);
                    }
                    let variableType = this.getVariableType(context, assignmentType !== null && assignmentType !== void 0 ? assignmentType : null);
                    if (variableType == null) {
                        context.logger.fail(this.reference, `Invalid variable type '${this.type}'`);
                    }
                    (_b = context.variableContext) === null || _b === void 0 ? void 0 : _b.registerVariableAndVerifyUnique(this.reference, this.name, variableType, variableSource_3.VariableSource.Code);
                }
                getVariableType(context, assignmentType) {
                    if (this.type.nodeType == nodeType_16.NodeType.ImplicitVariableDeclaration && assignmentType != null) {
                        const implicitVariableType = this.type;
                        implicitVariableType.define(assignmentType);
                        return assignmentType;
                    }
                    let variableType = this.type.createVariableType(context);
                    if (this.assignment != null && !(assignmentType === null || assignmentType === void 0 ? void 0 : assignmentType.equals(variableType))) {
                        context.logger.fail(this.reference, `Invalid expression. Literal or enum value expression expected.`);
                    }
                    return variableType;
                }
                deriveType(context) {
                    return null;
                }
            };
            exports_77("VariableDeclarationExpression", VariableDeclarationExpression);
        }
    };
});
System.register("language/expressions/identifierExpression", ["language/expressions/expression", "language/expressions/parseExpressionResult", "parser/tokens/stringLiteralToken", "language/nodeType", "infrastructure/assert"], function (exports_78, context_78) {
    "use strict";
    var expression_8, parseExpressionResult_8, stringLiteralToken_3, nodeType_17, assert_3, IdentifierExpression;
    var __moduleName = context_78 && context_78.id;
    function asIdentifierExpression(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_17.NodeType.IdentifierExpression ? object : null;
    }
    exports_78("asIdentifierExpression", asIdentifierExpression);
    return {
        setters: [
            function (expression_8_1) {
                expression_8 = expression_8_1;
            },
            function (parseExpressionResult_8_1) {
                parseExpressionResult_8 = parseExpressionResult_8_1;
            },
            function (stringLiteralToken_3_1) {
                stringLiteralToken_3 = stringLiteralToken_3_1;
            },
            function (nodeType_17_1) {
                nodeType_17 = nodeType_17_1;
            },
            function (assert_3_1) {
                assert_3 = assert_3_1;
            }
        ],
        execute: function () {
            IdentifierExpression = class IdentifierExpression extends expression_8.Expression {
                get variableSource() {
                    return assert_3.Assert.notNull(this.variableSourceValue, "variableSource");
                }
                constructor(identifier, source, reference) {
                    super(source, reference);
                    this.variableSourceValue = null;
                    this.nodeType = nodeType_17.NodeType.IdentifierExpression;
                    this.identifier = identifier;
                }
                static parse(source, factory) {
                    let tokens = source.tokens;
                    if (!IdentifierExpression.isValid(tokens))
                        return parseExpressionResult_8.newParseExpressionFailed("IdentifierExpression", `Invalid expression`);
                    let variableName = tokens.tokenValue(0);
                    if (!variableName)
                        return parseExpressionResult_8.newParseExpressionFailed("IdentifierExpression", `Invalid token`);
                    let reference = source.createReference();
                    let expression = new IdentifierExpression(variableName, source, reference);
                    return parseExpressionResult_8.newParseExpressionSuccess(expression);
                }
                static isValid(tokens) {
                    return tokens.length == 1
                        && tokens.isTokenType(0, stringLiteralToken_3.StringLiteralToken);
                }
                getChildren() {
                    return [];
                }
                validate(context) {
                    if (!context.variableContext.ensureVariableExists(this.reference, this.identifier))
                        return;
                    let variableSource = context.variableContext.getVariableSource(this.identifier);
                    if (variableSource == null) {
                        context.logger.fail(this.reference, `Can't define source of variable: ${this.identifier}`);
                        return;
                    }
                    this.variableSourceValue = variableSource;
                }
                deriveType(context) {
                    return context.variableContext.getVariableTypeByName(this.identifier);
                }
            };
            exports_78("IdentifierExpression", IdentifierExpression);
        }
    };
});
System.register("language/expressions/assignmentExpression", ["language/expressions/expression", "language/expressions/parseExpressionResult", "parser/tokens/operatorType", "parser/tokens/stringLiteralToken", "parser/tokens/memberAccessLiteral", "language/variableTypes/ITypeWithMembers", "language/nodeType"], function (exports_79, context_79) {
    "use strict";
    var expression_9, parseExpressionResult_9, operatorType_6, stringLiteralToken_4, memberAccessLiteral_4, ITypeWithMembers_3, nodeType_18, AssignmentExpression;
    var __moduleName = context_79 && context_79.id;
    function instanceOfAssignmentExpression(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_18.NodeType.AssignmentExpression;
    }
    exports_79("instanceOfAssignmentExpression", instanceOfAssignmentExpression);
    function asAssignmentExpression(object) {
        return instanceOfAssignmentExpression(object) ? object : null;
    }
    exports_79("asAssignmentExpression", asAssignmentExpression);
    return {
        setters: [
            function (expression_9_1) {
                expression_9 = expression_9_1;
            },
            function (parseExpressionResult_9_1) {
                parseExpressionResult_9 = parseExpressionResult_9_1;
            },
            function (operatorType_6_1) {
                operatorType_6 = operatorType_6_1;
            },
            function (stringLiteralToken_4_1) {
                stringLiteralToken_4 = stringLiteralToken_4_1;
            },
            function (memberAccessLiteral_4_1) {
                memberAccessLiteral_4 = memberAccessLiteral_4_1;
            },
            function (ITypeWithMembers_3_1) {
                ITypeWithMembers_3 = ITypeWithMembers_3_1;
            },
            function (nodeType_18_1) {
                nodeType_18 = nodeType_18_1;
            }
        ],
        execute: function () {
            AssignmentExpression = class AssignmentExpression extends expression_9.Expression {
                constructor(variable, assignment, source, reference) {
                    super(source, reference);
                    this.nodeType = nodeType_18.NodeType.AssignmentExpression;
                    this.variable = variable;
                    this.assignment = assignment;
                }
                static parse(source, factory) {
                    let tokens = source.tokens;
                    if (!AssignmentExpression.isValid(tokens))
                        return parseExpressionResult_9.newParseExpressionFailed("AssignmentExpression", `Invalid expression.`);
                    let variableExpression = factory.parse(tokens.tokensFromStart(1), source.line);
                    if (variableExpression.state != 'success')
                        return variableExpression;
                    let assignment = factory.parse(tokens.tokensFrom(2), source.line);
                    if (assignment.state != 'success')
                        return assignment;
                    let reference = source.createReference();
                    let expression = new AssignmentExpression(variableExpression.result, assignment.result, source, reference);
                    return parseExpressionResult_9.newParseExpressionSuccess(expression);
                }
                static isValid(tokens) {
                    return tokens.length >= 3
                        && (tokens.isTokenType(0, stringLiteralToken_4.StringLiteralToken)
                            || tokens.isTokenType(0, memberAccessLiteral_4.MemberAccessLiteral))
                        && tokens.isOperatorToken(1, operatorType_6.OperatorType.Assignment);
                }
                getChildren() {
                    return [
                        this.assignment,
                        this.variable
                    ];
                }
                validate(context) {
                    var _a;
                    if (this.variable.nodeType != nodeType_18.NodeType.IdentifierExpression) {
                        this.validateMemberAccess(context);
                        return;
                    }
                    const identifierExpression = this.variable;
                    let variableName = identifierExpression.identifier;
                    let variableType = (_a = context.variableContext) === null || _a === void 0 ? void 0 : _a.getVariableTypeByName(variableName);
                    if (variableType == null) {
                        context.logger.fail(this.reference, `Unknown variable name: '${variableName}'.`);
                        return;
                    }
                    let expressionType = this.assignment.deriveType(context);
                    if (expressionType != null && !(variableType === null || variableType === void 0 ? void 0 : variableType.equals(expressionType))) {
                        context.logger.fail(this.reference, `Variable '${variableName}' of type '${variableType}' is not assignable from expression of type '${expressionType}'.`);
                    }
                }
                validateMemberAccess(context) {
                    var _a;
                    if (this.variable.nodeType != "MemberAccessExpression") {
                        return;
                    }
                    const memberAccessExpression = this.variable;
                    let assignmentType = this.assignment.deriveType(context);
                    let variableType = (_a = context.variableContext) === null || _a === void 0 ? void 0 : _a.getVariableTypeByReference(memberAccessExpression.variable, context);
                    if (variableType != null) {
                        if (assignmentType == null || !assignmentType.equals(variableType))
                            context.logger.fail(this.reference, `Variable '${memberAccessExpression.variable}' of type '${variableType}' is not assignable from expression of type '${assignmentType}'.`);
                        return;
                    }
                    let literal = memberAccessExpression.memberAccessLiteral;
                    let parentType = context.rootNodes.getType(literal.parent);
                    const typeWithMembers = ITypeWithMembers_3.asTypeWithMembers(parentType);
                    if (typeWithMembers == null) {
                        context.logger.fail(this.reference, `Type '${literal.parent}' has no members.`);
                        return;
                    }
                    let memberType = typeWithMembers.memberType(literal.member, context);
                    if (assignmentType == null || !assignmentType.equals(memberType))
                        context.logger.fail(this.reference, `Variable '${literal}' of type '${memberType}' is not assignable from expression of type '${assignmentType}'.`);
                }
                deriveType(context) {
                    return this.assignment.deriveType(context);
                }
            };
            exports_79("AssignmentExpression", AssignmentExpression);
        }
    };
});
System.register("language/expressions/parenthesizedExpression", ["language/expressions/expression", "parser/tokens/operatorType", "language/expressions/parseExpressionResult", "language/nodeType"], function (exports_80, context_80) {
    "use strict";
    var expression_10, operatorType_7, parseExpressionResult_10, nodeType_19, ParenthesizedExpression;
    var __moduleName = context_80 && context_80.id;
    function instanceOfParenthesizedExpression(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_19.NodeType.ParenthesizedExpression;
    }
    exports_80("instanceOfParenthesizedExpression", instanceOfParenthesizedExpression);
    function asParenthesizedExpression(object) {
        return instanceOfParenthesizedExpression(object) ? object : null;
    }
    exports_80("asParenthesizedExpression", asParenthesizedExpression);
    return {
        setters: [
            function (expression_10_1) {
                expression_10 = expression_10_1;
            },
            function (operatorType_7_1) {
                operatorType_7 = operatorType_7_1;
            },
            function (parseExpressionResult_10_1) {
                parseExpressionResult_10 = parseExpressionResult_10_1;
            },
            function (nodeType_19_1) {
                nodeType_19 = nodeType_19_1;
            }
        ],
        execute: function () {
            ParenthesizedExpression = class ParenthesizedExpression extends expression_10.Expression {
                constructor(expression, source, reference) {
                    super(source, reference);
                    this.nodeType = nodeType_19.NodeType.ParenthesizedExpression;
                    this.expression = expression;
                }
                static parse(source, factory) {
                    let tokens = source.tokens;
                    if (!ParenthesizedExpression.isValid(tokens))
                        return parseExpressionResult_10.newParseExpressionFailed("ParenthesizedExpression", `Not valid.`);
                    let matchingClosingParenthesis = ParenthesizedExpression.findMatchingClosingParenthesis(tokens);
                    if (matchingClosingParenthesis == -1)
                        return parseExpressionResult_10.newParseExpressionFailed("ParenthesizedExpression", `No closing parentheses found.`);
                    let innerExpressionTokens = tokens.tokensRange(1, matchingClosingParenthesis - 1);
                    let innerExpression = factory.parse(innerExpressionTokens, source.line);
                    if (innerExpression.state != 'success')
                        return innerExpression;
                    let reference = source.createReference();
                    let expression = new ParenthesizedExpression(innerExpression.result, source, reference);
                    return parseExpressionResult_10.newParseExpressionSuccess(expression);
                }
                static findMatchingClosingParenthesis(tokens) {
                    let count = 0;
                    for (let index = 0; index < tokens.length; index++) {
                        let token = tokens.get(index);
                        if (token.tokenType != "OperatorToken")
                            continue;
                        const operatorToken = token;
                        if (operatorToken.type == operatorType_7.OperatorType.OpenParentheses) {
                            count++;
                        }
                        else if (operatorToken.type == operatorType_7.OperatorType.CloseParentheses) {
                            count--;
                            if (count == 0)
                                return index;
                        }
                    }
                    return -1;
                }
                static isValid(tokens) {
                    return tokens.isOperatorToken(0, operatorType_7.OperatorType.OpenParentheses);
                }
                getChildren() {
                    return [this.expression];
                }
                validate(context) {
                }
                deriveType(context) {
                    return this.expression.deriveType(context);
                }
            };
            exports_80("ParenthesizedExpression", ParenthesizedExpression);
        }
    };
});
System.register("language/expressions/bracketedExpression", ["language/expressions/expression", "language/expressions/parseExpressionResult", "parser/tokens/stringLiteralToken", "parser/tokens/operatorType", "language/nodeType"], function (exports_81, context_81) {
    "use strict";
    var expression_11, parseExpressionResult_11, stringLiteralToken_5, operatorType_8, nodeType_20, BracketedExpression;
    var __moduleName = context_81 && context_81.id;
    function instanceOfBracketedExpression(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_20.NodeType.BracketedExpression;
    }
    exports_81("instanceOfBracketedExpression", instanceOfBracketedExpression);
    function asBracketedExpression(object) {
        return instanceOfBracketedExpression(object) ? object : null;
    }
    exports_81("asBracketedExpression", asBracketedExpression);
    return {
        setters: [
            function (expression_11_1) {
                expression_11 = expression_11_1;
            },
            function (parseExpressionResult_11_1) {
                parseExpressionResult_11 = parseExpressionResult_11_1;
            },
            function (stringLiteralToken_5_1) {
                stringLiteralToken_5 = stringLiteralToken_5_1;
            },
            function (operatorType_8_1) {
                operatorType_8 = operatorType_8_1;
            },
            function (nodeType_20_1) {
                nodeType_20 = nodeType_20_1;
            }
        ],
        execute: function () {
            BracketedExpression = class BracketedExpression extends expression_11.Expression {
                constructor(functionName, expression, source, reference) {
                    super(source, reference);
                    this.nodeType = nodeType_20.NodeType.BracketedExpression;
                    this.functionName = functionName;
                    this.expression = expression;
                }
                static parse(source, factory) {
                    let tokens = source.tokens;
                    if (!BracketedExpression.isValid(tokens))
                        return parseExpressionResult_11.newParseExpressionFailed("BracketedExpression", `Not valid.`);
                    let matchingClosingParenthesis = BracketedExpression.findMatchingClosingBracket(tokens);
                    if (matchingClosingParenthesis == -1)
                        return parseExpressionResult_11.newParseExpressionFailed("BracketedExpression", `No closing bracket found.`);
                    let functionName = tokens.tokenValue(0);
                    if (functionName == null)
                        return parseExpressionResult_11.newParseExpressionFailed("BracketedExpression", `Invalid function name.`);
                    let innerExpressionTokens = tokens.tokensRange(2, matchingClosingParenthesis - 1);
                    let innerExpression = factory.parse(innerExpressionTokens, source.line);
                    if (innerExpression.state != 'success')
                        return innerExpression;
                    let reference = source.createReference();
                    let expression = new BracketedExpression(functionName, innerExpression.result, source, reference);
                    return parseExpressionResult_11.newParseExpressionSuccess(expression);
                }
                static isValid(tokens) {
                    return tokens.length > 1
                        && tokens.isTokenType(0, stringLiteralToken_5.StringLiteralToken)
                        && tokens.isOperatorToken(1, operatorType_8.OperatorType.OpenBrackets);
                }
                static findMatchingClosingBracket(tokens) {
                    let count = 0;
                    for (let index = 0; index < tokens.length; index++) {
                        let token = tokens.get(index);
                        if (token.tokenType != "OperatorToken")
                            continue;
                        const operatorToken = token;
                        if (operatorToken.type == operatorType_8.OperatorType.OpenBrackets) {
                            count++;
                        }
                        else if (operatorToken.type == operatorType_8.OperatorType.CloseBrackets) {
                            count--;
                            if (count == 0)
                                return index;
                        }
                    }
                    return -1;
                }
                getChildren() {
                    return [this.expression];
                }
                validate(context) {
                }
                deriveType(context) {
                    return this.expression.deriveType(context);
                }
            };
            exports_81("BracketedExpression", BracketedExpression);
        }
    };
});
System.register("language/expressions/expressionOperator", [], function (exports_82, context_82) {
    "use strict";
    var ExpressionOperator;
    var __moduleName = context_82 && context_82.id;
    return {
        setters: [],
        execute: function () {
            (function (ExpressionOperator) {
                ExpressionOperator["Addition"] = "Addition";
                ExpressionOperator["Subtraction"] = "Subtraction";
                ExpressionOperator["Multiplication"] = "Multiplication";
                ExpressionOperator["Division"] = "Division";
                ExpressionOperator["Modulus"] = "Modulus";
                ExpressionOperator["GreaterThan"] = "GreaterThan";
                ExpressionOperator["GreaterThanOrEqual"] = "GreaterThanOrEqual";
                ExpressionOperator["LessThan"] = "LessThan";
                ExpressionOperator["LessThanOrEqual"] = "LessThanOrEqual";
                ExpressionOperator["And"] = "And";
                ExpressionOperator["Or"] = "Or";
                ExpressionOperator["Equals"] = "Equals";
                ExpressionOperator["NotEqual"] = "NotEqual";
            })(ExpressionOperator || (exports_82("ExpressionOperator", ExpressionOperator = {})));
        }
    };
});
System.register("language/expressions/binaryExpression", ["language/expressions/expression", "parser/tokens/operatorType", "language/expressions/expressionOperator", "language/expressions/parseExpressionResult", "language/nodeType"], function (exports_83, context_83) {
    "use strict";
    var expression_12, operatorType_9, expressionOperator_1, parseExpressionResult_12, nodeType_21, OperatorEntry, TokenIndex, BinaryExpression;
    var __moduleName = context_83 && context_83.id;
    function instanceOfBinaryExpression(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_21.NodeType.BinaryExpression;
    }
    exports_83("instanceOfBinaryExpression", instanceOfBinaryExpression);
    function asBinaryExpression(object) {
        return instanceOfBinaryExpression(object) ? object : null;
    }
    exports_83("asBinaryExpression", asBinaryExpression);
    return {
        setters: [
            function (expression_12_1) {
                expression_12 = expression_12_1;
            },
            function (operatorType_9_1) {
                operatorType_9 = operatorType_9_1;
            },
            function (expressionOperator_1_1) {
                expressionOperator_1 = expressionOperator_1_1;
            },
            function (parseExpressionResult_12_1) {
                parseExpressionResult_12 = parseExpressionResult_12_1;
            },
            function (nodeType_21_1) {
                nodeType_21 = nodeType_21_1;
            }
        ],
        execute: function () {
            OperatorEntry = class OperatorEntry {
                constructor(operatorType, expressionOperator) {
                    this.operatorType = operatorType;
                    this.expressionOperator = expressionOperator;
                }
            };
            TokenIndex = class TokenIndex {
                constructor(index, operatorType, expressionOperator) {
                    this.index = index;
                    this.operatorType = operatorType;
                    this.expressionOperator = expressionOperator;
                }
            };
            BinaryExpression = class BinaryExpression extends expression_12.Expression {
                constructor(left, right, operatorValue, source, reference) {
                    super(source, reference);
                    this.nodeType = nodeType_21.NodeType.BinaryExpression;
                    this.left = left;
                    this.right = right;
                    this.operator = operatorValue;
                }
                static parse(source, factory) {
                    let tokens = source.tokens;
                    let supportedTokens = BinaryExpression.getCurrentLevelSupportedTokens(tokens);
                    let lowestPriorityOperation = BinaryExpression.getLowestPriorityOperation(supportedTokens);
                    if (lowestPriorityOperation == null)
                        return parseExpressionResult_12.newParseExpressionFailed("BinaryExpression", `No valid Operator token found.`);
                    let leftTokens = tokens.tokensRange(0, lowestPriorityOperation.index - 1);
                    if (leftTokens.length == 0) {
                        return parseExpressionResult_12.newParseExpressionFailed("BinaryExpression", `No tokens left from: ${lowestPriorityOperation.index} (${tokens})`);
                    }
                    let rightTokens = tokens.tokensFrom(lowestPriorityOperation.index + 1);
                    if (rightTokens.length == 0) {
                        return parseExpressionResult_12.newParseExpressionFailed("BinaryExpression", `No tokens right from: ${lowestPriorityOperation.index} (${tokens})`);
                    }
                    let left = factory.parse(leftTokens, source.line);
                    if (left.state != 'success')
                        return left;
                    let right = factory.parse(rightTokens, source.line);
                    if (right.state != 'success')
                        return right;
                    let operatorValue = lowestPriorityOperation.expressionOperator;
                    let reference = source.createReference(lowestPriorityOperation.index);
                    let binaryExpression = new BinaryExpression(left.result, right.result, operatorValue, source, reference);
                    return parseExpressionResult_12.newParseExpressionSuccess(binaryExpression);
                }
                static getLowestPriorityOperation(supportedTokens) {
                    for (let index = BinaryExpression.SupportedOperatorsByPriority.length - 1; index >= 0; index--) {
                        const supportedOperator = BinaryExpression.SupportedOperatorsByPriority[index];
                        for (let indexValues = 0; indexValues < supportedTokens.length; indexValues++) {
                            const supportedToken = supportedTokens[indexValues];
                            if (supportedOperator.operatorType == supportedToken.operatorType) {
                                return supportedToken;
                            }
                        }
                    }
                    return null;
                }
                static isValid(tokens) {
                    let supportedTokens = BinaryExpression.getCurrentLevelSupportedTokens(tokens);
                    return supportedTokens.length > 0;
                }
                static getCurrentLevelSupportedTokens(tokens) {
                    let result = new Array();
                    let countParentheses = 0;
                    let countBrackets = 0;
                    for (let index = 0; index < tokens.length; index++) {
                        let token = tokens.get(index);
                        if (token.tokenType != "OperatorToken")
                            continue;
                        const operatorToken = token;
                        switch (operatorToken.type) {
                            case operatorType_9.OperatorType.OpenParentheses:
                                countParentheses++;
                                break;
                            case operatorType_9.OperatorType.CloseParentheses:
                                countParentheses--;
                                break;
                            case operatorType_9.OperatorType.OpenBrackets:
                                countBrackets++;
                                break;
                            case operatorType_9.OperatorType.CloseBrackets:
                                countBrackets--;
                                break;
                        }
                        if (countBrackets != 0 || countParentheses != 0)
                            continue;
                        let supported = this.isSupported(operatorToken.type);
                        if (supported != null) {
                            result.push(new TokenIndex(index, operatorToken.type, supported.expressionOperator));
                        }
                    }
                    return result;
                }
                static isSupported(operatorTokenType) {
                    for (let index = BinaryExpression.SupportedOperatorsByPriority.length - 1; index >= 0; index--) {
                        const supportedOperator = BinaryExpression.SupportedOperatorsByPriority[index];
                        if (supportedOperator.operatorType == operatorTokenType) {
                            return supportedOperator;
                        }
                    }
                    return null;
                }
                getChildren() {
                    return [
                        this.left,
                        this.right
                    ];
                }
                validate(context) {
                    let left = this.left.deriveType(context);
                    let right = this.right.deriveType(context);
                    if (!(left === null || left === void 0 ? void 0 : left.equals(right)))
                        context.logger.fail(this.reference, `Invalid expression type. Left expression: '${left}'. Right expression '${right}.`);
                }
                deriveType(context) {
                    let left = this.left.deriveType(context);
                    let right = this.right.deriveType(context);
                    return (left === null || left === void 0 ? void 0 : left.equals(right)) ? left : null;
                }
            };
            exports_83("BinaryExpression", BinaryExpression);
            BinaryExpression.SupportedOperatorsByPriority = [
                new OperatorEntry(operatorType_9.OperatorType.Multiplication, expressionOperator_1.ExpressionOperator.Multiplication),
                new OperatorEntry(operatorType_9.OperatorType.Division, expressionOperator_1.ExpressionOperator.Division),
                new OperatorEntry(operatorType_9.OperatorType.Modulus, expressionOperator_1.ExpressionOperator.Modulus),
                new OperatorEntry(operatorType_9.OperatorType.Addition, expressionOperator_1.ExpressionOperator.Addition),
                new OperatorEntry(operatorType_9.OperatorType.Subtraction, expressionOperator_1.ExpressionOperator.Subtraction),
                new OperatorEntry(operatorType_9.OperatorType.GreaterThan, expressionOperator_1.ExpressionOperator.GreaterThan),
                new OperatorEntry(operatorType_9.OperatorType.GreaterThanOrEqual, expressionOperator_1.ExpressionOperator.GreaterThanOrEqual),
                new OperatorEntry(operatorType_9.OperatorType.LessThan, expressionOperator_1.ExpressionOperator.LessThan),
                new OperatorEntry(operatorType_9.OperatorType.LessThanOrEqual, expressionOperator_1.ExpressionOperator.LessThanOrEqual),
                new OperatorEntry(operatorType_9.OperatorType.Equals, expressionOperator_1.ExpressionOperator.Equals),
                new OperatorEntry(operatorType_9.OperatorType.NotEqual, expressionOperator_1.ExpressionOperator.NotEqual),
                new OperatorEntry(operatorType_9.OperatorType.And, expressionOperator_1.ExpressionOperator.And),
                new OperatorEntry(operatorType_9.OperatorType.Or, expressionOperator_1.ExpressionOperator.Or)
            ];
        }
    };
});
System.register("language/expressions/functions/expressionFunction", ["language/node"], function (exports_84, context_84) {
    "use strict";
    var node_7, ExpressionFunction;
    var __moduleName = context_84 && context_84.id;
    return {
        setters: [
            function (node_7_1) {
                node_7 = node_7_1;
            }
        ],
        execute: function () {
            ExpressionFunction = class ExpressionFunction extends node_7.Node {
                constructor(reference) {
                    super(reference);
                }
                equals(other) {
                    return other != null && this.nodeType == other.nodeType;
                }
            };
            exports_84("ExpressionFunction", ExpressionFunction);
        }
    };
});
System.register("language/expressions/argumentTokenParseResult", [], function (exports_85, context_85) {
    "use strict";
    var __moduleName = context_85 && context_85.id;
    function newArgumentTokenParseFailed(errorMessage) {
        return {
            state: "failed",
            errorMessage: errorMessage,
        };
    }
    exports_85("newArgumentTokenParseFailed", newArgumentTokenParseFailed);
    function newArgumentTokenParseSuccess(result) {
        return {
            state: "success",
            result: result
        };
    }
    exports_85("newArgumentTokenParseSuccess", newArgumentTokenParseSuccess);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("language/expressions/argumentList", ["parser/tokens/tokenList", "language/expressions/argumentTokenParseResult", "parser/tokens/operatorType"], function (exports_86, context_86) {
    "use strict";
    var tokenList_2, argumentTokenParseResult_1, operatorType_10, ArgumentList;
    var __moduleName = context_86 && context_86.id;
    return {
        setters: [
            function (tokenList_2_1) {
                tokenList_2 = tokenList_2_1;
            },
            function (argumentTokenParseResult_1_1) {
                argumentTokenParseResult_1 = argumentTokenParseResult_1_1;
            },
            function (operatorType_10_1) {
                operatorType_10 = operatorType_10_1;
            }
        ],
        execute: function () {
            ArgumentList = class ArgumentList {
                static parse(tokens) {
                    if (tokens.length == 0)
                        return argumentTokenParseResult_1.newArgumentTokenParseSuccess(new Array());
                    let result = new Array();
                    let argumentTokens = new Array();
                    let countParentheses = 0;
                    let countBrackets = 0;
                    for (let index = 0; index < tokens.length; index++) {
                        const token = tokens.get(index);
                        if (token.tokenType == "OperatorToken") {
                            const operatorToken = token;
                            switch (operatorToken.type) {
                                case operatorType_10.OperatorType.OpenParentheses:
                                    countParentheses++;
                                    break;
                                case operatorType_10.OperatorType.CloseParentheses:
                                    countParentheses--;
                                    break;
                                case operatorType_10.OperatorType.OpenBrackets:
                                    countBrackets++;
                                    break;
                                case operatorType_10.OperatorType.CloseBrackets:
                                    countBrackets--;
                                    break;
                            }
                            if (countParentheses == 0 && countBrackets == 0 && operatorToken.type == operatorType_10.OperatorType.ArgumentSeparator) {
                                if (argumentTokens.length == 0) {
                                    return argumentTokenParseResult_1.newArgumentTokenParseFailed(`Invalid token ','. No tokens before comma.`);
                                }
                                result.push(new tokenList_2.TokenList(argumentTokens));
                                argumentTokens = new Array();
                            }
                            else {
                                argumentTokens.push(token);
                            }
                        }
                        else {
                            argumentTokens.push(token);
                        }
                    }
                    if (argumentTokens.length == 0) {
                        return argumentTokenParseResult_1.newArgumentTokenParseFailed(`Invalid token ','. No tokens before comma.`);
                    }
                    result.push(new tokenList_2.TokenList(argumentTokens));
                    return argumentTokenParseResult_1.newArgumentTokenParseSuccess(result);
                }
            };
            exports_86("ArgumentList", ArgumentList);
        }
    };
});
System.register("language/expressions/parseExpressionFunctionsResult", [], function (exports_87, context_87) {
    "use strict";
    var __moduleName = context_87 && context_87.id;
    function newParseExpressionFunctionsFailed(errorMessage) {
        return {
            state: "failed",
            errorMessage: errorMessage,
        };
    }
    exports_87("newParseExpressionFunctionsFailed", newParseExpressionFunctionsFailed);
    function newParseExpressionFunctionsSuccess(result) {
        return {
            state: "success",
            result: result
        };
    }
    exports_87("newParseExpressionFunctionsSuccess", newParseExpressionFunctionsSuccess);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("language/expressions/functions/singleArgumentFunction", ["language/expressions/functions/expressionFunction"], function (exports_88, context_88) {
    "use strict";
    var expressionFunction_1, SingleArgumentFunction;
    var __moduleName = context_88 && context_88.id;
    return {
        setters: [
            function (expressionFunction_1_1) {
                expressionFunction_1 = expressionFunction_1_1;
            }
        ],
        execute: function () {
            SingleArgumentFunction = class SingleArgumentFunction extends expressionFunction_1.ExpressionFunction {
                constructor(valueExpression, reference, argumentType, resultType) {
                    super(reference);
                    this.valueExpression = valueExpression;
                    this.argumentType = argumentType;
                    this.resultType = resultType;
                }
                getChildren() {
                    return [this.valueExpression];
                }
                validate(context) {
                    context.validateType(this.valueExpression, 1, `Value`, this.argumentType, this.reference, this.functionHelp);
                }
                deriveReturnType(context) {
                    return this.resultType;
                }
            };
            exports_88("SingleArgumentFunction", SingleArgumentFunction);
        }
    };
});
System.register("language/expressions/functions/intFunction", ["language/expressions/functions/singleArgumentFunction", "language/variableTypes/primitiveType", "language/nodeType"], function (exports_89, context_89) {
    "use strict";
    var singleArgumentFunction_1, primitiveType_7, nodeType_22, IntFunction;
    var __moduleName = context_89 && context_89.id;
    function instanceOfIntFunction(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_22.NodeType.IntFunction;
    }
    exports_89("instanceOfIntFunction", instanceOfIntFunction);
    function asIntFunction(object) {
        return instanceOfIntFunction(object) ? object : null;
    }
    exports_89("asIntFunction", asIntFunction);
    return {
        setters: [
            function (singleArgumentFunction_1_1) {
                singleArgumentFunction_1 = singleArgumentFunction_1_1;
            },
            function (primitiveType_7_1) {
                primitiveType_7 = primitiveType_7_1;
            },
            function (nodeType_22_1) {
                nodeType_22 = nodeType_22_1;
            }
        ],
        execute: function () {
            IntFunction = class IntFunction extends singleArgumentFunction_1.SingleArgumentFunction {
                get functionHelp() {
                    return `${IntFunction.functionName} expects 1 argument (Value)`;
                }
                constructor(valueExpression, reference) {
                    super(valueExpression, reference, primitiveType_7.PrimitiveType.number, primitiveType_7.PrimitiveType.number);
                    this.nodeType = nodeType_22.NodeType.IntFunction;
                }
                static create(reference, expression) {
                    return new IntFunction(expression, reference);
                }
            };
            exports_89("IntFunction", IntFunction);
            IntFunction.functionName = `INT`;
        }
    };
});
System.register("language/expressions/functions/absFunction", ["language/expressions/functions/singleArgumentFunction", "language/variableTypes/primitiveType", "language/nodeType"], function (exports_90, context_90) {
    "use strict";
    var singleArgumentFunction_2, primitiveType_8, nodeType_23, AbsFunction;
    var __moduleName = context_90 && context_90.id;
    return {
        setters: [
            function (singleArgumentFunction_2_1) {
                singleArgumentFunction_2 = singleArgumentFunction_2_1;
            },
            function (primitiveType_8_1) {
                primitiveType_8 = primitiveType_8_1;
            },
            function (nodeType_23_1) {
                nodeType_23 = nodeType_23_1;
            }
        ],
        execute: function () {
            AbsFunction = class AbsFunction extends singleArgumentFunction_2.SingleArgumentFunction {
                get functionHelp() {
                    return `${AbsFunction.functionName} expects 1 argument (Value)`;
                }
                constructor(valueExpression, reference) {
                    super(valueExpression, reference, primitiveType_8.PrimitiveType.number, primitiveType_8.PrimitiveType.number);
                    this.nodeType = nodeType_23.NodeType.AbsFunction;
                }
                static create(reference, expression) {
                    return new AbsFunction(expression, reference);
                }
            };
            exports_90("AbsFunction", AbsFunction);
            AbsFunction.functionName = `ABS`;
        }
    };
});
System.register("language/expressions/functions/powerFunction", ["language/expressions/functions/expressionFunction", "language/variableTypes/primitiveType", "language/nodeType"], function (exports_91, context_91) {
    "use strict";
    var expressionFunction_2, primitiveType_9, nodeType_24, PowerFunction;
    var __moduleName = context_91 && context_91.id;
    return {
        setters: [
            function (expressionFunction_2_1) {
                expressionFunction_2 = expressionFunction_2_1;
            },
            function (primitiveType_9_1) {
                primitiveType_9 = primitiveType_9_1;
            },
            function (nodeType_24_1) {
                nodeType_24 = nodeType_24_1;
            }
        ],
        execute: function () {
            PowerFunction = class PowerFunction extends expressionFunction_2.ExpressionFunction {
                get functionHelp() {
                    return `${PowerFunction.functionName} expects 2 arguments (Number, Power).`;
                }
                constructor(numberExpression, powerExpression, reference) {
                    super(reference);
                    this.nodeType = nodeType_24.NodeType.PowerFunction;
                    this.numberExpression = numberExpression;
                    this.powerExpression = powerExpression;
                }
                getChildren() {
                    return [
                        this.numberExpression,
                        this.powerExpression
                    ];
                }
                validate(context) {
                    context
                        .validateType(this.numberExpression, 1, `Number`, primitiveType_9.PrimitiveType.number, this.reference, this.functionHelp)
                        .validateType(this.powerExpression, 2, `Power`, primitiveType_9.PrimitiveType.number, this.reference, this.functionHelp);
                }
                deriveReturnType(context) {
                    return primitiveType_9.PrimitiveType.number;
                }
                static create(reference, numberExpression, powerExpression) {
                    return new PowerFunction(numberExpression, powerExpression, reference);
                }
            };
            exports_91("PowerFunction", PowerFunction);
            PowerFunction.functionName = `POWER`;
        }
    };
});
System.register("language/expressions/functions/roundFunction", ["language/expressions/functions/expressionFunction", "language/variableTypes/primitiveType", "language/nodeType"], function (exports_92, context_92) {
    "use strict";
    var expressionFunction_3, primitiveType_10, nodeType_25, RoundFunction;
    var __moduleName = context_92 && context_92.id;
    return {
        setters: [
            function (expressionFunction_3_1) {
                expressionFunction_3 = expressionFunction_3_1;
            },
            function (primitiveType_10_1) {
                primitiveType_10 = primitiveType_10_1;
            },
            function (nodeType_25_1) {
                nodeType_25 = nodeType_25_1;
            }
        ],
        execute: function () {
            RoundFunction = class RoundFunction extends expressionFunction_3.ExpressionFunction {
                get functionHelp() {
                    return `'${RoundFunction.name}' expects 2 arguments (Number, Digits).`;
                }
                constructor(numberExpression, digitsExpression, reference) {
                    super(reference);
                    this.nodeType = nodeType_25.NodeType.RoundFunction;
                    this.numberExpression = numberExpression;
                    this.digitsExpression = digitsExpression;
                }
                getChildren() {
                    return [
                        this.numberExpression,
                        this.digitsExpression
                    ];
                }
                validate(context) {
                    context
                        .validateType(this.numberExpression, 1, `Number`, primitiveType_10.PrimitiveType.number, this.reference, this.functionHelp)
                        .validateType(this.digitsExpression, 2, `Digits`, primitiveType_10.PrimitiveType.number, this.reference, this.functionHelp);
                }
                deriveReturnType(context) {
                    return primitiveType_10.PrimitiveType.number;
                }
                static create(reference, numberExpression, powerExpression) {
                    return new RoundFunction(numberExpression, powerExpression, reference);
                }
            };
            exports_92("RoundFunction", RoundFunction);
            RoundFunction.functionName = `ROUND`;
        }
    };
});
System.register("language/expressions/functions/noArgumentFunction", ["language/expressions/functions/expressionFunction"], function (exports_93, context_93) {
    "use strict";
    var expressionFunction_4, NoArgumentFunction;
    var __moduleName = context_93 && context_93.id;
    return {
        setters: [
            function (expressionFunction_4_1) {
                expressionFunction_4 = expressionFunction_4_1;
            }
        ],
        execute: function () {
            NoArgumentFunction = class NoArgumentFunction extends expressionFunction_4.ExpressionFunction {
                constructor(reference, resultType) {
                    super(reference);
                    this.resultType = resultType;
                }
                getChildren() {
                    return [];
                }
                validate(context) {
                }
                deriveReturnType(context) {
                    return this.resultType;
                }
            };
            exports_93("NoArgumentFunction", NoArgumentFunction);
        }
    };
});
System.register("language/expressions/functions/nowFunction", ["language/expressions/functions/noArgumentFunction", "language/variableTypes/primitiveType", "language/nodeType"], function (exports_94, context_94) {
    "use strict";
    var noArgumentFunction_1, primitiveType_11, nodeType_26, NowFunction;
    var __moduleName = context_94 && context_94.id;
    return {
        setters: [
            function (noArgumentFunction_1_1) {
                noArgumentFunction_1 = noArgumentFunction_1_1;
            },
            function (primitiveType_11_1) {
                primitiveType_11 = primitiveType_11_1;
            },
            function (nodeType_26_1) {
                nodeType_26 = nodeType_26_1;
            }
        ],
        execute: function () {
            NowFunction = class NowFunction extends noArgumentFunction_1.NoArgumentFunction {
                constructor(reference) {
                    super(reference, primitiveType_11.PrimitiveType.date);
                    this.nodeType = nodeType_26.NodeType.NowFunction;
                }
                static create(reference) {
                    return new NowFunction(reference);
                }
            };
            exports_94("NowFunction", NowFunction);
            NowFunction.functionName = `NOW`;
        }
    };
});
System.register("language/expressions/functions/todayFunction", ["language/expressions/functions/noArgumentFunction", "language/variableTypes/primitiveType", "language/nodeType"], function (exports_95, context_95) {
    "use strict";
    var noArgumentFunction_2, primitiveType_12, nodeType_27, TodayFunction;
    var __moduleName = context_95 && context_95.id;
    return {
        setters: [
            function (noArgumentFunction_2_1) {
                noArgumentFunction_2 = noArgumentFunction_2_1;
            },
            function (primitiveType_12_1) {
                primitiveType_12 = primitiveType_12_1;
            },
            function (nodeType_27_1) {
                nodeType_27 = nodeType_27_1;
            }
        ],
        execute: function () {
            TodayFunction = class TodayFunction extends noArgumentFunction_2.NoArgumentFunction {
                constructor(reference) {
                    super(reference, primitiveType_12.PrimitiveType.date);
                    this.nodeType = nodeType_27.NodeType.TodayFunction;
                }
                static create(reference) {
                    return new TodayFunction(reference);
                }
            };
            exports_95("TodayFunction", TodayFunction);
            TodayFunction.functionName = `TODAY`;
        }
    };
});
System.register("language/expressions/functions/yearFunction", ["language/expressions/functions/singleArgumentFunction", "language/variableTypes/primitiveType", "language/nodeType"], function (exports_96, context_96) {
    "use strict";
    var singleArgumentFunction_3, primitiveType_13, nodeType_28, YearFunction;
    var __moduleName = context_96 && context_96.id;
    return {
        setters: [
            function (singleArgumentFunction_3_1) {
                singleArgumentFunction_3 = singleArgumentFunction_3_1;
            },
            function (primitiveType_13_1) {
                primitiveType_13 = primitiveType_13_1;
            },
            function (nodeType_28_1) {
                nodeType_28 = nodeType_28_1;
            }
        ],
        execute: function () {
            YearFunction = class YearFunction extends singleArgumentFunction_3.SingleArgumentFunction {
                get functionHelp() {
                    return `'{Name} expects 1 argument (Date)`;
                }
                constructor(valueExpression, reference) {
                    super(valueExpression, reference, primitiveType_13.PrimitiveType.date, primitiveType_13.PrimitiveType.number);
                    this.nodeType = nodeType_28.NodeType.YearFunction;
                }
                static create(reference, expression) {
                    return new YearFunction(expression, reference);
                }
            };
            exports_96("YearFunction", YearFunction);
            YearFunction.functionName = `YEAR`;
        }
    };
});
System.register("language/expressions/functions/monthFunction", ["language/expressions/functions/singleArgumentFunction", "language/variableTypes/primitiveType", "language/nodeType"], function (exports_97, context_97) {
    "use strict";
    var singleArgumentFunction_4, primitiveType_14, nodeType_29, MonthFunction;
    var __moduleName = context_97 && context_97.id;
    return {
        setters: [
            function (singleArgumentFunction_4_1) {
                singleArgumentFunction_4 = singleArgumentFunction_4_1;
            },
            function (primitiveType_14_1) {
                primitiveType_14 = primitiveType_14_1;
            },
            function (nodeType_29_1) {
                nodeType_29 = nodeType_29_1;
            }
        ],
        execute: function () {
            MonthFunction = class MonthFunction extends singleArgumentFunction_4.SingleArgumentFunction {
                get functionHelp() {
                    return `'${MonthFunction.functionName} expects 1 argument (Date)`;
                }
                constructor(valueExpression, reference) {
                    super(valueExpression, reference, primitiveType_14.PrimitiveType.date, primitiveType_14.PrimitiveType.number);
                    this.nodeType = nodeType_29.NodeType.MonthFunction;
                }
                static create(reference, expression) {
                    return new MonthFunction(expression, reference);
                }
            };
            exports_97("MonthFunction", MonthFunction);
            MonthFunction.functionName = `MONTH`;
        }
    };
});
System.register("language/expressions/functions/dayFunction", ["language/variableTypes/primitiveType", "language/expressions/functions/singleArgumentFunction", "language/nodeType"], function (exports_98, context_98) {
    "use strict";
    var primitiveType_15, singleArgumentFunction_5, nodeType_30, DayFunction;
    var __moduleName = context_98 && context_98.id;
    return {
        setters: [
            function (primitiveType_15_1) {
                primitiveType_15 = primitiveType_15_1;
            },
            function (singleArgumentFunction_5_1) {
                singleArgumentFunction_5 = singleArgumentFunction_5_1;
            },
            function (nodeType_30_1) {
                nodeType_30 = nodeType_30_1;
            }
        ],
        execute: function () {
            DayFunction = class DayFunction extends singleArgumentFunction_5.SingleArgumentFunction {
                get functionHelp() {
                    return `${DayFunction.functionName} expects 1 argument (Date)`;
                }
                constructor(valueExpression, reference) {
                    super(valueExpression, reference, primitiveType_15.PrimitiveType.date, primitiveType_15.PrimitiveType.number);
                    this.nodeType = nodeType_30.NodeType.DayFunction;
                }
                static create(reference, expression) {
                    return new DayFunction(expression, reference);
                }
            };
            exports_98("DayFunction", DayFunction);
            DayFunction.functionName = `DAY`;
        }
    };
});
System.register("language/expressions/functions/hourFunction", ["language/expressions/functions/singleArgumentFunction", "language/variableTypes/primitiveType", "language/nodeType"], function (exports_99, context_99) {
    "use strict";
    var singleArgumentFunction_6, primitiveType_16, nodeType_31, HourFunction;
    var __moduleName = context_99 && context_99.id;
    return {
        setters: [
            function (singleArgumentFunction_6_1) {
                singleArgumentFunction_6 = singleArgumentFunction_6_1;
            },
            function (primitiveType_16_1) {
                primitiveType_16 = primitiveType_16_1;
            },
            function (nodeType_31_1) {
                nodeType_31 = nodeType_31_1;
            }
        ],
        execute: function () {
            HourFunction = class HourFunction extends singleArgumentFunction_6.SingleArgumentFunction {
                get functionHelp() {
                    return `${HourFunction.functionName} expects 1 argument (Date)`;
                }
                constructor(valueExpression, reference) {
                    super(valueExpression, reference, primitiveType_16.PrimitiveType.date, primitiveType_16.PrimitiveType.number);
                    this.nodeType = nodeType_31.NodeType.HourFunction;
                }
                static create(reference, expression) {
                    return new HourFunction(expression, reference);
                }
            };
            exports_99("HourFunction", HourFunction);
            HourFunction.functionName = `HOUR`;
        }
    };
});
System.register("language/expressions/functions/minuteFunction", ["language/expressions/functions/singleArgumentFunction", "language/variableTypes/primitiveType", "language/nodeType"], function (exports_100, context_100) {
    "use strict";
    var singleArgumentFunction_7, primitiveType_17, nodeType_32, MinuteFunction;
    var __moduleName = context_100 && context_100.id;
    return {
        setters: [
            function (singleArgumentFunction_7_1) {
                singleArgumentFunction_7 = singleArgumentFunction_7_1;
            },
            function (primitiveType_17_1) {
                primitiveType_17 = primitiveType_17_1;
            },
            function (nodeType_32_1) {
                nodeType_32 = nodeType_32_1;
            }
        ],
        execute: function () {
            MinuteFunction = class MinuteFunction extends singleArgumentFunction_7.SingleArgumentFunction {
                get functionHelp() {
                    return `'${MinuteFunction.functionName} expects 1 argument (Date)`;
                }
                constructor(valueExpression, reference) {
                    super(valueExpression, reference, primitiveType_17.PrimitiveType.date, primitiveType_17.PrimitiveType.number);
                    this.nodeType = nodeType_32.NodeType.MinuteFunction;
                }
                static create(reference, expression) {
                    return new MinuteFunction(expression, reference);
                }
            };
            exports_100("MinuteFunction", MinuteFunction);
            MinuteFunction.functionName = `MINUTE`;
        }
    };
});
System.register("language/expressions/functions/secondFunction", ["language/expressions/functions/singleArgumentFunction", "language/variableTypes/primitiveType", "language/nodeType"], function (exports_101, context_101) {
    "use strict";
    var singleArgumentFunction_8, primitiveType_18, nodeType_33, SecondFunction;
    var __moduleName = context_101 && context_101.id;
    return {
        setters: [
            function (singleArgumentFunction_8_1) {
                singleArgumentFunction_8 = singleArgumentFunction_8_1;
            },
            function (primitiveType_18_1) {
                primitiveType_18 = primitiveType_18_1;
            },
            function (nodeType_33_1) {
                nodeType_33 = nodeType_33_1;
            }
        ],
        execute: function () {
            SecondFunction = class SecondFunction extends singleArgumentFunction_8.SingleArgumentFunction {
                get functionHelp() {
                    return `'${SecondFunction.functionName} expects 1 argument (Date)`;
                }
                constructor(valueExpression, reference) {
                    super(valueExpression, reference, primitiveType_18.PrimitiveType.date, primitiveType_18.PrimitiveType.number);
                    this.nodeType = nodeType_33.NodeType.SecondFunction;
                }
                static create(reference, expression) {
                    return new SecondFunction(expression, reference);
                }
            };
            exports_101("SecondFunction", SecondFunction);
            SecondFunction.functionName = `SECOND`;
        }
    };
});
System.register("language/expressions/functions/endStartDateFunction", ["language/expressions/functions/expressionFunction", "language/variableTypes/primitiveType"], function (exports_102, context_102) {
    "use strict";
    var expressionFunction_5, primitiveType_19, EndStartDateFunction;
    var __moduleName = context_102 && context_102.id;
    return {
        setters: [
            function (expressionFunction_5_1) {
                expressionFunction_5 = expressionFunction_5_1;
            },
            function (primitiveType_19_1) {
                primitiveType_19 = primitiveType_19_1;
            }
        ],
        execute: function () {
            EndStartDateFunction = class EndStartDateFunction extends expressionFunction_5.ExpressionFunction {
                get functionHelp() {
                    return `'${this.functionName}' expects 2 arguments (EndDate, StartDate).`;
                }
                constructor(endDateExpression, startDateExpression, reference) {
                    super(reference);
                    this.endDateExpression = endDateExpression;
                    this.startDateExpression = startDateExpression;
                }
                getChildren() {
                    return [this.endDateExpression, this.startDateExpression];
                }
                validate(context) {
                    context
                        .validateType(this.endDateExpression, 1, `EndDate`, primitiveType_19.PrimitiveType.date, this.reference, this.functionHelp)
                        .validateType(this.startDateExpression, 2, `StartDate`, primitiveType_19.PrimitiveType.date, this.reference, this.functionHelp);
                }
                deriveReturnType(context) {
                    return primitiveType_19.PrimitiveType.number;
                }
            };
            exports_102("EndStartDateFunction", EndStartDateFunction);
        }
    };
});
System.register("language/expressions/functions/yearsFunction", ["language/expressions/functions/endStartDateFunction", "language/nodeType"], function (exports_103, context_103) {
    "use strict";
    var endStartDateFunction_1, nodeType_34, YearsFunction;
    var __moduleName = context_103 && context_103.id;
    return {
        setters: [
            function (endStartDateFunction_1_1) {
                endStartDateFunction_1 = endStartDateFunction_1_1;
            },
            function (nodeType_34_1) {
                nodeType_34 = nodeType_34_1;
            }
        ],
        execute: function () {
            YearsFunction = class YearsFunction extends endStartDateFunction_1.EndStartDateFunction {
                get functionName() {
                    return YearsFunction.functionName;
                }
                constructor(endDateExpression, startDateExpression, reference) {
                    super(endDateExpression, startDateExpression, reference);
                    this.nodeType = nodeType_34.NodeType.YearsFunction;
                }
                static create(reference, endDateExpression, startDateExpression) {
                    return new YearsFunction(endDateExpression, startDateExpression, reference);
                }
            };
            exports_103("YearsFunction", YearsFunction);
            YearsFunction.functionName = `YEARS`;
        }
    };
});
System.register("language/expressions/functions/monthsFunction", ["language/expressions/functions/endStartDateFunction", "language/nodeType"], function (exports_104, context_104) {
    "use strict";
    var endStartDateFunction_2, nodeType_35, MonthsFunction;
    var __moduleName = context_104 && context_104.id;
    return {
        setters: [
            function (endStartDateFunction_2_1) {
                endStartDateFunction_2 = endStartDateFunction_2_1;
            },
            function (nodeType_35_1) {
                nodeType_35 = nodeType_35_1;
            }
        ],
        execute: function () {
            MonthsFunction = class MonthsFunction extends endStartDateFunction_2.EndStartDateFunction {
                get functionName() {
                    return MonthsFunction.name;
                }
                constructor(endDateExpression, startDateExpression, reference) {
                    super(endDateExpression, startDateExpression, reference);
                    this.nodeType = nodeType_35.NodeType.MonthsFunction;
                }
                static create(reference, endDateExpression, startDateExpression) {
                    return new MonthsFunction(endDateExpression, startDateExpression, reference);
                }
            };
            exports_104("MonthsFunction", MonthsFunction);
            MonthsFunction.functionName = `MONTHS`;
        }
    };
});
System.register("language/expressions/functions/daysFunction", ["language/expressions/functions/endStartDateFunction", "language/nodeType"], function (exports_105, context_105) {
    "use strict";
    var endStartDateFunction_3, nodeType_36, DaysFunction;
    var __moduleName = context_105 && context_105.id;
    return {
        setters: [
            function (endStartDateFunction_3_1) {
                endStartDateFunction_3 = endStartDateFunction_3_1;
            },
            function (nodeType_36_1) {
                nodeType_36 = nodeType_36_1;
            }
        ],
        execute: function () {
            DaysFunction = class DaysFunction extends endStartDateFunction_3.EndStartDateFunction {
                get functionName() {
                    return DaysFunction.functionName;
                }
                constructor(endDateExpression, startDateExpression, reference) {
                    super(endDateExpression, startDateExpression, reference);
                    this.nodeType = nodeType_36.NodeType.DaysFunction;
                }
                static create(reference, endDateExpression, startDateExpression) {
                    return new DaysFunction(endDateExpression, startDateExpression, reference);
                }
            };
            exports_105("DaysFunction", DaysFunction);
            DaysFunction.functionName = `DAYS`;
        }
    };
});
System.register("language/expressions/functions/hoursFunction", ["language/expressions/functions/endStartDateFunction", "language/nodeType"], function (exports_106, context_106) {
    "use strict";
    var endStartDateFunction_4, nodeType_37, HoursFunction;
    var __moduleName = context_106 && context_106.id;
    return {
        setters: [
            function (endStartDateFunction_4_1) {
                endStartDateFunction_4 = endStartDateFunction_4_1;
            },
            function (nodeType_37_1) {
                nodeType_37 = nodeType_37_1;
            }
        ],
        execute: function () {
            HoursFunction = class HoursFunction extends endStartDateFunction_4.EndStartDateFunction {
                get functionName() {
                    return HoursFunction.name;
                }
                constructor(endDateExpression, startDateExpression, reference) {
                    super(endDateExpression, startDateExpression, reference);
                    this.nodeType = nodeType_37.NodeType.HoursFunction;
                }
                static create(reference, endDateExpression, startDateExpression) {
                    return new HoursFunction(endDateExpression, startDateExpression, reference);
                }
            };
            exports_106("HoursFunction", HoursFunction);
            HoursFunction.functionName = `HOURS`;
        }
    };
});
System.register("language/expressions/functions/minutesFunction", ["language/expressions/functions/endStartDateFunction", "language/nodeType"], function (exports_107, context_107) {
    "use strict";
    var endStartDateFunction_5, nodeType_38, MinutesFunction;
    var __moduleName = context_107 && context_107.id;
    return {
        setters: [
            function (endStartDateFunction_5_1) {
                endStartDateFunction_5 = endStartDateFunction_5_1;
            },
            function (nodeType_38_1) {
                nodeType_38 = nodeType_38_1;
            }
        ],
        execute: function () {
            MinutesFunction = class MinutesFunction extends endStartDateFunction_5.EndStartDateFunction {
                get functionName() {
                    return MinutesFunction.name;
                }
                constructor(endDateExpression, startDateExpression, reference) {
                    super(endDateExpression, startDateExpression, reference);
                    this.nodeType = nodeType_38.NodeType.MinutesFunction;
                }
                static create(reference, endDateExpression, startDateExpression) {
                    return new MinutesFunction(endDateExpression, startDateExpression, reference);
                }
            };
            exports_107("MinutesFunction", MinutesFunction);
            MinutesFunction.functionName = `MINUTES`;
        }
    };
});
System.register("language/expressions/functions/secondsFunction", ["language/expressions/functions/endStartDateFunction", "language/nodeType"], function (exports_108, context_108) {
    "use strict";
    var endStartDateFunction_6, nodeType_39, SecondsFunction;
    var __moduleName = context_108 && context_108.id;
    return {
        setters: [
            function (endStartDateFunction_6_1) {
                endStartDateFunction_6 = endStartDateFunction_6_1;
            },
            function (nodeType_39_1) {
                nodeType_39 = nodeType_39_1;
            }
        ],
        execute: function () {
            SecondsFunction = class SecondsFunction extends endStartDateFunction_6.EndStartDateFunction {
                get functionName() {
                    return SecondsFunction.name;
                }
                constructor(endDateExpression, startDateExpression, reference) {
                    super(endDateExpression, startDateExpression, reference);
                    this.nodeType = nodeType_39.NodeType.SecondsFunction;
                }
                static create(reference, endDateExpression, startDateExpression) {
                    return new SecondsFunction(endDateExpression, startDateExpression, reference);
                }
            };
            exports_108("SecondsFunction", SecondsFunction);
            SecondsFunction.functionName = `SECONDS`;
        }
    };
});
System.register("language/expressions/functions/lookupFunction", ["language/expressions/functions/expressionFunction", "language/expressions/parseExpressionFunctionsResult", "language/expressions/identifierExpression", "language/expressions/memberAccessExpression", "language/nodeType", "infrastructure/assert"], function (exports_109, context_109) {
    "use strict";
    var expressionFunction_6, parseExpressionFunctionsResult_1, identifierExpression_1, memberAccessExpression_2, nodeType_40, assert_4, argumentsNumber, argumentTable, argumentLookupValue, argumentSearchValueColumn, argumentResultColumn, functionHelp, LookupFunction;
    var __moduleName = context_109 && context_109.id;
    return {
        setters: [
            function (expressionFunction_6_1) {
                expressionFunction_6 = expressionFunction_6_1;
            },
            function (parseExpressionFunctionsResult_1_1) {
                parseExpressionFunctionsResult_1 = parseExpressionFunctionsResult_1_1;
            },
            function (identifierExpression_1_1) {
                identifierExpression_1 = identifierExpression_1_1;
            },
            function (memberAccessExpression_2_1) {
                memberAccessExpression_2 = memberAccessExpression_2_1;
            },
            function (nodeType_40_1) {
                nodeType_40 = nodeType_40_1;
            },
            function (assert_4_1) {
                assert_4 = assert_4_1;
            }
        ],
        execute: function () {
            argumentsNumber = 4;
            argumentTable = 0;
            argumentLookupValue = 1;
            argumentSearchValueColumn = 2;
            argumentResultColumn = 3;
            functionHelp = `Arguments: LOOKUP(Table, lookUpValue, Table.searchValueColumn, Table.resultColumn)`;
            LookupFunction = class LookupFunction extends expressionFunction_6.ExpressionFunction {
                get resultColumnType() {
                    return assert_4.Assert.notNull(this.resultColumnTypeValue, "resultColumnType");
                }
                get searchValueColumnType() {
                    return assert_4.Assert.notNull(this.searchValueColumnTypeValue, "searchValueColumnType");
                }
                constructor(tableType, valueExpression, resultColumn, searchValueColumn, tableNameArgumentReference) {
                    super(tableNameArgumentReference);
                    this.resultColumnTypeValue = null;
                    this.searchValueColumnTypeValue = null;
                    this.hasNodeDependencies = true;
                    this.nodeType = nodeType_40.NodeType.LookupFunction;
                    this.table = tableType;
                    this.valueExpression = valueExpression;
                    this.resultColumn = resultColumn;
                    this.searchValueColumn = searchValueColumn;
                }
                getDependencies(rootNodeList) {
                    let table = rootNodeList.getTable(this.table);
                    return table != null ? [table] : [];
                }
                static parse(name, functionCallReference, argumentValues) {
                    if (argumentValues.length != argumentsNumber) {
                        return parseExpressionFunctionsResult_1.newParseExpressionFunctionsFailed(`Invalid number of arguments. ${functionHelp}`);
                    }
                    const tableNameExpression = identifierExpression_1.asIdentifierExpression(argumentValues[argumentTable]);
                    if (tableNameExpression == null) {
                        return parseExpressionFunctionsResult_1.newParseExpressionFunctionsFailed(`Invalid argument ${argumentTable}. Should be valid table name. ${functionHelp}`);
                    }
                    const searchValueColumnHeader = memberAccessExpression_2.asMemberAccessExpression(argumentValues[argumentSearchValueColumn]);
                    if (searchValueColumnHeader == null) {
                        return parseExpressionFunctionsResult_1.newParseExpressionFunctionsFailed(`Invalid argument ${argumentSearchValueColumn}. Should be search column. ${functionHelp}`);
                    }
                    const resultColumnExpression = memberAccessExpression_2.asMemberAccessExpression(argumentValues[argumentResultColumn]);
                    if (resultColumnExpression == null) {
                        return parseExpressionFunctionsResult_1.newParseExpressionFunctionsFailed(`Invalid argument ${argumentResultColumn}. Should be result column. ${functionHelp}`);
                    }
                    const tableName = tableNameExpression.identifier;
                    const valueExpression = argumentValues[argumentLookupValue];
                    const searchValueColumn = searchValueColumnHeader.memberAccessLiteral;
                    const resultColumn = resultColumnExpression.memberAccessLiteral;
                    const lookupFunction = new LookupFunction(tableName, valueExpression, resultColumn, searchValueColumn, functionCallReference);
                    return parseExpressionFunctionsResult_1.newParseExpressionFunctionsSuccess(lookupFunction);
                }
                getChildren() {
                    return [this.valueExpression];
                }
                validate(context) {
                    var _a, _b;
                    this.validateColumn(context, this.resultColumn, argumentResultColumn);
                    this.validateColumn(context, this.searchValueColumn, argumentSearchValueColumn);
                    const tableType = context.rootNodes.getTable(this.table);
                    if (tableType == null) {
                        context.logger.fail(this.reference, `Invalid argument ${argumentTable}. Table name '${this.table}' not found. ${functionHelp}`);
                        return;
                    }
                    const resultColumnHeader = (_a = tableType.header) === null || _a === void 0 ? void 0 : _a.get(this.resultColumn);
                    if (resultColumnHeader == null) {
                        context.logger.fail(this.reference, `Invalid argument ${argumentResultColumn}. Column name '${this.resultColumn}' not found in table '${this.table}'. ${functionHelp}`);
                        return;
                    }
                    const searchColumnHeader = (_b = tableType.header) === null || _b === void 0 ? void 0 : _b.get(this.searchValueColumn);
                    if (searchColumnHeader == null) {
                        context.logger.fail(this.reference, `Invalid argument ${argumentSearchValueColumn}. Column name '${this.searchValueColumn}' not found in table '${this.table}'. ${functionHelp}`);
                        return;
                    }
                    const conditionValueType = this.valueExpression.deriveType(context);
                    this.resultColumnTypeValue = resultColumnHeader.type.createVariableType(context);
                    this.searchValueColumnTypeValue = searchColumnHeader.type.createVariableType(context);
                    if (conditionValueType == null || !conditionValueType.equals(this.searchValueColumnTypeValue)) {
                        context.logger.fail(this.reference, `Invalid argument ${argumentSearchValueColumn}. Column type '${this.searchValueColumn}': '${this.searchValueColumnType}' doesn't match condition type '${conditionValueType}'. ${functionHelp}`);
                    }
                }
                validateColumn(context, column, index) {
                    if (column.parent != this.table) {
                        context.logger.fail(this.reference, `Invalid argument ${index}. Result column table '${column.parent}' should be table name '${this.table}'`);
                    }
                    if (column.parts.length != 2) {
                        context.logger.fail(this.reference, `Invalid argument ${index}. Result column table '${column.parent}' should be table name '${this.table}'`);
                    }
                }
                deriveReturnType(context) {
                    var _a;
                    let tableType = context.rootNodes.getTable(this.table);
                    let resultColumnHeader = (_a = tableType === null || tableType === void 0 ? void 0 : tableType.header) === null || _a === void 0 ? void 0 : _a.get(this.resultColumn);
                    const variableType = resultColumnHeader === null || resultColumnHeader === void 0 ? void 0 : resultColumnHeader.type.createVariableType(context);
                    return !!variableType ? variableType : null;
                }
            };
            exports_109("LookupFunction", LookupFunction);
            LookupFunction.functionName = `LOOKUP`;
        }
    };
});
System.register("language/expressions/functions/lookupRowFunction", ["language/expressions/functions/expressionFunction", "language/expressions/parseExpressionFunctionsResult", "language/expressions/identifierExpression", "language/expressions/memberAccessExpression", "language/nodeType", "infrastructure/assert"], function (exports_110, context_110) {
    "use strict";
    var expressionFunction_7, parseExpressionFunctionsResult_2, identifierExpression_2, memberAccessExpression_3, nodeType_41, assert_5, argumentsNumber, argumentTable, argumentLookupValue, argumentSearchValueColumn, functionHelp, LookupRowFunction;
    var __moduleName = context_110 && context_110.id;
    return {
        setters: [
            function (expressionFunction_7_1) {
                expressionFunction_7 = expressionFunction_7_1;
            },
            function (parseExpressionFunctionsResult_2_1) {
                parseExpressionFunctionsResult_2 = parseExpressionFunctionsResult_2_1;
            },
            function (identifierExpression_2_1) {
                identifierExpression_2 = identifierExpression_2_1;
            },
            function (memberAccessExpression_3_1) {
                memberAccessExpression_3 = memberAccessExpression_3_1;
            },
            function (nodeType_41_1) {
                nodeType_41 = nodeType_41_1;
            },
            function (assert_5_1) {
                assert_5 = assert_5_1;
            }
        ],
        execute: function () {
            argumentsNumber = 3;
            argumentTable = 0;
            argumentLookupValue = 1;
            argumentSearchValueColumn = 2;
            functionHelp = " Arguments: LOOKUPROW(Table, lookUpValue, Table.searchValueColumn)";
            LookupRowFunction = class LookupRowFunction extends expressionFunction_7.ExpressionFunction {
                get searchValueColumnType() {
                    return assert_5.Assert.notNull(this.searchValueColumnTypeValue, "searchValueColumnType");
                }
                constructor(tableType, valueExpression, searchValueColumn, tableNameArgumentReference) {
                    super(tableNameArgumentReference);
                    this.searchValueColumnTypeValue = null;
                    this.hasNodeDependencies = true;
                    this.nodeType = nodeType_41.NodeType.LookupRowFunction;
                    this.table = tableType;
                    this.valueExpression = valueExpression;
                    this.searchValueColumn = searchValueColumn;
                }
                getDependencies(rootNodeList) {
                    let table = rootNodeList.getTable(this.table);
                    return table != null ? [table] : [];
                }
                static parse(name, functionCallReference, argumentValues) {
                    if (argumentValues.length != argumentsNumber) {
                        return parseExpressionFunctionsResult_2.newParseExpressionFunctionsFailed(`Invalid number of arguments. ${functionHelp}`);
                    }
                    const tableNameExpression = identifierExpression_2.asIdentifierExpression(argumentValues[argumentTable]);
                    if (tableNameExpression == null) {
                        return parseExpressionFunctionsResult_2.newParseExpressionFunctionsFailed(`Invalid argument {ArgumentTable}. Should be valid table name. {functionHelp}`);
                    }
                    const searchValueColumnHeader = memberAccessExpression_3.asMemberAccessExpression(argumentValues[argumentSearchValueColumn]);
                    if (searchValueColumnHeader == null) {
                        return parseExpressionFunctionsResult_2.newParseExpressionFunctionsFailed(`Invalid argument {ArgumentSearchValueColumn}. Should be search column. {functionHelp}`);
                    }
                    let tableName = tableNameExpression.identifier;
                    let valueExpression = argumentValues[argumentLookupValue];
                    let searchValueColumn = searchValueColumnHeader.memberAccessLiteral;
                    let lookupFunction = new LookupRowFunction(tableName, valueExpression, searchValueColumn, functionCallReference);
                    return parseExpressionFunctionsResult_2.newParseExpressionFunctionsSuccess(lookupFunction);
                }
                getChildren() {
                    return [this.valueExpression];
                }
                validate(context) {
                    var _a;
                    this.validateColumn(context, this.searchValueColumn, argumentSearchValueColumn);
                    let tableType = context.rootNodes.getTable(this.table);
                    if (tableType == null) {
                        context.logger.fail(this.reference, `Invalid argument ${argumentTable}. Table name '${this.table}' not found. ${functionHelp}`);
                        return;
                    }
                    let searchColumnHeader = (_a = tableType.header) === null || _a === void 0 ? void 0 : _a.get(this.searchValueColumn);
                    if (searchColumnHeader == null) {
                        context.logger.fail(this.reference, `Invalid argument ${argumentSearchValueColumn}. Column name '${this.searchValueColumn}' not found in table '${this.table}'. $functionHelp}`);
                        return;
                    }
                    let conditionValueType = this.valueExpression.deriveType(context);
                    this.searchValueColumnTypeValue = searchColumnHeader.type.createVariableType(context);
                    if (conditionValueType == null || !conditionValueType.equals(this.searchValueColumnType)) {
                        context.logger.fail(this.reference, `Invalid argument ${argumentSearchValueColumn}. Column type '${this.searchValueColumn}': '${this.searchValueColumnType}' doesn't match condition type '${conditionValueType}'. ${functionHelp}`);
                    }
                }
                validateColumn(context, column, index) {
                    if (column.parent != this.table)
                        context.logger.fail(this.reference, `Invalid argument ${index}. Result column table '${column.parent}' should be table name '${this.table}'`);
                    if (column.parts.length != 2)
                        context.logger.fail(this.reference, `Invalid argument ${index}. Result column table '${column.parent}' should be table name '${this.table}'`);
                }
                deriveReturnType(context) {
                    let tableType = context.rootNodes.getTable(this.table);
                    const rowTypeValue = tableType === null || tableType === void 0 ? void 0 : tableType.getRowType(context);
                    return !!rowTypeValue ? rowTypeValue : null;
                }
            };
            exports_110("LookupRowFunction", LookupRowFunction);
            LookupRowFunction.functionName = `LOOKUPROW`;
        }
    };
});
System.register("language/expressions/functions/newFunction", ["language/expressions/functions/expressionFunction", "language/expressions/memberAccessExpression", "language/nodeType", "language/variableTypes/complexType", "infrastructure/assert"], function (exports_111, context_111) {
    "use strict";
    var expressionFunction_8, memberAccessExpression_4, nodeType_42, complexType_2, assert_6, NewFunction;
    var __moduleName = context_111 && context_111.id;
    function instanceOfNewFunction(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_42.NodeType.NewFunction;
    }
    exports_111("instanceOfNewFunction", instanceOfNewFunction);
    function asNewFunction(object) {
        return instanceOfNewFunction(object) ? object : null;
    }
    exports_111("asNewFunction", asNewFunction);
    return {
        setters: [
            function (expressionFunction_8_1) {
                expressionFunction_8 = expressionFunction_8_1;
            },
            function (memberAccessExpression_4_1) {
                memberAccessExpression_4 = memberAccessExpression_4_1;
            },
            function (nodeType_42_1) {
                nodeType_42 = nodeType_42_1;
            },
            function (complexType_2_1) {
                complexType_2 = complexType_2_1;
            },
            function (assert_6_1) {
                assert_6 = assert_6_1;
            }
        ],
        execute: function () {
            NewFunction = class NewFunction extends expressionFunction_8.ExpressionFunction {
                get functionHelp() {
                    return `${NewFunction.functionName} expects 1 argument (Function.Parameters)`;
                }
                get type() {
                    return assert_6.Assert.notNull(this.typeValue, "type");
                }
                constructor(valueExpression, reference) {
                    super(reference);
                    this.typeValue = null;
                    this.hasNodeDependencies = true;
                    this.nodeType = nodeType_42.NodeType.NewFunction;
                    this.valueExpression = valueExpression;
                    const memberAccessExpression = memberAccessExpression_4.asMemberAccessExpression(valueExpression);
                    if (memberAccessExpression == null)
                        throw new Error("valueExpression should be MemberAccessExpression");
                    this.typeLiteral = memberAccessExpression.memberAccessLiteral;
                }
                getDependencies(rootNodeList) {
                    let rootNode = this.typeValue ? rootNodeList.getNode(this.typeValue.name) : null;
                    return rootNode != null ? [rootNode] : [];
                }
                static create(reference, expression) {
                    return new NewFunction(expression, reference);
                }
                getChildren() {
                    return [this.valueExpression];
                }
                validate(context) {
                    const valueType = this.valueExpression.deriveType(context);
                    const complexType = complexType_2.asComplexType(valueType);
                    if (complexType == null) {
                        context.logger.fail(this.reference, `Invalid argument 1 'Value' should be of type 'ComplexTypeType' but is 'ValueType'. ${this.functionHelp}`);
                        return;
                    }
                    this.typeValue = complexType;
                }
                deriveReturnType(context) {
                    let nodeType = context.rootNodes.getType(this.typeLiteral.parent);
                    return nodeType === null || nodeType === void 0 ? void 0 : nodeType.memberType(this.typeLiteral.member, context);
                }
            };
            exports_111("NewFunction", NewFunction);
            NewFunction.functionName = `new`;
        }
    };
});
System.register("language/expressions/functions/mapping", [], function (exports_112, context_112) {
    "use strict";
    var Mapping;
    var __moduleName = context_112 && context_112.id;
    return {
        setters: [],
        execute: function () {
            Mapping = class Mapping {
                constructor(variableName, variableType, variableSource) {
                    this.variableName = variableName;
                    this.variableType = variableType;
                    this.variableSource = variableSource;
                }
            };
            exports_112("Mapping", Mapping);
        }
    };
});
System.register("language/expressions/functions/fillParametersFunction", ["language/expressions/functions/expressionFunction", "language/expressions/functions/mapping", "language/expressions/memberAccessExpression", "language/variableTypes/complexType", "language/functions/function", "language/nodeType", "infrastructure/assert"], function (exports_113, context_113) {
    "use strict";
    var expressionFunction_9, mapping_1, memberAccessExpression_5, complexType_3, function_1, nodeType_43, assert_7, FillParametersFunction;
    var __moduleName = context_113 && context_113.id;
    function instanceOfFillParametersFunction(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_43.NodeType.FillParametersFunction;
    }
    exports_113("instanceOfFillParametersFunction", instanceOfFillParametersFunction);
    function asFillParametersFunction(object) {
        return instanceOfFillParametersFunction(object) ? object : null;
    }
    exports_113("asFillParametersFunction", asFillParametersFunction);
    return {
        setters: [
            function (expressionFunction_9_1) {
                expressionFunction_9 = expressionFunction_9_1;
            },
            function (mapping_1_1) {
                mapping_1 = mapping_1_1;
            },
            function (memberAccessExpression_5_1) {
                memberAccessExpression_5 = memberAccessExpression_5_1;
            },
            function (complexType_3_1) {
                complexType_3 = complexType_3_1;
            },
            function (function_1_1) {
                function_1 = function_1_1;
            },
            function (nodeType_43_1) {
                nodeType_43 = nodeType_43_1;
            },
            function (assert_7_1) {
                assert_7 = assert_7_1;
            }
        ],
        execute: function () {
            FillParametersFunction = class FillParametersFunction extends expressionFunction_9.ExpressionFunction {
                get type() {
                    return assert_7.Assert.notNull(this.typeValue, "type");
                }
                get functionHelp() {
                    return `${FillParametersFunction.functionName} expects 1 argument (Function.Parameters)`;
                }
                constructor(valueExpression, reference) {
                    super(reference);
                    this.typeValue = null;
                    this.hasNodeDependencies = true;
                    this.nodeType = nodeType_43.NodeType.FillParametersFunction;
                    this.mapping = [];
                    this.valueExpression = valueExpression;
                    const memberAccessExpression = memberAccessExpression_5.asMemberAccessExpression(valueExpression);
                    this.typeLiteral = memberAccessExpression === null || memberAccessExpression === void 0 ? void 0 : memberAccessExpression.memberAccessLiteral;
                }
                getDependencies(rootNodeList) {
                    const rootNode = rootNodeList.getNode(assert_7.Assert.notNull(this.type, "type").name);
                    return rootNode != null ? [rootNode] : [];
                }
                static create(reference, expression) {
                    return new FillParametersFunction(expression, reference);
                }
                getChildren() {
                    return [this.valueExpression];
                }
                validate(context) {
                    const valueType = this.valueExpression.deriveType(context);
                    const complexType = complexType_3.asComplexType(valueType);
                    if (complexType == null) {
                        context.logger.fail(this.reference, `Invalid argument 1 'Value' should be of type 'ComplexTypeReference' but is '${valueType}'. ${this.functionHelp}`);
                        return;
                    }
                    this.typeValue = complexType;
                    FillParametersFunction.getMapping(this.reference, context, complexType, this.mapping);
                }
                static getMapping(reference, context, complexType, mapping) {
                    for (const member of complexType.members) {
                        let variable = context.variableContext.getVariable(member.name);
                        if (variable == null)
                            continue;
                        if (variable.variableType == null || !variable.variableType.equals(member.type)) {
                            context.logger.fail(reference, `Invalid parameter mapping. Variable '${member.name}' of type '${variable.variableType}' can't be mapped to parameter '${member.name}' of type '${member.type}'.`);
                        }
                        else {
                            mapping.push(new mapping_1.Mapping(member.name, variable.variableType, variable.variableSource));
                        }
                    }
                    if (mapping.length == 0) {
                        context.logger.fail(reference, `Invalid parameter mapping. No parameter could be mapped from variables.`);
                    }
                }
                deriveReturnType(context) {
                    if (this.typeLiteral == undefined)
                        return null;
                    let functionValue = context.rootNodes.getFunction(this.typeLiteral.parent);
                    if (functionValue == null)
                        return null;
                    if (this.typeLiteral.member == function_1.Function.parameterName) {
                        return functionValue.getParametersType(context);
                    }
                    if (this.typeLiteral.member == function_1.Function.resultsName) {
                        return functionValue.getResultsType(context);
                    }
                    return null;
                }
            };
            exports_113("FillParametersFunction", FillParametersFunction);
            FillParametersFunction.functionName = `fill`;
        }
    };
});
System.register("language/variableTypes/voidType", ["language/variableTypes/variableType", "language/variableTypes/variableTypeName"], function (exports_114, context_114) {
    "use strict";
    var variableType_4, variableTypeName_6, VoidType;
    var __moduleName = context_114 && context_114.id;
    return {
        setters: [
            function (variableType_4_1) {
                variableType_4 = variableType_4_1;
            },
            function (variableTypeName_6_1) {
                variableTypeName_6 = variableTypeName_6_1;
            }
        ],
        execute: function () {
            VoidType = class VoidType extends variableType_4.VariableType {
                constructor() {
                    super(...arguments);
                    this.variableTypeName = variableTypeName_6.VariableTypeName.VoidType;
                }
                equals(other) {
                    return this.variableTypeName == (other === null || other === void 0 ? void 0 : other.variableTypeName);
                }
            };
            exports_114("VoidType", VoidType);
        }
    };
});
System.register("language/expressions/functions/extractResultsFunction", ["language/expressions/functions/expressionFunction", "language/expressions/functions/mapping", "language/variableTypes/complexType", "language/variableSource", "language/variableTypes/voidType", "language/nodeType"], function (exports_115, context_115) {
    "use strict";
    var expressionFunction_10, mapping_2, complexType_4, variableSource_4, voidType_1, nodeType_44, ExtractResultsFunction;
    var __moduleName = context_115 && context_115.id;
    function instanceOfExtractResultsFunction(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_44.NodeType.ExtractResultsFunction;
    }
    exports_115("instanceOfExtractResultsFunction", instanceOfExtractResultsFunction);
    function asExtractResultsFunction(object) {
        return instanceOfExtractResultsFunction(object) ? object : null;
    }
    exports_115("asExtractResultsFunction", asExtractResultsFunction);
    return {
        setters: [
            function (expressionFunction_10_1) {
                expressionFunction_10 = expressionFunction_10_1;
            },
            function (mapping_2_1) {
                mapping_2 = mapping_2_1;
            },
            function (complexType_4_1) {
                complexType_4 = complexType_4_1;
            },
            function (variableSource_4_1) {
                variableSource_4 = variableSource_4_1;
            },
            function (voidType_1_1) {
                voidType_1 = voidType_1_1;
            },
            function (nodeType_44_1) {
                nodeType_44 = nodeType_44_1;
            }
        ],
        execute: function () {
            ExtractResultsFunction = class ExtractResultsFunction extends expressionFunction_10.ExpressionFunction {
                get functionHelp() {
                    return `${ExtractResultsFunction.functionName} expects 1 argument. extract(variable)`;
                }
                constructor(valueExpression, reference) {
                    super(reference);
                    this.nodeType = nodeType_44.NodeType.ExtractResultsFunction;
                    this.mapping = [];
                    this.valueExpression = valueExpression;
                    const identifierExpression = valueExpression;
                    this.functionResultVariable = identifierExpression != null ? identifierExpression.identifier : null;
                }
                getChildren() {
                    return [this.valueExpression];
                }
                validate(context) {
                    if (this.functionResultVariable == null) {
                        context.logger.fail(this.reference, `Invalid variable argument. ${(this.functionHelp)}`);
                        return;
                    }
                    let variableType = context.variableContext.getVariableTypeByName(this.functionResultVariable);
                    if (variableType == null) {
                        context.logger.fail(this.reference, `Unknown variable: '${(this.functionResultVariable)}'. ${(this.functionHelp)}`);
                        return;
                    }
                    const complexType = complexType_4.asComplexType(variableType);
                    if (complexType == null) {
                        context.logger.fail(this.reference, `Invalid variable type: '${this.functionResultVariable}'. ` +
                            `Should be Function Results. ` +
                            `Use new(Function.results) or fill(Function.results) to create new function results. ${this.functionHelp}`);
                        return;
                    }
                    ExtractResultsFunction.getMapping(this.reference, context, complexType, this.mapping);
                }
                static getMapping(reference, context, complexType, mapping) {
                    var _a;
                    if (complexType == null)
                        return;
                    for (const member of complexType.members) {
                        let variable = context.variableContext.getVariable(member.name);
                        if (variable == null || variable.variableSource == variableSource_4.VariableSource.Parameters)
                            continue;
                        if (variable.variableType == null || !((_a = variable.variableType) === null || _a === void 0 ? void 0 : _a.equals(member.type))) {
                            context.logger.fail(reference, `Invalid parameter mapping. Variable '${member.name}' of type '${variable.variableType}' can't be mapped to parameter '${member.name}' of type '${member.type}'.`);
                        }
                        else {
                            mapping.push(new mapping_2.Mapping(member.name, variable.variableType, variable.variableSource));
                        }
                    }
                    if (mapping.length == 0) {
                        context.logger.fail(reference, `Invalid parameter mapping. No parameter could be mapped from variables.`);
                    }
                }
                deriveReturnType(context) {
                    return new voidType_1.VoidType();
                }
                static create(reference, expression) {
                    return new ExtractResultsFunction(expression, reference);
                }
            };
            exports_115("ExtractResultsFunction", ExtractResultsFunction);
            ExtractResultsFunction.functionName = `extract`;
        }
    };
});
System.register("language/expressions/functions/builtInExpressionFunctions", ["language/expressions/parseExpressionFunctionsResult", "language/expressions/functions/intFunction", "language/expressions/functions/absFunction", "language/expressions/functions/powerFunction", "language/expressions/functions/roundFunction", "language/expressions/functions/nowFunction", "language/expressions/functions/todayFunction", "language/expressions/functions/yearFunction", "language/expressions/functions/monthFunction", "language/expressions/functions/dayFunction", "language/expressions/functions/hourFunction", "language/expressions/functions/minuteFunction", "language/expressions/functions/secondFunction", "language/expressions/functions/yearsFunction", "language/expressions/functions/monthsFunction", "language/expressions/functions/daysFunction", "language/expressions/functions/hoursFunction", "language/expressions/functions/minutesFunction", "language/expressions/functions/secondsFunction", "language/expressions/functions/lookupFunction", "language/expressions/functions/lookupRowFunction", "language/expressions/functions/newFunction", "language/expressions/functions/fillParametersFunction", "language/expressions/functions/extractResultsFunction"], function (exports_116, context_116) {
    "use strict";
    var parseExpressionFunctionsResult_3, intFunction_1, absFunction_1, powerFunction_1, roundFunction_1, nowFunction_1, todayFunction_1, yearFunction_1, monthFunction_1, dayFunction_1, hourFunction_1, minuteFunction_1, secondFunction_1, yearsFunction_1, monthsFunction_1, daysFunction_1, hoursFunction_1, minutesFunction_1, secondsFunction_1, lookupFunction_1, lookupRowFunction_1, newFunction_1, fillParametersFunction_1, extractResultsFunction_1, BuiltInExpressionFunctions;
    var __moduleName = context_116 && context_116.id;
    return {
        setters: [
            function (parseExpressionFunctionsResult_3_1) {
                parseExpressionFunctionsResult_3 = parseExpressionFunctionsResult_3_1;
            },
            function (intFunction_1_1) {
                intFunction_1 = intFunction_1_1;
            },
            function (absFunction_1_1) {
                absFunction_1 = absFunction_1_1;
            },
            function (powerFunction_1_1) {
                powerFunction_1 = powerFunction_1_1;
            },
            function (roundFunction_1_1) {
                roundFunction_1 = roundFunction_1_1;
            },
            function (nowFunction_1_1) {
                nowFunction_1 = nowFunction_1_1;
            },
            function (todayFunction_1_1) {
                todayFunction_1 = todayFunction_1_1;
            },
            function (yearFunction_1_1) {
                yearFunction_1 = yearFunction_1_1;
            },
            function (monthFunction_1_1) {
                monthFunction_1 = monthFunction_1_1;
            },
            function (dayFunction_1_1) {
                dayFunction_1 = dayFunction_1_1;
            },
            function (hourFunction_1_1) {
                hourFunction_1 = hourFunction_1_1;
            },
            function (minuteFunction_1_1) {
                minuteFunction_1 = minuteFunction_1_1;
            },
            function (secondFunction_1_1) {
                secondFunction_1 = secondFunction_1_1;
            },
            function (yearsFunction_1_1) {
                yearsFunction_1 = yearsFunction_1_1;
            },
            function (monthsFunction_1_1) {
                monthsFunction_1 = monthsFunction_1_1;
            },
            function (daysFunction_1_1) {
                daysFunction_1 = daysFunction_1_1;
            },
            function (hoursFunction_1_1) {
                hoursFunction_1 = hoursFunction_1_1;
            },
            function (minutesFunction_1_1) {
                minutesFunction_1 = minutesFunction_1_1;
            },
            function (secondsFunction_1_1) {
                secondsFunction_1 = secondsFunction_1_1;
            },
            function (lookupFunction_1_1) {
                lookupFunction_1 = lookupFunction_1_1;
            },
            function (lookupRowFunction_1_1) {
                lookupRowFunction_1 = lookupRowFunction_1_1;
            },
            function (newFunction_1_1) {
                newFunction_1 = newFunction_1_1;
            },
            function (fillParametersFunction_1_1) {
                fillParametersFunction_1 = fillParametersFunction_1_1;
            },
            function (extractResultsFunction_1_1) {
                extractResultsFunction_1 = extractResultsFunction_1_1;
            }
        ],
        execute: function () {
            BuiltInExpressionFunctions = class BuiltInExpressionFunctions {
                static parse(functionName, reference, argumentValues) {
                    for (let index = 0; index < this.values.length; index++) {
                        let functionValue = this.values[index];
                        if (functionValue.key == functionName) {
                            return functionValue.factory(functionName, reference, argumentValues);
                        }
                    }
                    return null;
                }
                static create0(factory) {
                    return function (name, reference, argumentValues) {
                        if (argumentValues.length != 0) {
                            return parseExpressionFunctionsResult_3.newParseExpressionFunctionsFailed(`Invalid number of arguments. No arguments expected.`);
                        }
                        const functionNode = factory(reference);
                        return parseExpressionFunctionsResult_3.newParseExpressionFunctionsSuccess(functionNode);
                    };
                }
                static create1(factory) {
                    return function (name, reference, argumentValues) {
                        if (argumentValues.length != 1) {
                            return parseExpressionFunctionsResult_3.newParseExpressionFunctionsFailed(`Invalid number of arguments. 1 argument expected.`);
                        }
                        let functionNode = factory(reference, argumentValues[0]);
                        return parseExpressionFunctionsResult_3.newParseExpressionFunctionsSuccess(functionNode);
                    };
                }
                static create2(factory) {
                    return function (name, reference, argumentValues) {
                        if (argumentValues.length != 2) {
                            return parseExpressionFunctionsResult_3.newParseExpressionFunctionsFailed(`Invalid number of arguments. 2 arguments expected.`);
                        }
                        let functionNode = factory(reference, argumentValues[0], argumentValues[1]);
                        return parseExpressionFunctionsResult_3.newParseExpressionFunctionsSuccess(functionNode);
                    };
                }
            };
            exports_116("BuiltInExpressionFunctions", BuiltInExpressionFunctions);
            BuiltInExpressionFunctions.values = [
                { key: intFunction_1.IntFunction.functionName, factory: BuiltInExpressionFunctions.create1(intFunction_1.IntFunction.create) },
                { key: absFunction_1.AbsFunction.functionName, factory: BuiltInExpressionFunctions.create1(absFunction_1.AbsFunction.create) },
                { key: powerFunction_1.PowerFunction.functionName, factory: BuiltInExpressionFunctions.create2(powerFunction_1.PowerFunction.create) },
                { key: roundFunction_1.RoundFunction.functionName, factory: BuiltInExpressionFunctions.create2(roundFunction_1.RoundFunction.create) },
                { key: nowFunction_1.NowFunction.functionName, factory: BuiltInExpressionFunctions.create0(nowFunction_1.NowFunction.create) },
                { key: todayFunction_1.TodayFunction.functionName, factory: BuiltInExpressionFunctions.create0(todayFunction_1.TodayFunction.create) },
                { key: yearFunction_1.YearFunction.functionName, factory: BuiltInExpressionFunctions.create1(yearFunction_1.YearFunction.create) },
                { key: monthFunction_1.MonthFunction.functionName, factory: BuiltInExpressionFunctions.create1(monthFunction_1.MonthFunction.create) },
                { key: dayFunction_1.DayFunction.functionName, factory: BuiltInExpressionFunctions.create1(dayFunction_1.DayFunction.create) },
                { key: hourFunction_1.HourFunction.functionName, factory: BuiltInExpressionFunctions.create1(hourFunction_1.HourFunction.create) },
                { key: minuteFunction_1.MinuteFunction.functionName, factory: BuiltInExpressionFunctions.create1(minuteFunction_1.MinuteFunction.create) },
                { key: secondFunction_1.SecondFunction.functionName, factory: BuiltInExpressionFunctions.create1(secondFunction_1.SecondFunction.create) },
                { key: yearsFunction_1.YearsFunction.functionName, factory: BuiltInExpressionFunctions.create2(yearsFunction_1.YearsFunction.create) },
                { key: monthsFunction_1.MonthsFunction.functionName, factory: BuiltInExpressionFunctions.create2(monthsFunction_1.MonthsFunction.create) },
                { key: daysFunction_1.DaysFunction.functionName, factory: BuiltInExpressionFunctions.create2(daysFunction_1.DaysFunction.create) },
                { key: hoursFunction_1.HoursFunction.functionName, factory: BuiltInExpressionFunctions.create2(hoursFunction_1.HoursFunction.create) },
                { key: minutesFunction_1.MinutesFunction.functionName, factory: BuiltInExpressionFunctions.create2(minutesFunction_1.MinutesFunction.create) },
                { key: secondsFunction_1.SecondsFunction.functionName, factory: BuiltInExpressionFunctions.create2(secondsFunction_1.SecondsFunction.create) },
                { key: lookupFunction_1.LookupFunction.functionName, factory: lookupFunction_1.LookupFunction.parse },
                { key: lookupRowFunction_1.LookupRowFunction.functionName, factory: lookupRowFunction_1.LookupRowFunction.parse },
                { key: newFunction_1.NewFunction.functionName, factory: BuiltInExpressionFunctions.create1(newFunction_1.NewFunction.create) },
                { key: fillParametersFunction_1.FillParametersFunction.functionName, factory: BuiltInExpressionFunctions.create1(fillParametersFunction_1.FillParametersFunction.create) },
                { key: extractResultsFunction_1.ExtractResultsFunction.functionName, factory: BuiltInExpressionFunctions.create1(extractResultsFunction_1.ExtractResultsFunction.create) }
            ];
        }
    };
});
System.register("language/expressions/functions/lexyFunction", ["language/expressions/functions/expressionFunction", "language/expressions/functions/fillParametersFunction", "language/expressions/functions/extractResultsFunction", "language/expressions/identifierExpression", "language/nodeType", "infrastructure/assert"], function (exports_117, context_117) {
    "use strict";
    var expressionFunction_11, fillParametersFunction_2, extractResultsFunction_2, identifierExpression_3, nodeType_45, assert_8, LexyFunction;
    var __moduleName = context_117 && context_117.id;
    function instanceOfLexyFunction(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_45.NodeType.LexyFunction;
    }
    exports_117("instanceOfLexyFunction", instanceOfLexyFunction);
    function asLexyFunction(object) {
        return instanceOfLexyFunction(object) ? object : null;
    }
    exports_117("asLexyFunction", asLexyFunction);
    return {
        setters: [
            function (expressionFunction_11_1) {
                expressionFunction_11 = expressionFunction_11_1;
            },
            function (fillParametersFunction_2_1) {
                fillParametersFunction_2 = fillParametersFunction_2_1;
            },
            function (extractResultsFunction_2_1) {
                extractResultsFunction_2 = extractResultsFunction_2_1;
            },
            function (identifierExpression_3_1) {
                identifierExpression_3 = identifierExpression_3_1;
            },
            function (nodeType_45_1) {
                nodeType_45 = nodeType_45_1;
            },
            function (assert_8_1) {
                assert_8 = assert_8_1;
            }
        ],
        execute: function () {
            LexyFunction = class LexyFunction extends expressionFunction_11.ExpressionFunction {
                get variableName() {
                    return this.variableNameValue;
                }
                get functionParametersType() {
                    return assert_8.Assert.notNull(this.functionParametersTypeValue, "functionParametersType");
                }
                get mappingParameters() {
                    return this.mappingParametersValue;
                }
                get mappingResults() {
                    return this.mappingResultsValue;
                }
                constructor(functionName, argumentValues, reference) {
                    super(reference);
                    this.variableNameValue = null;
                    this.functionParametersTypeValue = null;
                    this.functionResultsTypeValue = null;
                    this.hasNodeDependencies = true;
                    this.nodeType = nodeType_45.NodeType.LexyFunction;
                    this.mappingParametersValue = [];
                    this.mappingResultsValue = [];
                    this.functionName = functionName;
                    this.argumentValues = argumentValues;
                }
                getDependencies(rootNodeList) {
                    let functionNode = rootNodeList.getFunction(this.functionName);
                    return functionNode != null ? [functionNode] : [];
                }
                getChildren() {
                    return [...this.argumentValues];
                }
                validate(context) {
                    let functionNode = context.rootNodes.getFunction(this.functionName);
                    if (functionNode == null) {
                        context.logger.fail(this.reference, `Invalid function name: '${this.functionName}'`);
                        return;
                    }
                    if (this.argumentValues.length > 1) {
                        context.logger.fail(this.reference, `Invalid function argument: '${this.functionName}'. Should be 0 or 1`);
                        return;
                    }
                    if (this.argumentValues.length == 0) {
                        fillParametersFunction_2.FillParametersFunction.getMapping(this.reference, context, functionNode.getParametersType(context), this.mappingParametersValue);
                        extractResultsFunction_2.ExtractResultsFunction.getMapping(this.reference, context, functionNode.getResultsType(context), this.mappingResultsValue);
                        this.functionParametersTypeValue = functionNode.getParametersType(context);
                        this.functionResultsTypeValue = functionNode.getResultsType(context);
                        return;
                    }
                    let argumentType = this.argumentValues[0].deriveType(context);
                    let parametersType = functionNode.getParametersType(context);
                    if (argumentType == null || !argumentType.equals(parametersType)) {
                        context.logger.fail(this.reference, `Invalid function argument: '${this.functionName}'. ` +
                            `Argument should be of type function parameters. Use new(Function) of fill(Function) to create an variable of the function result type.`);
                    }
                    const identifierExpression = identifierExpression_3.asIdentifierExpression(this.argumentValues[0]);
                    this.variableNameValue = identifierExpression != null ? identifierExpression.identifier : null;
                }
                deriveReturnType(context) {
                    const functionNode = context.rootNodes.getFunction(this.functionName);
                    if (functionNode == null)
                        return null;
                    return functionNode.getResultsType(context);
                }
            };
            exports_117("LexyFunction", LexyFunction);
        }
    };
});
System.register("language/expressions/functionCallExpression", ["language/expressions/expression", "language/expressions/parseExpressionResult", "language/expressions/parenthesizedExpression", "language/expressions/argumentList", "language/expressions/functions/builtInExpressionFunctions", "parser/tokens/stringLiteralToken", "parser/tokens/operatorType", "language/expressions/functions/lexyFunction", "language/nodeType"], function (exports_118, context_118) {
    "use strict";
    var expression_13, parseExpressionResult_13, parenthesizedExpression_1, argumentList_1, builtInExpressionFunctions_1, stringLiteralToken_6, operatorType_11, lexyFunction_1, nodeType_46, FunctionCallExpression;
    var __moduleName = context_118 && context_118.id;
    function instanceOfFunctionCallExpression(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_46.NodeType.FunctionCallExpression;
    }
    exports_118("instanceOfFunctionCallExpression", instanceOfFunctionCallExpression);
    function asFunctionCallExpression(object) {
        return instanceOfFunctionCallExpression(object) ? object : null;
    }
    exports_118("asFunctionCallExpression", asFunctionCallExpression);
    return {
        setters: [
            function (expression_13_1) {
                expression_13 = expression_13_1;
            },
            function (parseExpressionResult_13_1) {
                parseExpressionResult_13 = parseExpressionResult_13_1;
            },
            function (parenthesizedExpression_1_1) {
                parenthesizedExpression_1 = parenthesizedExpression_1_1;
            },
            function (argumentList_1_1) {
                argumentList_1 = argumentList_1_1;
            },
            function (builtInExpressionFunctions_1_1) {
                builtInExpressionFunctions_1 = builtInExpressionFunctions_1_1;
            },
            function (stringLiteralToken_6_1) {
                stringLiteralToken_6 = stringLiteralToken_6_1;
            },
            function (operatorType_11_1) {
                operatorType_11 = operatorType_11_1;
            },
            function (lexyFunction_1_1) {
                lexyFunction_1 = lexyFunction_1_1;
            },
            function (nodeType_46_1) {
                nodeType_46 = nodeType_46_1;
            }
        ],
        execute: function () {
            FunctionCallExpression = class FunctionCallExpression extends expression_13.Expression {
                constructor(functionName, argumentValues, expressionFunction, source, reference) {
                    super(source, reference);
                    this.nodeType = nodeType_46.NodeType.FunctionCallExpression;
                    this.functionName = functionName;
                    this.arguments = argumentValues;
                    this.expressionFunction = expressionFunction;
                }
                static parse(source, factory) {
                    var _a;
                    let tokens = source.tokens;
                    if (!FunctionCallExpression.isValid(tokens))
                        return parseExpressionResult_13.newParseExpressionFailed("FunctionCallExpression", `Not valid.`);
                    let matchingClosingParenthesis = parenthesizedExpression_1.ParenthesizedExpression.findMatchingClosingParenthesis(tokens);
                    if (matchingClosingParenthesis == -1)
                        return parseExpressionResult_13.newParseExpressionFailed("FunctionCallExpression", `No closing parentheses found.`);
                    let functionName = tokens.tokenValue(0);
                    if (!functionName)
                        return parseExpressionResult_13.newParseExpressionFailed("FunctionCallExpression", "Invalid token.");
                    let innerExpressionTokens = tokens.tokensRange(2, matchingClosingParenthesis - 1);
                    let argumentsTokenList = argumentList_1.ArgumentList.parse(innerExpressionTokens);
                    if (argumentsTokenList.state != 'success')
                        return parseExpressionResult_13.newParseExpressionFailed("FunctionCallExpression", argumentsTokenList.errorMessage);
                    let argumentValues = new Array();
                    argumentsTokenList.result.forEach(argumentTokens => {
                        let argumentExpression = factory.parse(argumentTokens, source.line);
                        if (argumentExpression.state != 'success')
                            return argumentExpression;
                        argumentValues.push(argumentExpression.result);
                    });
                    let reference = source.createReference();
                    let builtInFunctionResult = builtInExpressionFunctions_1.BuiltInExpressionFunctions.parse(functionName, source.createReference(), argumentValues);
                    if (builtInFunctionResult != null && builtInFunctionResult.state != "success")
                        return parseExpressionResult_13.newParseExpressionFailed("FunctionCallExpression", builtInFunctionResult.errorMessage);
                    let expressionFunction = (_a = builtInFunctionResult === null || builtInFunctionResult === void 0 ? void 0 : builtInFunctionResult.result) !== null && _a !== void 0 ? _a : new lexyFunction_1.LexyFunction(functionName, argumentValues, source.createReference());
                    let expression = new FunctionCallExpression(functionName, argumentValues, expressionFunction, source, reference);
                    return parseExpressionResult_13.newParseExpressionSuccess(expression);
                }
                static isValid(tokens) {
                    return tokens.isTokenType(0, stringLiteralToken_6.StringLiteralToken)
                        && tokens.isOperatorToken(1, operatorType_11.OperatorType.OpenParentheses);
                }
                getChildren() {
                    return this.expressionFunction != null ? [this.expressionFunction] : [];
                }
                validate(context) {
                }
                deriveType(context) {
                    return this.expressionFunction != null ? this.expressionFunction.deriveReturnType(context) : null;
                }
            };
            exports_118("FunctionCallExpression", FunctionCallExpression);
        }
    };
});
System.register("language/expressions/expressionFactory", ["language/expressions/expressionSource", "language/expressions/parseExpressionResult", "language/expressions/ifExpression", "language/expressions/elseExpression", "language/expressions/switchExpression", "language/expressions/caseExpression", "language/expressions/variableDeclarationExpression", "language/expressions/assignmentExpression", "language/expressions/parenthesizedExpression", "language/expressions/bracketedExpression", "language/expressions/identifierExpression", "language/expressions/memberAccessExpression", "language/expressions/literalExpression", "language/expressions/binaryExpression", "language/expressions/functionCallExpression"], function (exports_119, context_119) {
    "use strict";
    var expressionSource_1, parseExpressionResult_14, ifExpression_1, elseExpression_2, switchExpression_1, caseExpression_2, variableDeclarationExpression_1, assignmentExpression_1, parenthesizedExpression_2, bracketedExpression_1, identifierExpression_4, memberAccessExpression_6, literalExpression_2, binaryExpression_1, functionCallExpression_1, ExpressionFactory;
    var __moduleName = context_119 && context_119.id;
    return {
        setters: [
            function (expressionSource_1_1) {
                expressionSource_1 = expressionSource_1_1;
            },
            function (parseExpressionResult_14_1) {
                parseExpressionResult_14 = parseExpressionResult_14_1;
            },
            function (ifExpression_1_1) {
                ifExpression_1 = ifExpression_1_1;
            },
            function (elseExpression_2_1) {
                elseExpression_2 = elseExpression_2_1;
            },
            function (switchExpression_1_1) {
                switchExpression_1 = switchExpression_1_1;
            },
            function (caseExpression_2_1) {
                caseExpression_2 = caseExpression_2_1;
            },
            function (variableDeclarationExpression_1_1) {
                variableDeclarationExpression_1 = variableDeclarationExpression_1_1;
            },
            function (assignmentExpression_1_1) {
                assignmentExpression_1 = assignmentExpression_1_1;
            },
            function (parenthesizedExpression_2_1) {
                parenthesizedExpression_2 = parenthesizedExpression_2_1;
            },
            function (bracketedExpression_1_1) {
                bracketedExpression_1 = bracketedExpression_1_1;
            },
            function (identifierExpression_4_1) {
                identifierExpression_4 = identifierExpression_4_1;
            },
            function (memberAccessExpression_6_1) {
                memberAccessExpression_6 = memberAccessExpression_6_1;
            },
            function (literalExpression_2_1) {
                literalExpression_2 = literalExpression_2_1;
            },
            function (binaryExpression_1_1) {
                binaryExpression_1 = binaryExpression_1_1;
            },
            function (functionCallExpression_1_1) {
                functionCallExpression_1 = functionCallExpression_1_1;
            }
        ],
        execute: function () {
            ExpressionFactory = class ExpressionFactory {
                parse(tokens, currentLine) {
                    for (let index = 0; index < ExpressionFactory.factories.length; index++) {
                        const factory = ExpressionFactory.factories[index];
                        if (factory.criteria(tokens)) {
                            let source = new expressionSource_1.ExpressionSource(currentLine, tokens);
                            return factory.factory(source, this);
                        }
                    }
                    return parseExpressionResult_14.newParseExpressionFailed("ExpressionFactory", `Invalid expression: ${tokens}`);
                }
            };
            exports_119("ExpressionFactory", ExpressionFactory);
            ExpressionFactory.factories = [
                { criteria: ifExpression_1.IfExpression.isValid, factory: ifExpression_1.IfExpression.parse },
                { criteria: elseExpression_2.ElseExpression.isValid, factory: elseExpression_2.ElseExpression.parse },
                { criteria: switchExpression_1.SwitchExpression.isValid, factory: switchExpression_1.SwitchExpression.parse },
                { criteria: caseExpression_2.CaseExpression.isValid, factory: caseExpression_2.CaseExpression.parse },
                { criteria: variableDeclarationExpression_1.VariableDeclarationExpression.isValid, factory: variableDeclarationExpression_1.VariableDeclarationExpression.parse },
                { criteria: assignmentExpression_1.AssignmentExpression.isValid, factory: assignmentExpression_1.AssignmentExpression.parse },
                { criteria: parenthesizedExpression_2.ParenthesizedExpression.isValid, factory: parenthesizedExpression_2.ParenthesizedExpression.parse },
                { criteria: bracketedExpression_1.BracketedExpression.isValid, factory: bracketedExpression_1.BracketedExpression.parse },
                { criteria: identifierExpression_4.IdentifierExpression.isValid, factory: identifierExpression_4.IdentifierExpression.parse },
                { criteria: memberAccessExpression_6.MemberAccessExpression.isValid, factory: memberAccessExpression_6.MemberAccessExpression.parse },
                { criteria: literalExpression_2.LiteralExpression.isValid, factory: literalExpression_2.LiteralExpression.parse },
                { criteria: binaryExpression_1.BinaryExpression.isValid, factory: binaryExpression_1.BinaryExpression.parse },
                { criteria: functionCallExpression_1.FunctionCallExpression.isValid, factory: functionCallExpression_1.FunctionCallExpression.parse }
            ];
        }
    };
});
System.register("language/functions/functionName", ["language/node", "parser/tokens/character", "language/nodeType", "infrastructure/assert"], function (exports_120, context_120) {
    "use strict";
    var node_8, character_9, nodeType_47, assert_9, FunctionName;
    var __moduleName = context_120 && context_120.id;
    return {
        setters: [
            function (node_8_1) {
                node_8 = node_8_1;
            },
            function (character_9_1) {
                character_9 = character_9_1;
            },
            function (nodeType_47_1) {
                nodeType_47 = nodeType_47_1;
            },
            function (assert_9_1) {
                assert_9 = assert_9_1;
            }
        ],
        execute: function () {
            FunctionName = class FunctionName extends node_8.Node {
                get value() {
                    return assert_9.Assert.notNull(this.valueValue, "value");
                }
                constructor(reference) {
                    super(reference);
                    this.valueValue = null;
                    this.nodeType = nodeType_47.NodeType.FunctionName;
                }
                parseName(name) {
                    this.valueValue = name;
                }
                getChildren() {
                    return [];
                }
                validate(context) {
                    if (character_9.isNullOrEmpty(this.value)) {
                        context.logger.fail(this.reference, `Invalid function name: '${this.value}'. Name should not be empty.`);
                    }
                    if (!character_9.isValidIdentifier(this.value))
                        context.logger.fail(this.reference, `Invalid function name: '${this.value}'.`);
                }
            };
            exports_120("FunctionName", FunctionName);
        }
    };
});
System.register("language/functions/functionParameters", ["language/parsableNode", "language/variableDefinition", "language/variableSource", "language/nodeType"], function (exports_121, context_121) {
    "use strict";
    var parsableNode_4, variableDefinition_2, variableSource_5, nodeType_48, FunctionParameters;
    var __moduleName = context_121 && context_121.id;
    return {
        setters: [
            function (parsableNode_4_1) {
                parsableNode_4 = parsableNode_4_1;
            },
            function (variableDefinition_2_1) {
                variableDefinition_2 = variableDefinition_2_1;
            },
            function (variableSource_5_1) {
                variableSource_5 = variableSource_5_1;
            },
            function (nodeType_48_1) {
                nodeType_48 = nodeType_48_1;
            }
        ],
        execute: function () {
            FunctionParameters = class FunctionParameters extends parsableNode_4.ParsableNode {
                get variables() {
                    return this.variablesValue;
                }
                constructor(reference) {
                    super(reference);
                    this.variablesValue = [];
                    this.nodeType = nodeType_48.NodeType.FunctionParameters;
                }
                parse(context) {
                    let variableDefinition = variableDefinition_2.VariableDefinition.parse(variableSource_5.VariableSource.Parameters, context);
                    if (variableDefinition != null)
                        this.variablesValue.push(variableDefinition);
                    return this;
                }
                getChildren() {
                    return [...this.variables];
                }
                validate(context) {
                }
            };
            exports_121("FunctionParameters", FunctionParameters);
        }
    };
});
System.register("language/functions/functionResults", ["language/variableDefinition", "language/parsableNode", "language/variableSource", "language/nodeType"], function (exports_122, context_122) {
    "use strict";
    var variableDefinition_3, parsableNode_5, variableSource_6, nodeType_49, FunctionResults;
    var __moduleName = context_122 && context_122.id;
    return {
        setters: [
            function (variableDefinition_3_1) {
                variableDefinition_3 = variableDefinition_3_1;
            },
            function (parsableNode_5_1) {
                parsableNode_5 = parsableNode_5_1;
            },
            function (variableSource_6_1) {
                variableSource_6 = variableSource_6_1;
            },
            function (nodeType_49_1) {
                nodeType_49 = nodeType_49_1;
            }
        ],
        execute: function () {
            FunctionResults = class FunctionResults extends parsableNode_5.ParsableNode {
                get variables() {
                    return this.variablesValue;
                }
                constructor(reference) {
                    super(reference);
                    this.variablesValue = [];
                    this.nodeType = nodeType_49.NodeType.FunctionResults;
                }
                parse(context) {
                    let variableDefinition = variableDefinition_3.VariableDefinition.parse(variableSource_6.VariableSource.Results, context);
                    if (variableDefinition == null)
                        return this;
                    if (variableDefinition.defaultExpression != null) {
                        context.logger.fail(this.reference, `Result variable '${variableDefinition.name}' should not have a default value.`);
                        return this;
                    }
                    this.variablesValue.push(variableDefinition);
                    return this;
                }
                getChildren() {
                    return [...this.variables];
                }
                validate(context) {
                }
            };
            exports_122("FunctionResults", FunctionResults);
        }
    };
});
System.register("language/functions/functionCode", ["language/parsableNode", "language/expressions/expressionList", "language/nodeType"], function (exports_123, context_123) {
    "use strict";
    var parsableNode_6, expressionList_4, nodeType_50, FunctionCode;
    var __moduleName = context_123 && context_123.id;
    return {
        setters: [
            function (parsableNode_6_1) {
                parsableNode_6 = parsableNode_6_1;
            },
            function (expressionList_4_1) {
                expressionList_4 = expressionList_4_1;
            },
            function (nodeType_50_1) {
                nodeType_50 = nodeType_50_1;
            }
        ],
        execute: function () {
            FunctionCode = class FunctionCode extends parsableNode_6.ParsableNode {
                get expressions() {
                    return this.expressionsValue.asArray();
                }
                constructor(reference, factory) {
                    super(reference);
                    this.nodeType = nodeType_50.NodeType.FunctionCode;
                    this.expressionsValue = new expressionList_4.ExpressionList(reference, factory);
                }
                parse(context) {
                    const expression = this.expressionsValue.parse(context);
                    if (expression.state != "success")
                        return this;
                    const parsableNode = parsableNode_6.asParsableNode(expression.result);
                    return parsableNode != null ? parsableNode : this;
                }
                getChildren() {
                    return this.expressionsValue.asArray();
                }
                validate(context) {
                }
            };
            exports_123("FunctionCode", FunctionCode);
        }
    };
});
System.register("language/nodesWalker", [], function (exports_124, context_124) {
    "use strict";
    var NodesWalker;
    var __moduleName = context_124 && context_124.id;
    return {
        setters: [],
        execute: function () {
            NodesWalker = class NodesWalker {
                static walkNodes(nodes, action) {
                    for (const node of nodes) {
                        NodesWalker.walk(node, action);
                    }
                }
                static walk(node, action) {
                    action(node);
                    let children = node.getChildren();
                    NodesWalker.walkNodes(children, action);
                }
                static walkWithBoolean(nodes, functionValue) {
                    for (const node of nodes) {
                        if (!functionValue(node))
                            return false;
                        let children = node.getChildren();
                        if (!NodesWalker.walkWithBoolean(children, functionValue))
                            return false;
                    }
                    return true;
                }
                static walkWithResult(nodes, action) {
                    let result = new Array();
                    NodesWalker.walkWithResultNodes(nodes, action, result);
                    return result;
                }
                static walkWithResultNode(node, action, result) {
                    let actionResult = action(node);
                    if (actionResult != null)
                        result.push(actionResult);
                    let children = node.getChildren();
                    NodesWalker.walkWithResultNodes(children, action, result);
                }
                static walkWithResultNodes(nodes, action, result) {
                    for (const node of nodes) {
                        NodesWalker.walkWithResultNode(node, action, result);
                    }
                }
            };
            exports_124("NodesWalker", NodesWalker);
        }
    };
});
System.register("language/functions/function", ["language/rootNode", "language/IHasNodeDependencies", "language/functions/functionName", "language/functions/functionParameters", "language/functions/functionResults", "language/functions/functionCode", "parser/Keywords", "parser/tokens/keywordToken", "infrastructure/enumerableExtensions", "language/variableTypes/customVariableDeclarationType", "language/variableTypes/complexType", "language/variableTypes/complexTypeMember", "language/variableTypes/complexTypeSource", "language/nodesWalker", "language/nodeType"], function (exports_125, context_125) {
    "use strict";
    var rootNode_3, IHasNodeDependencies_1, functionName_1, functionParameters_1, functionResults_1, functionCode_1, Keywords_8, keywordToken_2, enumerableExtensions_7, customVariableDeclarationType_3, complexType_5, complexTypeMember_1, complexTypeSource_1, nodesWalker_1, nodeType_51, Function;
    var __moduleName = context_125 && context_125.id;
    function instanceOfFunction(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_51.NodeType.Function;
    }
    exports_125("instanceOfFunction", instanceOfFunction);
    function asFunction(object) {
        return instanceOfFunction(object) ? object : null;
    }
    exports_125("asFunction", asFunction);
    return {
        setters: [
            function (rootNode_3_1) {
                rootNode_3 = rootNode_3_1;
            },
            function (IHasNodeDependencies_1_1) {
                IHasNodeDependencies_1 = IHasNodeDependencies_1_1;
            },
            function (functionName_1_1) {
                functionName_1 = functionName_1_1;
            },
            function (functionParameters_1_1) {
                functionParameters_1 = functionParameters_1_1;
            },
            function (functionResults_1_1) {
                functionResults_1 = functionResults_1_1;
            },
            function (functionCode_1_1) {
                functionCode_1 = functionCode_1_1;
            },
            function (Keywords_8_1) {
                Keywords_8 = Keywords_8_1;
            },
            function (keywordToken_2_1) {
                keywordToken_2 = keywordToken_2_1;
            },
            function (enumerableExtensions_7_1) {
                enumerableExtensions_7 = enumerableExtensions_7_1;
            },
            function (customVariableDeclarationType_3_1) {
                customVariableDeclarationType_3 = customVariableDeclarationType_3_1;
            },
            function (complexType_5_1) {
                complexType_5 = complexType_5_1;
            },
            function (complexTypeMember_1_1) {
                complexTypeMember_1 = complexTypeMember_1_1;
            },
            function (complexTypeSource_1_1) {
                complexTypeSource_1 = complexTypeSource_1_1;
            },
            function (nodesWalker_1_1) {
                nodesWalker_1 = nodesWalker_1_1;
            },
            function (nodeType_51_1) {
                nodeType_51 = nodeType_51_1;
            }
        ],
        execute: function () {
            Function = class Function extends rootNode_3.RootNode {
                get nodeName() {
                    return this.name.value;
                }
                constructor(name, reference, factory) {
                    super(reference);
                    this.hasNodeDependencies = true;
                    this.nodeType = nodeType_51.NodeType.Function;
                    this.name = new functionName_1.FunctionName(reference);
                    this.parameters = new functionParameters_1.FunctionParameters(reference);
                    this.results = new functionResults_1.FunctionResults(reference);
                    this.code = new functionCode_1.FunctionCode(reference, factory);
                    this.name.parseName(name);
                }
                getDependencies(rootNodeList) {
                    let result = new Array();
                    Function.addEnumTypes(rootNodeList, this.parameters.variables, result);
                    Function.addEnumTypes(rootNodeList, this.results.variables, result);
                    return result;
                }
                static create(name, reference, factory) {
                    return new Function(name, reference, factory);
                }
                parse(context) {
                    let line = context.line;
                    let name = line.tokens.tokenValue(0);
                    if (!line.tokens.isTokenType(0, keywordToken_2.KeywordToken))
                        return this.invalidToken(name, context);
                    switch (name) {
                        case Keywords_8.Keywords.Parameters:
                            return this.parameters;
                        case Keywords_8.Keywords.Results:
                            return this.results;
                        case Keywords_8.Keywords.Code:
                            return this.code;
                        default:
                            return this.invalidToken(name, context);
                    }
                }
                invalidToken(name, parserContext) {
                    parserContext.logger.fail(this.reference, `Invalid token '${name}'.`);
                    return this;
                }
                getFunctionAndDependencies(rootNodeList) {
                    let result = [this];
                    this.addDependentNodes(this, rootNodeList, result);
                    let processed = 0;
                    while (processed != result.length) {
                        processed = result.length;
                        for (const node of result) {
                            this.addDependentNodes(node, rootNodeList, result);
                        }
                    }
                    return result;
                }
                addDependentNodes(node, rootNodeList, result) {
                    Function.addNodeDependencies(node, rootNodeList, result);
                    let children = node.getChildren();
                    nodesWalker_1.NodesWalker.walkNodes(children, eachNode => Function.addNodeDependencies(eachNode, rootNodeList, result));
                }
                static addNodeDependencies(node, rootNodeList, result) {
                    const hasDependencies = IHasNodeDependencies_1.asHasNodeDependencies(node);
                    if (hasDependencies == null)
                        return;
                    let dependencies = hasDependencies.getDependencies(rootNodeList);
                    for (const dependency of dependencies) {
                        if (!enumerableExtensions_7.contains(result, dependency)) {
                            result.push(dependency);
                        }
                    }
                }
                static addEnumTypes(rootNodeList, variableDefinitions, result) {
                    for (const parameter of variableDefinitions) {
                        const enumVariableType = customVariableDeclarationType_3.asCustomVariableDeclarationType(parameter.type);
                        if (enumVariableType == null)
                            continue;
                        let dependency = rootNodeList.getEnum(enumVariableType.type);
                        if (dependency != null)
                            result.push(dependency);
                    }
                }
                validateTree(context) {
                    const scope = context.createVariableScope();
                    try {
                        super.validateTree(context);
                    }
                    finally {
                        scope[Symbol.dispose]();
                    }
                }
                getChildren() {
                    return [
                        this.name,
                        this.parameters,
                        this.results,
                        this.code
                    ];
                }
                validate(context) {
                }
                getParametersType(context) {
                    let members = this.parameters.variables
                        .map(parameter => new complexTypeMember_1.ComplexTypeMember(parameter.name, parameter.type.createVariableType(context)));
                    return new complexType_5.ComplexType(this.name.value, this, complexTypeSource_1.ComplexTypeSource.FunctionParameters, members);
                }
                getResultsType(context) {
                    let members = this.results.variables
                        .map(parameter => new complexTypeMember_1.ComplexTypeMember(parameter.name, parameter.type.createVariableType(context)));
                    return new complexType_5.ComplexType(this.name.value, this, complexTypeSource_1.ComplexTypeSource.FunctionResults, members);
                }
            };
            exports_125("Function", Function);
            Function.parameterName = `Parameters`;
            Function.resultsName = `Results`;
        }
    };
});
System.register("language/tables/tableName", ["infrastructure/assert"], function (exports_126, context_126) {
    "use strict";
    var assert_10, TableName;
    var __moduleName = context_126 && context_126.id;
    return {
        setters: [
            function (assert_10_1) {
                assert_10 = assert_10_1;
            }
        ],
        execute: function () {
            TableName = class TableName {
                constructor() {
                    this.valueValue = null;
                }
                get value() {
                    return assert_10.Assert.notNull(this.valueValue, "value");
                }
                parseName(parameter) {
                    this.valueValue = parameter;
                }
            };
            exports_126("TableName", TableName);
        }
    };
});
System.register("language/tables/columnHeader", ["language/node", "language/variableTypes/variableDeclarationTypeParser", "language/nodeType"], function (exports_127, context_127) {
    "use strict";
    var node_9, variableDeclarationTypeParser_3, nodeType_52, ColumnHeader;
    var __moduleName = context_127 && context_127.id;
    return {
        setters: [
            function (node_9_1) {
                node_9 = node_9_1;
            },
            function (variableDeclarationTypeParser_3_1) {
                variableDeclarationTypeParser_3 = variableDeclarationTypeParser_3_1;
            },
            function (nodeType_52_1) {
                nodeType_52 = nodeType_52_1;
            }
        ],
        execute: function () {
            ColumnHeader = class ColumnHeader extends node_9.Node {
                constructor(name, type, reference) {
                    super(reference);
                    this.nodeType = nodeType_52.NodeType.ColumnHeader;
                    this.name = name;
                    this.type = type;
                }
                static parse(name, typeName, reference) {
                    let type = variableDeclarationTypeParser_3.VariableDeclarationTypeParser.parse(typeName, reference);
                    return new ColumnHeader(name, type, reference);
                }
                getChildren() {
                    return [this.type];
                }
                validate(context) {
                }
            };
            exports_127("ColumnHeader", ColumnHeader);
        }
    };
});
System.register("language/tables/tableHeader", ["language/node", "language/tables/columnHeader", "infrastructure/enumerableExtensions", "language/nodeType", "parser/tokens/tokenType"], function (exports_128, context_128) {
    "use strict";
    var node_10, columnHeader_1, enumerableExtensions_8, nodeType_53, tokenType_14, TableHeader;
    var __moduleName = context_128 && context_128.id;
    return {
        setters: [
            function (node_10_1) {
                node_10 = node_10_1;
            },
            function (columnHeader_1_1) {
                columnHeader_1 = columnHeader_1_1;
            },
            function (enumerableExtensions_8_1) {
                enumerableExtensions_8 = enumerableExtensions_8_1;
            },
            function (nodeType_53_1) {
                nodeType_53 = nodeType_53_1;
            },
            function (tokenType_14_1) {
                tokenType_14 = tokenType_14_1;
            }
        ],
        execute: function () {
            TableHeader = class TableHeader extends node_10.Node {
                get columns() {
                    return this.columnsValue;
                }
                constructor(columns, reference) {
                    super(reference);
                    this.nodeType = nodeType_53.NodeType.TableHeader;
                    this.columnsValue = columns;
                }
                static parse(context) {
                    let index = 0;
                    let validator = context.validateTokens("TableHeader");
                    if (!validator.type(index, tokenType_14.TokenType.TableSeparatorToken).isValid)
                        return null;
                    let headers = new Array();
                    let tokens = context.line.tokens;
                    while (++index < tokens.length) {
                        if (!validator
                            .type(index, tokenType_14.TokenType.StringLiteralToken)
                            .type(index + 1, tokenType_14.TokenType.StringLiteralToken)
                            .type(index + 2, tokenType_14.TokenType.TableSeparatorToken)
                            .isValid)
                            return null;
                        let typeName = tokens.tokenValue(index);
                        let name = tokens.tokenValue(++index);
                        let reference = context.line.tokenReference(index);
                        if (typeName == null || name == null)
                            return null;
                        let header = columnHeader_1.ColumnHeader.parse(name, typeName, reference);
                        headers.push(header);
                        ++index;
                    }
                    return new TableHeader(headers, context.line.lineStartReference());
                }
                getChildren() {
                    return [...this.columnsValue];
                }
                validate(context) {
                }
                get(memberAccess) {
                    let parts = memberAccess.parts;
                    if (parts.length < 2)
                        return null;
                    let name = parts[1];
                    return enumerableExtensions_8.firstOrDefault(this.columnsValue, value => value.name == name);
                }
            };
            exports_128("TableHeader", TableHeader);
        }
    };
});
System.register("language/tables/tableRow", ["language/node", "parser/tokens/token", "parser/tokens/tokenList", "language/nodeType", "parser/tokens/tokenType"], function (exports_129, context_129) {
    "use strict";
    var node_11, token_6, tokenList_3, nodeType_54, tokenType_15, TableRow;
    var __moduleName = context_129 && context_129.id;
    return {
        setters: [
            function (node_11_1) {
                node_11 = node_11_1;
            },
            function (token_6_1) {
                token_6 = token_6_1;
            },
            function (tokenList_3_1) {
                tokenList_3 = tokenList_3_1;
            },
            function (nodeType_54_1) {
                nodeType_54 = nodeType_54_1;
            },
            function (tokenType_15_1) {
                tokenType_15 = tokenType_15_1;
            }
        ],
        execute: function () {
            TableRow = class TableRow extends node_11.Node {
                get values() {
                    return this.valuesValue;
                }
                constructor(values, reference) {
                    super(reference);
                    this.nodeType = nodeType_54.NodeType.TableRow;
                    this.valuesValue = values;
                }
                static parse(context) {
                    let index = 0;
                    let validator = context.validateTokens("TableRow");
                    if (!validator.type(index, tokenType_15.TokenType.TableSeparatorToken).isValid)
                        return null;
                    let tokens = new Array();
                    let currentLineTokens = context.line.tokens;
                    while (++index < currentLineTokens.length) {
                        let valid = !validator
                            .isLiteralToken(index)
                            .type(index + 1, tokenType_15.TokenType.TableSeparatorToken)
                            .isValid;
                        if (valid)
                            return null;
                        let token = currentLineTokens.token(index++, token_6.asToken);
                        if (token == null)
                            return null;
                        let expression = context.expressionFactory.parse(new tokenList_3.TokenList([token]), context.line);
                        if (expression.state == "failed") {
                            context.logger.fail(context.line.tokenReference(index), expression.errorMessage);
                            return null;
                        }
                        tokens.push(expression.result);
                    }
                    return new TableRow(tokens, context.line.lineStartReference());
                }
                getChildren() {
                    return [...this.values];
                }
                validate(context) {
                }
            };
            exports_129("TableRow", TableRow);
        }
    };
});
System.register("language/tables/table", ["language/rootNode", "language/tables/tableName", "language/tables/tableHeader", "language/tables/tableRow", "language/variableTypes/complexType", "language/variableTypes/complexTypeMember", "language/nodeType", "language/variableTypes/complexTypeSource"], function (exports_130, context_130) {
    "use strict";
    var rootNode_4, tableName_1, tableHeader_1, tableRow_1, complexType_6, complexTypeMember_2, nodeType_55, complexTypeSource_2, Table;
    var __moduleName = context_130 && context_130.id;
    function instanceOfTable(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_55.NodeType.Table;
    }
    exports_130("instanceOfTable", instanceOfTable);
    function asTable(object) {
        return instanceOfTable(object) ? object : null;
    }
    exports_130("asTable", asTable);
    return {
        setters: [
            function (rootNode_4_1) {
                rootNode_4 = rootNode_4_1;
            },
            function (tableName_1_1) {
                tableName_1 = tableName_1_1;
            },
            function (tableHeader_1_1) {
                tableHeader_1 = tableHeader_1_1;
            },
            function (tableRow_1_1) {
                tableRow_1 = tableRow_1_1;
            },
            function (complexType_6_1) {
                complexType_6 = complexType_6_1;
            },
            function (complexTypeMember_2_1) {
                complexTypeMember_2 = complexTypeMember_2_1;
            },
            function (nodeType_55_1) {
                nodeType_55 = nodeType_55_1;
            },
            function (complexTypeSource_2_1) {
                complexTypeSource_2 = complexTypeSource_2_1;
            }
        ],
        execute: function () {
            Table = class Table extends rootNode_4.RootNode {
                get header() {
                    return this.headerValue;
                }
                get rows() {
                    return this.rowsValue;
                }
                get nodeName() {
                    return this.name.value;
                }
                constructor(name, reference) {
                    super(reference);
                    this.nodeType = nodeType_55.NodeType.Table;
                    this.name = new tableName_1.TableName();
                    this.rowsValue = [];
                    this.headerValue = null;
                    this.name.parseName(name);
                }
                static parse(name, reference) {
                    return new Table(name, reference);
                }
                parse(context) {
                    if (this.isFirstLine()) {
                        this.headerValue = tableHeader_1.TableHeader.parse(context);
                    }
                    else {
                        const tableRow = tableRow_1.TableRow.parse(context);
                        if (tableRow != null)
                            this.rows.push(tableRow);
                    }
                    return this;
                }
                isFirstLine() {
                    return this.header == null;
                }
                getChildren() {
                    if (this.header != null) {
                        return [this.header, ...this.rows];
                    }
                    else {
                        return [...this.rows];
                    }
                }
                validate(context) {
                }
                validateTree(context) {
                    const scope = context.createVariableScope();
                    try {
                        super.validateTree(context);
                    }
                    finally {
                        scope[Symbol.dispose]();
                    }
                }
                getRowType(context) {
                    if (this.header == null)
                        throw new Error("Header not set.");
                    const members = this.header.columns.map(column => {
                        const type = column.type.createVariableType(context);
                        return new complexTypeMember_2.ComplexTypeMember(column.name, type);
                    });
                    return new complexType_6.ComplexType(this.name.value, this, complexTypeSource_2.ComplexTypeSource.TableRow, members);
                }
            };
            exports_130("Table", Table);
            Table.rowName = `Row`;
        }
    };
});
System.register("language/scenarios/scenarioName", ["language/node", "parser/tokens/character", "language/nodeType", "infrastructure/assert"], function (exports_131, context_131) {
    "use strict";
    var node_12, character_10, nodeType_56, assert_11, ScenarioName;
    var __moduleName = context_131 && context_131.id;
    return {
        setters: [
            function (node_12_1) {
                node_12 = node_12_1;
            },
            function (character_10_1) {
                character_10 = character_10_1;
            },
            function (nodeType_56_1) {
                nodeType_56 = nodeType_56_1;
            },
            function (assert_11_1) {
                assert_11 = assert_11_1;
            }
        ],
        execute: function () {
            ScenarioName = class ScenarioName extends node_12.Node {
                get value() {
                    return assert_11.Assert.notNull(this.valueValue, "value");
                }
                constructor(reference) {
                    super(reference);
                    this.valueValue = null;
                    this.nodeType = nodeType_56.NodeType.ScenarioName;
                }
                parseName(name) {
                    this.valueValue = name;
                }
                getChildren() {
                    return [];
                }
                validate(context) {
                    if (character_10.isNullOrEmpty(this.value)) {
                        context.logger.fail(this.reference, `Invalid scenario name: '${this.value}'. Name should not be empty.`);
                    }
                    if (!character_10.isValidIdentifier(this.value))
                        context.logger.fail(this.reference, `Invalid scenario name: '${this.value}'.`);
                }
                toString() {
                    return this.value;
                }
            };
            exports_131("ScenarioName", ScenarioName);
        }
    };
});
System.register("language/scenarios/scenarioExpectError", ["language/parsableNode", "parser/tokens/quotedLiteralToken", "language/nodeType", "infrastructure/assert"], function (exports_132, context_132) {
    "use strict";
    var parsableNode_7, quotedLiteralToken_2, nodeType_57, assert_12, ScenarioExpectError;
    var __moduleName = context_132 && context_132.id;
    return {
        setters: [
            function (parsableNode_7_1) {
                parsableNode_7 = parsableNode_7_1;
            },
            function (quotedLiteralToken_2_1) {
                quotedLiteralToken_2 = quotedLiteralToken_2_1;
            },
            function (nodeType_57_1) {
                nodeType_57 = nodeType_57_1;
            },
            function (assert_12_1) {
                assert_12 = assert_12_1;
            }
        ],
        execute: function () {
            ScenarioExpectError = class ScenarioExpectError extends parsableNode_7.ParsableNode {
                get message() {
                    return assert_12.Assert.notNull(this.messageValue, "message");
                }
                get hasValue() {
                    return this.messageValue != null;
                }
                constructor(reference) {
                    super(reference);
                    this.messageValue = null;
                    this.nodeType = nodeType_57.NodeType.ScenarioExpectError;
                }
                parse(context) {
                    let line = context.line;
                    let valid = context.validateTokens("ScenarioExpectError")
                        .count(2)
                        .keyword(0)
                        .quotedString(1)
                        .isValid;
                    if (!valid)
                        return this;
                    const token = line.tokens.token(1, quotedLiteralToken_2.asQuotedLiteralToken);
                    if (token == null)
                        throw new Error("No token.");
                    this.messageValue = token.value;
                    return this;
                }
                getChildren() {
                    return [];
                }
                validate(context) {
                }
            };
            exports_132("ScenarioExpectError", ScenarioExpectError);
        }
    };
});
System.register("language/scenarios/scenarioExpectRootErrors", ["language/parsableNode", "parser/tokens/quotedLiteralToken", "language/nodeType"], function (exports_133, context_133) {
    "use strict";
    var parsableNode_8, quotedLiteralToken_3, nodeType_58, ScenarioExpectRootErrors;
    var __moduleName = context_133 && context_133.id;
    return {
        setters: [
            function (parsableNode_8_1) {
                parsableNode_8 = parsableNode_8_1;
            },
            function (quotedLiteralToken_3_1) {
                quotedLiteralToken_3 = quotedLiteralToken_3_1;
            },
            function (nodeType_58_1) {
                nodeType_58 = nodeType_58_1;
            }
        ],
        execute: function () {
            ScenarioExpectRootErrors = class ScenarioExpectRootErrors extends parsableNode_8.ParsableNode {
                get messages() {
                    return this.messagesValue;
                }
                get hasValues() {
                    return this.messages.length > 0;
                }
                constructor(reference) {
                    super(reference);
                    this.messagesValue = [];
                    this.nodeType = nodeType_58.NodeType.ScenarioExpectRootErrors;
                }
                parse(context) {
                    let line = context.line;
                    let valid = context.validateTokens("ScenarioExpectError")
                        .count(1)
                        .quotedString(0)
                        .isValid;
                    if (!valid)
                        return this;
                    const token = line.tokens.token(0, quotedLiteralToken_3.asQuotedLiteralToken);
                    if (token == null)
                        throw new Error("No token found.");
                    this.messagesValue.push(token.value);
                    return this;
                }
                getChildren() {
                    return [];
                }
                validate(context) {
                }
            };
            exports_133("ScenarioExpectRootErrors", ScenarioExpectRootErrors);
        }
    };
});
System.register("language/scenarios/scenarioTable", ["language/parsableNode", "language/tables/tableHeader", "language/tables/tableRow", "language/nodeType"], function (exports_134, context_134) {
    "use strict";
    var parsableNode_9, tableHeader_2, tableRow_2, nodeType_59, ScenarioTable;
    var __moduleName = context_134 && context_134.id;
    return {
        setters: [
            function (parsableNode_9_1) {
                parsableNode_9 = parsableNode_9_1;
            },
            function (tableHeader_2_1) {
                tableHeader_2 = tableHeader_2_1;
            },
            function (tableRow_2_1) {
                tableRow_2 = tableRow_2_1;
            },
            function (nodeType_59_1) {
                nodeType_59 = nodeType_59_1;
            }
        ],
        execute: function () {
            ScenarioTable = class ScenarioTable extends parsableNode_9.ParsableNode {
                get rows() {
                    return this.rows;
                }
                get header() {
                    return this.headerValue;
                }
                constructor(reference) {
                    super(reference);
                    this.headerValue = null;
                    this.rowsValue = [];
                    this.nodeType = nodeType_59.NodeType.ScenarioTable;
                }
                parse(context) {
                    if (this.headerValue == null) {
                        this.headerValue = tableHeader_2.TableHeader.parse(context);
                        return this;
                    }
                    let row = tableRow_2.TableRow.parse(context);
                    if (row != null)
                        this.rowsValue.push(row);
                    return this;
                }
                getChildren() {
                    return this.headerValue != null ? [this.headerValue, ...this.rowsValue] : [...this.rowsValue];
                }
                validate(context) {
                }
            };
            exports_134("ScenarioTable", ScenarioTable);
        }
    };
});
System.register("language/scenarios/constantValue", [], function (exports_135, context_135) {
    "use strict";
    var ConstantValue;
    var __moduleName = context_135 && context_135.id;
    return {
        setters: [],
        execute: function () {
            ConstantValue = class ConstantValue {
                constructor(value) {
                    this.value = value;
                }
            };
            exports_135("ConstantValue", ConstantValue);
        }
    };
});
System.register("language/scenarios/variableReferenceParseResult", [], function (exports_136, context_136) {
    "use strict";
    var __moduleName = context_136 && context_136.id;
    function newVariableReferenceParseFailed(errorMessage) {
        return {
            state: "failed",
            errorMessage: errorMessage,
        };
    }
    exports_136("newVariableReferenceParseFailed", newVariableReferenceParseFailed);
    function newVariableReferenceParseSuccess(result) {
        return {
            state: "success",
            result: result
        };
    }
    exports_136("newVariableReferenceParseSuccess", newVariableReferenceParseSuccess);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("language/scenarios/variableReferenceParser", ["language/scenarios/variableReferenceParseResult", "language/variableReference", "language/expressions/memberAccessExpression", "language/expressions/literalExpression", "language/expressions/identifierExpression", "parser/tokens/stringLiteralToken"], function (exports_137, context_137) {
    "use strict";
    var variableReferenceParseResult_1, variableReference_3, memberAccessExpression_7, literalExpression_3, identifierExpression_5, stringLiteralToken_7, VariableReferenceParser;
    var __moduleName = context_137 && context_137.id;
    return {
        setters: [
            function (variableReferenceParseResult_1_1) {
                variableReferenceParseResult_1 = variableReferenceParseResult_1_1;
            },
            function (variableReference_3_1) {
                variableReference_3 = variableReference_3_1;
            },
            function (memberAccessExpression_7_1) {
                memberAccessExpression_7 = memberAccessExpression_7_1;
            },
            function (literalExpression_3_1) {
                literalExpression_3 = literalExpression_3_1;
            },
            function (identifierExpression_5_1) {
                identifierExpression_5 = identifierExpression_5_1;
            },
            function (stringLiteralToken_7_1) {
                stringLiteralToken_7 = stringLiteralToken_7_1;
            }
        ],
        execute: function () {
            VariableReferenceParser = class VariableReferenceParser {
                static parse(parts) {
                    let variableReference = new variableReference_3.VariableReference(parts);
                    return variableReferenceParseResult_1.newVariableReferenceParseSuccess(variableReference);
                }
                static parseExpression(expression) {
                    const memberAccessExpression = memberAccessExpression_7.asMemberAccessExpression(expression);
                    if (memberAccessExpression != null) {
                        return VariableReferenceParser.parseMemberAccessExpression(memberAccessExpression);
                    }
                    const literalExpression = literalExpression_3.asLiteralExpression(expression);
                    if (literalExpression != null) {
                        return VariableReferenceParser.parseLiteralExpression(literalExpression);
                    }
                    const identifierExpression = identifierExpression_5.asIdentifierExpression(expression);
                    if (identifierExpression != null) {
                        return variableReferenceParseResult_1.newVariableReferenceParseSuccess(new variableReference_3.VariableReference(identifierExpression.identifier.split(".")));
                    }
                    return variableReferenceParseResult_1.newVariableReferenceParseFailed(`Invalid constant value. Expected: 'Variable = ConstantValue'`);
                }
                static parseLiteralExpression(literalExpression) {
                    const stringLiteral = stringLiteralToken_7.asStringLiteralToken(literalExpression.literal);
                    if (stringLiteral != null) {
                        return variableReferenceParseResult_1.newVariableReferenceParseSuccess(new variableReference_3.VariableReference(stringLiteral.value.split(".")));
                    }
                    return variableReferenceParseResult_1.newVariableReferenceParseFailed(`Invalid expression literal. Expected: 'Variable = ConstantValue'`);
                }
                static parseMemberAccessExpression(memberAccessExpression) {
                    if (memberAccessExpression.memberAccessLiteral.parts.length == 0) {
                        return variableReferenceParseResult_1.newVariableReferenceParseFailed(`Invalid number of variable reference parts: ${memberAccessExpression.memberAccessLiteral.parts.length}`);
                    }
                    let variableReference = new variableReference_3.VariableReference(memberAccessExpression.memberAccessLiteral.parts);
                    return variableReferenceParseResult_1.newVariableReferenceParseSuccess(variableReference);
                }
            };
            exports_137("VariableReferenceParser", VariableReferenceParser);
        }
    };
});
System.register("language/scenarios/constantValueParseResult", [], function (exports_138, context_138) {
    "use strict";
    var __moduleName = context_138 && context_138.id;
    function newConstantValueParseFailed(errorMessage) {
        return {
            state: "failed",
            errorMessage: errorMessage
        };
    }
    exports_138("newConstantValueParseFailed", newConstantValueParseFailed);
    function newConstantValueParseSuccess(result) {
        return {
            state: "success",
            result: result
        };
    }
    exports_138("newConstantValueParseSuccess", newConstantValueParseSuccess);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("language/scenarios/constantValueParser", ["language/scenarios/constantValueParseResult", "language/expressions/literalExpression", "language/expressions/memberAccessExpression", "language/scenarios/constantValue"], function (exports_139, context_139) {
    "use strict";
    var constantValueParseResult_1, literalExpression_4, memberAccessExpression_8, constantValue_1, ConstantValueParser;
    var __moduleName = context_139 && context_139.id;
    return {
        setters: [
            function (constantValueParseResult_1_1) {
                constantValueParseResult_1 = constantValueParseResult_1_1;
            },
            function (literalExpression_4_1) {
                literalExpression_4 = literalExpression_4_1;
            },
            function (memberAccessExpression_8_1) {
                memberAccessExpression_8 = memberAccessExpression_8_1;
            },
            function (constantValue_1_1) {
                constantValue_1 = constantValue_1_1;
            }
        ],
        execute: function () {
            ConstantValueParser = class ConstantValueParser {
                static parse(expression) {
                    const literalExpression = literalExpression_4.asLiteralExpression(expression);
                    if (literalExpression != null) {
                        return this.parseLiteralExpression(literalExpression);
                    }
                    const memberAccessExpression = memberAccessExpression_8.asMemberAccessExpression(expression);
                    if (memberAccessExpression != null) {
                        return this.parseMemberAccessExpression(memberAccessExpression);
                    }
                    return constantValueParseResult_1.newConstantValueParseFailed(`Invalid expression variable. Expected: 'Variable = ConstantValue'`);
                }
                static parseLiteralExpression(literalExpression) {
                    let value = new constantValue_1.ConstantValue(literalExpression.literal.typedValue);
                    return constantValueParseResult_1.newConstantValueParseSuccess(value);
                }
                static parseMemberAccessExpression(literalExpression) {
                    return constantValueParseResult_1.newConstantValueParseSuccess(new constantValue_1.ConstantValue(literalExpression.memberAccessLiteral.value));
                }
            };
            exports_139("ConstantValueParser", ConstantValueParser);
        }
    };
});
System.register("language/scenarios/assignmentDefinition", ["language/node", "parser/tokens/operatorToken", "parser/tokens/operatorType", "language/scenarios/variableReferenceParser", "language/scenarios/constantValueParser", "language/nodeType", "infrastructure/assert"], function (exports_140, context_140) {
    "use strict";
    var node_13, operatorToken_3, operatorType_12, variableReferenceParser_1, constantValueParser_1, nodeType_60, assert_13, AssignmentDefinition;
    var __moduleName = context_140 && context_140.id;
    return {
        setters: [
            function (node_13_1) {
                node_13 = node_13_1;
            },
            function (operatorToken_3_1) {
                operatorToken_3 = operatorToken_3_1;
            },
            function (operatorType_12_1) {
                operatorType_12 = operatorType_12_1;
            },
            function (variableReferenceParser_1_1) {
                variableReferenceParser_1 = variableReferenceParser_1_1;
            },
            function (constantValueParser_1_1) {
                constantValueParser_1 = constantValueParser_1_1;
            },
            function (nodeType_60_1) {
                nodeType_60 = nodeType_60_1;
            },
            function (assert_13_1) {
                assert_13 = assert_13_1;
            }
        ],
        execute: function () {
            AssignmentDefinition = class AssignmentDefinition extends node_13.Node {
                get variableType() {
                    return assert_13.Assert.notNull(this.variableTypeValue, "variableType");
                }
                constructor(variable, constantValue, variableExpression, valueExpression, reference) {
                    super(reference);
                    this.nodeType = nodeType_60.NodeType.AssignmentDefinition;
                    this.variableTypeValue = null;
                    this.variable = variable;
                    this.constantValue = constantValue;
                    this.variableExpression = variableExpression;
                    this.valueExpression = valueExpression;
                }
                static parse(context) {
                    const line = context.line;
                    const tokens = line.tokens;
                    const reference = line.lineStartReference();
                    const assignmentIndex = tokens.find(token => token.type == operatorType_12.OperatorType.Assignment, operatorToken_3.OperatorToken);
                    if (assignmentIndex <= 0 || assignmentIndex == tokens.length - 1) {
                        context.logger.fail(reference, `Invalid assignment. Expected: 'Variable = Value'`);
                        return null;
                    }
                    const targetExpression = context.expressionFactory.parse(tokens.tokensFromStart(assignmentIndex), line);
                    if (targetExpression.state == "failed") {
                        context.logger.fail(reference, targetExpression.errorMessage);
                        return null;
                    }
                    const valueExpression = context.expressionFactory.parse(tokens.tokensFrom(assignmentIndex + 1), line);
                    if (valueExpression.state == "failed") {
                        context.logger.fail(reference, valueExpression.errorMessage);
                        return null;
                    }
                    const variableReference = variableReferenceParser_1.VariableReferenceParser.parseExpression(targetExpression.result);
                    if (variableReference.state == "failed") {
                        context.logger.fail(reference, variableReference.errorMessage);
                        return null;
                    }
                    const constantValue = constantValueParser_1.ConstantValueParser.parse(valueExpression.result);
                    if (constantValue.state == "failed") {
                        context.logger.fail(reference, constantValue.errorMessage);
                        return null;
                    }
                    return new AssignmentDefinition(variableReference.result, constantValue.result, targetExpression.result, valueExpression.result, reference);
                }
                getChildren() {
                    return [this.variableExpression, this.valueExpression];
                }
                validate(context) {
                    if (!context.variableContext.containsReference(this.variable, context))
                        return;
                    let expressionType = this.valueExpression.deriveType(context);
                    const variableTypeValue = context.variableContext.getVariableTypeByReference(this.variable, context);
                    if (variableTypeValue == null) {
                        context.logger.fail(this.reference, `Type of variable '${this.variable}' is unknown.`);
                        return;
                    }
                    this.variableTypeValue = variableTypeValue;
                    if (expressionType != null && !expressionType.equals(variableTypeValue)) {
                        context.logger.fail(this.reference, `Variable '${this.variable}' of type '${this.variableType}' is not assignable from expression of type '${expressionType}'.`);
                    }
                }
            };
            exports_140("AssignmentDefinition", AssignmentDefinition);
        }
    };
});
System.register("language/scenarios/scenarioResults", ["language/parsableNode", "language/scenarios/assignmentDefinition", "language/nodeType"], function (exports_141, context_141) {
    "use strict";
    var parsableNode_10, assignmentDefinition_1, nodeType_61, ScenarioResults;
    var __moduleName = context_141 && context_141.id;
    return {
        setters: [
            function (parsableNode_10_1) {
                parsableNode_10 = parsableNode_10_1;
            },
            function (assignmentDefinition_1_1) {
                assignmentDefinition_1 = assignmentDefinition_1_1;
            },
            function (nodeType_61_1) {
                nodeType_61 = nodeType_61_1;
            }
        ],
        execute: function () {
            ScenarioResults = class ScenarioResults extends parsableNode_10.ParsableNode {
                get assignments() {
                    return this.assignmentsValue;
                }
                constructor(reference) {
                    super(reference);
                    this.assignmentsValue = [];
                    this.nodeType = nodeType_61.NodeType.ScenarioResults;
                }
                parse(context) {
                    let assignment = assignmentDefinition_1.AssignmentDefinition.parse(context);
                    if (assignment != null)
                        this.assignmentsValue.push(assignment);
                    return this;
                }
                getChildren() {
                    return [...this.assignmentsValue];
                }
                validate(context) {
                }
            };
            exports_141("ScenarioResults", ScenarioResults);
        }
    };
});
System.register("language/scenarios/scenarioParameters", ["language/parsableNode", "language/scenarios/assignmentDefinition", "language/nodeType"], function (exports_142, context_142) {
    "use strict";
    var parsableNode_11, assignmentDefinition_2, nodeType_62, ScenarioParameters;
    var __moduleName = context_142 && context_142.id;
    return {
        setters: [
            function (parsableNode_11_1) {
                parsableNode_11 = parsableNode_11_1;
            },
            function (assignmentDefinition_2_1) {
                assignmentDefinition_2 = assignmentDefinition_2_1;
            },
            function (nodeType_62_1) {
                nodeType_62 = nodeType_62_1;
            }
        ],
        execute: function () {
            ScenarioParameters = class ScenarioParameters extends parsableNode_11.ParsableNode {
                get assignments() {
                    return this.assignmentsValue;
                }
                constructor(reference) {
                    super(reference);
                    this.assignmentsValue = [];
                    this.nodeType = nodeType_62.NodeType.ScenarioParameters;
                }
                parse(context) {
                    let assignment = assignmentDefinition_2.AssignmentDefinition.parse(context);
                    if (assignment != null)
                        this.assignmentsValue.push(assignment);
                    return this;
                }
                getChildren() {
                    return [...this.assignmentsValue];
                }
                validate(context) {
                }
            };
            exports_142("ScenarioParameters", ScenarioParameters);
        }
    };
});
System.register("language/scenarios/scenarioFunctionName", ["language/node", "parser/tokens/character", "language/nodeType", "infrastructure/assert"], function (exports_143, context_143) {
    "use strict";
    var node_14, character_11, nodeType_63, assert_14, ScenarioFunctionName;
    var __moduleName = context_143 && context_143.id;
    return {
        setters: [
            function (node_14_1) {
                node_14 = node_14_1;
            },
            function (character_11_1) {
                character_11 = character_11_1;
            },
            function (nodeType_63_1) {
                nodeType_63 = nodeType_63_1;
            },
            function (assert_14_1) {
                assert_14 = assert_14_1;
            }
        ],
        execute: function () {
            ScenarioFunctionName = class ScenarioFunctionName extends node_14.Node {
                get hasValue() {
                    return this.valueValue != null;
                }
                get value() {
                    return assert_14.Assert.notNull(this.valueValue, "value");
                }
                constructor(reference) {
                    super(reference);
                    this.valueValue = null;
                    this.nodeType = nodeType_63.NodeType.ScenarioFunctionName;
                }
                parse(context) {
                    const name = context.line.tokens.tokenValue(1);
                    if (!name) {
                        context.logger.fail(this.reference, "No function functionName found. Use 'Function:' for inline functions.");
                        return;
                    }
                    this.valueValue = name;
                }
                getChildren() {
                    return [];
                }
                validate(context) {
                    if (!character_11.isNullOrEmpty(this.valueValue) && !character_11.isValidIdentifier(this.valueValue)) {
                        context.logger.fail(this.reference, `Invalid scenario name: '${this.valueValue}'.`);
                    }
                }
                isEmpty() {
                    return character_11.isNullOrEmpty(this.valueValue);
                }
                toString() {
                    return this.valueValue;
                }
            };
            exports_143("ScenarioFunctionName", ScenarioFunctionName);
        }
    };
});
System.register("language/scenarios/scenario", ["language/functions/function", "language/rootNode", "language/scenarios/scenarioName", "language/enums/enumDefinition", "language/tables/table", "language/scenarios/scenarioExpectError", "language/scenarios/scenarioExpectRootErrors", "language/scenarios/scenarioTable", "language/scenarios/scenarioResults", "language/scenarios/scenarioParameters", "language/scenarios/scenarioFunctionName", "parser/nodeName", "parser/tokens/keywordToken", "parser/Keywords", "language/variableSource", "language/nodeType"], function (exports_144, context_144) {
    "use strict";
    var function_2, rootNode_5, scenarioName_1, enumDefinition_1, table_1, scenarioExpectError_1, scenarioExpectRootErrors_1, scenarioTable_1, scenarioResults_1, scenarioParameters_1, scenarioFunctionName_1, nodeName_1, keywordToken_3, Keywords_9, variableSource_7, nodeType_64, Scenario;
    var __moduleName = context_144 && context_144.id;
    function instanceOfScenario(object) {
        return (object === null || object === void 0 ? void 0 : object.nodeType) == nodeType_64.NodeType.Scenario;
    }
    exports_144("instanceOfScenario", instanceOfScenario);
    function asScenario(object) {
        return instanceOfScenario(object) ? object : null;
    }
    exports_144("asScenario", asScenario);
    return {
        setters: [
            function (function_2_1) {
                function_2 = function_2_1;
            },
            function (rootNode_5_1) {
                rootNode_5 = rootNode_5_1;
            },
            function (scenarioName_1_1) {
                scenarioName_1 = scenarioName_1_1;
            },
            function (enumDefinition_1_1) {
                enumDefinition_1 = enumDefinition_1_1;
            },
            function (table_1_1) {
                table_1 = table_1_1;
            },
            function (scenarioExpectError_1_1) {
                scenarioExpectError_1 = scenarioExpectError_1_1;
            },
            function (scenarioExpectRootErrors_1_1) {
                scenarioExpectRootErrors_1 = scenarioExpectRootErrors_1_1;
            },
            function (scenarioTable_1_1) {
                scenarioTable_1 = scenarioTable_1_1;
            },
            function (scenarioResults_1_1) {
                scenarioResults_1 = scenarioResults_1_1;
            },
            function (scenarioParameters_1_1) {
                scenarioParameters_1 = scenarioParameters_1_1;
            },
            function (scenarioFunctionName_1_1) {
                scenarioFunctionName_1 = scenarioFunctionName_1_1;
            },
            function (nodeName_1_1) {
                nodeName_1 = nodeName_1_1;
            },
            function (keywordToken_3_1) {
                keywordToken_3 = keywordToken_3_1;
            },
            function (Keywords_9_1) {
                Keywords_9 = Keywords_9_1;
            },
            function (variableSource_7_1) {
                variableSource_7 = variableSource_7_1;
            },
            function (nodeType_64_1) {
                nodeType_64 = nodeType_64_1;
            }
        ],
        execute: function () {
            Scenario = class Scenario extends rootNode_5.RootNode {
                get functionNode() {
                    return this.functionNodeValue;
                }
                get enum() {
                    return this.enumValue;
                }
                get table() {
                    return this.tableValue;
                }
                get nodeName() {
                    return this.name.value;
                }
                constructor(name, reference) {
                    super(reference);
                    this.nodeType = nodeType_64.NodeType.Scenario;
                    this.functionNodeValue = null;
                    this.enumValue = null;
                    this.tableValue = null;
                    this.name = new scenarioName_1.ScenarioName(reference);
                    this.functionName = new scenarioFunctionName_1.ScenarioFunctionName(reference);
                    this.parameters = new scenarioParameters_1.ScenarioParameters(reference);
                    this.results = new scenarioResults_1.ScenarioResults(reference);
                    this.validationTable = new scenarioTable_1.ScenarioTable(reference);
                    this.expectError = new scenarioExpectError_1.ScenarioExpectError(reference);
                    this.expectRootErrors = new scenarioExpectRootErrors_1.ScenarioExpectRootErrors(reference);
                    this.name.parseName(name);
                }
                static parse(name, reference) {
                    return new Scenario(name, reference);
                }
                parse(context) {
                    let line = context.line;
                    let name = line.tokens.tokenValue(0);
                    let reference = line.lineStartReference();
                    if (!line.tokens.isTokenType(0, keywordToken_3.KeywordToken)) {
                        context.logger.fail(reference, `Invalid token '${name}'. Keyword expected.`);
                        return this;
                    }
                    switch (name) {
                        case Keywords_9.Keywords.FunctionKeyword:
                            return this.parseFunction(context, reference);
                        case Keywords_9.Keywords.EnumKeyword:
                            return this.parseEnum(context, reference);
                        case Keywords_9.Keywords.TableKeyword:
                            return this.parseTable(context, reference);
                        case Keywords_9.Keywords.Function:
                            return this.resetRootNode(context, this.parseFunctionName(context));
                        case Keywords_9.Keywords.Parameters:
                            return this.resetRootNode(context, this.parameters);
                        case Keywords_9.Keywords.Results:
                            return this.resetRootNode(context, this.results);
                        case Keywords_9.Keywords.ValidationTable:
                            return this.resetRootNode(context, this.validationTable);
                        case Keywords_9.Keywords.ExpectError:
                            return this.resetRootNode(context, this.expectError.parse(context));
                        case Keywords_9.Keywords.ExpectRootErrors:
                            return this.resetRootNode(context, this.expectRootErrors);
                        default:
                            return this.invalidToken(context, name, reference);
                    }
                }
                resetRootNode(parserContext, node) {
                    parserContext.logger.setCurrentNode(this);
                    return node;
                }
                parseFunctionName(context) {
                    this.functionName.parse(context);
                    return this;
                }
                parseFunction(context, reference) {
                    if (this.functionNodeValue != null) {
                        context.logger.fail(reference, `Duplicated inline Function '${this.nodeName}'.`);
                        return this.functionNodeValue;
                    }
                    let tokenName = nodeName_1.NodeName.parse(context);
                    if (tokenName != null && tokenName.name != null) {
                        context.logger.fail(context.line.tokenReference(1), `Unexpected function name. Inline function should not have a name: '${tokenName.name}'`);
                    }
                    this.functionNodeValue = function_2.Function.create(`${this.name.value}Function`, reference, context.expressionFactory);
                    context.logger.setCurrentNode(this.functionNodeValue);
                    return this.functionNodeValue;
                }
                parseEnum(context, reference) {
                    if (this.enum != null) {
                        context.logger.fail(reference, `Duplicated inline Enum '${this.nodeName}'.`);
                        return this.enum;
                    }
                    let tokenName = nodeName_1.NodeName.parse(context);
                    if (tokenName == null || tokenName.name == null)
                        return this;
                    this.enumValue = enumDefinition_1.EnumDefinition.parse(tokenName.name, reference);
                    context.logger.setCurrentNode(this.enumValue);
                    return this.enumValue;
                }
                parseTable(context, reference) {
                    if (this.table != null) {
                        context.logger.fail(reference, `Duplicated inline Enum '${this.nodeName}'.`);
                        return this.table;
                    }
                    let tokenName = nodeName_1.NodeName.parse(context);
                    if (tokenName == null || tokenName.name == null)
                        return this;
                    this.tableValue = table_1.Table.parse(tokenName.name, reference);
                    context.logger.setCurrentNode(this.tableValue);
                    return this.tableValue;
                }
                invalidToken(context, name, reference) {
                    context.logger.fail(reference, `Invalid token '${name}'.`);
                    return this;
                }
                getChildren() {
                    const result = [];
                    if (this.functionNodeValue != null)
                        result.push(this.functionNodeValue);
                    if (this.enumValue != null)
                        result.push(this.enumValue);
                    if (this.tableValue != null)
                        result.push(this.tableValue);
                    return [
                        ...result,
                        this.name,
                        this.functionName,
                        this.parameters,
                        this.results,
                        this.validationTable,
                        this.expectError,
                        this.expectRootErrors
                    ];
                }
                validateNodeTree(context, child) {
                    if (child === this.parameters || child === this.results) {
                        this.validateParameterOrResultNode(context, child);
                        return;
                    }
                    super.validateNodeTree(context, child);
                }
                validateParameterOrResultNode(context, child) {
                    const scope = context.createVariableScope();
                    try {
                        this.addFunctionParametersAndResultsForValidation(context);
                        super.validateNodeTree(context, child);
                    }
                    finally {
                        scope[Symbol.dispose]();
                    }
                }
                addFunctionParametersAndResultsForValidation(context) {
                    var _a;
                    let functionNode = (_a = this.functionNode) !== null && _a !== void 0 ? _a : (this.functionName.hasValue ? context.rootNodes.getFunction(this.functionName.value) : null);
                    if (functionNode == null)
                        return;
                    Scenario.addVariablesForValidation(context, functionNode.parameters.variables, variableSource_7.VariableSource.Parameters);
                    Scenario.addVariablesForValidation(context, functionNode.results.variables, variableSource_7.VariableSource.Results);
                }
                static addVariablesForValidation(context, definitions, source) {
                    for (const definition of definitions) {
                        let variableType = definition.type.createVariableType(context);
                        if (variableType == null)
                            continue;
                        context.variableContext.addVariable(definition.name, variableType, source);
                    }
                }
                validate(context) {
                    if (this.functionName.isEmpty() && this.functionNode == null && this.enum == null && this.table == null && !this.expectRootErrors.hasValues) {
                        context.logger.fail(this.reference, `Scenario has no function, enum, table or expect errors.`);
                    }
                }
            };
            exports_144("Scenario", Scenario);
        }
    };
});
System.register("language/variableTypes/tableType", ["language/variableTypes/typeWithMembers", "language/tables/table", "language/variableTypes/primitiveType", "language/variableTypes/variableTypeName"], function (exports_145, context_145) {
    "use strict";
    var typeWithMembers_3, table_2, primitiveType_20, variableTypeName_7, TableType;
    var __moduleName = context_145 && context_145.id;
    function instanceOfTableType(object) {
        return (object === null || object === void 0 ? void 0 : object.variableTypeName) == variableTypeName_7.VariableTypeName.TableType;
    }
    exports_145("instanceOfTableType", instanceOfTableType);
    function asTableType(object) {
        return instanceOfTableType(object) ? object : null;
    }
    exports_145("asTableType", asTableType);
    return {
        setters: [
            function (typeWithMembers_3_1) {
                typeWithMembers_3 = typeWithMembers_3_1;
            },
            function (table_2_1) {
                table_2 = table_2_1;
            },
            function (primitiveType_20_1) {
                primitiveType_20 = primitiveType_20_1;
            },
            function (variableTypeName_7_1) {
                variableTypeName_7 = variableTypeName_7_1;
            }
        ],
        execute: function () {
            TableType = class TableType extends typeWithMembers_3.TypeWithMembers {
                constructor(tableName, table) {
                    super();
                    this.variableTypeName = variableTypeName_7.VariableTypeName.TableType;
                    this.tableName = tableName;
                    this.table = table;
                }
                equals(other) {
                    return other != null && instanceOfTableType(other) && this.tableName == other.tableName;
                }
                toString() {
                    return this.tableName;
                }
                memberType(name, context) {
                    if (name == `Count`)
                        return primitiveType_20.PrimitiveType.number;
                    if (name == table_2.Table.rowName)
                        return this.tableRowType(context);
                    return null;
                }
                tableRowType(context) {
                    var _a;
                    let complexType = (_a = context.rootNodes.getTable(this.tableName)) === null || _a === void 0 ? void 0 : _a.getRowType(context);
                    return !!complexType ? complexType : null;
                }
            };
            exports_145("TableType", TableType);
        }
    };
});
System.register("language/variableTypes/functionType", ["language/variableTypes/typeWithMembers", "language/functions/function", "language/variableTypes/variableTypeName"], function (exports_146, context_146) {
    "use strict";
    var typeWithMembers_4, function_3, variableTypeName_8, FunctionType;
    var __moduleName = context_146 && context_146.id;
    function instanceOfFunctionType(object) {
        return (object === null || object === void 0 ? void 0 : object.variableTypeName) == variableTypeName_8.VariableTypeName.EnumType;
    }
    exports_146("instanceOfFunctionType", instanceOfFunctionType);
    function asFunctionType(object) {
        return instanceOfFunctionType(object) ? object : null;
    }
    exports_146("asFunctionType", asFunctionType);
    return {
        setters: [
            function (typeWithMembers_4_1) {
                typeWithMembers_4 = typeWithMembers_4_1;
            },
            function (function_3_1) {
                function_3 = function_3_1;
            },
            function (variableTypeName_8_1) {
                variableTypeName_8 = variableTypeName_8_1;
            }
        ],
        execute: function () {
            FunctionType = class FunctionType extends typeWithMembers_4.TypeWithMembers {
                constructor(type, functionValue) {
                    super();
                    this.variableTypeName = variableTypeName_8.VariableTypeName.FunctionType;
                    this.type = type;
                    this.functionValue = functionValue;
                }
                equals(other) {
                    return other != null && instanceOfFunctionType(other) && this.type == other.type;
                }
                toString() {
                    return this.type;
                }
                memberType(name, context) {
                    if (name == function_3.Function.parameterName)
                        return this.functionParametersType(context);
                    if (name == function_3.Function.resultsName)
                        return this.functionResultsType(context);
                    return null;
                }
                functionParametersType(context) {
                    var _a;
                    const resultsType = (_a = context.rootNodes.getFunction(this.type)) === null || _a === void 0 ? void 0 : _a.getParametersType(context);
                    return !!resultsType ? resultsType : null;
                }
                functionResultsType(context) {
                    var _a;
                    const resultsType = (_a = context.rootNodes.getFunction(this.type)) === null || _a === void 0 ? void 0 : _a.getResultsType(context);
                    return !!resultsType ? resultsType : null;
                }
            };
            exports_146("FunctionType", FunctionType);
        }
    };
});
System.register("language/rootNodeList", ["language/functions/function", "language/tables/table", "language/enums/enumDefinition", "infrastructure/enumerableExtensions", "language/types/typeDefinition", "language/scenarios/scenario", "language/variableTypes/tableType", "language/variableTypes/functionType", "language/variableTypes/enumType", "language/variableTypes/customType"], function (exports_147, context_147) {
    "use strict";
    var function_4, table_3, enumDefinition_2, enumerableExtensions_9, typeDefinition_1, scenario_1, tableType_1, functionType_1, enumType_2, customType_2, RootNodeList;
    var __moduleName = context_147 && context_147.id;
    return {
        setters: [
            function (function_4_1) {
                function_4 = function_4_1;
            },
            function (table_3_1) {
                table_3 = table_3_1;
            },
            function (enumDefinition_2_1) {
                enumDefinition_2 = enumDefinition_2_1;
            },
            function (enumerableExtensions_9_1) {
                enumerableExtensions_9 = enumerableExtensions_9_1;
            },
            function (typeDefinition_1_1) {
                typeDefinition_1 = typeDefinition_1_1;
            },
            function (scenario_1_1) {
                scenario_1 = scenario_1_1;
            },
            function (tableType_1_1) {
                tableType_1 = tableType_1_1;
            },
            function (functionType_1_1) {
                functionType_1 = functionType_1_1;
            },
            function (enumType_2_1) {
                enumType_2 = enumType_2_1;
            },
            function (customType_2_1) {
                customType_2 = customType_2_1;
            }
        ],
        execute: function () {
            RootNodeList = class RootNodeList {
                constructor() {
                    this.values = [];
                }
                get length() {
                    return this.values.length;
                }
                asArray() {
                    return [...this.values];
                }
                add(rootNode) {
                    this.values.push(rootNode);
                }
                containsEnum(enumName) {
                    return enumerableExtensions_9.any(this.values, definition => enumDefinition_2.instanceOfEnumDefinition(definition) && definition.nodeName == enumName);
                }
                getNode(name) {
                    if (name == null)
                        return null;
                    return enumerableExtensions_9.firstOrDefault(this.values, definition => definition.nodeName == name);
                }
                contains(name) {
                    return enumerableExtensions_9.any(this.values, definition => definition.nodeName == name);
                }
                getFunction(name) {
                    return function_4.asFunction(enumerableExtensions_9.firstOrDefault(this.values, functionValue => function_4.instanceOfFunction(functionValue) && functionValue.nodeName == name));
                }
                getTable(name) {
                    return table_3.asTable(enumerableExtensions_9.firstOrDefault(this.values, table => table_3.instanceOfTable(table) && table.nodeName == name));
                }
                getCustomType(name) {
                    return typeDefinition_1.asTypeDefinition(enumerableExtensions_9.firstOrDefault(this.values, type => typeDefinition_1.instanceOfTypeDefinition(type) && type.nodeName == name));
                }
                getScenarios() {
                    return enumerableExtensions_9.where(this.values, value => scenario_1.instanceOfScenario(value))
                        .map(value => scenario_1.asScenario(value));
                }
                getEnum(name) {
                    return enumDefinition_2.asEnumDefinition(enumerableExtensions_9.firstOrDefault(this.values, value => enumDefinition_2.instanceOfEnumDefinition(value) && (value === null || value === void 0 ? void 0 : value.nodeName) == name));
                }
                addIfNew(node) {
                    if (!enumerableExtensions_9.contains(this.values, node))
                        this.values.push(node);
                }
                first() {
                    return enumerableExtensions_9.firstOrDefault(this.values);
                }
                getType(name) {
                    let node = this.getNode(name);
                    let table = table_3.asTable(node);
                    if (table != null)
                        return new tableType_1.TableType(name, table);
                    let functionValue = function_4.asFunction(node);
                    if (functionValue != null)
                        return new functionType_1.FunctionType(name, functionValue);
                    let enumDefinition = enumDefinition_2.asEnumDefinition(node);
                    if (enumDefinition != null)
                        return new enumType_2.EnumType(name, enumDefinition);
                    let typeDefinition = typeDefinition_1.asTypeDefinition(node);
                    if (typeDefinition != null)
                        return new customType_2.CustomType(name, typeDefinition);
                    return null;
                }
            };
            exports_147("RootNodeList", RootNodeList);
        }
    };
});
System.register("language/variableTypes/variableType", [], function (exports_148, context_148) {
    "use strict";
    var VariableType;
    var __moduleName = context_148 && context_148.id;
    return {
        setters: [],
        execute: function () {
            VariableType = class VariableType {
                getDependencies(rootNodeList) {
                    return [];
                }
            };
            exports_148("VariableType", VariableType);
        }
    };
});
System.register("language/variableTypes/ITypeWithMembers", [], function (exports_149, context_149) {
    "use strict";
    var __moduleName = context_149 && context_149.id;
    function instanceOfTypeWithMembers(object) {
        return (object === null || object === void 0 ? void 0 : object.typeWithMember) == true;
    }
    exports_149("instanceOfTypeWithMembers", instanceOfTypeWithMembers);
    function asTypeWithMembers(object) {
        return instanceOfTypeWithMembers(object) ? object : null;
    }
    exports_149("asTypeWithMembers", asTypeWithMembers);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("parser/variableEntry", [], function (exports_150, context_150) {
    "use strict";
    var VariableEntry;
    var __moduleName = context_150 && context_150.id;
    return {
        setters: [],
        execute: function () {
            VariableEntry = class VariableEntry {
                constructor(variableType, variableSource) {
                    this.variableType = variableType;
                    this.variableSource = variableSource;
                }
            };
            exports_150("VariableEntry", VariableEntry);
        }
    };
});
System.register("parser/variableContext", ["parser/variableEntry", "language/variableTypes/ITypeWithMembers"], function (exports_151, context_151) {
    "use strict";
    var variableEntry_1, ITypeWithMembers_4, VariableContext;
    var __moduleName = context_151 && context_151.id;
    return {
        setters: [
            function (variableEntry_1_1) {
                variableEntry_1 = variableEntry_1_1;
            },
            function (ITypeWithMembers_4_1) {
                ITypeWithMembers_4 = ITypeWithMembers_4_1;
            }
        ],
        execute: function () {
            VariableContext = class VariableContext {
                constructor(logger, parentContext) {
                    this.variables = {};
                    this.logger = logger;
                    this.parentContext = parentContext;
                }
                addVariable(name, type, source) {
                    if (this.containsName(name))
                        return;
                    let entry = new variableEntry_1.VariableEntry(type, source);
                    this.variables[name] = entry;
                }
                registerVariableAndVerifyUnique(reference, name, type, source) {
                    if (this.containsName(name)) {
                        this.logger.fail(reference, `Duplicated variable name: '${name}'`);
                        return;
                    }
                    let entry = new variableEntry_1.VariableEntry(type, source);
                    this.variables[name] = entry;
                }
                containsName(name) {
                    return name in this.variables || (this.parentContext != null && this.parentContext.containsName(name));
                }
                containsReference(reference, context) {
                    let parent = this.getVariable(reference.parentIdentifier);
                    if (parent == null)
                        return false;
                    return !reference.hasChildIdentifiers ||
                        this.containChild(parent.variableType, reference.childrenReference(), context);
                }
                ensureVariableExists(reference, name) {
                    if (!this.containsName(name)) {
                        this.logger.fail(reference, `Unknown variable name: '${name}'.`);
                        return false;
                    }
                    return true;
                }
                getVariableTypeByName(name) {
                    return name in this.variables
                        ? this.variables[name].variableType
                        : this.parentContext != null
                            ? this.parentContext.getVariableTypeByName(name)
                            : null;
                }
                getVariableTypeByReference(reference, context) {
                    let parent = this.getVariableTypeByName(reference.parentIdentifier);
                    return parent == null || !reference.hasChildIdentifiers
                        ? parent
                        : this.getVariableType(parent, reference.childrenReference(), context);
                }
                getVariableSource(name) {
                    return name in this.variables
                        ? this.variables[name].variableSource
                        : this.parentContext != null
                            ? this.parentContext.getVariableSource(name)
                            : null;
                }
                getVariable(name) {
                    return name in this.variables
                        ? this.variables[name]
                        : null;
                }
                containChild(parentType, reference, context) {
                    let typeWithMembers = parentType.typeWithMember == true ? parentType : null;
                    let memberVariableType = typeWithMembers != null ? typeWithMembers.memberType(reference.parentIdentifier, context) : null;
                    if (memberVariableType == null)
                        return false;
                    return !reference.hasChildIdentifiers
                        || this.containChild(memberVariableType, reference.childrenReference(), context);
                }
                getVariableType(parentType, reference, context) {
                    let typeWithMembers = ITypeWithMembers_4.asTypeWithMembers(parentType);
                    if (typeWithMembers == null)
                        return null;
                    let memberVariableType = typeWithMembers.memberType(reference.parentIdentifier, context);
                    if (memberVariableType == null)
                        return null;
                    return !reference.hasChildIdentifiers
                        ? memberVariableType
                        : this.getVariableType(memberVariableType, reference.childrenReference(), context);
                }
            };
            exports_151("VariableContext", VariableContext);
        }
    };
});
System.register("infrastructure/stack", [], function (exports_152, context_152) {
    "use strict";
    var Stack;
    var __moduleName = context_152 && context_152.id;
    return {
        setters: [],
        execute: function () {
            Stack = class Stack {
                constructor(capacity = Infinity) {
                    this.capacity = capacity;
                    this.storage = [];
                }
                push(item) {
                    if (this.size() === this.capacity) {
                        throw Error("Stack has reached max capacity, you cannot add more items");
                    }
                    this.storage.push(item);
                }
                pop() {
                    return this.storage.pop();
                }
                peek() {
                    return this.storage[this.size() - 1];
                }
                size() {
                    return this.storage.length;
                }
            };
            exports_152("Stack", Stack);
        }
    };
});
System.register("parser/validationContext", ["parser/variableContext", "infrastructure/stack"], function (exports_153, context_153) {
    "use strict";
    var variableContext_1, stack_1, ValidationContext;
    var __moduleName = context_153 && context_153.id;
    return {
        setters: [
            function (variableContext_1_1) {
                variableContext_1 = variableContext_1_1;
            },
            function (stack_1_1) {
                stack_1 = stack_1_1;
            }
        ],
        execute: function () {
            ValidationContext = class ValidationContext {
                constructor(logger, rootNodes) {
                    this.contexts = new stack_1.Stack();
                    this.variableContextValue = null;
                    this.logger = logger;
                    this.rootNodes = rootNodes;
                }
                get variableContext() {
                    if (this.variableContextValue == null)
                        throw new Error(`FunctionCodeContext not set.`);
                    return this.variableContextValue;
                }
                dispose() {
                    if (this.contexts.size() == 0) {
                        this.variableContextValue = null;
                    }
                    let variableContextValue = this.contexts.pop();
                    this.variableContextValue = !!variableContextValue ? variableContextValue : null;
                }
                createVariableScope() {
                    if (this.variableContextValue != null) {
                        this.contexts.push(this.variableContextValue);
                    }
                    this.variableContextValue = new variableContext_1.VariableContext(this.logger, this.variableContextValue);
                    return {
                        [Symbol.dispose]: () => this.dispose()
                    };
                }
                validateType(expression, argumentIndex, name, type, reference, functionHelp) {
                    let valueTypeEnd = expression.deriveType(this);
                    if (valueTypeEnd == null || !valueTypeEnd.equals(type))
                        this.logger.fail(reference, `Invalid argument ${argumentIndex}. '${name}' should be of type '${type}' but is '${valueTypeEnd}'. ${functionHelp}`);
                    return this;
                }
            };
            exports_153("ValidationContext", ValidationContext);
        }
    };
});
System.register("language/node", [], function (exports_154, context_154) {
    "use strict";
    var Node;
    var __moduleName = context_154 && context_154.id;
    return {
        setters: [],
        execute: function () {
            Node = class Node {
                constructor(reference) {
                    this.reference = reference;
                }
                validateTree(context) {
                    this.validate(context);
                    let children = this.getChildren();
                    children.forEach(child => this.validateNodeTree(context, child));
                }
                validateNodeTree(context, child) {
                    if (child == null)
                        throw new Error(`(${this.nodeType}) Child is null`);
                    child.validateTree(context);
                }
            };
            exports_154("Node", Node);
        }
    };
});
System.register("language/parsableNode", ["language/node"], function (exports_155, context_155) {
    "use strict";
    var node_15, ParsableNode;
    var __moduleName = context_155 && context_155.id;
    function instanceOfParsableNode(object) {
        return (object === null || object === void 0 ? void 0 : object.isParsableNode) == true;
    }
    exports_155("instanceOfParsableNode", instanceOfParsableNode);
    function asParsableNode(object) {
        return instanceOfParsableNode(object) ? object : null;
    }
    exports_155("asParsableNode", asParsableNode);
    return {
        setters: [
            function (node_15_1) {
                node_15 = node_15_1;
            }
        ],
        execute: function () {
            ParsableNode = class ParsableNode extends node_15.Node {
                constructor(reference) {
                    super(reference);
                    this.isParsableNode = true;
                }
            };
            exports_155("ParsableNode", ParsableNode);
        }
    };
});
System.register("language/rootNode", ["language/parsableNode"], function (exports_156, context_156) {
    "use strict";
    var parsableNode_12, RootNode;
    var __moduleName = context_156 && context_156.id;
    function instanceOfRootNode(object) {
        return (object === null || object === void 0 ? void 0 : object.isRootNode) == true;
    }
    exports_156("instanceOfRootNode", instanceOfRootNode);
    function asRootNode(object) {
        return instanceOfRootNode(object) ? object : null;
    }
    exports_156("asRootNode", asRootNode);
    return {
        setters: [
            function (parsableNode_12_1) {
                parsableNode_12 = parsableNode_12_1;
            }
        ],
        execute: function () {
            RootNode = class RootNode extends parsableNode_12.ParsableNode {
                constructor(reference) {
                    super(reference);
                    this.isRootNode = true;
                }
                validateNodeTree(context, child) {
                    if (child == null)
                        throw new Error(`(${this.nodeType}) Child is null`);
                    const rootNode = asRootNode(child);
                    if (rootNode != null) {
                        context.logger.setCurrentNode(rootNode);
                    }
                    child.validateTree(context);
                    const thisAsRootNode = asRootNode(this);
                    if (thisAsRootNode != null) {
                        context.logger.setCurrentNode(thisAsRootNode);
                    }
                }
            };
            exports_156("RootNode", RootNode);
        }
    };
});
System.register("runTime/executionContext", [], function (exports_157, context_157) {
    "use strict";
    var ExecutionContext;
    var __moduleName = context_157 && context_157.id;
    return {
        setters: [],
        execute: function () {
            ExecutionContext = class ExecutionContext {
                constructor(logger) {
                    this.logger = logger;
                }
                logDebug(message) {
                    this.logger.logDebug(message);
                }
                logVariable(name, value) {
                    this.logger.logDebug(` ${name}: ${value}`);
                }
            };
            exports_157("ExecutionContext", ExecutionContext);
        }
    };
});
System.register("runTime/functionResult", [], function (exports_158, context_158) {
    "use strict";
    var FunctionResult;
    var __moduleName = context_158 && context_158.id;
    return {
        setters: [],
        execute: function () {
            FunctionResult = class FunctionResult {
                constructor(valueObject) {
                    this.valueObject = valueObject;
                }
                number(name) {
                    const value = this.valueObject[name];
                    return value;
                }
                getValue(expectedVariable) {
                    let currentReference = expectedVariable;
                    let currentValue = this.valueObject[expectedVariable.parentIdentifier];
                    while (currentReference.hasChildIdentifiers) {
                        currentReference = currentReference.childrenReference();
                        currentValue = currentValue[currentReference.parentIdentifier];
                    }
                    return currentValue;
                }
            };
            exports_158("FunctionResult", FunctionResult);
        }
    };
});
System.register("compiler/executableFunction", ["language/variableReference", "runTime/functionResult"], function (exports_159, context_159) {
    "use strict";
    var variableReference_4, functionResult_1, ExecutableFunction;
    var __moduleName = context_159 && context_159.id;
    return {
        setters: [
            function (variableReference_4_1) {
                variableReference_4 = variableReference_4_1;
            },
            function (functionResult_1_1) {
                functionResult_1 = functionResult_1_1;
            }
        ],
        execute: function () {
            ExecutableFunction = class ExecutableFunction {
                constructor(functionReference) {
                    this.functionReference = functionReference;
                }
                run(executionContext, values = null) {
                    let parameters = this.getParameters(values);
                    let results = this.functionReference(parameters, executionContext);
                    return new functionResult_1.FunctionResult(results);
                }
                getParameters(values) {
                    let parameters = {};
                    if (values == null)
                        return parameters;
                    for (const key in values) {
                        const value = values[key];
                        let field = this.getParameterSetter(parameters, key);
                        field(value);
                    }
                    return parameters;
                }
                getParameterSetter(parameters, key) {
                    let currentReference = variableReference_4.VariableReference.parse(key);
                    let currentValue = parameters;
                    while (currentReference.hasChildIdentifiers) {
                        currentValue = parameters[currentReference.parentIdentifier];
                        currentReference = currentReference.childrenReference();
                    }
                    return (value) => currentValue[currentReference.parentIdentifier] = value;
                }
            };
            exports_159("ExecutableFunction", ExecutableFunction);
        }
    };
});
System.register("compiler/generatedType", [], function (exports_160, context_160) {
    "use strict";
    var GeneratedTypeKind, GeneratedType;
    var __moduleName = context_160 && context_160.id;
    return {
        setters: [],
        execute: function () {
            (function (GeneratedTypeKind) {
                GeneratedTypeKind["Function"] = "Function";
                GeneratedTypeKind["Enum"] = "Enum";
                GeneratedTypeKind["Type"] = "Type";
                GeneratedTypeKind["Table"] = "Table";
            })(GeneratedTypeKind || (exports_160("GeneratedTypeKind", GeneratedTypeKind = {})));
            GeneratedType = class GeneratedType {
                constructor(kind, node, name, initializationFunction, executableFunction = null) {
                    this.kind = kind;
                    this.node = node;
                    this.name = name;
                    this.initializationFunction = initializationFunction;
                    this.executableFunction = executableFunction;
                }
            };
            exports_160("GeneratedType", GeneratedType);
        }
    };
});
System.register("compiler/IRootTokenWriter", [], function (exports_161, context_161) {
    "use strict";
    var __moduleName = context_161 && context_161.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("compiler/compilerResult", ["runTime/executionContext"], function (exports_162, context_162) {
    "use strict";
    var executionContext_1, CompilerResult;
    var __moduleName = context_162 && context_162.id;
    return {
        setters: [
            function (executionContext_1_1) {
                executionContext_1 = executionContext_1_1;
            }
        ],
        execute: function () {
            CompilerResult = class CompilerResult {
                constructor(executables, enums, environment, executionLogger) {
                    this.executables = executables;
                    this.enums = enums;
                    this.environment = environment;
                    this.executionLogger = executionLogger;
                }
                getFunction(functionNode) {
                    return this.executables[functionNode.name.value];
                }
                getEnumType(type) {
                    return this.enums[type];
                }
                createContext() {
                    return new executionContext_1.ExecutionContext(this.executionLogger);
                }
                [Symbol.dispose]() {
                    if (this.environment != null) {
                        this.environment[Symbol.dispose]();
                        this.environment = null;
                    }
                }
            };
            exports_162("CompilerResult", CompilerResult);
        }
    };
});
System.register("compiler/lexyCodeConstants", [], function (exports_163, context_163) {
    "use strict";
    var LexyCodeConstants;
    var __moduleName = context_163 && context_163.id;
    return {
        setters: [],
        execute: function () {
            LexyCodeConstants = class LexyCodeConstants {
            };
            exports_163("LexyCodeConstants", LexyCodeConstants);
            LexyCodeConstants.namespace = `lexyRuntime`;
            LexyCodeConstants.resultsType = `__Result`;
            LexyCodeConstants.parametersType = `__Parameters`;
            LexyCodeConstants.rowType = `__Row`;
            LexyCodeConstants.runMethod = `__run`;
            LexyCodeConstants.parameterVariable = `__parameters`;
            LexyCodeConstants.resultsVariable = `__result`;
            LexyCodeConstants.contextVariable = `__context`;
            LexyCodeConstants.valuesVariable = `__values`;
            LexyCodeConstants.functionClassPrefix = `function__`;
            LexyCodeConstants.tableClassPrefix = `table__`;
            LexyCodeConstants.enumClassPrefix = `enum__`;
            LexyCodeConstants.typeClassPrefix = `type__`;
        }
    };
});
System.register("compiler/JavaScript/classNames", ["parser/tokens/character", "compiler/lexyCodeConstants"], function (exports_164, context_164) {
    "use strict";
    var character_12, lexyCodeConstants_1, underscore;
    var __moduleName = context_164 && context_164.id;
    function functionClassName(functionName) {
        return normalize(functionName, lexyCodeConstants_1.LexyCodeConstants.functionClassPrefix);
    }
    exports_164("functionClassName", functionClassName);
    function tableClassName(tableTypeName) {
        return normalize(tableTypeName, lexyCodeConstants_1.LexyCodeConstants.tableClassPrefix);
    }
    exports_164("tableClassName", tableClassName);
    function enumClassName(enumName) {
        return normalize(enumName, lexyCodeConstants_1.LexyCodeConstants.enumClassPrefix);
    }
    exports_164("enumClassName", enumClassName);
    function typeClassName(enumName) {
        return normalize(enumName, lexyCodeConstants_1.LexyCodeConstants.typeClassPrefix);
    }
    exports_164("typeClassName", typeClassName);
    function normalize(functionName, functionClassPrefix = null) {
        let nameBuilder = functionClassPrefix != null ? [functionClassPrefix] : [];
        for (let index = 0; index < functionName.length; index++) {
            const value = functionName.charCodeAt(index);
            if (validCharacter(value)) {
                nameBuilder.push(String.fromCharCode(value));
            }
        }
        return nameBuilder.join("");
    }
    exports_164("normalize", normalize);
    function validCharacter(value) {
        return character_12.isDigitOrLetter(value) || value == underscore;
    }
    return {
        setters: [
            function (character_12_1) {
                character_12 = character_12_1;
            },
            function (lexyCodeConstants_1_1) {
                lexyCodeConstants_1 = lexyCodeConstants_1_1;
            }
        ],
        execute: function () {
            underscore = '_'.charCodeAt(0);
        }
    };
});
System.register("runTime/builtInDateFunctions", [], function (exports_165, context_165) {
    "use strict";
    var BuiltInDateFunctions;
    var __moduleName = context_165 && context_165.id;
    return {
        setters: [],
        execute: function () {
            BuiltInDateFunctions = class BuiltInDateFunctions {
                static now() {
                    return new Date();
                }
                static today() {
                    let now = new Date();
                    return new Date(now.getFullYear(), now.getMonth(), now.getDay());
                }
                static year(value) {
                    return value.getFullYear();
                }
                static month(value) {
                    return value.getMonth() + 1;
                }
                static day(value) {
                    return value.getDate();
                }
                static hour(value) {
                    return value.getHours();
                }
                static minute(value) {
                    return value.getMinutes();
                }
                static second(value) {
                    return value.getSeconds();
                }
                static years(end, start) {
                    return BuiltInDateFunctions.differenceInYears(end, start);
                }
                static months(end, start) {
                    return BuiltInDateFunctions.differenceInMonths(end, start);
                }
                static days(end, start) {
                    return BuiltInDateFunctions.differenceInDays(end, start);
                }
                static hours(end, start) {
                    return BuiltInDateFunctions.differenceInHours(end, start);
                }
                static minutes(end, start) {
                    return BuiltInDateFunctions.differenceInMinutes(end, start);
                }
                static seconds(end, start) {
                    return BuiltInDateFunctions.differenceInSeconds(end, start);
                }
                static milliseconds(end, start) {
                    return BuiltInDateFunctions.differenceInMilliseconds(end, start);
                }
                static differenceInCalendarYears(laterDate, earlierDate) {
                    return laterDate.getFullYear() - earlierDate.getFullYear();
                }
                static compareAsc(dateLeft, dateRight) {
                    const diff = +dateLeft - +dateRight;
                    if (diff < 0)
                        return -1;
                    else if (diff > 0)
                        return 1;
                    return diff;
                }
                static startOfDay(date) {
                    const _date = new Date(date);
                    _date.setHours(0, 0, 0, 0);
                    return _date;
                }
                static endOfDay(date) {
                    const _date = new Date(date);
                    _date.setHours(23, 59, 59, 999);
                    return _date;
                }
                static endOfMonth(date) {
                    const _date = new Date(date);
                    const month = _date.getMonth();
                    _date.setFullYear(_date.getFullYear(), month + 1, 0);
                    _date.setHours(23, 59, 59, 999);
                    return _date;
                }
                static isLastDayOfMonth(date) {
                    const _date = new Date(date);
                    return +BuiltInDateFunctions.endOfDay(_date) === +BuiltInDateFunctions.endOfMonth(_date);
                }
                static round(number) {
                    const result = Math.trunc(number);
                    return result === 0 ? 0 : result;
                }
                ;
                static getTimezoneOffsetInMilliseconds(date) {
                    const _date = new Date(date);
                    const utcDate = new Date(Date.UTC(_date.getFullYear(), _date.getMonth(), _date.getDate(), _date.getHours(), _date.getMinutes(), _date.getSeconds(), _date.getMilliseconds()));
                    utcDate.setUTCFullYear(_date.getFullYear());
                    return +date - +utcDate;
                }
                static differenceInYears(laterDate, earlierDate) {
                    const laterDate_ = new Date(laterDate);
                    const earlierDate_ = new Date(earlierDate);
                    const sign = BuiltInDateFunctions.compareAsc(laterDate_, earlierDate_);
                    const diff = Math.abs(BuiltInDateFunctions.differenceInCalendarYears(laterDate_, earlierDate_));
                    laterDate_.setFullYear(1584);
                    earlierDate_.setFullYear(1584);
                    const partial = BuiltInDateFunctions.compareAsc(laterDate_, earlierDate_) === -sign;
                    const result = sign * (diff - +partial);
                    return result === 0 ? 0 : result;
                }
                static differenceInCalendarMonths(laterDate, earlierDate) {
                    const laterDate_ = new Date(laterDate);
                    const earlierDate_ = new Date(earlierDate);
                    const yearsDiff = laterDate_.getFullYear() - earlierDate_.getFullYear();
                    const monthsDiff = laterDate_.getMonth() - earlierDate_.getMonth();
                    return yearsDiff * 12 + monthsDiff;
                }
                static differenceInMonths(laterDate, earlierDate) {
                    const laterDate_ = new Date(laterDate);
                    const workingLaterDate = new Date(laterDate);
                    const earlierDate_ = new Date(earlierDate);
                    const sign = BuiltInDateFunctions.compareAsc(workingLaterDate, earlierDate_);
                    const difference = Math.abs(BuiltInDateFunctions.differenceInCalendarMonths(workingLaterDate, earlierDate_));
                    if (difference < 1)
                        return 0;
                    if (workingLaterDate.getMonth() === 1 && workingLaterDate.getDate() > 27)
                        workingLaterDate.setDate(30);
                    workingLaterDate.setMonth(workingLaterDate.getMonth() - sign * difference);
                    let isLastMonthNotFull = BuiltInDateFunctions.compareAsc(workingLaterDate, earlierDate_) === -sign;
                    if (BuiltInDateFunctions.isLastDayOfMonth(laterDate_) &&
                        difference === 1 &&
                        BuiltInDateFunctions.compareAsc(laterDate_, earlierDate_) === 1) {
                        isLastMonthNotFull = false;
                    }
                    const result = sign * (difference - +isLastMonthNotFull);
                    return result === 0 ? 0 : result;
                }
                static differenceInCalendarDays(laterDate, earlierDate) {
                    const laterDate_ = new Date(laterDate);
                    const earlierDate_ = new Date(earlierDate);
                    const laterStartOfDay = BuiltInDateFunctions.startOfDay(laterDate_);
                    const earlierStartOfDay = BuiltInDateFunctions.startOfDay(earlierDate_);
                    const laterTimestamp = +laterStartOfDay - BuiltInDateFunctions.getTimezoneOffsetInMilliseconds(laterStartOfDay);
                    const earlierTimestamp = +earlierStartOfDay - BuiltInDateFunctions.getTimezoneOffsetInMilliseconds(earlierStartOfDay);
                    return Math.round((laterTimestamp - earlierTimestamp) / BuiltInDateFunctions.millisecondsInDay);
                }
                static differenceInDays(laterDate, earlierDate) {
                    const laterDate_ = new Date(laterDate);
                    const earlierDate_ = new Date(earlierDate);
                    const sign = BuiltInDateFunctions.compareLocalAsc(laterDate_, earlierDate_);
                    const difference = Math.abs(BuiltInDateFunctions.differenceInCalendarDays(laterDate_, earlierDate_));
                    laterDate_.setDate(laterDate_.getDate() - sign * difference);
                    const isLastDayNotFull = Number(BuiltInDateFunctions.compareLocalAsc(laterDate_, earlierDate_) === -sign);
                    const result = sign * (difference - isLastDayNotFull);
                    return result === 0 ? 0 : result;
                }
                static compareLocalAsc(laterDate, earlierDate) {
                    const diff = laterDate.getFullYear() - earlierDate.getFullYear() ||
                        laterDate.getMonth() - earlierDate.getMonth() ||
                        laterDate.getDate() - earlierDate.getDate() ||
                        laterDate.getHours() - earlierDate.getHours() ||
                        laterDate.getMinutes() - earlierDate.getMinutes() ||
                        laterDate.getSeconds() - earlierDate.getSeconds() ||
                        laterDate.getMilliseconds() - earlierDate.getMilliseconds();
                    if (diff < 0)
                        return -1;
                    if (diff > 0)
                        return 1;
                    return diff;
                }
                static differenceInHours(laterDate, earlierDate) {
                    const laterDate_ = new Date(laterDate);
                    const earlierDate_ = new Date(earlierDate);
                    const diff = (+laterDate_ - +earlierDate_) / BuiltInDateFunctions.millisecondsInHour;
                    return BuiltInDateFunctions.round(diff);
                }
                static differenceInMinutes(laterDate, earlierDate) {
                    const diff = BuiltInDateFunctions.differenceInMilliseconds(laterDate, earlierDate) / BuiltInDateFunctions.millisecondsInMinute;
                    return BuiltInDateFunctions.round(diff);
                }
                static differenceInSeconds(laterDate, earlierDate) {
                    const diff = BuiltInDateFunctions.differenceInMilliseconds(laterDate, earlierDate) / 1000;
                    return BuiltInDateFunctions.round(diff);
                }
                static differenceInMilliseconds(laterDate, earlierDate) {
                    return +laterDate - +earlierDate;
                }
            };
            exports_165("BuiltInDateFunctions", BuiltInDateFunctions);
            BuiltInDateFunctions.millisecondsInDay = 86400000;
            BuiltInDateFunctions.millisecondsInHour = 3600000;
            BuiltInDateFunctions.millisecondsInMinute = 60000;
        }
    };
});
System.register("runTime/builtInNumberFunctions", [], function (exports_166, context_166) {
    "use strict";
    var BuiltInNumberFunctions;
    var __moduleName = context_166 && context_166.id;
    return {
        setters: [],
        execute: function () {
            BuiltInNumberFunctions = class BuiltInNumberFunctions {
                static int(value) {
                    return Math.floor(value);
                }
                static abs(value) {
                    return Math.abs(value);
                }
                static power(number, power) {
                    return Math.pow(number, power);
                }
                static round(number, digits) {
                    const factor = Math.pow(10, digits);
                    return (number >= 0 ? 1 : -1) * Math.round(Math.abs(number) * factor) / factor;
                }
            };
            exports_166("BuiltInNumberFunctions", BuiltInNumberFunctions);
        }
    };
});
System.register("runTime/builtInTableFunctions", [], function (exports_167, context_167) {
    "use strict";
    var BuiltInTableFunctions;
    var __moduleName = context_167 && context_167.id;
    return {
        setters: [],
        execute: function () {
            BuiltInTableFunctions = class BuiltInTableFunctions {
                static lookUp(resultName, valueName, tableName, tableValues, condition, context) {
                    let functionName = `Lookup '${resultName}' by '${valueName}' from table '${tableName}'`;
                    let lastRow = null;
                    for (let index = 0; index < tableValues.length; index++) {
                        let row = tableValues[index];
                        let value = row[valueName];
                        if (value == condition) {
                            context.logDebug(`${functionName} returned value from row: ${index + 1}`);
                            return row[resultName];
                        }
                        if (value > condition) {
                            context.logDebug(`{functionName} returned value from previous row: {index}`);
                            if (lastRow == null) {
                                throw new Error(`${functionName} failed. Search value '${condition}' not found.`);
                            }
                            return lastRow[resultName];
                        }
                        lastRow = row;
                    }
                    if (lastRow == null) {
                        throw new Error(`${functionName} failed. Search value '${condition}' not found.`);
                    }
                    context.logDebug(`${functionName} returned value from last row: ${tableValues.length}`);
                    return lastRow[resultName];
                }
                static lookUpRow(valueName, tableName, tableValues, condition, context) {
                    let functionName = `Lookup row by '${valueName}' from table '${tableName}'`;
                    let lastRow = null;
                    for (let index = 0; index < tableValues.length; index++) {
                        let row = tableValues[index];
                        let value = row[valueName];
                        if (value == condition) {
                            context.logDebug(`${functionName} returned value from row: ${index + 1}`);
                            return row;
                        }
                        if (value > condition) {
                            context.logDebug(`{functionName} returned value from previous row: {index}`);
                            if (lastRow == null) {
                                throw new Error(`${functionName} failed. Search value '${condition}' not found.`);
                            }
                            return lastRow;
                        }
                        lastRow = row;
                    }
                    if (lastRow == null) {
                        throw new Error(`${functionName} failed. Search value '${condition}' not found.`);
                    }
                    context.logDebug(`${functionName} returned value from last row: ${tableValues.length}`);
                    return lastRow;
                }
            };
            exports_167("BuiltInTableFunctions", BuiltInTableFunctions);
        }
    };
});
System.register("runTime/systemFunctions", [], function (exports_168, context_168) {
    "use strict";
    var SystemFunctions;
    var __moduleName = context_168 && context_168.id;
    return {
        setters: [],
        execute: function () {
            SystemFunctions = class SystemFunctions {
                static populate(parameters, values) {
                    for (let key in values) {
                        if (values[key] && typeof values[key] === 'object' && values[key].constructor !== Date) {
                            this.populate(parameters[key], values[key]);
                        }
                        else {
                            parameters[key] = values[key];
                        }
                    }
                }
            };
            exports_168("SystemFunctions", SystemFunctions);
        }
    };
});
System.register("compiler/compilationEnvironment", ["compiler/generatedType", "compiler/compilerResult", "compiler/executableFunction", "compiler/JavaScript/classNames", "compiler/lexyCodeConstants", "runTime/builtInDateFunctions", "runTime/builtInNumberFunctions", "runTime/builtInTableFunctions", "runTime/systemFunctions"], function (exports_169, context_169) {
    "use strict";
    var generatedType_1, compilerResult_1, executableFunction_1, classNames_1, lexyCodeConstants_2, builtInDateFunctions_1, builtInNumberFunctions_1, builtInTableFunctions_1, systemFunctions_1, CompilationEnvironment;
    var __moduleName = context_169 && context_169.id;
    return {
        setters: [
            function (generatedType_1_1) {
                generatedType_1 = generatedType_1_1;
            },
            function (compilerResult_1_1) {
                compilerResult_1 = compilerResult_1_1;
            },
            function (executableFunction_1_1) {
                executableFunction_1 = executableFunction_1_1;
            },
            function (classNames_1_1) {
                classNames_1 = classNames_1_1;
            },
            function (lexyCodeConstants_2_1) {
                lexyCodeConstants_2 = lexyCodeConstants_2_1;
            },
            function (builtInDateFunctions_1_1) {
                builtInDateFunctions_1 = builtInDateFunctions_1_1;
            },
            function (builtInNumberFunctions_1_1) {
                builtInNumberFunctions_1 = builtInNumberFunctions_1_1;
            },
            function (builtInTableFunctions_1_1) {
                builtInTableFunctions_1 = builtInTableFunctions_1_1;
            },
            function (systemFunctions_1_1) {
                systemFunctions_1 = systemFunctions_1_1;
            }
        ],
        execute: function () {
            CompilationEnvironment = class CompilationEnvironment {
                constructor(compilationLogger, executionLogger) {
                    this.generatedTypes = [];
                    this.enums = {};
                    this.executables = {};
                    this.tables = {};
                    this.types = {};
                    this.compilationLogger = compilationLogger;
                    this.executionLogger = executionLogger;
                    const now = new Date().toISOString();
                    this.namespace = `environment_${classNames_1.normalize(now)}`;
                    this.fullNamespace = `globalThis.${lexyCodeConstants_2.LexyCodeConstants.namespace}.${this.namespace}`;
                }
                initialize() {
                    this.initializeNamespace();
                    for (const generatedType of this.generatedTypes) {
                        this.initializeType(generatedType);
                    }
                }
                addType(generatedType) {
                    this.generatedTypes.push(generatedType);
                }
                result() {
                    return new compilerResult_1.CompilerResult(this.executables, this.enums, this, this.executionLogger);
                }
                initializeNamespace() {
                    const functions = {
                        builtInDateFunctions: builtInDateFunctions_1.BuiltInDateFunctions,
                        builtInNumberFunctions: builtInNumberFunctions_1.BuiltInNumberFunctions,
                        builtInTableFunctions: builtInTableFunctions_1.BuiltInTableFunctions,
                        systemFunctions: systemFunctions_1.SystemFunctions
                    };
                    Function("functions", `if (!globalThis.${lexyCodeConstants_2.LexyCodeConstants.namespace}) globalThis.${lexyCodeConstants_2.LexyCodeConstants.namespace} = {};
    globalThis.${lexyCodeConstants_2.LexyCodeConstants.namespace}.${this.namespace} = functions;`)(functions);
                }
                initializeType(generatedType) {
                    const code = `"use strict";
const type = ${generatedType.initializationFunction}
globalThis.${lexyCodeConstants_2.LexyCodeConstants.namespace}.${this.namespace}.${generatedType.name} = type;`;
                    try {
                        this.compilationLogger.logDebug(`Initialization code: ${code}`);
                        const initialization = new Function(code);
                        initialization();
                    }
                    catch (error) {
                        throw new Error(`Initialization failed: ${error}
${code}`);
                    }
                    switch (generatedType.kind) {
                        case generatedType_1.GeneratedTypeKind.Function: {
                            const executable = this.createExecutableFunction(generatedType);
                            this.executables[generatedType.node.nodeName] = executable;
                            break;
                        }
                        case generatedType_1.GeneratedTypeKind.Enum: {
                            this.enums[generatedType.node.nodeName] = generatedType;
                            break;
                        }
                        case generatedType_1.GeneratedTypeKind.Table: {
                            this.tables[generatedType.node.nodeName] = generatedType;
                            break;
                        }
                        case generatedType_1.GeneratedTypeKind.Type: {
                            this.types[generatedType.node.nodeName] = generatedType;
                            break;
                        }
                        default: {
                            throw new Error(`Unknown generated type: ${generatedType.kind}`);
                        }
                    }
                }
                createExecutableFunction(generatedType) {
                    const code = `
let ${lexyCodeConstants_2.LexyCodeConstants.parameterVariable} = new globalThis.${lexyCodeConstants_2.LexyCodeConstants.namespace}.${this.namespace}.${generatedType.name}.${lexyCodeConstants_2.LexyCodeConstants.parametersType}();
globalThis.${lexyCodeConstants_2.LexyCodeConstants.namespace}.${this.namespace}.systemFunctions.populate(${lexyCodeConstants_2.LexyCodeConstants.parameterVariable}, values);
return globalThis.${lexyCodeConstants_2.LexyCodeConstants.namespace}.${this.namespace}.${generatedType.name}(${lexyCodeConstants_2.LexyCodeConstants.parameterVariable}, context);`;
                    this.compilationLogger.logDebug(`Execution code: ${code}`);
                    let executable = new executableFunction_1.ExecutableFunction(new Function("values", "context", code));
                    return executable;
                }
                [Symbol.dispose]() {
                    Function("delete this." + this.namespace + ";")();
                }
            };
            exports_169("CompilationEnvironment", CompilationEnvironment);
        }
    };
});
System.register("compiler/JavaScript/writers/codeWriter", ["parser/tokens/character"], function (exports_170, context_170) {
    "use strict";
    var character_13, CodeWriter;
    var __moduleName = context_170 && context_170.id;
    return {
        setters: [
            function (character_13_1) {
                character_13 = character_13_1;
            }
        ],
        execute: function () {
            CodeWriter = class CodeWriter {
                constructor(namespace) {
                    this.builder = [];
                    this.indent = 0;
                    this.currentLineValue = 0;
                    this.namespace = namespace;
                }
                get currentLine() {
                    return this.currentLineValue;
                }
                startLine(value = null) {
                    if (value != null) {
                        this.builder.push(this.indentString() + value);
                    }
                    else {
                        this.builder.push(this.indentString());
                    }
                }
                endLine(value = null) {
                    if (value != null) {
                        this.builder.push(value + "\n");
                    }
                    else {
                        this.builder.push("\n");
                    }
                    this.currentLineValue++;
                }
                writeLine(value) {
                    this.builder.push(this.indentString() + value + "\n");
                    this.currentLineValue++;
                }
                write(value) {
                    this.builder.push(value);
                }
                writeNamespace(value = null) {
                    if (value != null) {
                        this.builder.push(this.namespace + value);
                    }
                    else {
                        this.builder.push(this.namespace);
                    }
                }
                openScope(value = null) {
                    if (value != null) {
                        this.writeLine(value + " {");
                    }
                    else {
                        this.writeLine(" {");
                    }
                    this.indent++;
                }
                openInlineScope(value) {
                    this.endLine(value + " {");
                    this.indent++;
                }
                closeScope(suffix = null) {
                    this.indent--;
                    if (suffix != null) {
                        this.writeLine("}" + suffix);
                    }
                    else {
                        this.writeLine("}");
                    }
                }
                openBrackets(name) {
                    this.writeLine(name + " [");
                    this.indent++;
                }
                closeBrackets(suffix = null) {
                    this.indent--;
                    if (suffix != null) {
                        this.writeLine("]" + suffix);
                    }
                    else {
                        this.writeLine("]");
                    }
                }
                toString() {
                    return this.builder.join("");
                }
                indentString() {
                    return ' '.repeat(this.indent * 2);
                }
                identifierFromNamespace(value) {
                    if (character_13.isNullOrEmpty(value))
                        throw new Error("Value is null or empty");
                    if (value[0] == ".") {
                        return this.namespace + value;
                    }
                    else {
                        return `${this.namespace}.${value}`;
                    }
                }
            };
            exports_170("CodeWriter", CodeWriter);
        }
    };
});
System.register("compiler/JavaScript/types", ["language/variableTypes/variableTypeName", "language/variableTypes/primitiveType", "language/variableTypes/enumType", "compiler/JavaScript/classNames", "language/variableTypes/tableType", "language/variableTypes/complexType", "compiler/lexyCodeConstants", "language/variableTypes/complexTypeSource", "language/variableTypes/customType"], function (exports_171, context_171) {
    "use strict";
    var variableTypeName_9, primitiveType_21, enumType_3, classNames_2, tableType_2, complexType_7, lexyCodeConstants_3, complexTypeSource_3, customType_3;
    var __moduleName = context_171 && context_171.id;
    function translateType(variableType) {
        switch (variableType.variableTypeName) {
            case variableTypeName_9.VariableTypeName.PrimitiveType: {
                const primitiveType = primitiveType_21.asPrimitiveType(variableType);
                if (primitiveType == null)
                    throw new Error("Is not primitiveType");
                return primitiveType.type;
            }
            case variableTypeName_9.VariableTypeName.EnumType: {
                const enumType = enumType_3.asEnumType(variableType);
                if (enumType == null)
                    throw new Error("Is not enumType");
                return classNames_2.enumClassName(enumType.type);
            }
            case variableTypeName_9.VariableTypeName.TableType: {
                const tableType = tableType_2.asTableType(variableType);
                if (tableType == null)
                    throw new Error("Is not tableType");
                return tableType.tableName;
            }
            case variableTypeName_9.VariableTypeName.ComplexType: {
                const complexType = complexType_7.asComplexType(variableType);
                if (complexType == null)
                    throw new Error("Is not complexType");
                return translateComplexType(complexType);
            }
            case variableTypeName_9.VariableTypeName.CustomType: {
                const customType = customType_3.asCustomType(variableType);
                if (customType == null)
                    throw new Error("Is not customType");
                return typeof (customType.type);
            }
            default:
                throw new Error("Not supported: " + variableType.variableTypeName);
        }
    }
    exports_171("translateType", translateType);
    function translateComplexType(complexType) {
        switch (complexType.source) {
            case complexTypeSource_3.ComplexTypeSource.FunctionParameters: {
                return classNames_2.functionClassName(complexType.name) + "." + lexyCodeConstants_3.LexyCodeConstants.parametersType;
            }
            case complexTypeSource_3.ComplexTypeSource.FunctionResults: {
                return classNames_2.functionClassName(complexType.name) + "." + lexyCodeConstants_3.LexyCodeConstants.resultsType;
            }
            case complexTypeSource_3.ComplexTypeSource.TableRow: {
                return classNames_2.tableClassName(complexType.name) + "." + lexyCodeConstants_3.LexyCodeConstants.rowType;
            }
            default: {
                throw new Error(`Invalid type: ${complexType.source}`);
            }
        }
    }
    exports_171("translateComplexType", translateComplexType);
    return {
        setters: [
            function (variableTypeName_9_1) {
                variableTypeName_9 = variableTypeName_9_1;
            },
            function (primitiveType_21_1) {
                primitiveType_21 = primitiveType_21_1;
            },
            function (enumType_3_1) {
                enumType_3 = enumType_3_1;
            },
            function (classNames_2_1) {
                classNames_2 = classNames_2_1;
            },
            function (tableType_2_1) {
                tableType_2 = tableType_2_1;
            },
            function (complexType_7_1) {
                complexType_7 = complexType_7_1;
            },
            function (lexyCodeConstants_3_1) {
                lexyCodeConstants_3 = lexyCodeConstants_3_1;
            },
            function (complexTypeSource_3_1) {
                complexTypeSource_3 = complexTypeSource_3_1;
            },
            function (customType_3_1) {
                customType_3 = customType_3_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("compiler/JavaScript/renderers/renderVariableClass", ["compiler/JavaScript/renderers/renderExpression", "language/variableTypes/primitiveVariableDeclarationType", "language/variableTypes/customVariableDeclarationType", "language/variableTypes/typeNames", "compiler/JavaScript/types", "language/variableTypes/enumType", "language/variableTypes/variableTypeName", "language/variableTypes/complexType"], function (exports_172, context_172) {
    "use strict";
    var renderExpression_1, primitiveVariableDeclarationType_3, customVariableDeclarationType_4, typeNames_4, types_1, enumType_4, variableTypeName_10, complexType_8;
    var __moduleName = context_172 && context_172.id;
    function createVariableClass(className, variables, codeWriter) {
        codeWriter.openScope(`class ${className}`);
        for (const variable of variables) {
            renderVariableDefinition(variable, codeWriter);
        }
        codeWriter.closeScope();
    }
    exports_172("createVariableClass", createVariableClass);
    function renderVariableDefinition(variable, codeWriter) {
        codeWriter.startLine(`${variable.name} = `);
        renderDefaultExpression(variable, codeWriter);
        codeWriter.endLine(`;`);
    }
    function renderDefaultExpression(variable, codeWriter) {
        if (variable.defaultExpression != null) {
            renderExpression_1.renderExpression(variable.defaultExpression, codeWriter);
        }
        else {
            renderTypeDefaultExpression(variable.type, codeWriter);
        }
    }
    function renderTypeDefaultExpression(variableDeclarationType, codeWriter) {
        const primitiveVariableDeclarationType = primitiveVariableDeclarationType_3.asPrimitiveVariableDeclarationType(variableDeclarationType);
        if (primitiveVariableDeclarationType != null) {
            renderPrimitiveTypeDefaultExpression(primitiveVariableDeclarationType, codeWriter);
            return;
        }
        const customType = customVariableDeclarationType_4.asCustomVariableDeclarationType(variableDeclarationType);
        if (customType != null) {
            renderDefaultExpressionSyntax(customType, codeWriter);
            return;
        }
        throw new Error(`Wrong VariableDeclarationType ${variableDeclarationType.nodeType}`);
    }
    exports_172("renderTypeDefaultExpression", renderTypeDefaultExpression);
    function renderPrimitiveTypeDefaultExpression(type, codeWriter) {
        switch (type.type) {
            case typeNames_4.TypeNames.number:
                codeWriter.write("0");
                return;
            case typeNames_4.TypeNames.boolean:
                codeWriter.write("false");
                return;
            case typeNames_4.TypeNames.string:
                codeWriter.write('""');
                return;
            case typeNames_4.TypeNames.date:
                codeWriter.write('new Date("0001-01-01T00:00:00")');
                return;
            default:
                throw new Error(`Invalid type: ${type.type}`);
        }
    }
    function renderDefaultExpressionSyntax(customType, codeWriter) {
        var _a, _b;
        switch ((_a = customType.variableType) === null || _a === void 0 ? void 0 : _a.variableTypeName) {
            case variableTypeName_10.VariableTypeName.CustomType:
                codeWriter.write(`new ${renderExpression_1.customVariableIdentifier(customType, codeWriter)}()`);
                return;
            case variableTypeName_10.VariableTypeName.EnumType:
                const enumType = enumType_4.asEnumType(customType.variableType);
                if (enumType == null)
                    throw new Error("customType.variableType not enumType");
                codeWriter.writeNamespace(`.${types_1.translateType(enumType)}.${enumType.firstMemberName()}`);
                return;
            case variableTypeName_10.VariableTypeName.ComplexType:
                const complexType = complexType_8.asComplexType(customType.variableType);
                if (complexType == null)
                    throw new Error("customType.variableType not complexType");
                codeWriter.write(`new `);
                codeWriter.writeNamespace(`.${types_1.translateComplexType(complexType)}`);
                codeWriter.write(`()`);
                return;
            default:
                throw new Error(`Invalid renderDefaultExpressionSyntax: ${(_b = customType.variableType) === null || _b === void 0 ? void 0 : _b.variableTypeName}`);
        }
    }
    return {
        setters: [
            function (renderExpression_1_1) {
                renderExpression_1 = renderExpression_1_1;
            },
            function (primitiveVariableDeclarationType_3_1) {
                primitiveVariableDeclarationType_3 = primitiveVariableDeclarationType_3_1;
            },
            function (customVariableDeclarationType_4_1) {
                customVariableDeclarationType_4 = customVariableDeclarationType_4_1;
            },
            function (typeNames_4_1) {
                typeNames_4 = typeNames_4_1;
            },
            function (types_1_1) {
                types_1 = types_1_1;
            },
            function (enumType_4_1) {
                enumType_4 = enumType_4_1;
            },
            function (variableTypeName_10_1) {
                variableTypeName_10 = variableTypeName_10_1;
            },
            function (complexType_8_1) {
                complexType_8 = complexType_8_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/functionCall", [], function (exports_173, context_173) {
    "use strict";
    var FunctionCall;
    var __moduleName = context_173 && context_173.id;
    return {
        setters: [],
        execute: function () {
            FunctionCall = class FunctionCall {
                renderCustomFunction(expression, codeWriter) {
                }
            };
            exports_173("FunctionCall", FunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/lookUpFunctionCall", ["compiler/JavaScript/builtInFunctions/functionCall", "compiler/JavaScript/renderers/renderExpression", "compiler/JavaScript/classNames", "compiler/lexyCodeConstants"], function (exports_174, context_174) {
    "use strict";
    var functionCall_1, renderExpression_2, classNames_3, lexyCodeConstants_4, LookUpFunctionCall;
    var __moduleName = context_174 && context_174.id;
    return {
        setters: [
            function (functionCall_1_1) {
                functionCall_1 = functionCall_1_1;
            },
            function (renderExpression_2_1) {
                renderExpression_2 = renderExpression_2_1;
            },
            function (classNames_3_1) {
                classNames_3 = classNames_3_1;
            },
            function (lexyCodeConstants_4_1) {
                lexyCodeConstants_4 = lexyCodeConstants_4_1;
            }
        ],
        execute: function () {
            LookUpFunctionCall = class LookUpFunctionCall extends functionCall_1.FunctionCall {
                renderExpression(expression, codeWriter) {
                    codeWriter.writeNamespace();
                    codeWriter.write(".builtInTableFunctions.lookUp(");
                    codeWriter.write(`"${expression.resultColumn.member}", `);
                    codeWriter.write(`"${expression.searchValueColumn.member}", `);
                    codeWriter.write(`"${expression.table}", `);
                    codeWriter.writeNamespace(`.${classNames_3.tableClassName(expression.table)}.__values, `);
                    renderExpression_2.renderExpression(expression.valueExpression, codeWriter);
                    codeWriter.write(`, ${lexyCodeConstants_4.LexyCodeConstants.contextVariable})`);
                }
            };
            exports_174("LookUpFunctionCall", LookUpFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/lookUpRowFunctionCall", ["compiler/JavaScript/builtInFunctions/functionCall", "compiler/lexyCodeConstants", "compiler/JavaScript/renderers/renderExpression", "compiler/JavaScript/classNames"], function (exports_175, context_175) {
    "use strict";
    var functionCall_2, lexyCodeConstants_5, renderExpression_3, classNames_4, LookUpRowFunctionCall;
    var __moduleName = context_175 && context_175.id;
    return {
        setters: [
            function (functionCall_2_1) {
                functionCall_2 = functionCall_2_1;
            },
            function (lexyCodeConstants_5_1) {
                lexyCodeConstants_5 = lexyCodeConstants_5_1;
            },
            function (renderExpression_3_1) {
                renderExpression_3 = renderExpression_3_1;
            },
            function (classNames_4_1) {
                classNames_4 = classNames_4_1;
            }
        ],
        execute: function () {
            LookUpRowFunctionCall = class LookUpRowFunctionCall extends functionCall_2.FunctionCall {
                renderExpression(expression, codeWriter) {
                    codeWriter.writeNamespace();
                    codeWriter.write(".builtInTableFunctions.lookUpRow(");
                    codeWriter.write(`"${expression.searchValueColumn.member}", `);
                    codeWriter.write(`"${expression.table}", `);
                    codeWriter.writeNamespace(`.${classNames_4.tableClassName(expression.table)}.__values, `);
                    renderExpression_3.renderExpression(expression.valueExpression, codeWriter);
                    codeWriter.write(`, ${lexyCodeConstants_5.LexyCodeConstants.contextVariable})`);
                }
            };
            exports_175("LookUpRowFunctionCall", LookUpRowFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/methodFunctionCall", ["compiler/JavaScript/builtInFunctions/functionCall"], function (exports_176, context_176) {
    "use strict";
    var functionCall_3, MethodFunctionCall;
    var __moduleName = context_176 && context_176.id;
    return {
        setters: [
            function (functionCall_3_1) {
                functionCall_3 = functionCall_3_1;
            }
        ],
        execute: function () {
            MethodFunctionCall = class MethodFunctionCall extends functionCall_3.FunctionCall {
                renderExpression(expression, codeWriter) {
                    codeWriter.writeNamespace();
                    codeWriter.write("." + this.className + "." + this.methodName + "(");
                    this.renderArguments(expression, codeWriter);
                    codeWriter.write(")");
                }
            };
            exports_176("MethodFunctionCall", MethodFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/singleArgumentFunctionCall", ["compiler/JavaScript/builtInFunctions/methodFunctionCall", "compiler/JavaScript/renderers/renderExpression"], function (exports_177, context_177) {
    "use strict";
    var methodFunctionCall_1, renderExpression_4, SingleArgumentFunctionCall;
    var __moduleName = context_177 && context_177.id;
    return {
        setters: [
            function (methodFunctionCall_1_1) {
                methodFunctionCall_1 = methodFunctionCall_1_1;
            },
            function (renderExpression_4_1) {
                renderExpression_4 = renderExpression_4_1;
            }
        ],
        execute: function () {
            SingleArgumentFunctionCall = class SingleArgumentFunctionCall extends methodFunctionCall_1.MethodFunctionCall {
                renderArguments(expression, codeWriter) {
                    renderExpression_4.renderExpression(expression.valueExpression, codeWriter);
                }
            };
            exports_177("SingleArgumentFunctionCall", SingleArgumentFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/intFunctionCall", ["compiler/JavaScript/builtInFunctions/singleArgumentFunctionCall"], function (exports_178, context_178) {
    "use strict";
    var singleArgumentFunctionCall_1, IntFunctionCall;
    var __moduleName = context_178 && context_178.id;
    return {
        setters: [
            function (singleArgumentFunctionCall_1_1) {
                singleArgumentFunctionCall_1 = singleArgumentFunctionCall_1_1;
            }
        ],
        execute: function () {
            IntFunctionCall = class IntFunctionCall extends singleArgumentFunctionCall_1.SingleArgumentFunctionCall {
                constructor() {
                    super(...arguments);
                    this.className = "builtInNumberFunctions";
                    this.methodName = "int";
                }
            };
            exports_178("IntFunctionCall", IntFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/absFunctionCall", ["compiler/JavaScript/builtInFunctions/singleArgumentFunctionCall"], function (exports_179, context_179) {
    "use strict";
    var singleArgumentFunctionCall_2, AbsFunctionCall;
    var __moduleName = context_179 && context_179.id;
    return {
        setters: [
            function (singleArgumentFunctionCall_2_1) {
                singleArgumentFunctionCall_2 = singleArgumentFunctionCall_2_1;
            }
        ],
        execute: function () {
            AbsFunctionCall = class AbsFunctionCall extends singleArgumentFunctionCall_2.SingleArgumentFunctionCall {
                constructor() {
                    super(...arguments);
                    this.className = "builtInNumberFunctions";
                    this.methodName = "abs";
                }
            };
            exports_179("AbsFunctionCall", AbsFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/powerFunctionCall", ["compiler/JavaScript/builtInFunctions/methodFunctionCall", "compiler/JavaScript/renderers/renderExpression"], function (exports_180, context_180) {
    "use strict";
    var methodFunctionCall_2, renderExpression_5, PowerFunctionCall;
    var __moduleName = context_180 && context_180.id;
    return {
        setters: [
            function (methodFunctionCall_2_1) {
                methodFunctionCall_2 = methodFunctionCall_2_1;
            },
            function (renderExpression_5_1) {
                renderExpression_5 = renderExpression_5_1;
            }
        ],
        execute: function () {
            PowerFunctionCall = class PowerFunctionCall extends methodFunctionCall_2.MethodFunctionCall {
                constructor() {
                    super(...arguments);
                    this.className = "builtInNumberFunctions";
                    this.methodName = "power";
                }
                renderArguments(expression, codeWriter) {
                    renderExpression_5.renderExpression(expression.numberExpression, codeWriter);
                    codeWriter.write(", ");
                    renderExpression_5.renderExpression(expression.powerExpression, codeWriter);
                }
            };
            exports_180("PowerFunctionCall", PowerFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/roundFunctionCall", ["compiler/JavaScript/builtInFunctions/methodFunctionCall", "compiler/JavaScript/renderers/renderExpression"], function (exports_181, context_181) {
    "use strict";
    var methodFunctionCall_3, renderExpression_6, RoundFunctionCall;
    var __moduleName = context_181 && context_181.id;
    return {
        setters: [
            function (methodFunctionCall_3_1) {
                methodFunctionCall_3 = methodFunctionCall_3_1;
            },
            function (renderExpression_6_1) {
                renderExpression_6 = renderExpression_6_1;
            }
        ],
        execute: function () {
            RoundFunctionCall = class RoundFunctionCall extends methodFunctionCall_3.MethodFunctionCall {
                constructor() {
                    super(...arguments);
                    this.className = "builtInNumberFunctions";
                    this.methodName = "round";
                }
                renderArguments(expression, codeWriter) {
                    renderExpression_6.renderExpression(expression.numberExpression, codeWriter);
                    codeWriter.write(", ");
                    renderExpression_6.renderExpression(expression.digitsExpression, codeWriter);
                }
            };
            exports_181("RoundFunctionCall", RoundFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/noArgumentFunctionCall", ["compiler/JavaScript/builtInFunctions/functionCall"], function (exports_182, context_182) {
    "use strict";
    var functionCall_4, NoArgumentFunctionCall;
    var __moduleName = context_182 && context_182.id;
    return {
        setters: [
            function (functionCall_4_1) {
                functionCall_4 = functionCall_4_1;
            }
        ],
        execute: function () {
            NoArgumentFunctionCall = class NoArgumentFunctionCall extends functionCall_4.FunctionCall {
                renderExpression(expresion, codeWriter) {
                    codeWriter.writeNamespace();
                    codeWriter.write(`.${this.className}.${this.methodName}()`);
                }
            };
            exports_182("NoArgumentFunctionCall", NoArgumentFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/nowFunctionCall", ["compiler/JavaScript/builtInFunctions/noArgumentFunctionCall"], function (exports_183, context_183) {
    "use strict";
    var noArgumentFunctionCall_1, NowFunctionCall;
    var __moduleName = context_183 && context_183.id;
    return {
        setters: [
            function (noArgumentFunctionCall_1_1) {
                noArgumentFunctionCall_1 = noArgumentFunctionCall_1_1;
            }
        ],
        execute: function () {
            NowFunctionCall = class NowFunctionCall extends noArgumentFunctionCall_1.NoArgumentFunctionCall {
                constructor() {
                    super(...arguments);
                    this.className = "builtInDateFunctions";
                    this.methodName = "now";
                }
            };
            exports_183("NowFunctionCall", NowFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/todayFunctionCall", ["compiler/JavaScript/builtInFunctions/noArgumentFunctionCall"], function (exports_184, context_184) {
    "use strict";
    var noArgumentFunctionCall_2, TodayFunctionCall;
    var __moduleName = context_184 && context_184.id;
    return {
        setters: [
            function (noArgumentFunctionCall_2_1) {
                noArgumentFunctionCall_2 = noArgumentFunctionCall_2_1;
            }
        ],
        execute: function () {
            TodayFunctionCall = class TodayFunctionCall extends noArgumentFunctionCall_2.NoArgumentFunctionCall {
                constructor() {
                    super(...arguments);
                    this.className = "builtInDateFunctions";
                    this.methodName = "today";
                }
            };
            exports_184("TodayFunctionCall", TodayFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/yearFunctionCall", ["compiler/JavaScript/builtInFunctions/singleArgumentFunctionCall"], function (exports_185, context_185) {
    "use strict";
    var singleArgumentFunctionCall_3, YearFunctionCall;
    var __moduleName = context_185 && context_185.id;
    return {
        setters: [
            function (singleArgumentFunctionCall_3_1) {
                singleArgumentFunctionCall_3 = singleArgumentFunctionCall_3_1;
            }
        ],
        execute: function () {
            YearFunctionCall = class YearFunctionCall extends singleArgumentFunctionCall_3.SingleArgumentFunctionCall {
                constructor() {
                    super(...arguments);
                    this.className = "builtInDateFunctions";
                    this.methodName = "year";
                }
            };
            exports_185("YearFunctionCall", YearFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/monthFunctionCall", ["compiler/JavaScript/builtInFunctions/singleArgumentFunctionCall"], function (exports_186, context_186) {
    "use strict";
    var singleArgumentFunctionCall_4, MonthFunctionCall;
    var __moduleName = context_186 && context_186.id;
    return {
        setters: [
            function (singleArgumentFunctionCall_4_1) {
                singleArgumentFunctionCall_4 = singleArgumentFunctionCall_4_1;
            }
        ],
        execute: function () {
            MonthFunctionCall = class MonthFunctionCall extends singleArgumentFunctionCall_4.SingleArgumentFunctionCall {
                constructor() {
                    super(...arguments);
                    this.className = "builtInDateFunctions";
                    this.methodName = "month";
                }
            };
            exports_186("MonthFunctionCall", MonthFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/dayFunctionCall", ["compiler/JavaScript/builtInFunctions/singleArgumentFunctionCall"], function (exports_187, context_187) {
    "use strict";
    var singleArgumentFunctionCall_5, DayFunctionCall;
    var __moduleName = context_187 && context_187.id;
    return {
        setters: [
            function (singleArgumentFunctionCall_5_1) {
                singleArgumentFunctionCall_5 = singleArgumentFunctionCall_5_1;
            }
        ],
        execute: function () {
            DayFunctionCall = class DayFunctionCall extends singleArgumentFunctionCall_5.SingleArgumentFunctionCall {
                constructor() {
                    super(...arguments);
                    this.className = "builtInDateFunctions";
                    this.methodName = "day";
                }
            };
            exports_187("DayFunctionCall", DayFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/hourFunctionCall", ["compiler/JavaScript/builtInFunctions/singleArgumentFunctionCall"], function (exports_188, context_188) {
    "use strict";
    var singleArgumentFunctionCall_6, HourFunctionCall;
    var __moduleName = context_188 && context_188.id;
    return {
        setters: [
            function (singleArgumentFunctionCall_6_1) {
                singleArgumentFunctionCall_6 = singleArgumentFunctionCall_6_1;
            }
        ],
        execute: function () {
            HourFunctionCall = class HourFunctionCall extends singleArgumentFunctionCall_6.SingleArgumentFunctionCall {
                constructor() {
                    super(...arguments);
                    this.className = "builtInDateFunctions";
                    this.methodName = "hour";
                }
            };
            exports_188("HourFunctionCall", HourFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/minuteFunctionCall", ["compiler/JavaScript/builtInFunctions/singleArgumentFunctionCall"], function (exports_189, context_189) {
    "use strict";
    var singleArgumentFunctionCall_7, MinuteFunctionCall;
    var __moduleName = context_189 && context_189.id;
    return {
        setters: [
            function (singleArgumentFunctionCall_7_1) {
                singleArgumentFunctionCall_7 = singleArgumentFunctionCall_7_1;
            }
        ],
        execute: function () {
            MinuteFunctionCall = class MinuteFunctionCall extends singleArgumentFunctionCall_7.SingleArgumentFunctionCall {
                constructor() {
                    super(...arguments);
                    this.className = "builtInDateFunctions";
                    this.methodName = "minute";
                }
            };
            exports_189("MinuteFunctionCall", MinuteFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/secondFunctionCall", ["compiler/JavaScript/builtInFunctions/singleArgumentFunctionCall"], function (exports_190, context_190) {
    "use strict";
    var singleArgumentFunctionCall_8, SecondFunctionCall;
    var __moduleName = context_190 && context_190.id;
    return {
        setters: [
            function (singleArgumentFunctionCall_8_1) {
                singleArgumentFunctionCall_8 = singleArgumentFunctionCall_8_1;
            }
        ],
        execute: function () {
            SecondFunctionCall = class SecondFunctionCall extends singleArgumentFunctionCall_8.SingleArgumentFunctionCall {
                constructor() {
                    super(...arguments);
                    this.className = "builtInDateFunctions";
                    this.methodName = "second";
                }
            };
            exports_190("SecondFunctionCall", SecondFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/endStartDateFunctionCall", ["compiler/JavaScript/builtInFunctions/methodFunctionCall", "compiler/JavaScript/renderers/renderExpression"], function (exports_191, context_191) {
    "use strict";
    var methodFunctionCall_4, renderExpression_7, EndStartDateFunctionCall;
    var __moduleName = context_191 && context_191.id;
    return {
        setters: [
            function (methodFunctionCall_4_1) {
                methodFunctionCall_4 = methodFunctionCall_4_1;
            },
            function (renderExpression_7_1) {
                renderExpression_7 = renderExpression_7_1;
            }
        ],
        execute: function () {
            EndStartDateFunctionCall = class EndStartDateFunctionCall extends methodFunctionCall_4.MethodFunctionCall {
                renderArguments(expression, codeWriter) {
                    renderExpression_7.renderExpression(expression.endDateExpression, codeWriter);
                    codeWriter.write(", ");
                    renderExpression_7.renderExpression(expression.startDateExpression, codeWriter);
                }
            };
            exports_191("EndStartDateFunctionCall", EndStartDateFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/yearsFunctionCall", ["compiler/JavaScript/builtInFunctions/endStartDateFunctionCall"], function (exports_192, context_192) {
    "use strict";
    var endStartDateFunctionCall_1, YearsFunctionCall;
    var __moduleName = context_192 && context_192.id;
    return {
        setters: [
            function (endStartDateFunctionCall_1_1) {
                endStartDateFunctionCall_1 = endStartDateFunctionCall_1_1;
            }
        ],
        execute: function () {
            YearsFunctionCall = class YearsFunctionCall extends endStartDateFunctionCall_1.EndStartDateFunctionCall {
                constructor() {
                    super(...arguments);
                    this.className = "builtInDateFunctions";
                    this.methodName = "years";
                }
            };
            exports_192("YearsFunctionCall", YearsFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/monthsFunctionCall", ["compiler/JavaScript/builtInFunctions/endStartDateFunctionCall"], function (exports_193, context_193) {
    "use strict";
    var endStartDateFunctionCall_2, MonthsFunctionCall;
    var __moduleName = context_193 && context_193.id;
    return {
        setters: [
            function (endStartDateFunctionCall_2_1) {
                endStartDateFunctionCall_2 = endStartDateFunctionCall_2_1;
            }
        ],
        execute: function () {
            MonthsFunctionCall = class MonthsFunctionCall extends endStartDateFunctionCall_2.EndStartDateFunctionCall {
                constructor() {
                    super(...arguments);
                    this.className = "builtInDateFunctions";
                    this.methodName = "months";
                }
            };
            exports_193("MonthsFunctionCall", MonthsFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/daysFunctionCall", ["compiler/JavaScript/builtInFunctions/endStartDateFunctionCall"], function (exports_194, context_194) {
    "use strict";
    var endStartDateFunctionCall_3, DaysFunctionCall;
    var __moduleName = context_194 && context_194.id;
    return {
        setters: [
            function (endStartDateFunctionCall_3_1) {
                endStartDateFunctionCall_3 = endStartDateFunctionCall_3_1;
            }
        ],
        execute: function () {
            DaysFunctionCall = class DaysFunctionCall extends endStartDateFunctionCall_3.EndStartDateFunctionCall {
                constructor() {
                    super(...arguments);
                    this.className = "builtInDateFunctions";
                    this.methodName = "days";
                }
            };
            exports_194("DaysFunctionCall", DaysFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/hoursFunctionCall", ["compiler/JavaScript/builtInFunctions/endStartDateFunctionCall"], function (exports_195, context_195) {
    "use strict";
    var endStartDateFunctionCall_4, HoursFunctionCall;
    var __moduleName = context_195 && context_195.id;
    return {
        setters: [
            function (endStartDateFunctionCall_4_1) {
                endStartDateFunctionCall_4 = endStartDateFunctionCall_4_1;
            }
        ],
        execute: function () {
            HoursFunctionCall = class HoursFunctionCall extends endStartDateFunctionCall_4.EndStartDateFunctionCall {
                constructor() {
                    super(...arguments);
                    this.className = "builtInDateFunctions";
                    this.methodName = "hours";
                }
            };
            exports_195("HoursFunctionCall", HoursFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/minutesFunctionCall", ["compiler/JavaScript/builtInFunctions/endStartDateFunctionCall"], function (exports_196, context_196) {
    "use strict";
    var endStartDateFunctionCall_5, MinutesFunctionCall;
    var __moduleName = context_196 && context_196.id;
    return {
        setters: [
            function (endStartDateFunctionCall_5_1) {
                endStartDateFunctionCall_5 = endStartDateFunctionCall_5_1;
            }
        ],
        execute: function () {
            MinutesFunctionCall = class MinutesFunctionCall extends endStartDateFunctionCall_5.EndStartDateFunctionCall {
                constructor() {
                    super(...arguments);
                    this.className = "builtInDateFunctions";
                    this.methodName = "minutes";
                }
            };
            exports_196("MinutesFunctionCall", MinutesFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/secondsFunctionCall", ["compiler/JavaScript/builtInFunctions/endStartDateFunctionCall"], function (exports_197, context_197) {
    "use strict";
    var endStartDateFunctionCall_6, SecondsFunctionCall;
    var __moduleName = context_197 && context_197.id;
    return {
        setters: [
            function (endStartDateFunctionCall_6_1) {
                endStartDateFunctionCall_6 = endStartDateFunctionCall_6_1;
            }
        ],
        execute: function () {
            SecondsFunctionCall = class SecondsFunctionCall extends endStartDateFunctionCall_6.EndStartDateFunctionCall {
                constructor() {
                    super(...arguments);
                    this.className = "builtInDateFunctions";
                    this.methodName = "seconds";
                }
            };
            exports_197("SecondsFunctionCall", SecondsFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/lexyFunctionCall", ["compiler/JavaScript/builtInFunctions/functionCall", "compiler/JavaScript/classNames", "compiler/lexyCodeConstants"], function (exports_198, context_198) {
    "use strict";
    var functionCall_5, classNames_5, lexyCodeConstants_6, LexyFunctionCall;
    var __moduleName = context_198 && context_198.id;
    return {
        setters: [
            function (functionCall_5_1) {
                functionCall_5 = functionCall_5_1;
            },
            function (classNames_5_1) {
                classNames_5 = classNames_5_1;
            },
            function (lexyCodeConstants_6_1) {
                lexyCodeConstants_6 = lexyCodeConstants_6_1;
            }
        ],
        execute: function () {
            LexyFunctionCall = class LexyFunctionCall extends functionCall_5.FunctionCall {
                renderExpression(expression, codeWriter) {
                    return LexyFunctionCall.renderFunction(expression.functionName, expression.variableName, codeWriter);
                }
                static renderFunction(functionName, variableName, codeWriter) {
                    codeWriter.writeNamespace("." + classNames_5.functionClassName(functionName));
                    codeWriter.write(`(${variableName}, ${lexyCodeConstants_6.LexyCodeConstants.contextVariable})`);
                }
            };
            exports_198("LexyFunctionCall", LexyFunctionCall);
        }
    };
});
System.register("compiler/JavaScript/builtInFunctions/createFunctionCall", ["language/nodeType", "compiler/JavaScript/builtInFunctions/lookUpFunctionCall", "compiler/JavaScript/builtInFunctions/lookUpRowFunctionCall", "compiler/JavaScript/builtInFunctions/intFunctionCall", "compiler/JavaScript/builtInFunctions/absFunctionCall", "compiler/JavaScript/builtInFunctions/powerFunctionCall", "compiler/JavaScript/builtInFunctions/roundFunctionCall", "compiler/JavaScript/builtInFunctions/nowFunctionCall", "compiler/JavaScript/builtInFunctions/todayFunctionCall", "compiler/JavaScript/builtInFunctions/yearFunctionCall", "compiler/JavaScript/builtInFunctions/monthFunctionCall", "compiler/JavaScript/builtInFunctions/dayFunctionCall", "compiler/JavaScript/builtInFunctions/hourFunctionCall", "compiler/JavaScript/builtInFunctions/minuteFunctionCall", "compiler/JavaScript/builtInFunctions/secondFunctionCall", "compiler/JavaScript/builtInFunctions/yearsFunctionCall", "compiler/JavaScript/builtInFunctions/monthsFunctionCall", "compiler/JavaScript/builtInFunctions/daysFunctionCall", "compiler/JavaScript/builtInFunctions/hoursFunctionCall", "compiler/JavaScript/builtInFunctions/minutesFunctionCall", "compiler/JavaScript/builtInFunctions/secondsFunctionCall", "compiler/JavaScript/builtInFunctions/lexyFunctionCall"], function (exports_199, context_199) {
    "use strict";
    var nodeType_65, lookUpFunctionCall_1, lookUpRowFunctionCall_1, intFunctionCall_1, absFunctionCall_1, powerFunctionCall_1, roundFunctionCall_1, nowFunctionCall_1, todayFunctionCall_1, yearFunctionCall_1, monthFunctionCall_1, dayFunctionCall_1, hourFunctionCall_1, minuteFunctionCall_1, secondFunctionCall_1, yearsFunctionCall_1, monthsFunctionCall_1, daysFunctionCall_1, hoursFunctionCall_1, minutesFunctionCall_1, secondsFunctionCall_1, lexyFunctionCall_1;
    var __moduleName = context_199 && context_199.id;
    function renderCustomBuiltInFunctions(expression, codeWriter) {
        const functionCall = createFunctionCall(expression);
        if (functionCall != null) {
            functionCall.renderCustomFunction(expression, codeWriter);
        }
    }
    exports_199("renderCustomBuiltInFunctions", renderCustomBuiltInFunctions);
    function renderFunctionCall(expression, codeWriter) {
        const functionCall = createFunctionCall(expression);
        if (functionCall == null)
            throw new Error("Invalid expression function: " + expression.nodeType);
        functionCall.renderExpression(expression, codeWriter);
    }
    exports_199("renderFunctionCall", renderFunctionCall);
    function createFunctionCall(expression) {
        switch (expression.nodeType) {
            case nodeType_65.NodeType.LookupFunction:
                return new lookUpFunctionCall_1.LookUpFunctionCall();
            case nodeType_65.NodeType.LookupRowFunction:
                return new lookUpRowFunctionCall_1.LookUpRowFunctionCall();
            case nodeType_65.NodeType.IntFunction:
                return new intFunctionCall_1.IntFunctionCall();
            case nodeType_65.NodeType.AbsFunction:
                return new absFunctionCall_1.AbsFunctionCall();
            case nodeType_65.NodeType.PowerFunction:
                return new powerFunctionCall_1.PowerFunctionCall();
            case nodeType_65.NodeType.RoundFunction:
                return new roundFunctionCall_1.RoundFunctionCall();
            case nodeType_65.NodeType.NowFunction:
                return new nowFunctionCall_1.NowFunctionCall();
            case nodeType_65.NodeType.TodayFunction:
                return new todayFunctionCall_1.TodayFunctionCall();
            case nodeType_65.NodeType.YearFunction:
                return new yearFunctionCall_1.YearFunctionCall();
            case nodeType_65.NodeType.MonthFunction:
                return new monthFunctionCall_1.MonthFunctionCall();
            case nodeType_65.NodeType.DayFunction:
                return new dayFunctionCall_1.DayFunctionCall();
            case nodeType_65.NodeType.HourFunction:
                return new hourFunctionCall_1.HourFunctionCall();
            case nodeType_65.NodeType.MinuteFunction:
                return new minuteFunctionCall_1.MinuteFunctionCall();
            case nodeType_65.NodeType.SecondFunction:
                return new secondFunctionCall_1.SecondFunctionCall();
            case nodeType_65.NodeType.YearsFunction:
                return new yearsFunctionCall_1.YearsFunctionCall();
            case nodeType_65.NodeType.MonthsFunction:
                return new monthsFunctionCall_1.MonthsFunctionCall();
            case nodeType_65.NodeType.DaysFunction:
                return new daysFunctionCall_1.DaysFunctionCall();
            case nodeType_65.NodeType.HoursFunction:
                return new hoursFunctionCall_1.HoursFunctionCall();
            case nodeType_65.NodeType.MinutesFunction:
                return new minutesFunctionCall_1.MinutesFunctionCall();
            case nodeType_65.NodeType.SecondsFunction:
                return new secondsFunctionCall_1.SecondsFunctionCall();
            case nodeType_65.NodeType.LexyFunction:
                return new lexyFunctionCall_1.LexyFunctionCall();
            default:
                return null;
        }
    }
    return {
        setters: [
            function (nodeType_65_1) {
                nodeType_65 = nodeType_65_1;
            },
            function (lookUpFunctionCall_1_1) {
                lookUpFunctionCall_1 = lookUpFunctionCall_1_1;
            },
            function (lookUpRowFunctionCall_1_1) {
                lookUpRowFunctionCall_1 = lookUpRowFunctionCall_1_1;
            },
            function (intFunctionCall_1_1) {
                intFunctionCall_1 = intFunctionCall_1_1;
            },
            function (absFunctionCall_1_1) {
                absFunctionCall_1 = absFunctionCall_1_1;
            },
            function (powerFunctionCall_1_1) {
                powerFunctionCall_1 = powerFunctionCall_1_1;
            },
            function (roundFunctionCall_1_1) {
                roundFunctionCall_1 = roundFunctionCall_1_1;
            },
            function (nowFunctionCall_1_1) {
                nowFunctionCall_1 = nowFunctionCall_1_1;
            },
            function (todayFunctionCall_1_1) {
                todayFunctionCall_1 = todayFunctionCall_1_1;
            },
            function (yearFunctionCall_1_1) {
                yearFunctionCall_1 = yearFunctionCall_1_1;
            },
            function (monthFunctionCall_1_1) {
                monthFunctionCall_1 = monthFunctionCall_1_1;
            },
            function (dayFunctionCall_1_1) {
                dayFunctionCall_1 = dayFunctionCall_1_1;
            },
            function (hourFunctionCall_1_1) {
                hourFunctionCall_1 = hourFunctionCall_1_1;
            },
            function (minuteFunctionCall_1_1) {
                minuteFunctionCall_1 = minuteFunctionCall_1_1;
            },
            function (secondFunctionCall_1_1) {
                secondFunctionCall_1 = secondFunctionCall_1_1;
            },
            function (yearsFunctionCall_1_1) {
                yearsFunctionCall_1 = yearsFunctionCall_1_1;
            },
            function (monthsFunctionCall_1_1) {
                monthsFunctionCall_1 = monthsFunctionCall_1_1;
            },
            function (daysFunctionCall_1_1) {
                daysFunctionCall_1 = daysFunctionCall_1_1;
            },
            function (hoursFunctionCall_1_1) {
                hoursFunctionCall_1 = hoursFunctionCall_1_1;
            },
            function (minutesFunctionCall_1_1) {
                minutesFunctionCall_1 = minutesFunctionCall_1_1;
            },
            function (secondsFunctionCall_1_1) {
                secondsFunctionCall_1 = secondsFunctionCall_1_1;
            },
            function (lexyFunctionCall_1_1) {
                lexyFunctionCall_1 = lexyFunctionCall_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("compiler/JavaScript/lineExpressionExceptions/ILineExpressionException", [], function (exports_200, context_200) {
    "use strict";
    var __moduleName = context_200 && context_200.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("compiler/JavaScript/lineExpressionExceptions/newFunctionExpressionStatementException", ["language/expressions/functionCallExpression", "language/expressions/variableDeclarationExpression", "language/expressions/functions/newFunction", "compiler/JavaScript/types"], function (exports_201, context_201) {
    "use strict";
    var functionCallExpression_2, variableDeclarationExpression_2, newFunction_2, types_2, NewFunctionExpressionStatementException;
    var __moduleName = context_201 && context_201.id;
    return {
        setters: [
            function (functionCallExpression_2_1) {
                functionCallExpression_2 = functionCallExpression_2_1;
            },
            function (variableDeclarationExpression_2_1) {
                variableDeclarationExpression_2 = variableDeclarationExpression_2_1;
            },
            function (newFunction_2_1) {
                newFunction_2 = newFunction_2_1;
            },
            function (types_2_1) {
                types_2 = types_2_1;
            }
        ],
        execute: function () {
            NewFunctionExpressionStatementException = class NewFunctionExpressionStatementException {
                matches(expression) {
                    const assignmentExpression = variableDeclarationExpression_2.asVariableDeclarationExpression(expression);
                    if (assignmentExpression == null)
                        return false;
                    const functionCallExpression = functionCallExpression_2.asFunctionCallExpression(assignmentExpression.assignment);
                    if (functionCallExpression == null)
                        return false;
                    return newFunction_2.instanceOfNewFunction(functionCallExpression.expressionFunction);
                }
                render(expression, codeWriter) {
                    const assignmentExpression = variableDeclarationExpression_2.asVariableDeclarationExpression(expression);
                    if (assignmentExpression == null)
                        throw new Error(`expression should be VariableDeclarationExpression`);
                    if (assignmentExpression.type.variableType == null)
                        throw new Error(`assignmentExpression.type.variableType should not be null`);
                    const functionCallExpression = functionCallExpression_2.asFunctionCallExpression(assignmentExpression.assignment);
                    if (functionCallExpression == null)
                        throw new Error(`assignmentExpression.assignment should be FunctionCallExpression`);
                    const newFunction = newFunction_2.asNewFunction(functionCallExpression.expressionFunction);
                    if (newFunction == null)
                        throw new Error(`functionCallExpression.ExpressionFunction should be NewFunction`);
                    const type = types_2.translateType(assignmentExpression.type.variableType);
                    codeWriter.write("const " + assignmentExpression.name + " = new ");
                    codeWriter.writeNamespace(`.${types_2.translateType(assignmentExpression.type.variableType)}`);
                    codeWriter.endLine("();");
                }
            };
            exports_201("NewFunctionExpressionStatementException", NewFunctionExpressionStatementException);
        }
    };
});
System.register("compiler/JavaScript/lineExpressionExceptions/fillFunctionExpressionStatementException", ["language/expressions/functionCallExpression", "language/expressions/variableDeclarationExpression", "language/expressions/functions/fillParametersFunction", "language/variableSource", "compiler/lexyCodeConstants", "compiler/JavaScript/types"], function (exports_202, context_202) {
    "use strict";
    var functionCallExpression_3, variableDeclarationExpression_3, fillParametersFunction_3, variableSource_8, lexyCodeConstants_7, types_3, FillFunctionExpressionStatementException;
    var __moduleName = context_202 && context_202.id;
    return {
        setters: [
            function (functionCallExpression_3_1) {
                functionCallExpression_3 = functionCallExpression_3_1;
            },
            function (variableDeclarationExpression_3_1) {
                variableDeclarationExpression_3 = variableDeclarationExpression_3_1;
            },
            function (fillParametersFunction_3_1) {
                fillParametersFunction_3 = fillParametersFunction_3_1;
            },
            function (variableSource_8_1) {
                variableSource_8 = variableSource_8_1;
            },
            function (lexyCodeConstants_7_1) {
                lexyCodeConstants_7 = lexyCodeConstants_7_1;
            },
            function (types_3_1) {
                types_3 = types_3_1;
            }
        ],
        execute: function () {
            FillFunctionExpressionStatementException = class FillFunctionExpressionStatementException {
                matches(expression) {
                    const assignmentExpression = variableDeclarationExpression_3.asVariableDeclarationExpression(expression);
                    if (assignmentExpression == null)
                        return false;
                    const functionCallExpression = functionCallExpression_3.asFunctionCallExpression(assignmentExpression.assignment);
                    if (functionCallExpression == null)
                        return false;
                    return fillParametersFunction_3.instanceOfFillParametersFunction(functionCallExpression.expressionFunction);
                }
                render(expression, codeWriter) {
                    const assignmentExpression = variableDeclarationExpression_3.asVariableDeclarationExpression(expression);
                    if (assignmentExpression == null)
                        throw new Error(`expression should be AssignmentExpression`);
                    const functionCallExpression = functionCallExpression_3.asFunctionCallExpression(assignmentExpression.assignment);
                    if (functionCallExpression == null)
                        throw new Error(`assignmentExpression.assignment should be FunctionCallExpression`);
                    const fillParametersFunction = fillParametersFunction_3.asFillParametersFunction(functionCallExpression.expressionFunction);
                    if (fillParametersFunction == null)
                        throw new Error("Expression not FillParametersFunction: " + functionCallExpression.expressionFunction);
                    return FillFunctionExpressionStatementException.renderFill(assignmentExpression.name, fillParametersFunction.type, fillParametersFunction.mapping, codeWriter);
                }
                static renderFill(variableName, type, mappings, codeWriter) {
                    codeWriter.write(`const ` + variableName + " = new ");
                    codeWriter.writeNamespace(`.${types_3.translateType(type)}`);
                    codeWriter.endLine("();");
                    for (const mapping of mappings) {
                        codeWriter.startLine(variableName + "." + mapping.variableName + " = ");
                        if (mapping.variableSource == variableSource_8.VariableSource.Code) {
                            codeWriter.write(mapping.variableName);
                        }
                        else if (mapping.variableSource == variableSource_8.VariableSource.Results) {
                            codeWriter.write(`${lexyCodeConstants_7.LexyCodeConstants.resultsVariable}.${mapping.variableName}`);
                        }
                        else if (mapping.variableSource == variableSource_8.VariableSource.Parameters) {
                            codeWriter.write(`${lexyCodeConstants_7.LexyCodeConstants.parameterVariable}.${mapping.variableName}`);
                        }
                        else {
                            throw new Error(`Invalid source: ${mapping.variableSource}`);
                        }
                        codeWriter.writeLine(";");
                    }
                }
            };
            exports_202("FillFunctionExpressionStatementException", FillFunctionExpressionStatementException);
        }
    };
});
System.register("compiler/JavaScript/lineExpressionExceptions/extractFunctionExpressionStatementException", ["language/expressions/functionCallExpression", "language/variableSource", "compiler/lexyCodeConstants", "language/expressions/functions/extractResultsFunction"], function (exports_203, context_203) {
    "use strict";
    var functionCallExpression_4, variableSource_9, lexyCodeConstants_8, extractResultsFunction_3, ExtractFunctionExpressionStatementException;
    var __moduleName = context_203 && context_203.id;
    return {
        setters: [
            function (functionCallExpression_4_1) {
                functionCallExpression_4 = functionCallExpression_4_1;
            },
            function (variableSource_9_1) {
                variableSource_9 = variableSource_9_1;
            },
            function (lexyCodeConstants_8_1) {
                lexyCodeConstants_8 = lexyCodeConstants_8_1;
            },
            function (extractResultsFunction_3_1) {
                extractResultsFunction_3 = extractResultsFunction_3_1;
            }
        ],
        execute: function () {
            ExtractFunctionExpressionStatementException = class ExtractFunctionExpressionStatementException {
                matches(expression) {
                    const functionCallExpression = functionCallExpression_4.asFunctionCallExpression(expression);
                    if (functionCallExpression == null)
                        return false;
                    return extractResultsFunction_3.instanceOfExtractResultsFunction(functionCallExpression.expressionFunction);
                }
                render(expression, codeWriter) {
                    const functionCallExpression = functionCallExpression_4.asFunctionCallExpression(expression);
                    if (functionCallExpression == null)
                        throw new Error("Expression not FunctionCallExpression: " + expression.nodeType);
                    const extractResultsFunction = extractResultsFunction_3.asExtractResultsFunction(functionCallExpression.expressionFunction);
                    if (extractResultsFunction == null)
                        throw new Error("Expression not ExtractResultsFunction: " + functionCallExpression.expressionFunction);
                    if (extractResultsFunction.functionResultVariable == null)
                        throw new Error("extractResultsFunction.functionResultVariable is null");
                    return ExtractFunctionExpressionStatementException.renderExtract(extractResultsFunction.mapping, extractResultsFunction.functionResultVariable, codeWriter);
                }
                static renderExtract(mappings, functionResultVariable, codeWriter) {
                    for (const mapping of mappings) {
                        this.renderMapping(functionResultVariable, mapping, codeWriter);
                    }
                }
                static renderMapping(functionResultVariable, mapping, codeWriter) {
                    if (mapping.variableSource == variableSource_9.VariableSource.Code) {
                        codeWriter.startLine(mapping.variableName);
                    }
                    else if (mapping.variableSource == variableSource_9.VariableSource.Results) {
                        codeWriter.startLine(`${lexyCodeConstants_8.LexyCodeConstants.resultsVariable}.${mapping.variableName}`);
                    }
                    else if (mapping.variableSource == variableSource_9.VariableSource.Parameters) {
                        codeWriter.startLine(`${lexyCodeConstants_8.LexyCodeConstants.parameterVariable}.${mapping.variableName}`);
                    }
                    else {
                        throw new Error(`Invalid source: ${mapping.variableSource}`);
                    }
                    codeWriter.write(" = ");
                    codeWriter.endLine(`${functionResultVariable}.${mapping.variableName};`);
                }
            };
            exports_203("ExtractFunctionExpressionStatementException", ExtractFunctionExpressionStatementException);
        }
    };
});
System.register("compiler/JavaScript/lineExpressionExceptions/simpleLexyFunctionFunctionExpressionStatementException", ["language/expressions/functionCallExpression", "language/expressions/functions/lexyFunction", "compiler/lexyCodeConstants", "compiler/JavaScript/lineExpressionExceptions/fillFunctionExpressionStatementException", "compiler/JavaScript/lineExpressionExceptions/extractFunctionExpressionStatementException", "compiler/JavaScript/builtInFunctions/lexyFunctionCall"], function (exports_204, context_204) {
    "use strict";
    var functionCallExpression_5, lexyFunction_2, lexyCodeConstants_9, fillFunctionExpressionStatementException_1, extractFunctionExpressionStatementException_1, lexyFunctionCall_2, SimpleLexyFunctionFunctionExpressionStatementException;
    var __moduleName = context_204 && context_204.id;
    return {
        setters: [
            function (functionCallExpression_5_1) {
                functionCallExpression_5 = functionCallExpression_5_1;
            },
            function (lexyFunction_2_1) {
                lexyFunction_2 = lexyFunction_2_1;
            },
            function (lexyCodeConstants_9_1) {
                lexyCodeConstants_9 = lexyCodeConstants_9_1;
            },
            function (fillFunctionExpressionStatementException_1_1) {
                fillFunctionExpressionStatementException_1 = fillFunctionExpressionStatementException_1_1;
            },
            function (extractFunctionExpressionStatementException_1_1) {
                extractFunctionExpressionStatementException_1 = extractFunctionExpressionStatementException_1_1;
            },
            function (lexyFunctionCall_2_1) {
                lexyFunctionCall_2 = lexyFunctionCall_2_1;
            }
        ],
        execute: function () {
            SimpleLexyFunctionFunctionExpressionStatementException = class SimpleLexyFunctionFunctionExpressionStatementException {
                matches(expression) {
                    const functionCallExpression = functionCallExpression_5.asFunctionCallExpression(expression);
                    if (functionCallExpression == null)
                        return false;
                    const instanceOfLexyFunction1 = lexyFunction_2.instanceOfLexyFunction(functionCallExpression.expressionFunction);
                    return instanceOfLexyFunction1;
                }
                render(expression, codeWriter) {
                    const functionCallExpression = functionCallExpression_5.asFunctionCallExpression(expression);
                    if (functionCallExpression == null)
                        throw new Error(`expression should be FunctionCallExpression`);
                    const lexyFunction = lexyFunction_2.asLexyFunction(functionCallExpression.expressionFunction);
                    if (lexyFunction == null)
                        throw new Error(`functionCallExpression.ExpressionFunction should be ExtractResultsFunction`);
                    let parameterVariable = `${lexyCodeConstants_9.LexyCodeConstants.parameterVariable}_${codeWriter.currentLine}`;
                    let resultsVariable = `${lexyCodeConstants_9.LexyCodeConstants.resultsVariable}_${codeWriter.currentLine}`;
                    fillFunctionExpressionStatementException_1.FillFunctionExpressionStatementException.renderFill(parameterVariable, lexyFunction.functionParametersType, lexyFunction.mappingParameters, codeWriter);
                    this.renderRunFunction(lexyFunction, parameterVariable, resultsVariable, codeWriter);
                    extractFunctionExpressionStatementException_1.ExtractFunctionExpressionStatementException.renderExtract(lexyFunction.mappingResults, resultsVariable, codeWriter);
                }
                renderRunFunction(lexyFunction, parameterVariable, resultsVariable, codeWriter) {
                    codeWriter.startLine("let " + resultsVariable + " = ");
                    lexyFunctionCall_2.LexyFunctionCall.renderFunction(lexyFunction.functionName, parameterVariable, codeWriter);
                    codeWriter.endLine(";");
                }
            };
            exports_204("SimpleLexyFunctionFunctionExpressionStatementException", SimpleLexyFunctionFunctionExpressionStatementException);
        }
    };
});
System.register("compiler/JavaScript/lineExpressionExceptions/matchesLineExpressionException", ["compiler/JavaScript/lineExpressionExceptions/newFunctionExpressionStatementException", "compiler/JavaScript/lineExpressionExceptions/fillFunctionExpressionStatementException", "compiler/JavaScript/lineExpressionExceptions/extractFunctionExpressionStatementException", "compiler/JavaScript/lineExpressionExceptions/simpleLexyFunctionFunctionExpressionStatementException", "infrastructure/enumerableExtensions"], function (exports_205, context_205) {
    "use strict";
    var newFunctionExpressionStatementException_1, fillFunctionExpressionStatementException_2, extractFunctionExpressionStatementException_2, simpleLexyFunctionFunctionExpressionStatementException_1, enumerableExtensions_10, renderStatementExceptions;
    var __moduleName = context_205 && context_205.id;
    function matchesLineExpressionException(expression) {
        return enumerableExtensions_10.firstOrDefault(renderStatementExceptions, exception => exception.matches(expression));
    }
    exports_205("matchesLineExpressionException", matchesLineExpressionException);
    return {
        setters: [
            function (newFunctionExpressionStatementException_1_1) {
                newFunctionExpressionStatementException_1 = newFunctionExpressionStatementException_1_1;
            },
            function (fillFunctionExpressionStatementException_2_1) {
                fillFunctionExpressionStatementException_2 = fillFunctionExpressionStatementException_2_1;
            },
            function (extractFunctionExpressionStatementException_2_1) {
                extractFunctionExpressionStatementException_2 = extractFunctionExpressionStatementException_2_1;
            },
            function (simpleLexyFunctionFunctionExpressionStatementException_1_1) {
                simpleLexyFunctionFunctionExpressionStatementException_1 = simpleLexyFunctionFunctionExpressionStatementException_1_1;
            },
            function (enumerableExtensions_10_1) {
                enumerableExtensions_10 = enumerableExtensions_10_1;
            }
        ],
        execute: function () {
            renderStatementExceptions = [
                new newFunctionExpressionStatementException_1.NewFunctionExpressionStatementException(),
                new fillFunctionExpressionStatementException_2.FillFunctionExpressionStatementException(),
                new extractFunctionExpressionStatementException_2.ExtractFunctionExpressionStatementException(),
                new simpleLexyFunctionFunctionExpressionStatementException_1.SimpleLexyFunctionFunctionExpressionStatementException()
            ];
        }
    };
});
System.register("compiler/JavaScript/renderers/renderExpression", ["language/nodeType", "language/expressions/memberAccessExpression", "language/variableTypes/variableTypeName", "compiler/JavaScript/classNames", "language/expressions/literalExpression", "language/expressions/assignmentExpression", "language/expressions/binaryExpression", "language/expressions/bracketedExpression", "language/expressions/elseExpression", "language/expressions/parenthesizedExpression", "language/expressions/ifExpression", "language/expressions/switchExpression", "language/expressions/expressionOperator", "language/expressions/identifierExpression", "language/expressions/variableDeclarationExpression", "language/variableTypes/enumType", "language/variableTypes/customType", "language/variableTypes/tableType", "language/variableSource", "compiler/lexyCodeConstants", "compiler/JavaScript/renderers/renderVariableClass", "language/expressions/functionCallExpression", "compiler/JavaScript/builtInFunctions/createFunctionCall", "compiler/JavaScript/lineExpressionExceptions/matchesLineExpressionException", "parser/tokens/tokenType", "parser/tokens/dateTimeLiteral"], function (exports_206, context_206) {
    "use strict";
    var nodeType_66, memberAccessExpression_9, variableTypeName_11, classNames_6, literalExpression_5, assignmentExpression_2, binaryExpression_2, bracketedExpression_2, elseExpression_3, parenthesizedExpression_3, ifExpression_2, switchExpression_2, expressionOperator_2, identifierExpression_6, variableDeclarationExpression_4, enumType_5, customType_4, tableType_3, variableSource_10, lexyCodeConstants_10, renderVariableClass_1, functionCallExpression_6, createFunctionCall_1, matchesLineExpressionException_1, tokenType_16, dateTimeLiteral_2;
    var __moduleName = context_206 && context_206.id;
    function renderExpressions(expressions, codeWriter) {
        for (const expression of expressions) {
            const line = codeWriter.currentLine;
            codeWriter.startLine();
            const exception = matchesLineExpressionException_1.matchesLineExpressionException(expression);
            if (exception != null) {
                exception.render(expression, codeWriter);
            }
            else {
                renderExpression(expression, codeWriter);
                if (line == codeWriter.currentLine) {
                    codeWriter.endLine(";");
                }
            }
        }
    }
    exports_206("renderExpressions", renderExpressions);
    function renderValueExpression(expression, codeWriter) {
        function render(castFunction, render) {
            const specificExpression = castFunction(expression);
            if (specificExpression == null)
                throw new Error(`Invalid expression type: '${expression.nodeType}' cast is null`);
            render(specificExpression, codeWriter);
        }
        switch (expression.nodeType) {
            case nodeType_66.NodeType.LiteralExpression:
                return render(literalExpression_5.asLiteralExpression, renderLiteralExpression);
            case nodeType_66.NodeType.IdentifierExpression:
                return render(identifierExpression_6.asIdentifierExpression, renderIdentifierExpression);
            case nodeType_66.NodeType.MemberAccessExpression:
                return render(memberAccessExpression_9.asMemberAccessExpression, renderMemberAccessExpression);
            default:
                throw new Error(`Invalid expression type: ${expression.nodeType}`);
        }
    }
    exports_206("renderValueExpression", renderValueExpression);
    function renderExpression(expression, codeWriter) {
        function render(castFunction, render) {
            const specificExpression = castFunction(expression);
            if (specificExpression == null)
                throw new Error(`Invalid expression type: '${expression.nodeType}' cast is null`);
            render(specificExpression, codeWriter);
        }
        switch (expression.nodeType) {
            case nodeType_66.NodeType.AssignmentExpression:
                return render(assignmentExpression_2.asAssignmentExpression, renderAssignmentExpression);
            case nodeType_66.NodeType.BinaryExpression:
                return render(binaryExpression_2.asBinaryExpression, renderBinaryExpression);
            case nodeType_66.NodeType.BracketedExpression:
                return render(bracketedExpression_2.asBracketedExpression, renderBracketedExpression);
            case nodeType_66.NodeType.ElseExpression:
                return render(elseExpression_3.asElseExpression, renderElseExpression);
            case nodeType_66.NodeType.IfExpression:
                return render(ifExpression_2.asIfExpression, renderIfExpression);
            case nodeType_66.NodeType.LiteralExpression:
                return render(literalExpression_5.asLiteralExpression, renderLiteralExpression);
            case nodeType_66.NodeType.IdentifierExpression:
                return render(identifierExpression_6.asIdentifierExpression, renderIdentifierExpression);
            case nodeType_66.NodeType.ParenthesizedExpression:
                return render(parenthesizedExpression_3.asParenthesizedExpression, renderParenthesizedExpression);
            case nodeType_66.NodeType.SwitchExpression:
                return render(switchExpression_2.asSwitchExpression, renderSwitchExpression);
            case nodeType_66.NodeType.MemberAccessExpression:
                return render(memberAccessExpression_9.asMemberAccessExpression, renderMemberAccessExpression);
            case nodeType_66.NodeType.VariableDeclarationExpression:
                return render(variableDeclarationExpression_4.asVariableDeclarationExpression, renderVariableDeclarationExpression);
        }
        const functionCallExpression = functionCallExpression_6.asFunctionCallExpression(expression);
        if (functionCallExpression != null) {
            return render(functionCallExpression_6.asFunctionCallExpression, renderFunctionCallExpression);
        }
        throw new Error(`Invalid expression type: ${expression.nodeType}`);
    }
    exports_206("renderExpression", renderExpression);
    function renderMemberAccessExpression(memberAccessExpression, codeWriter) {
        if (memberAccessExpression.variable.parts < 2)
            throw new Error(`Invalid MemberAccessExpression: {expression}`);
        const parentIdentifier = translateParentVariableClassName(memberAccessExpression, memberAccessExpression.variable, codeWriter);
        const parent = fromSource(memberAccessExpression.variableSource, parentIdentifier);
        codeWriter.write(parent);
        let childReference = memberAccessExpression.variable;
        while (childReference.hasChildIdentifiers) {
            childReference = childReference.childrenReference();
            codeWriter.write(".");
            codeWriter.write(childReference.parentIdentifier);
        }
    }
    function translateParentVariableClassName(expression, reference, codeWriter) {
        var _a;
        switch ((_a = expression.parentVariableType) === null || _a === void 0 ? void 0 : _a.variableTypeName) {
            case variableTypeName_11.VariableTypeName.CustomType:
                return codeWriter.identifierFromNamespace(classNames_6.typeClassName(reference.parentIdentifier));
            case variableTypeName_11.VariableTypeName.EnumType:
                return codeWriter.identifierFromNamespace(classNames_6.enumClassName(reference.parentIdentifier));
            case variableTypeName_11.VariableTypeName.FunctionType:
                return codeWriter.identifierFromNamespace(classNames_6.functionClassName(reference.parentIdentifier));
            case variableTypeName_11.VariableTypeName.TableType:
                return codeWriter.identifierFromNamespace(classNames_6.tableClassName(reference.parentIdentifier));
            default:
                return reference.parentIdentifier;
        }
    }
    function renderIdentifierExpression(expression, codeWriter) {
        const value = fromSource(expression.variableSource, expression.identifier);
        codeWriter.write(value);
    }
    function renderLiteralExpression(expression, codeWriter) {
        if (expression.literal.tokenType == tokenType_16.TokenType.QuotedLiteralToken) {
            codeWriter.write(`"${expression.literal.value}"`);
        }
        else if (expression.literal.tokenType == tokenType_16.TokenType.DateTimeLiteral) {
            const dateTimeLiteral = dateTimeLiteral_2.asDateTimeLiteral(expression.literal);
            const dateValue = dateTimeLiteral === null || dateTimeLiteral === void 0 ? void 0 : dateTimeLiteral.dateTimeValue;
            if (dateValue == null)
                throw new Error("DateTimeLiteral.dateTimeValue expected");
            codeWriter.write(`new Date(${dateValue.getFullYear()}, ${dateValue.getMonth()}, ${dateValue.getDate()}, ${dateValue.getHours()}, ${dateValue.getMinutes()}, ${dateValue.getSeconds()})`);
        }
        else {
            codeWriter.write(expression.literal.value);
        }
    }
    function renderAssignmentExpression(expression, codeWriter) {
        renderExpression(expression.variable, codeWriter);
        codeWriter.write(" = ");
        renderExpression(expression.assignment, codeWriter);
    }
    function renderBinaryExpression(expression, codeWriter) {
        renderExpression(expression.left, codeWriter);
        codeWriter.write(operatorString(expression.operator));
        renderExpression(expression.right, codeWriter);
    }
    function operatorString(operator) {
        switch (operator) {
            case expressionOperator_2.ExpressionOperator.Addition:
                return " + ";
            case expressionOperator_2.ExpressionOperator.Subtraction:
                return " - ";
            case expressionOperator_2.ExpressionOperator.Multiplication:
                return " * ";
            case expressionOperator_2.ExpressionOperator.Division:
                return " / ";
            case expressionOperator_2.ExpressionOperator.Modulus:
                return " % ";
            case expressionOperator_2.ExpressionOperator.GreaterThan:
                return " > ";
            case expressionOperator_2.ExpressionOperator.GreaterThanOrEqual:
                return " >= ";
            case expressionOperator_2.ExpressionOperator.LessThan:
                return " < ";
            case expressionOperator_2.ExpressionOperator.LessThanOrEqual:
                return " <= ";
            case expressionOperator_2.ExpressionOperator.And:
                return " && ";
            case expressionOperator_2.ExpressionOperator.Or:
                return " || ";
            case expressionOperator_2.ExpressionOperator.Equals:
                return " == ";
            case expressionOperator_2.ExpressionOperator.NotEqual:
                return " != ";
            default:
                throw new Error("Invalid operator: " + operator);
        }
    }
    function renderBracketedExpression(expression, codeWriter) {
        codeWriter.write("[");
        renderExpression(expression.expression, codeWriter);
        codeWriter.write("]");
    }
    function renderElseExpression(expression, codeWriter) {
        codeWriter.openScope("else");
        renderExpressions(expression.falseExpressions, codeWriter);
        codeWriter.closeScope();
    }
    function renderIfExpression(expression, codeWriter) {
        codeWriter.write("if (");
        renderExpression(expression.condition, codeWriter);
        codeWriter.openInlineScope(")");
        renderExpressions(expression.trueExpressions, codeWriter);
        if (expression.else != null) {
            codeWriter.write("} else {");
            renderExpressions(expression.else.falseExpressions, codeWriter);
        }
        codeWriter.closeScope();
    }
    function renderParenthesizedExpression(expression, codeWriter) {
        codeWriter.write("(");
        renderExpression(expression.expression, codeWriter);
        codeWriter.write(")");
    }
    function renderCaseExpression(caseValue, codeWriter) {
        if (caseValue.value == null) {
            codeWriter.openScope("default:");
            renderExpressions(caseValue.expressions, codeWriter);
            codeWriter.writeLine("break;");
            codeWriter.closeScope();
            return;
        }
        codeWriter.startLine("case ");
        renderExpression(caseValue.value, codeWriter);
        codeWriter.openInlineScope(":");
        renderExpressions(caseValue.expressions, codeWriter);
        codeWriter.writeLine("break;");
        codeWriter.closeScope();
    }
    function renderSwitchExpression(expression, codeWriter) {
        codeWriter.write("switch(");
        renderExpression(expression.condition, codeWriter);
        codeWriter.openInlineScope(")");
        for (const caseValue of expression.cases) {
            renderCaseExpression(caseValue, codeWriter);
        }
        codeWriter.closeScope();
    }
    function renderVariableDeclarationExpression(expression, codeWriter) {
        codeWriter.write(`let ${expression.name} = `);
        if (expression.assignment != null) {
            renderExpression(expression.assignment, codeWriter);
        }
        else {
            renderVariableClass_1.renderTypeDefaultExpression(expression.type, codeWriter);
        }
    }
    function customVariableIdentifier(customVariable, codeWriter) {
        if (customVariable.variableType == null)
            throw new Error("Variable type expected: " + customVariable.nodeType);
        const variableTypeName = customVariable.variableType.variableTypeName;
        switch (variableTypeName) {
            case variableTypeName_11.VariableTypeName.EnumType:
                const enumType = enumType_5.asEnumType(customVariable.variableType);
                if (enumType == null)
                    throw new Error("Invalid EnumType");
                return codeWriter.identifierFromNamespace(classNames_6.enumClassName(enumType.type));
            case variableTypeName_11.VariableTypeName.TableType:
                const tableType = tableType_3.asTableType(customVariable.variableType);
                if (tableType == null)
                    throw new Error("Invalid TableType");
                return codeWriter.identifierFromNamespace(classNames_6.tableClassName(tableType.tableName));
            case variableTypeName_11.VariableTypeName.CustomType:
                const customType = customType_4.asCustomType(customVariable.variableType);
                if (customType == null)
                    throw new Error("Invalid CustomType");
                return codeWriter.identifierFromNamespace(classNames_6.typeClassName(customType.type));
        }
        throw new Error(`Couldn't map type: ${customVariable.variableType}`);
    }
    exports_206("customVariableIdentifier", customVariableIdentifier);
    function fromSource(source, name) {
        switch (source) {
            case variableSource_10.VariableSource.Parameters:
                return `${lexyCodeConstants_10.LexyCodeConstants.parameterVariable}.${name}`;
            case variableSource_10.VariableSource.Results:
                return `${lexyCodeConstants_10.LexyCodeConstants.resultsVariable}.${name}`;
            case variableSource_10.VariableSource.Code:
            case variableSource_10.VariableSource.Type:
                return name;
            case variableSource_10.VariableSource.Unknown:
            default:
                throw new Error(`source: {source}`);
        }
    }
    function renderFunctionCallExpression(expression, codeWriter) {
        createFunctionCall_1.renderFunctionCall(expression.expressionFunction, codeWriter);
    }
    return {
        setters: [
            function (nodeType_66_1) {
                nodeType_66 = nodeType_66_1;
            },
            function (memberAccessExpression_9_1) {
                memberAccessExpression_9 = memberAccessExpression_9_1;
            },
            function (variableTypeName_11_1) {
                variableTypeName_11 = variableTypeName_11_1;
            },
            function (classNames_6_1) {
                classNames_6 = classNames_6_1;
            },
            function (literalExpression_5_1) {
                literalExpression_5 = literalExpression_5_1;
            },
            function (assignmentExpression_2_1) {
                assignmentExpression_2 = assignmentExpression_2_1;
            },
            function (binaryExpression_2_1) {
                binaryExpression_2 = binaryExpression_2_1;
            },
            function (bracketedExpression_2_1) {
                bracketedExpression_2 = bracketedExpression_2_1;
            },
            function (elseExpression_3_1) {
                elseExpression_3 = elseExpression_3_1;
            },
            function (parenthesizedExpression_3_1) {
                parenthesizedExpression_3 = parenthesizedExpression_3_1;
            },
            function (ifExpression_2_1) {
                ifExpression_2 = ifExpression_2_1;
            },
            function (switchExpression_2_1) {
                switchExpression_2 = switchExpression_2_1;
            },
            function (expressionOperator_2_1) {
                expressionOperator_2 = expressionOperator_2_1;
            },
            function (identifierExpression_6_1) {
                identifierExpression_6 = identifierExpression_6_1;
            },
            function (variableDeclarationExpression_4_1) {
                variableDeclarationExpression_4 = variableDeclarationExpression_4_1;
            },
            function (enumType_5_1) {
                enumType_5 = enumType_5_1;
            },
            function (customType_4_1) {
                customType_4 = customType_4_1;
            },
            function (tableType_3_1) {
                tableType_3 = tableType_3_1;
            },
            function (variableSource_10_1) {
                variableSource_10 = variableSource_10_1;
            },
            function (lexyCodeConstants_10_1) {
                lexyCodeConstants_10 = lexyCodeConstants_10_1;
            },
            function (renderVariableClass_1_1) {
                renderVariableClass_1 = renderVariableClass_1_1;
            },
            function (functionCallExpression_6_1) {
                functionCallExpression_6 = functionCallExpression_6_1;
            },
            function (createFunctionCall_1_1) {
                createFunctionCall_1 = createFunctionCall_1_1;
            },
            function (matchesLineExpressionException_1_1) {
                matchesLineExpressionException_1 = matchesLineExpressionException_1_1;
            },
            function (tokenType_16_1) {
                tokenType_16 = tokenType_16_1;
            },
            function (dateTimeLiteral_2_1) {
                dateTimeLiteral_2 = dateTimeLiteral_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("compiler/JavaScript/writers/functionWriter", ["compiler/lexyCodeConstants", "compiler/generatedType", "language/functions/function", "language/nodesWalker", "language/expressions/functionCallExpression", "compiler/JavaScript/writers/codeWriter", "compiler/JavaScript/classNames", "compiler/JavaScript/renderers/renderExpression", "compiler/JavaScript/renderers/renderVariableClass", "compiler/JavaScript/builtInFunctions/createFunctionCall"], function (exports_207, context_207) {
    "use strict";
    var lexyCodeConstants_11, generatedType_2, function_5, nodesWalker_2, functionCallExpression_7, codeWriter_1, classNames_7, renderExpression_8, renderVariableClass_2, createFunctionCall_2, FunctionWriter;
    var __moduleName = context_207 && context_207.id;
    return {
        setters: [
            function (lexyCodeConstants_11_1) {
                lexyCodeConstants_11 = lexyCodeConstants_11_1;
            },
            function (generatedType_2_1) {
                generatedType_2 = generatedType_2_1;
            },
            function (function_5_1) {
                function_5 = function_5_1;
            },
            function (nodesWalker_2_1) {
                nodesWalker_2 = nodesWalker_2_1;
            },
            function (functionCallExpression_7_1) {
                functionCallExpression_7 = functionCallExpression_7_1;
            },
            function (codeWriter_1_1) {
                codeWriter_1 = codeWriter_1_1;
            },
            function (classNames_7_1) {
                classNames_7 = classNames_7_1;
            },
            function (renderExpression_8_1) {
                renderExpression_8 = renderExpression_8_1;
            },
            function (renderVariableClass_2_1) {
                renderVariableClass_2 = renderVariableClass_2_1;
            },
            function (createFunctionCall_2_1) {
                createFunctionCall_2 = createFunctionCall_2_1;
            }
        ],
        execute: function () {
            FunctionWriter = class FunctionWriter {
                constructor(namespace) {
                    this.namespace = namespace;
                }
                createCode(node) {
                    const functionNode = function_5.asFunction(node);
                    if (functionNode == null)
                        throw new Error(`Root token not Function`);
                    const codeWriter = new codeWriter_1.CodeWriter(this.namespace);
                    return this.createFunction(functionNode, codeWriter);
                }
                createFunction(functionNode, codeWriter) {
                    codeWriter.openScope("function scope()");
                    this.renderCustomBuiltInFunctions(functionNode, codeWriter);
                    this.renderRunFunction(functionNode, codeWriter);
                    renderVariableClass_2.createVariableClass(lexyCodeConstants_11.LexyCodeConstants.parametersType, functionNode.parameters.variables, codeWriter);
                    renderVariableClass_2.createVariableClass(lexyCodeConstants_11.LexyCodeConstants.resultsType, functionNode.results.variables, codeWriter);
                    codeWriter.writeLine(`${lexyCodeConstants_11.LexyCodeConstants.runMethod}.${lexyCodeConstants_11.LexyCodeConstants.parametersType} = ${lexyCodeConstants_11.LexyCodeConstants.parametersType};`);
                    codeWriter.writeLine(`${lexyCodeConstants_11.LexyCodeConstants.runMethod}.${lexyCodeConstants_11.LexyCodeConstants.resultsType} = ${lexyCodeConstants_11.LexyCodeConstants.resultsType};`);
                    codeWriter.writeLine(`return ${lexyCodeConstants_11.LexyCodeConstants.runMethod};`);
                    codeWriter.closeScope("();");
                    return new generatedType_2.GeneratedType(generatedType_2.GeneratedTypeKind.Function, functionNode, classNames_7.functionClassName(functionNode.nodeName), codeWriter.toString());
                }
                renderRunFunction(functionNode, codeWriter) {
                    codeWriter.openScope(`function ${lexyCodeConstants_11.LexyCodeConstants.runMethod}(${lexyCodeConstants_11.LexyCodeConstants.parameterVariable}, ${lexyCodeConstants_11.LexyCodeConstants.contextVariable})`);
                    this.renderResults(functionNode, codeWriter);
                    this.renderCode(functionNode, codeWriter);
                    codeWriter.writeLine(`return ${lexyCodeConstants_11.LexyCodeConstants.resultsVariable};`);
                    codeWriter.closeScope();
                }
                renderCode(functionNode, codeWriter) {
                    renderExpression_8.renderExpressions(functionNode.code.expressions, codeWriter);
                }
                renderResults(functionNode, codeWriter) {
                    codeWriter.writeLine(`const ${lexyCodeConstants_11.LexyCodeConstants.resultsVariable} = new ${lexyCodeConstants_11.LexyCodeConstants.resultsType}();`);
                }
                renderCustomBuiltInFunctions(functionNode, codeWriter) {
                    return nodesWalker_2.NodesWalker.walkWithResult(functionNode.code.expressions, node => {
                        const expression = functionCallExpression_7.asFunctionCallExpression(node);
                        if (expression != null) {
                            createFunctionCall_2.renderCustomBuiltInFunctions(expression.expressionFunction, codeWriter);
                        }
                    });
                }
            };
            exports_207("FunctionWriter", FunctionWriter);
        }
    };
});
System.register("compiler/JavaScript/writers/typeWriter", ["compiler/generatedType", "language/types/typeDefinition", "compiler/JavaScript/classNames", "compiler/JavaScript/renderers/renderVariableClass", "compiler/JavaScript/writers/codeWriter"], function (exports_208, context_208) {
    "use strict";
    var generatedType_3, typeDefinition_2, classNames_8, renderVariableClass_3, codeWriter_2, TypeWriter;
    var __moduleName = context_208 && context_208.id;
    return {
        setters: [
            function (generatedType_3_1) {
                generatedType_3 = generatedType_3_1;
            },
            function (typeDefinition_2_1) {
                typeDefinition_2 = typeDefinition_2_1;
            },
            function (classNames_8_1) {
                classNames_8 = classNames_8_1;
            },
            function (renderVariableClass_3_1) {
                renderVariableClass_3 = renderVariableClass_3_1;
            },
            function (codeWriter_2_1) {
                codeWriter_2 = codeWriter_2_1;
            }
        ],
        execute: function () {
            TypeWriter = class TypeWriter {
                constructor(namespace) {
                    this.namespace = namespace;
                }
                createCode(node) {
                    const typeDefinition = typeDefinition_2.asTypeDefinition(node);
                    if (typeDefinition == null)
                        throw new Error(`Root token not type`);
                    const className = classNames_8.typeClassName(typeDefinition.name.value);
                    const codeWriter = new codeWriter_2.CodeWriter(this.namespace);
                    renderVariableClass_3.createVariableClass(className, typeDefinition.variables, codeWriter);
                    return new generatedType_3.GeneratedType(generatedType_3.GeneratedTypeKind.Type, node, className, codeWriter.toString());
                }
            };
            exports_208("TypeWriter", TypeWriter);
        }
    };
});
System.register("compiler/JavaScript/writers/tableWriter", ["compiler/generatedType", "language/tables/table", "compiler/JavaScript/classNames", "compiler/JavaScript/writers/codeWriter", "compiler/JavaScript/renderers/renderVariableClass", "compiler/lexyCodeConstants", "compiler/JavaScript/renderers/renderExpression", "infrastructure/assert"], function (exports_209, context_209) {
    "use strict";
    var generatedType_4, table_4, classNames_9, codeWriter_3, renderVariableClass_4, lexyCodeConstants_12, renderExpression_9, assert_15, TableWriter;
    var __moduleName = context_209 && context_209.id;
    return {
        setters: [
            function (generatedType_4_1) {
                generatedType_4 = generatedType_4_1;
            },
            function (table_4_1) {
                table_4 = table_4_1;
            },
            function (classNames_9_1) {
                classNames_9 = classNames_9_1;
            },
            function (codeWriter_3_1) {
                codeWriter_3 = codeWriter_3_1;
            },
            function (renderVariableClass_4_1) {
                renderVariableClass_4 = renderVariableClass_4_1;
            },
            function (lexyCodeConstants_12_1) {
                lexyCodeConstants_12 = lexyCodeConstants_12_1;
            },
            function (renderExpression_9_1) {
                renderExpression_9 = renderExpression_9_1;
            },
            function (assert_15_1) {
                assert_15 = assert_15_1;
            }
        ],
        execute: function () {
            TableWriter = class TableWriter {
                constructor(namespace) {
                    this.namespace = namespace;
                }
                createCode(node) {
                    const table = table_4.asTable(node);
                    if (table == null)
                        throw new Error(`Root token not Table`);
                    const className = classNames_9.tableClassName(table.name.value);
                    const codeWriter = new codeWriter_3.CodeWriter(this.namespace);
                    codeWriter.openScope("function scope()");
                    this.renderRowClass(lexyCodeConstants_12.LexyCodeConstants.rowType, table, codeWriter);
                    this.renderValues(lexyCodeConstants_12.LexyCodeConstants.rowType, table, codeWriter);
                    codeWriter.openScope(`return`);
                    codeWriter.writeLine(`${lexyCodeConstants_12.LexyCodeConstants.rowType}: ${lexyCodeConstants_12.LexyCodeConstants.rowType},`);
                    codeWriter.writeLine(`Count: ${lexyCodeConstants_12.LexyCodeConstants.valuesVariable}.length,`);
                    codeWriter.writeLine(`__values: ${lexyCodeConstants_12.LexyCodeConstants.valuesVariable}`);
                    codeWriter.closeScope(";");
                    codeWriter.closeScope("();");
                    return new generatedType_4.GeneratedType(generatedType_4.GeneratedTypeKind.Table, node, className, codeWriter.toString());
                }
                renderRowClass(rowName, table, codeWriter) {
                    var _a;
                    const header = assert_15.Assert.notNull(table.header, "table.header");
                    codeWriter.openScope("class " + rowName);
                    for (const column of header.columns) {
                        codeWriter.startLine(column.name + " = ");
                        renderVariableClass_4.renderTypeDefaultExpression(column.type, codeWriter);
                        codeWriter.endLine(";");
                    }
                    codeWriter.startLine("constructor(");
                    for (let i = 0; i < header.columns.length; i++) {
                        const column = header.columns[i];
                        codeWriter.write((_a = column === null || column === void 0 ? void 0 : column.name) !== null && _a !== void 0 ? _a : "");
                        if (i < header.columns.length - 1) {
                            codeWriter.write(", ");
                        }
                    }
                    codeWriter.openInlineScope(")");
                    for (const column of header.columns) {
                        codeWriter.writeLine(`this.${column.name} = ${column.name} != undefined ? ${column.name} : this.${column.name};`);
                    }
                    codeWriter.closeScope();
                    codeWriter.closeScope();
                }
                renderValues(rowName, table, codeWriter) {
                    codeWriter.openBrackets(`const ${lexyCodeConstants_12.LexyCodeConstants.valuesVariable} = `);
                    for (const row of table.rows) {
                        codeWriter.startLine("new " + rowName + "(");
                        for (let rowIndex = 0; rowIndex < row.values.length; rowIndex++) {
                            const value = row.values[rowIndex];
                            renderExpression_9.renderValueExpression(value, codeWriter);
                            if (rowIndex < row.values.length - 1) {
                                codeWriter.write(",");
                            }
                        }
                        codeWriter.endLine("),");
                    }
                    codeWriter.closeBrackets();
                }
            };
            exports_209("TableWriter", TableWriter);
        }
    };
});
System.register("compiler/JavaScript/writers/enumWriter", ["compiler/generatedType", "compiler/JavaScript/classNames", "compiler/JavaScript/writers/codeWriter", "language/enums/enumDefinition"], function (exports_210, context_210) {
    "use strict";
    var generatedType_5, classNames_10, codeWriter_4, enumDefinition_3, EnumWriter;
    var __moduleName = context_210 && context_210.id;
    return {
        setters: [
            function (generatedType_5_1) {
                generatedType_5 = generatedType_5_1;
            },
            function (classNames_10_1) {
                classNames_10 = classNames_10_1;
            },
            function (codeWriter_4_1) {
                codeWriter_4 = codeWriter_4_1;
            },
            function (enumDefinition_3_1) {
                enumDefinition_3 = enumDefinition_3_1;
            }
        ],
        execute: function () {
            EnumWriter = class EnumWriter {
                constructor(namespace) {
                    this.namespace = namespace;
                }
                createCode(node) {
                    const enumDefinition = enumDefinition_3.asEnumDefinition(node);
                    if (enumDefinition == null)
                        throw new Error(`Root token not enumDefinition`);
                    const enumName = classNames_10.enumClassName(enumDefinition.name.value);
                    const codeWriter = new codeWriter_4.CodeWriter(this.namespace);
                    codeWriter.openScope();
                    for (const member of enumDefinition.members) {
                        codeWriter.writeLine(member.name + ': "' + member.name + '",');
                    }
                    codeWriter.closeScope();
                    return new generatedType_5.GeneratedType(generatedType_5.GeneratedTypeKind.Enum, node, enumName, codeWriter.toString());
                }
            };
            exports_210("EnumWriter", EnumWriter);
        }
    };
});
System.register("compiler/JavaScript/JavaScriptCode", ["compiler/JavaScript/writers/functionWriter", "language/nodeType", "compiler/JavaScript/writers/typeWriter", "compiler/JavaScript/writers/tableWriter", "compiler/JavaScript/writers/enumWriter"], function (exports_211, context_211) {
    "use strict";
    var functionWriter_1, nodeType_67, typeWriter_1, tableWriter_1, enumWriter_1, JavaScriptCode;
    var __moduleName = context_211 && context_211.id;
    return {
        setters: [
            function (functionWriter_1_1) {
                functionWriter_1 = functionWriter_1_1;
            },
            function (nodeType_67_1) {
                nodeType_67 = nodeType_67_1;
            },
            function (typeWriter_1_1) {
                typeWriter_1 = typeWriter_1_1;
            },
            function (tableWriter_1_1) {
                tableWriter_1 = tableWriter_1_1;
            },
            function (enumWriter_1_1) {
                enumWriter_1 = enumWriter_1_1;
            }
        ],
        execute: function () {
            JavaScriptCode = class JavaScriptCode {
                static getWriter(rootNode, namespace) {
                    switch (rootNode.nodeType) {
                        case nodeType_67.NodeType.Function:
                            return new functionWriter_1.FunctionWriter(namespace);
                        case "EnumDefinition":
                            return new enumWriter_1.EnumWriter(namespace);
                        case nodeType_67.NodeType.Table:
                            return new tableWriter_1.TableWriter(namespace);
                        case nodeType_67.NodeType.TypeDefinition:
                            return new typeWriter_1.TypeWriter(namespace);
                        default:
                            throw new Error(`No writer defined: ` + rootNode.nodeType);
                    }
                }
            };
            exports_211("JavaScriptCode", JavaScriptCode);
        }
    };
});
System.register("compiler/lexyCompiler", ["compiler/compilationEnvironment", "compiler/JavaScript/JavaScriptCode"], function (exports_212, context_212) {
    "use strict";
    var compilationEnvironment_1, JavaScriptCode_1, LexyCompiler;
    var __moduleName = context_212 && context_212.id;
    return {
        setters: [
            function (compilationEnvironment_1_1) {
                compilationEnvironment_1 = compilationEnvironment_1_1;
            },
            function (JavaScriptCode_1_1) {
                JavaScriptCode_1 = JavaScriptCode_1_1;
            }
        ],
        execute: function () {
            LexyCompiler = class LexyCompiler {
                constructor(compilationLogger, executionLogger) {
                    this.compilationLogger = compilationLogger;
                    this.executionLogger = executionLogger;
                }
                compile(nodes) {
                    let environment = new compilationEnvironment_1.CompilationEnvironment(this.compilationLogger, this.executionLogger);
                    try {
                        this.generateCode(nodes, environment);
                        environment.initialize();
                        return environment.result();
                    }
                    catch (error) {
                        this.compilationLogger.logError(`Exception occurred during compilation: ` + error.stack);
                        throw error;
                    }
                }
                generateCode(generateNodes, environment) {
                    generateNodes.map(node => this.generateType(node, environment));
                }
                generateType(node, environment) {
                    let writer = JavaScriptCode_1.JavaScriptCode.getWriter(node, environment.fullNamespace);
                    if (writer == null)
                        throw new Error(`Invalid node type: '${node === null || node === void 0 ? void 0 : node.nodeType}'`);
                    let generatedType = writer.createCode(node);
                    environment.addType(generatedType);
                }
            };
            exports_212("LexyCompiler", LexyCompiler);
        }
    };
});
System.register("dependencyGraph/dependencyNode", [], function (exports_213, context_213) {
    "use strict";
    var DependencyNode;
    var __moduleName = context_213 && context_213.id;
    return {
        setters: [],
        execute: function () {
            DependencyNode = class DependencyNode {
                get dependencies() {
                    return [...this.dependenciesValue];
                }
                constructor(name, type, parentNode) {
                    this.dependenciesValue = [];
                    this.name = name;
                    this.type = type;
                    this.parentNode = parentNode;
                }
                addDependency(dependency) {
                    this.dependenciesValue.push(dependency);
                }
                equals(other) {
                    return this.name == other.name && this.type == other.type;
                }
                existsInLineage(name, type) {
                    if (this.name == name && this.type == type)
                        return true;
                    return this.parentNode != null && this.parentNode.existsInLineage(name, type);
                }
            };
            exports_213("DependencyNode", DependencyNode);
        }
    };
});
System.register("dependencyGraph/dependencies", ["dependencyGraph/dependencyNode", "language/rootNode", "language/IHasNodeDependencies", "infrastructure/enumerableExtensions", "language/nodesWalker"], function (exports_214, context_214) {
    "use strict";
    var dependencyNode_1, rootNode_6, IHasNodeDependencies_2, enumerableExtensions_11, nodesWalker_3, Dependencies;
    var __moduleName = context_214 && context_214.id;
    return {
        setters: [
            function (dependencyNode_1_1) {
                dependencyNode_1 = dependencyNode_1_1;
            },
            function (rootNode_6_1) {
                rootNode_6 = rootNode_6_1;
            },
            function (IHasNodeDependencies_2_1) {
                IHasNodeDependencies_2 = IHasNodeDependencies_2_1;
            },
            function (enumerableExtensions_11_1) {
                enumerableExtensions_11 = enumerableExtensions_11_1;
            },
            function (nodesWalker_3_1) {
                nodesWalker_3 = nodesWalker_3_1;
            }
        ],
        execute: function () {
            Dependencies = class Dependencies {
                get hasCircularReferences() {
                    return this.circularReferences.length > 0;
                }
                get circularReferences() {
                    return [...this.circularReferencesValue];
                }
                constructor(rootNodes) {
                    this.circularReferencesValue = [];
                    this.nodes = [];
                    this.rootNodes = rootNodes;
                }
                build() {
                    this.processNodes(this.rootNodes.asArray(), null);
                }
                processNodes(nodes, parentNode) {
                    for (const node of nodes) {
                        this.nodes.push(this.processNode(node, parentNode));
                    }
                }
                processNode(node, parentNode) {
                    let dependencyNode = this.newDependencyNode(node, parentNode);
                    let dependencies = this.getDependencies(node, dependencyNode);
                    for (const dependency of dependencies) {
                        dependencyNode.addDependency(dependency);
                    }
                    return dependencyNode;
                }
                newDependencyNode(node, parentNode) {
                    const rootNode = rootNode_6.asRootNode(node);
                    const name = rootNode != null && rootNode.nodeName != null ? rootNode.nodeName : node.nodeType;
                    return new dependencyNode_1.DependencyNode(name, node.nodeType, parentNode);
                }
                getDependencies(node, parentNode) {
                    let resultDependencies = new Array();
                    nodesWalker_3.NodesWalker.walk(node, childNode => this.processDependencies(parentNode, childNode, resultDependencies));
                    return resultDependencies;
                }
                processDependencies(parentNode, childNode, resultDependencies) {
                    var _a;
                    let nodeDependencies = (_a = IHasNodeDependencies_2.asHasNodeDependencies(childNode)) === null || _a === void 0 ? void 0 : _a.getDependencies(this.rootNodes);
                    if (nodeDependencies == null)
                        return;
                    for (const dependency of nodeDependencies) {
                        this.validateDependency(parentNode, resultDependencies, dependency);
                    }
                }
                validateDependency(parentNode, resultDependencies, dependency) {
                    if (dependency == null)
                        throw new Error(`node.getDependencies() should never return null`);
                    if (parentNode != null && parentNode.existsInLineage(dependency.nodeName, dependency.nodeType)) {
                        if (!enumerableExtensions_11.any(this.circularReferencesValue, value => value.nodeName == dependency.nodeName)) {
                            this.circularReferencesValue.push(dependency);
                        }
                    }
                    else {
                        if (this.dependencyExists(resultDependencies, dependency))
                            return;
                        let dependencyNode = this.processNode(dependency, parentNode);
                        resultDependencies.push(dependencyNode);
                    }
                }
                dependencyExists(resultDependencies, dependency) {
                    return enumerableExtensions_11.any(resultDependencies, any => any.name == dependency.nodeName && any.type == dependency.nodeType);
                }
            };
            exports_214("Dependencies", Dependencies);
        }
    };
});
System.register("dependencyGraph/dependencyGraphFactory", ["dependencyGraph/dependencies"], function (exports_215, context_215) {
    "use strict";
    var dependencies_1, DependencyGraphFactory;
    var __moduleName = context_215 && context_215.id;
    return {
        setters: [
            function (dependencies_1_1) {
                dependencies_1 = dependencies_1_1;
            }
        ],
        execute: function () {
            DependencyGraphFactory = class DependencyGraphFactory {
                static create(rootNodes) {
                    let dependencies = new dependencies_1.Dependencies(rootNodes);
                    dependencies.build();
                    return dependencies;
                }
            };
            exports_215("DependencyGraphFactory", DependencyGraphFactory);
        }
    };
});
System.register("infrastructure/nameOf", [], function (exports_216, context_216) {
    "use strict";
    var nameOf;
    var __moduleName = context_216 && context_216.id;
    return {
        setters: [],
        execute: function () {
            exports_216("nameOf", nameOf = (name) => name);
        }
    };
});
System.register("language/comments", ["language/parsableNode", "language/nodeType"], function (exports_217, context_217) {
    "use strict";
    var parsableNode_13, nodeType_68, Comments;
    var __moduleName = context_217 && context_217.id;
    return {
        setters: [
            function (parsableNode_13_1) {
                parsableNode_13 = parsableNode_13_1;
            },
            function (nodeType_68_1) {
                nodeType_68 = nodeType_68_1;
            }
        ],
        execute: function () {
            Comments = class Comments extends parsableNode_13.ParsableNode {
                constructor(sourceReference) {
                    super(sourceReference);
                    this.lines = [];
                    this.nodeType = nodeType_68.NodeType.Comments;
                }
                parse(context) {
                    let valid = context.validateTokens("Comments")
                        .count(1)
                        .comment(0)
                        .isValid;
                    if (!valid)
                        return this;
                    let comment = context.line.tokens.tokenValue(0);
                    if (comment != null) {
                        this.lines.push(comment);
                    }
                    return this;
                }
                getChildren() {
                    return [];
                }
                validate(context) {
                }
            };
            exports_217("Comments", Comments);
        }
    };
});
System.register("parser/IFileSystem", [], function (exports_218, context_218) {
    "use strict";
    var __moduleName = context_218 && context_218.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("language/sourceCodeNode", ["language/functions/function", "language/rootNode", "language/comments", "language/include", "language/rootNodeList", "parser/sourceReference", "parser/sourceFile", "parser/nodeName", "parser/Keywords", "language/enums/enumDefinition", "language/scenarios/scenario", "language/tables/table", "language/types/typeDefinition", "language/duplicateChecker", "infrastructure/enumerableExtensions", "language/nodeType"], function (exports_219, context_219) {
    "use strict";
    var function_6, rootNode_7, comments_1, include_1, rootNodeList_1, sourceReference_3, sourceFile_2, nodeName_2, Keywords_10, enumDefinition_4, scenario_2, table_5, typeDefinition_3, duplicateChecker_2, enumerableExtensions_12, nodeType_69, SourceCodeNode;
    var __moduleName = context_219 && context_219.id;
    return {
        setters: [
            function (function_6_1) {
                function_6 = function_6_1;
            },
            function (rootNode_7_1) {
                rootNode_7 = rootNode_7_1;
            },
            function (comments_1_1) {
                comments_1 = comments_1_1;
            },
            function (include_1_1) {
                include_1 = include_1_1;
            },
            function (rootNodeList_1_1) {
                rootNodeList_1 = rootNodeList_1_1;
            },
            function (sourceReference_3_1) {
                sourceReference_3 = sourceReference_3_1;
            },
            function (sourceFile_2_1) {
                sourceFile_2 = sourceFile_2_1;
            },
            function (nodeName_2_1) {
                nodeName_2 = nodeName_2_1;
            },
            function (Keywords_10_1) {
                Keywords_10 = Keywords_10_1;
            },
            function (enumDefinition_4_1) {
                enumDefinition_4 = enumDefinition_4_1;
            },
            function (scenario_2_1) {
                scenario_2 = scenario_2_1;
            },
            function (table_5_1) {
                table_5 = table_5_1;
            },
            function (typeDefinition_3_1) {
                typeDefinition_3 = typeDefinition_3_1;
            },
            function (duplicateChecker_2_1) {
                duplicateChecker_2 = duplicateChecker_2_1;
            },
            function (enumerableExtensions_12_1) {
                enumerableExtensions_12 = enumerableExtensions_12_1;
            },
            function (nodeType_69_1) {
                nodeType_69 = nodeType_69_1;
            }
        ],
        execute: function () {
            SourceCodeNode = class SourceCodeNode extends rootNode_7.RootNode {
                constructor(expressionFactory) {
                    super(new sourceReference_3.SourceReference(new sourceFile_2.SourceFile(`SourceCodeNode`), 1, 1));
                    this.includes = [];
                    this.nodeType = nodeType_69.NodeType.SourceCodeNode;
                    this.nodeName = "SourceCodeNode";
                    this.rootNodes = new rootNodeList_1.RootNodeList();
                    this.comments = new comments_1.Comments(this.reference);
                    this.expressionFactory = expressionFactory;
                }
                parse(context) {
                    let line = context.line;
                    if (line.tokens.isComment())
                        return this.comments;
                    let rootNode = this.parseRootNode(context);
                    if (rootNode == null)
                        return this;
                    this.rootNodes.add(rootNode);
                    return rootNode;
                }
                parseRootNode(context) {
                    if (include_1.Include.isValid(context.line)) {
                        let include = include_1.Include.parse(context);
                        if (include != null) {
                            this.includes.push(include);
                            return null;
                        }
                    }
                    let tokenName = nodeName_2.NodeName.parse(context);
                    if (tokenName == null || tokenName.name == null)
                        return null;
                    let reference = context.line.lineStartReference();
                    switch (tokenName.keyword) {
                        case null:
                            return null;
                        case Keywords_10.Keywords.FunctionKeyword:
                            return function_6.Function.create(tokenName.name, reference, this.expressionFactory);
                        case Keywords_10.Keywords.EnumKeyword:
                            return enumDefinition_4.EnumDefinition.parse(tokenName.name, reference);
                        case Keywords_10.Keywords.ScenarioKeyword:
                            return scenario_2.Scenario.parse(tokenName.name, reference);
                        case Keywords_10.Keywords.TableKeyword:
                            return table_5.Table.parse(tokenName.name, reference);
                        case Keywords_10.Keywords.TypeKeyword:
                            return typeDefinition_3.TypeDefinition.parse(tokenName.name, reference);
                        default:
                            return this.invalidNode(tokenName, context, reference);
                    }
                }
                invalidNode(tokenName, context, reference) {
                    context.logger.fail(reference, `Unknown keyword: ${tokenName.keyword}`);
                    return null;
                }
                getChildren() {
                    return this.rootNodes.asArray();
                }
                validate(context) {
                    duplicateChecker_2.DuplicateChecker.validate(context, node => node.reference, node => node.nodeName, node => `Duplicated node name: '${node.nodeName}'`, this.rootNodes.asArray());
                }
                getDueIncludes() {
                    return enumerableExtensions_12.where(this.includes, include => !include.isProcessed);
                }
            };
            exports_219("SourceCodeNode", SourceCodeNode);
        }
    };
});
System.register("parser/parserContext", ["language/sourceCodeNode", "infrastructure/enumerableExtensions", "parser/parserLogger"], function (exports_220, context_220) {
    "use strict";
    var sourceCodeNode_1, enumerableExtensions_13, parserLogger_1, ParserContext;
    var __moduleName = context_220 && context_220.id;
    return {
        setters: [
            function (sourceCodeNode_1_1) {
                sourceCodeNode_1 = sourceCodeNode_1_1;
            },
            function (enumerableExtensions_13_1) {
                enumerableExtensions_13 = enumerableExtensions_13_1;
            },
            function (parserLogger_1_1) {
                parserLogger_1 = parserLogger_1_1;
            }
        ],
        execute: function () {
            ParserContext = class ParserContext {
                get nodes() {
                    return this.rootNode.rootNodes;
                }
                constructor(logger, fileSystem, expressionFactory) {
                    this.includedFiles = [];
                    this.logger = new parserLogger_1.ParserLogger(logger);
                    this.fileSystem = fileSystem;
                    this.rootNode = new sourceCodeNode_1.SourceCodeNode(expressionFactory);
                }
                addFileIncluded(fileName) {
                    let path = this.normalizePath(fileName);
                    this.includedFiles.push(path);
                }
                isFileIncluded(fileName) {
                    return enumerableExtensions_13.contains(this.includedFiles, this.normalizePath(fileName));
                }
                normalizePath(fileName) {
                    return this.fileSystem.getFullPath(fileName);
                }
            };
            exports_220("ParserContext", ParserContext);
        }
    };
});
System.register("parser/lexySourceDocument", [], function (exports_221, context_221) {
    "use strict";
    var LexySourceDocument;
    var __moduleName = context_221 && context_221.id;
    return {
        setters: [],
        execute: function () {
            LexySourceDocument = class LexySourceDocument {
            };
            exports_221("LexySourceDocument", LexySourceDocument);
            LexySourceDocument.fileExtension = `lexy`;
        }
    };
});
System.register("language/include", ["parser/Keywords", "parser/tokens/character", "parser/lexySourceDocument"], function (exports_222, context_222) {
    "use strict";
    var Keywords_11, character_14, lexySourceDocument_1, Include;
    var __moduleName = context_222 && context_222.id;
    return {
        setters: [
            function (Keywords_11_1) {
                Keywords_11 = Keywords_11_1;
            },
            function (character_14_1) {
                character_14 = character_14_1;
            },
            function (lexySourceDocument_1_1) {
                lexySourceDocument_1 = lexySourceDocument_1_1;
            }
        ],
        execute: function () {
            Include = class Include {
                get isProcessed() {
                    return this.isProcessedValue;
                }
                constructor(fileName, reference) {
                    this.isProcessedValue = false;
                    this.reference = reference;
                    this.fileName = fileName;
                }
                static isValid(line) {
                    return line.tokens.isKeyword(0, Keywords_11.Keywords.Include);
                }
                static parse(context) {
                    let line = context.line;
                    let lineTokens = line.tokens;
                    if (lineTokens.length != 2 || !lineTokens.isQuotedString(1)) {
                        context.logger.fail(line.lineStartReference(), "Invalid syntax. Expected: 'Include \`FileName\`");
                        return null;
                    }
                    let value = lineTokens.tokenValue(1);
                    if (value == null)
                        return null;
                    return new Include(value, line.lineStartReference());
                }
                process(parentFullFileName, context) {
                    this.isProcessedValue = true;
                    if (character_14.isNullOrEmpty(this.fileName)) {
                        context.logger.fail(this.reference, `No include file name specified.`);
                        return null;
                    }
                    let directName = context.fileSystem.getDirectoryName(parentFullFileName);
                    let fullPath = context.fileSystem.getFullPath(directName);
                    let fullFinName = `${context.fileSystem.combine(fullPath, this.fileName)}.${lexySourceDocument_1.LexySourceDocument.fileExtension}`;
                    if (!context.fileSystem.fileExists(fullFinName)) {
                        context.logger.fail(this.reference, `Invalid include file name '${this.fileName}'`);
                        return null;
                    }
                    return fullFinName;
                }
            };
            exports_222("Include", Include);
        }
    };
});
System.register("language/parsableNodeArray", [], function (exports_223, context_223) {
    "use strict";
    var ParsableNodeArray;
    var __moduleName = context_223 && context_223.id;
    return {
        setters: [],
        execute: function () {
            ParsableNodeArray = class ParsableNodeArray {
                constructor(rootNode) {
                    this.values = new Array(8);
                    this.values[0] = rootNode;
                }
                get(indent) {
                    let node = this.values[indent];
                    for (let index = indent + 1; index < this.values.length; index++) {
                        if (this.values[index] == null)
                            break;
                        this.values[index] = null;
                    }
                    return node;
                }
                set(indent, node) {
                    if (indent >= this.values.length) {
                        this.resize(this.values.length * 2);
                    }
                    this.values[indent] = node;
                }
                resize(size) {
                    var delta = this.values.length - size;
                    while (delta++ < 0)
                        this.values.push(null);
                }
            };
            exports_223("ParsableNodeArray", ParsableNodeArray);
        }
    };
});
System.register("parser/sourceCodeDocument", ["parser/sourceFile", "parser/line"], function (exports_224, context_224) {
    "use strict";
    var sourceFile_3, line_1, SourceCodeDocument;
    var __moduleName = context_224 && context_224.id;
    return {
        setters: [
            function (sourceFile_3_1) {
                sourceFile_3 = sourceFile_3_1;
            },
            function (line_1_1) {
                line_1 = line_1_1;
            }
        ],
        execute: function () {
            SourceCodeDocument = class SourceCodeDocument {
                constructor() {
                    this.code = [];
                    this.file = new sourceFile_3.SourceFile("null");
                    this.currentLineValue = null;
                    this.index = -1;
                }
                get currentLine() {
                    if (this.currentLineValue == null)
                        throw new Error(`No current line.`);
                    return this.currentLineValue;
                }
                setCode(lines, fileName) {
                    this.index = -1;
                    this.file = new sourceFile_3.SourceFile(fileName);
                    this.code = lines.map((line, index) => new line_1.Line(index, line, this.file));
                }
                hasMoreLines() {
                    return this.index < this.code.length - 1;
                }
                nextLine() {
                    if (this.index >= this.code.length)
                        throw new Error(`No more lines`);
                    this.currentLineValue = this.code[++this.index];
                    return this.currentLineValue;
                }
                reset() {
                    this.currentLineValue = null;
                }
            };
            exports_224("SourceCodeDocument", SourceCodeDocument);
        }
    };
});
System.register("parser/parserResult", [], function (exports_225, context_225) {
    "use strict";
    var ParserResult;
    var __moduleName = context_225 && context_225.id;
    return {
        setters: [],
        execute: function () {
            ParserResult = class ParserResult {
                constructor(rootNodes, logger) {
                    this.rootNodes = rootNodes;
                    this.logger = logger;
                }
            };
            exports_225("ParserResult", ParserResult);
        }
    };
});
System.register("parser/lexyParser", ["parser/parserResult", "language/parsableNodeArray", "parser/ParseLineContext", "parser/validationContext", "dependencyGraph/dependencyGraphFactory", "parser/sourceCodeDocument", "parser/parserContext"], function (exports_226, context_226) {
    "use strict";
    var parserResult_1, parsableNodeArray_1, ParseLineContext_1, validationContext_1, dependencyGraphFactory_1, sourceCodeDocument_1, parserContext_1, LexyParser;
    var __moduleName = context_226 && context_226.id;
    return {
        setters: [
            function (parserResult_1_1) {
                parserResult_1 = parserResult_1_1;
            },
            function (parsableNodeArray_1_1) {
                parsableNodeArray_1 = parsableNodeArray_1_1;
            },
            function (ParseLineContext_1_1) {
                ParseLineContext_1 = ParseLineContext_1_1;
            },
            function (validationContext_1_1) {
                validationContext_1 = validationContext_1_1;
            },
            function (dependencyGraphFactory_1_1) {
                dependencyGraphFactory_1 = dependencyGraphFactory_1_1;
            },
            function (sourceCodeDocument_1_1) {
                sourceCodeDocument_1 = sourceCodeDocument_1_1;
            },
            function (parserContext_1_1) {
                parserContext_1 = parserContext_1_1;
            }
        ],
        execute: function () {
            LexyParser = class LexyParser {
                constructor(baseLogger, tokenizer, fileSystem, expressionFactory) {
                    this.baseLogger = baseLogger;
                    this.tokenizer = tokenizer;
                    this.fileSystem = fileSystem;
                    this.expressionFactory = expressionFactory;
                    this.sourceCode = new sourceCodeDocument_1.SourceCodeDocument();
                }
                parseFile(fileName, throwException = true) {
                    const fullFileName = this.fileSystem.isPathRooted(fileName)
                        ? fileName
                        : this.fileSystem.getFullPath(fileName);
                    this.baseLogger.logInformation(`Parse file: ` + fullFileName);
                    const code = this.fileSystem.readAllLines(fullFileName);
                    return this.parse(code, fileName, throwException);
                }
                parse(code, fullFileName, throwException = true) {
                    const context = new parserContext_1.ParserContext(this.baseLogger, this.fileSystem, this.expressionFactory);
                    context.addFileIncluded(fullFileName);
                    this.parseDocument(context, code, fullFileName);
                    context.logger.logNodes(context.nodes.asArray());
                    this.validateNodesTree(context);
                    this.detectCircularDependencies(context);
                    if (throwException)
                        context.logger.assertNoErrors();
                    return new parserResult_1.ParserResult(context.nodes, context.logger);
                }
                parseDocument(context, code, fullFileName) {
                    var _a, _b;
                    this.sourceCode.setCode(code, this.fileSystem.getFileName(fullFileName));
                    let currentIndent = 0;
                    let nodePerIndent = new parsableNodeArray_1.ParsableNodeArray(context.rootNode);
                    while (this.sourceCode.hasMoreLines()) {
                        if (!this.processLine(context)) {
                            currentIndent = (_b = (_a = this.sourceCode.currentLine) === null || _a === void 0 ? void 0 : _a.indent(context.logger)) !== null && _b !== void 0 ? _b : currentIndent;
                            continue;
                        }
                        let line = this.sourceCode.currentLine;
                        if (line.isEmpty())
                            continue;
                        let indent = line.indent(context.logger);
                        if (indent == null)
                            continue;
                        if (indent > currentIndent) {
                            context.logger.fail(line.lineStartReference(), `Invalid indent: ${indent}`);
                            continue;
                        }
                        let node = nodePerIndent.get(indent);
                        node = this.parseLine(context, node);
                        currentIndent = indent + 1;
                        nodePerIndent.set(currentIndent, node);
                    }
                    this.reset(context);
                    this.loadIncludedFiles(context, fullFileName);
                }
                processLine(context) {
                    let line = this.sourceCode.nextLine();
                    context.logger.log(line.lineStartReference(), `'${line.content}'`);
                    let tokens = line.tokenize(this.tokenizer);
                    if (tokens.state != 'success') {
                        context.logger.fail(tokens.reference, tokens.errorMessage);
                        return false;
                    }
                    const tokenNames = this.sourceCode.currentLine.tokens.asArray()
                        .map(token => `${token.tokenType}(${token.value})`)
                        .join(" ");
                    context.logger.log(line.lineStartReference(), ` Tokens: ` + tokenNames);
                    return true;
                }
                loadIncludedFiles(context, parentFullFileName) {
                    let includes = context.rootNode.getDueIncludes();
                    for (const include of includes) {
                        this.includeFiles(context, parentFullFileName, include);
                    }
                }
                includeFiles(context, parentFullFileName, include) {
                    let fileName = include.process(parentFullFileName, context);
                    if (fileName == null)
                        return;
                    if (context.isFileIncluded(fileName))
                        return;
                    context.logger.logInfo(`Parse file: ` + fileName);
                    const code = this.fileSystem.readAllLines(fileName);
                    context.addFileIncluded(fileName);
                    this.parseDocument(context, code, fileName);
                }
                validateNodesTree(context) {
                    let validationContext = new validationContext_1.ValidationContext(context.logger, context.nodes);
                    context.rootNode.validateTree(validationContext);
                }
                detectCircularDependencies(context) {
                    let dependencies = dependencyGraphFactory_1.DependencyGraphFactory.create(context.nodes);
                    if (!dependencies.hasCircularReferences)
                        return;
                    for (const circularReference of dependencies.circularReferences) {
                        context.logger.setCurrentNode(circularReference);
                        context.logger.fail(circularReference.reference, `Circular reference detected in: '${circularReference.nodeName}'`);
                    }
                }
                reset(context) {
                    this.sourceCode.reset();
                    context.logger.resetCurrentNode();
                }
                parseLine(context, currentNode) {
                    let parseLineContext = new ParseLineContext_1.ParseLineContext(this.sourceCode.currentLine, context.logger, this.expressionFactory);
                    let node = currentNode != null ? currentNode === null || currentNode === void 0 ? void 0 : currentNode.parse(parseLineContext) : null;
                    if (node == null) {
                        throw new Error(`(${currentNode}) Parse should return child node or itself.`);
                    }
                    const rootNode = this.asRootNode(node);
                    if (rootNode != null) {
                        context.logger.setCurrentNode(rootNode);
                    }
                    return node;
                }
                instanceOfRootNode(object) {
                    return (object === null || object === void 0 ? void 0 : object.isRootNode) == true;
                }
                asRootNode(object) {
                    return this.instanceOfRootNode(object) ? object : null;
                }
            };
            exports_226("LexyParser", LexyParser);
        }
    };
});
System.register("specifications/specificationFileRunner", ["specifications/scenarioRunner", "infrastructure/enumerableExtensions", "infrastructure/formatting"], function (exports_227, context_227) {
    "use strict";
    var scenarioRunner_1, enumerableExtensions_14, formatting_2, SpecificationFileRunner;
    var __moduleName = context_227 && context_227.id;
    return {
        setters: [
            function (scenarioRunner_1_1) {
                scenarioRunner_1 = scenarioRunner_1_1;
            },
            function (enumerableExtensions_14_1) {
                enumerableExtensions_14 = enumerableExtensions_14_1;
            },
            function (formatting_2_1) {
                formatting_2 = formatting_2_1;
            }
        ],
        execute: function () {
            SpecificationFileRunner = class SpecificationFileRunner {
                get scenarioRunners() {
                    return [...this.scenarioRunnersValue];
                }
                constructor(fileName, compiler, parser, runnerContext) {
                    this.scenarioRunnersValue = [];
                    this.result = null;
                    this.fileName = fileName;
                    this.compiler = compiler;
                    this.parser = parser;
                    this.runnerContext = runnerContext;
                }
                initialize() {
                    let result;
                    try {
                        result = this.parser.parseFile(this.fileName, false);
                    }
                    catch (error) {
                        throw new Error("Error while parsing " + this.fileName + "\n" + error.stack + "\n--------------------------------------\n");
                    }
                    this.result = result;
                    result
                        .rootNodes
                        .getScenarios()
                        .forEach(scenario => this.scenarioRunnersValue.push(this.getScenarioRunner(scenario, result.rootNodes, result.logger)));
                }
                run() {
                    if (this.result == null)
                        throw new Error("Runner not initialized");
                    this.validateHasScenarioCheckingRootErrors(this.result.logger);
                    if (this.scenarioRunners.length == 0)
                        return;
                    this.runnerContext.logGlobal(`Filename: ${this.fileName}`);
                    this.scenarioRunners.forEach(runner => runner.run());
                }
                getScenarioRunner(scenario, rootNodeList, parserLogger) {
                    try {
                        return new scenarioRunner_1.ScenarioRunner(this.fileName, this.compiler, rootNodeList, scenario, this.runnerContext, parserLogger);
                    }
                    catch (error) {
                        throw new Error("Error occurred while create runner for: " + this.fileName + "\n" + error.stack);
                    }
                }
                countScenarioRunners() {
                    return this.scenarioRunners.length;
                }
                validateHasScenarioCheckingRootErrors(logger) {
                    if (!logger.hasRootErrors())
                        return;
                    let rootScenarioRunner = enumerableExtensions_14.firstOrDefault(this.scenarioRunners, runner => runner.scenario.expectRootErrors.hasValues);
                    if (rootScenarioRunner == null) {
                        const rootErrors = formatting_2.format(logger.errorRootMessages(), 2);
                        throw new Error(`${this.fileName} has root errors but no scenario that verifies expected root errors. Errors: ${rootErrors}`);
                    }
                }
            };
            exports_227("SpecificationFileRunner", SpecificationFileRunner);
        }
    };
});
System.register("specifications/specificationRunnerContext", ["infrastructure/formatting", "runTime/builtInDateFunctions"], function (exports_228, context_228) {
    "use strict";
    var formatting_3, builtInDateFunctions_2, SpecificationRunnerContext;
    var __moduleName = context_228 && context_228.id;
    return {
        setters: [
            function (formatting_3_1) {
                formatting_3 = formatting_3_1;
            },
            function (builtInDateFunctions_2_1) {
                builtInDateFunctions_2 = builtInDateFunctions_2_1;
            }
        ],
        execute: function () {
            SpecificationRunnerContext = class SpecificationRunnerContext {
                constructor(logger) {
                    this.globalLog = [];
                    this.fileRunnersValue = [];
                    this.failedValues = 0;
                    this.startTimestamp = new Date();
                    this.logger = logger;
                }
                get failed() {
                    return this.failedValues;
                }
                get fileRunners() {
                    return this.fileRunnersValue;
                }
                fail(scenario, message) {
                    this.failedValues++;
                    let log = `- FAILED - ${scenario.name}: ${message}`;
                    this.globalLog.push(log);
                    this.logger.logError(log);
                }
                logGlobal(message) {
                    this.globalLog.push(message);
                    this.logger.logInformation(message);
                }
                logTimeSpent() {
                    const difference = builtInDateFunctions_2.BuiltInDateFunctions.milliseconds(new Date(), this.startTimestamp);
                    const message = `Time: ${difference} milliseconds`;
                    this.globalLog.push(message);
                    this.logger.logInformation(message);
                }
                success(scenario) {
                    let log = `- SUCCESS - ${scenario.name}`;
                    this.globalLog.push(log);
                    this.logger.logInformation(log);
                }
                add(fileRunner) {
                    this.fileRunners.push(fileRunner);
                }
                failedScenariosRunners() {
                    const result = [];
                    this.fileRunners.forEach(runner => runner.scenarioRunners.forEach(scenario => {
                        if (scenario.failed)
                            result.push(scenario);
                    }));
                    return result;
                }
                countScenarios() {
                    let total = 0;
                    this.fileRunners.map(fileRunner => total += fileRunner.countScenarioRunners());
                    return total;
                }
                formatGlobalLog() {
                    return formatting_3.format(this.globalLog, 2);
                }
            };
            exports_228("SpecificationRunnerContext", SpecificationRunnerContext);
        }
    };
});
System.register("specifications/typeConverter", ["language/variableTypes/enumType", "language/variableTypes/primitiveType", "language/variableTypes/typeNames"], function (exports_229, context_229) {
    "use strict";
    var enumType_6, primitiveType_22, typeNames_5, TypeConverter;
    var __moduleName = context_229 && context_229.id;
    return {
        setters: [
            function (enumType_6_1) {
                enumType_6 = enumType_6_1;
            },
            function (primitiveType_22_1) {
                primitiveType_22 = primitiveType_22_1;
            },
            function (typeNames_5_1) {
                typeNames_5 = typeNames_5_1;
            }
        ],
        execute: function () {
            TypeConverter = class TypeConverter {
                static convert(compilerResult, value, type) {
                    const enumVariableType = enumType_6.asEnumType(type);
                    if (enumVariableType != null) {
                        return this.convertEnum(compilerResult, enumVariableType, value);
                    }
                    const primitiveVariableType = primitiveType_22.asPrimitiveType(type);
                    if (primitiveVariableType != null) {
                        return this.convertPrimitive(primitiveVariableType, value);
                    }
                    throw new Error(`Invalid type: '${type}'`);
                }
                static convertEnum(compilerResult, enumVariableType, value) {
                    let enumType = compilerResult.getEnumType(enumVariableType.type);
                    if (enumType == null)
                        throw new Error(`Unknown enum: ${enumVariableType.type}`);
                    let enumValueName = value.toString();
                    let indexOfSeparator = enumValueName.indexOf(`.`);
                    return enumValueName.substring(indexOfSeparator + 1);
                }
                static convertPrimitive(primitiveVariableType, value) {
                    switch (primitiveVariableType.type) {
                        case typeNames_5.TypeNames.number:
                            return parseFloat(value.toString());
                        case typeNames_5.TypeNames.date:
                            return value.constructor == Date ? value : new Date(value.toString());
                        case typeNames_5.TypeNames.boolean:
                            return value.toString() === 'true';
                        case typeNames_5.TypeNames.string:
                            return value;
                        default:
                            throw new Error(`Invalid type: '${primitiveVariableType.type}'`);
                    }
                }
            };
            exports_229("TypeConverter", TypeConverter);
        }
    };
});
System.register("specifications/scenarioRunner", ["infrastructure/formatting", "specifications/typeConverter", "infrastructure/enumerableExtensions", "infrastructure/assert"], function (exports_230, context_230) {
    "use strict";
    var formatting_4, typeConverter_1, enumerableExtensions_15, assert_16, ScenarioRunner;
    var __moduleName = context_230 && context_230.id;
    return {
        setters: [
            function (formatting_4_1) {
                formatting_4 = formatting_4_1;
            },
            function (typeConverter_1_1) {
                typeConverter_1 = typeConverter_1_1;
            },
            function (enumerableExtensions_15_1) {
                enumerableExtensions_15 = enumerableExtensions_15_1;
            },
            function (assert_16_1) {
                assert_16 = assert_16_1;
            }
        ],
        execute: function () {
            ScenarioRunner = class ScenarioRunner {
                get failed() {
                    return this.failedValue;
                }
                constructor(fileName, compiler, rootNodeList, scenario, context, parserLogger) {
                    this.functionNode = null;
                    this.failedValue = false;
                    this.fileName = fileName;
                    this.compiler = compiler;
                    this.context = context;
                    this.rootNodeList = rootNodeList;
                    this.parserLogger = parserLogger;
                    this.scenario = scenario;
                    this.functionNode = ScenarioRunner.getFunctionNode(scenario, rootNodeList);
                }
                static getFunctionNode(scenario, rootNodeList) {
                    if (scenario.functionNode != null) {
                        return scenario.functionNode;
                    }
                    if (scenario.functionName.hasValue) {
                        return rootNodeList.getFunction(scenario.functionName.value);
                    }
                    return null;
                }
                run() {
                    if (this.parserLogger.nodeHasErrors(this.scenario)) {
                        this.fail(` Parsing scenario failed: ${this.scenario.functionName}`);
                        this.parserLogger.errorNodeMessages(this.scenario)
                            .forEach(message => this.context.logGlobal(message));
                        return;
                    }
                    if (!this.validateErrors())
                        return;
                    const functionNode = assert_16.Assert.notNull(this.functionNode, "this.functionNode");
                    const nodes = functionNode.getFunctionAndDependencies(this.rootNodeList);
                    const compilerResult = this.compile(nodes);
                    const context = compilerResult.createContext();
                    const executable = compilerResult.getFunction(functionNode);
                    const values = this.getValues(this.scenario.parameters, functionNode.parameters, compilerResult);
                    const result = this.runFunction(executable, context, values);
                    const validationResultText = this.getValidationResult(result, compilerResult);
                    if (validationResultText.length > 0) {
                        this.fail(validationResultText);
                    }
                    else {
                        this.context.success(this.scenario);
                    }
                }
                runFunction(executable, context, values) {
                    try {
                        return executable.run(context, values);
                    }
                    catch (error) {
                        throw new Error("Exception occurred while running scenario '" + this.scenario.name + "' from '" + this.fileName + "'\n" + error.stack);
                    }
                }
                compile(nodes) {
                    try {
                        return this.compiler.compile(nodes);
                    }
                    catch (error) {
                        throw new Error("Exception occurred while compiling scenario '" + this.scenario.name + "' from '" + this.fileName + "'\n" + error.stack);
                    }
                }
                parserLogging() {
                    return `------- Filename: ${this.fileName}\n${formatting_4.format(this.parserLogger.errorMessages(), 2)}`;
                }
                fail(message) {
                    this.failedValue = true;
                    this.context.fail(this.scenario, message);
                }
                getValidationResult(result, compilerResult) {
                    const validationResult = [];
                    for (const expected of this.scenario.results.assignments) {
                        let actual = result.getValue(expected.variable);
                        let expectedValue = typeConverter_1.TypeConverter.convert(compilerResult, expected.constantValue.value, expected.variableType);
                        if (actual == null || expectedValue == null || !ScenarioRunner.compare(actual, expectedValue)) {
                            validationResult.push(`'${expected.variable}' should be '${expectedValue !== null && expectedValue !== void 0 ? expectedValue : `<null>`}' (${expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.constructor.name}) but is '${actual !== null && actual !== void 0 ? actual : `<null>`} (${actual === null || actual === void 0 ? void 0 : actual.constructor.name})'`);
                        }
                    }
                    return validationResult.join('\n');
                }
                validateErrors() {
                    var _a, _b, _c;
                    if (this.scenario.expectRootErrors.hasValues)
                        return this.validateRootErrors();
                    let node = assert_16.Assert.notNull((_c = (_b = (_a = this.functionNode) !== null && _a !== void 0 ? _a : this.scenario.functionNode) !== null && _b !== void 0 ? _b : this.scenario.enum) !== null && _c !== void 0 ? _c : this.scenario.table, "node");
                    let failedMessages = this.parserLogger.errorNodeMessages(node);
                    if (failedMessages.length > 0 && !this.scenario.expectError.hasValue) {
                        this.fail(`Exception occurred: ${formatting_4.format(failedMessages, 2)}`);
                        return false;
                    }
                    if (!this.scenario.expectError.hasValue)
                        return true;
                    if (failedMessages.length == 0) {
                        this.fail(`No exception \n` +
                            ` Expected: ${this.scenario.expectError.message}\n`);
                        return false;
                    }
                    if (!enumerableExtensions_15.any(failedMessages, message => this.scenario.expectError.hasValue != null && message.includes(this.scenario.expectError.message))) {
                        this.fail(`Wrong exception \n` +
                            ` Expected: ${this.scenario.expectError.message}\n` +
                            ` Actual: ${formatting_4.format(failedMessages, 4)}`);
                        return false;
                    }
                    this.context.success(this.scenario);
                    return false;
                }
                validateRootErrors() {
                    let failedMessages = this.parserLogger.errorMessages();
                    if (!enumerableExtensions_15.any(failedMessages)) {
                        this.fail(`No exceptions \n` +
                            ` Expected: ${formatting_4.format(this.scenario.expectRootErrors.messages, 4)}{Environment.NewLine}` +
                            ` Actual: none`);
                        return false;
                    }
                    let failed = false;
                    for (const rootMessage of this.scenario.expectRootErrors.messages) {
                        let failedMessage = enumerableExtensions_15.firstOrDefault(failedMessages, message => message.includes(rootMessage));
                        if (failedMessage != null) {
                            failedMessages = failedMessages.filter(item => item !== failedMessage);
                        }
                        else {
                            failed = true;
                        }
                    }
                    if (!enumerableExtensions_15.any(failedMessages) && !failed) {
                        this.context.success(this.scenario);
                        return false;
                    }
                    this.fail(`Wrong exception \n` +
                        ` Expected: ${formatting_4.format(this.scenario.expectRootErrors.messages, 4)}\n` +
                        ` Actual: ${formatting_4.format(this.parserLogger.errorMessages(), 4)}`);
                    return false;
                }
                getValues(scenarioParameters, functionParameters, compilerResult) {
                    let result = {};
                    for (const parameter of scenarioParameters.assignments) {
                        this.setParameter(functionParameters, parameter, compilerResult, result);
                    }
                    return result;
                }
                setParameter(functionParameters, parameter, compilerResult, result) {
                    var _a;
                    let type = enumerableExtensions_15.firstOrDefault(functionParameters.variables, variable => variable.name == parameter.variable.parentIdentifier);
                    if (type == null) {
                        throw new Error(`Function '${(_a = this.functionNode) === null || _a === void 0 ? void 0 : _a.name}' parameter '${parameter.variable.parentIdentifier}' not found.`);
                    }
                    const value = ScenarioRunner.getValue(compilerResult, parameter.constantValue.value, parameter.variableType);
                    let valueObject = result;
                    let reference = parameter.variable;
                    while (reference.hasChildIdentifiers) {
                        if (!valueObject[reference.parentIdentifier]) {
                            valueObject[reference.parentIdentifier] = {};
                        }
                        valueObject = valueObject[reference.parentIdentifier];
                        reference = reference.childrenReference();
                    }
                    valueObject[reference.parentIdentifier] = value;
                }
                static getValue(compilerResult, value, type) {
                    return typeConverter_1.TypeConverter.convert(compilerResult, value, type);
                }
                static compare(actual, expectedValue) {
                    if ((expectedValue === null || expectedValue === void 0 ? void 0 : expectedValue.constructor) == Date && (actual === null || actual === void 0 ? void 0 : actual.constructor) == Date) {
                        return actual.toISOString() == expectedValue.toISOString();
                    }
                    return actual == expectedValue;
                }
            };
            exports_230("ScenarioRunner", ScenarioRunner);
        }
    };
});
System.register("specifications/specificationsRunner", ["specifications/specificationRunnerContext", "specifications/specificationFileRunner", "parser/lexySourceDocument"], function (exports_231, context_231) {
    "use strict";
    var specificationRunnerContext_1, specificationFileRunner_1, lexySourceDocument_2, SpecificationsRunner;
    var __moduleName = context_231 && context_231.id;
    return {
        setters: [
            function (specificationRunnerContext_1_1) {
                specificationRunnerContext_1 = specificationRunnerContext_1_1;
            },
            function (specificationFileRunner_1_1) {
                specificationFileRunner_1 = specificationFileRunner_1_1;
            },
            function (lexySourceDocument_2_1) {
                lexySourceDocument_2 = lexySourceDocument_2_1;
            }
        ],
        execute: function () {
            SpecificationsRunner = class SpecificationsRunner {
                constructor(logger, fileSystem, parser, compiler) {
                    this.logger = logger;
                    this.fileSystem = fileSystem;
                    this.parser = parser;
                    this.compiler = compiler;
                }
                run(file) {
                    const context = new specificationRunnerContext_1.SpecificationRunnerContext(this.logger);
                    this.createFileRunner(context, file);
                    SpecificationsRunner.runScenarios(context);
                }
                runAll(folder) {
                    const context = new specificationRunnerContext_1.SpecificationRunnerContext(this.logger);
                    this.getRunners(context, folder);
                    SpecificationsRunner.runScenarios(context);
                }
                static runScenarios(context) {
                    let runners = context.fileRunners;
                    let countScenarios = context.countScenarios();
                    context.logGlobal(`Specifications found: ${countScenarios}`);
                    if (runners.length == 0)
                        throw new Error(`No specifications found`);
                    runners.forEach(runner => runner.run());
                    context.logGlobal(`Specifications succeed: ${countScenarios - context.failed} / ${countScenarios}`);
                    context.logTimeSpent();
                    if (context.failed > 0)
                        SpecificationsRunner.failed(context);
                }
                static failed(context) {
                    context.logGlobal(`--------------- FAILED PARSER LOGGING ---------------`);
                    for (const runner of context.failedScenariosRunners()) {
                        console.log(runner.parserLogging());
                    }
                    throw new Error(`Specifications failed: ${context.failed}\n${context.formatGlobalLog()}`);
                }
                getRunners(context, folder) {
                    let absoluteFolder = this.getAbsoluteFolder(folder);
                    context.logGlobal(`Specifications folder: ${absoluteFolder}`);
                    this.addFolder(context, absoluteFolder);
                }
                addFolder(context, folder) {
                    let files = this.fileSystem.getDirectoryFiles(folder, `.${lexySourceDocument_2.LexySourceDocument.fileExtension}`);
                    files
                        .sort()
                        .forEach(file => this.createFileRunner(context, this.fileSystem.combine(folder, file)));
                    this.fileSystem.getDirectories(folder)
                        .sort()
                        .forEach(eachFolder => this.addFolder(context, this.fileSystem.combine(folder, eachFolder)));
                }
                createFileRunner(context, fileName) {
                    let runner = new specificationFileRunner_1.SpecificationFileRunner(fileName, this.compiler, this.parser, context);
                    runner.initialize();
                    context.add(runner);
                }
                getAbsoluteFolder(folder) {
                    let absoluteFolder = this.fileSystem.isPathRooted(folder)
                        ? folder
                        : this.fileSystem.getFullPath(folder);
                    if (!this.fileSystem.directoryExists(absoluteFolder)) {
                        throw new Error(`Specifications folder doesn't exist: ${absoluteFolder}`);
                    }
                    return absoluteFolder;
                }
            };
            exports_231("SpecificationsRunner", SpecificationsRunner);
        }
    };
});
//# sourceMappingURL=lexy.js.map