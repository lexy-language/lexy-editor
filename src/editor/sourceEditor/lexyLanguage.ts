import {languages} from "monaco-editor";
import {Keywords} from "lexy/dist/parser/Keywords";
import {TypeNames} from "lexy/dist/language/typeSystem/typeNames";

export const lexyConfig: languages.LanguageConfiguration = {
	wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\#\$\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
	comments: {
		lineComment: "//",
		blockComment: ["/*", "*/"]
	},
	brackets: [
		["{", "}"],
		["[", "]"],
		["(", ")"]
	],
	autoClosingPairs: [
		{ open: "{", close: "}" },
		{ open: "[", close: "]" },
		{ open: "(", close: ")" },
		{ open: "'", close: "'", notIn: ["string", "comment"] },
		{ open: '"', close: '"', notIn: ["string", "comment"] }
	],
	surroundingPairs: [
		{ open: "{", close: "}" },
		{ open: "[", close: "]" },
		{ open: "(", close: ")" },
		{ open: "<", close: ">" },
		{ open: "'", close: "'" },
		{ open: '"', close: '"' }
	]
};

const keywords = [...Keywords.values, ...TypeNames.values];

export const lexyLanguage: languages.IMonarchLanguage = {
	defaultToken: "",
	tokenPostfix: ".lexy",
	brackets: [
		{ open: "{", close: "}", token: "delimiter.curly" },
		{ open: "[", close: "]", token: "delimiter.square" },
		{ open: "(", close: ")", token: "delimiter.parenthesis" },
		{ open: "<", close: ">", token: "delimiter.angle" }
	],
	keywords: keywords,
	namespaceFollows: [],
	parenFollows: [Keywords.Function, Keywords.If, Keywords.Switch, Keywords.ScenarioKeyword, Keywords.Parameters, Keywords.Results],
	operators: [
		"=",
		"||",
		"&&",
		"|",
		"^",
		"&",
		"==",
		"!=",
		"<=",
		">=",
		"<<",
		"+",
		"-",
		"*",
		"/",
		"%",
		"=>"
	],
	symbols: /[=><!~?:&|+\-*\/\^%]+/,
	escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
	tokenizer: {
		root: [
			[
				/\@?[a-zA-Z_]\w*/,
				{
					cases: {
						"@namespaceFollows": {
							token: "keyword.$0",
							next: "@namespace"
						},
						"@keywords": {
							token: "keyword.$0",
							next: "@qualified"
						},
						"@default": { token: "identifier", next: "@qualified" }
					}
				}
			],
			{ include: "@whitespace" },
			[
				/}/,
				{
					cases: {
						"$S2==interpolatedstring": {
							token: "string.quote",
							next: "@pop"
						},
						"$S2==litinterpstring": {
							token: "string.quote",
							next: "@pop"
						},
						"@default": "@brackets"
					}
				}
			],
			[/[{}()\[\]]/, "@brackets"],
			[/[<>](?!@symbols)/, "@brackets"],
			[
				/@symbols/,
				{
					cases: {
						"@operators": "delimiter",
						"@default": ""
					}
				}
			],
			[/[0-9_]*\.[0-9_]+([eE][\-+]?\d+)?[fFdD]?/, "number.float"],
			[/[0-9_]+/, "number"],
			[/[;,.]/, "delimiter"],
			[/"([^"\\]|\\.)*$/, "string.invalid"],
			[/"/, { token: "string.quote", next: "@string" }],
			[/'[^\\']'/, "string"],
			[/(')(@escapes)(')/, ["string", "string.escape", "string"]],
			[/'/, "string.invalid"]
		],
		qualified: [
			[
				/[a-zA-Z_][\w]*/,
				{
					cases: {
						"@keywords": { token: "keyword.$0" },
						"@default": "identifier"
					}
				}
			],
			[/\./, "delimiter"],
			["", "", "@pop"]
		],
		namespace: [
			{ include: "@whitespace" },
			[/[A-Z]\w*/, "namespace"],
			[/[\.=]/, "delimiter"],
			["", "", "@pop"]
		],
		comment: [
			[/[^\/*]+/, "comment"],
			["\\*/", "comment", "@pop"],
			[/[\/*]/, "comment"]
		],
		string: [
			[/[^\\"]+/, "string"],
			[/@escapes/, "string.escape"],
			[/\\./, "string.escape.invalid"],
			[/"/, { token: "string.quote", next: "@pop" }]
		],
		whitespace: [
			[/^[ \t\v\f]*#((r)|(load))(?=\s)/, "directive.csx"],
			[/^[ \t\v\f]*#\w.*$/, "namespace.cpp"],
			[/[ \t\v\f\r\n]+/, ""],
			[/\/\*/, "comment", "@comment"],
			[/\/\/.*$/, "comment"]
		]
	}
};
