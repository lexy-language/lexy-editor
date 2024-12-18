using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Lexy.Poc.Core.Language;

namespace Lexy.Poc.Core.Parser
{
    public class LexyParser
    {
        public ParserContext ParseFile(string fileName, bool throwException = true)
        {
            var code = File.ReadAllLines(fileName);

            return Parse(code, throwException);
        }

        public ParserContext Parse(string[] code, bool throwException = true)
        {
            if (code == null) throw new ArgumentNullException(nameof(code));

            var lines = code.Select((line, index) => new Line(index, line, code)).ToArray();
            var context = new ParserContext(lines);
            var currentIndent = 0;

            IComponent currentComponent = null;

            var componentStack = new Stack<IComponent>();

            foreach (var line in lines)
            {
                if (!context.ProcessLine(line))
                {
                    continue;
                }

                var indent = line.Indent();
                if (indent == 0 && !line.IsComment() && !line.IsEmpty())
                {
                    var root = GetToken(line, context);
                    if (root == null) continue;

                    context.ProcessComponent(root);

                    currentComponent = root;
                    currentIndent = indent;

                    componentStack.Clear();

                    continue;
                }

                if (line.IsComment() || line.IsEmpty())
                {
                    currentComponent?.Parse(context);
                    continue;
                }

                if (currentComponent == null)
                {
                    context.Fail($"Unexpected line: {line}");
                    continue;
                }

                if (indent <= currentIndent)
                {
                    currentComponent = componentStack.Pop();
                }

                var component = currentComponent.Parse(context);
                if (component != currentComponent)
                {
                    componentStack.Push(currentComponent);
                    currentComponent = component;
                    currentIndent = indent;
                }
            }

            if (throwException && context.HasErrors())
            {
                throw new InvalidOperationException($"Parsing failed: {context.FormatMessages()}");
            }

            return context;
        }

        private IRootComponent GetToken(Line line, ParserContext context)
        {
            var tokenName = ComponentName.Parse(line, context);

            return tokenName?.Name switch
            {
                null => null,
                TokenValues.FunctionComponent => Function.Parse(tokenName),
                TokenValues.EnumComponent => EnumDefinition.Parse(tokenName),
                TokenValues.ScenarioComponent => Scenario.Parse(tokenName),
                TokenValues.TableComponent => Table.Parse(tokenName),
                _ => InvalidComponent(tokenName, context)
            };
        }

        private IRootComponent InvalidComponent(ComponentName tokenName, ParserContext context)
        {
            var message = $"Unknown keyword: {tokenName.Name}";
            context.Fail(message);
            return null;
        }
    }
}