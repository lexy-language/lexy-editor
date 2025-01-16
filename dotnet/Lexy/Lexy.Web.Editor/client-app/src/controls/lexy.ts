import {languages} from "monaco-editor";
import LanguageConfiguration = languages.LanguageConfiguration;
import IMonarchLanguage = languages.IMonarchLanguage;

export const configuration: LanguageConfiguration = {
	comments: {
		lineComment: '#'
	},
	brackets: [
		['[', ']'],
		['(', ')']
	],
	autoClosingPairs: [
		{ open: '[', close: ']' },
		{ open: '(', close: ')' },
		{ open: '"', close: '"' },
		{ open: "'", close: "'" }
	],
	surroundingPairs: [
		{ open: '[', close: ']' },
		{ open: '(', close: ')' },
		{ open: '"', close: '"' },
		{ open: "'", close: "'" }
	],
	folding: {
		offSide: true
	},
	onEnterRules: [
		{
			beforeText: /:\s*$/,
			action: {
				indentAction: languages.IndentAction.Indent
			}
		}
	]
};

export const language = <IMonarchLanguage>{
	tokenPostfix: '.yaml',

	brackets: [
		{ token: 'delimiter.bracket', open: '{', close: '}' },
		{ token: 'delimiter.square', open: '[', close: ']' }
	],

	keywords: ['Function', 'Scenario', 'Table', 'true', 'false'],

	numberInteger: /(?:0|[+-]?[0-9]+)/,
	numberFloat: /(?:0|[+-]?[0-9]+)(?:\.[0-9]+)?(?:e[-+][1-9][0-9]*)?/,

	tokenizer: {
		root: [
			{ include: '@whitespace' },
			{ include: '@comment' },

			// Directive
			[/%[^ ]+.*$/, 'meta.directive'],

			// Document Markers
			[/---/, 'operators.directivesEnd'],
			[/\.{3}/, 'operators.documentEnd'],

			// Block Structure Indicators
			[/[-?:](?= )/, 'operators'],

			{ include: '@anchor' },
			{ include: '@tagHandle' },
			{ include: '@flowCollections' },
			{ include: '@blockStyle' },

			// Numbers
			[/@numberInteger(?![ \t]*\S+)/, 'number'],
			[/@numberFloat(?![ \t]*\S+)/, 'number.float'],

			{ include: '@flowScalars' },

			// String nodes
			[
				/.+?(?=(\s+#|$))/,
				{
					cases: {
						'@keywords': 'keyword',
						'@default': 'string'
					}
				}
			]
		],

		// Flow Collection: Flow Mapping
		object: [
			{ include: '@whitespace' },
			{ include: '@comment' },

			// Flow Mapping termination
			[/\}/, '@brackets', '@pop'],

			// Flow Mapping delimiter
			[/,/, 'delimiter.comma'],

			// Flow Mapping Key:Value delimiter
			[/:(?= )/, 'operators'],

			// Flow Mapping Key:Value key
			[/(?:".*?"|'.*?'|[^,\{\[]+?)(?=: )/, 'type'],

			// Start Flow Style
			{ include: '@flowCollections' },
			{ include: '@flowScalars' },

			// Scalar Data types
			{ include: '@tagHandle' },
			{ include: '@anchor' },
			{ include: '@flowNumber' },

			// Other value (keyword or string)
			[
				/[^\},]+/,
				{
					cases: {
						'@keywords': 'keyword',
						'@default': 'string'
					}
				}
			]
		],

		// Flow Collection: Flow Sequence
		array: [
			{ include: '@whitespace' },
			{ include: '@comment' },

			// Flow Sequence termination
			[/\]/, '@brackets', '@pop'],

			// Flow Sequence delimiter
			[/,/, 'delimiter.comma'],

			// Start Flow Style
			{ include: '@flowCollections' },
			{ include: '@flowScalars' },

			// Scalar Data types
			{ include: '@tagHandle' },
			{ include: '@anchor' },
			{ include: '@flowNumber' },

			// Other value (keyword or string)
			[
				/[^\],]+/,
				{
					cases: {
						'@keywords': 'keyword',
						'@default': 'string'
					}
				}
			]
		],

		// First line of a Block Style
		multiString: [[/^( +).+$/, 'string', '@multiStringContinued.$1']],

		// Further lines of a Block Style
		//   Workaround for indentation detection
		multiStringContinued: [
			[
				/^( *).+$/,
				{
					cases: {
						'$1==$S2': 'string',
						'@default': { token: '@rematch', next: '@popall' }
					}
				}
			]
		],

		whitespace: [[/[ \t\r\n]+/, 'white']],

		// Only line comments
		comment: [[/#.*$/, 'comment']],

		// Start Flow Collections
		flowCollections: [
			[/\[/, '@brackets', '@array'],
			[/\{/, '@brackets', '@object']
		],

		// Start Flow Scalars (quoted strings)
		flowScalars: [
			[/"([^"\\]|\\.)*$/, 'string.invalid'],
			[/'([^'\\]|\\.)*$/, 'string.invalid'],
			[/'[^']*'/, 'string'],
			[/"/, 'string', '@doubleQuotedString']
		],

		doubleQuotedString: [
			[/[^\\"]+/, 'string'],
			[/\\./, 'string.escape.invalid'],
			[/"/, 'string', '@pop']
		],

		// Start Block Scalar
		blockStyle: [[/[>|][0-9]*[+-]?$/, 'operators', '@multiString']],

		// Numbers in Flow Collections (terminate with ,]})
		flowNumber: [
			[/@numberInteger(?=[ \t]*[,\]\}])/, 'number'],
			[/@numberFloat(?=[ \t]*[,\]\}])/, 'number.float'],
		],

		tagHandle: [[/\![^ ]*/, 'tag']],

		anchor: [[/[&*][^ ]+/, 'namespace']]
	}
};