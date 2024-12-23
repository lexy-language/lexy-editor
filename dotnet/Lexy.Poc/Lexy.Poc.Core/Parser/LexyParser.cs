using System;
using System.Collections.Generic;
using System.IO;
using Lexy.Poc.Core.Language;

namespace Lexy.Poc.Core.Parser
{
    public class LexyParser : ILexyParser
    {
        private readonly IParserContext context;
        private readonly ISourceCodeDocument sourceCodeDocument;
        private readonly IParserLogger logger;

        public LexyParser(IParserContext parserContext, ISourceCodeDocument sourceCodeDocument, IParserLogger logger)
        {
            context = parserContext ?? throw new ArgumentNullException(nameof(parserContext));
            this.sourceCodeDocument = sourceCodeDocument ?? throw new ArgumentNullException(nameof(sourceCodeDocument));
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public ParserResult ParseFile(string fileName, bool throwException = true)
        {
            logger.LogInfo("Parse file: " + fileName);

            var code = File.ReadAllLines(fileName);

            return Parse(code, throwException);
        }

        public ParserResult Parse(string[] code, bool throwException = true)
        {
            if (code == null) throw new ArgumentNullException(nameof(code));

            sourceCodeDocument.SetCode(code);

            var currentIndent = 0;
            IComponent currentComponent = new Document();
            var components = new ComponentArray(currentComponent);

            while (sourceCodeDocument.HasMoreLines())
            {
                if (!context.ProcessLine())
                {
                    currentIndent = sourceCodeDocument.CurrentLine.Indent();
                    continue;
                }

                var line = sourceCodeDocument.CurrentLine;
                if (line.IsComment() || line.IsEmpty())
                {
                    continue;
                }

                var indent = line.Indent();
                if (indent > currentIndent)
                {
                    context.Logger.Fail($"Invalid indent: {indent}");
                    continue;
                }

                currentComponent = components.Get(indent);

                var component = ParseLine(currentComponent);

                currentComponent = component;
                currentIndent = indent + 1;
                components.Set(currentIndent, currentComponent);
            }

            if (throwException)
            {
                logger.AssertNoErrors();
            }

            return new ParserResult(context.Components);
        }

        private IComponent ParseLine(IComponent currentComponent)
        {
            var component = currentComponent.Parse(context);
            if (component == null)
            {
                throw new InvalidOperationException(
                    $"({currentComponent}) Parse should return child component or itself.");
            }
            return component;
        }

        private static IComponent WalkBackOnCallStackByIndent(int indent, int currentIndent, Stack<IComponent> componentStack,
            IComponent currentComponent)
        {
            var indentDifference = currentIndent - indent;
            for (var stackWalkBack = 0; stackWalkBack < indentDifference; stackWalkBack++)
            {
                currentComponent = componentStack.Pop();
            }

            return currentComponent;
        }
    }

    public class ComponentArray
    {
        private IComponent[] values = new IComponent[8];

        public ComponentArray(IComponent rootComponent)
        {
            values[0] = rootComponent;
        }

        public IComponent Get(int indent)
        {
            var component = values[indent];
            for (var index = indent + 1; index < values.Length; index++)
            {
                if (values[index] == null) break;

                values[index] = null;
            }

            return component;
        }

        public void Set(int indent, IComponent component)
        {
            if (indent >= values.Length)
            {
                Array.Resize(ref values, values.Length * 2);
            }

            values[indent] = component;
        }
    }
}