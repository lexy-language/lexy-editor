using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Lexy.Poc.Core.Language;

namespace Lexy.Poc.Core.Parser
{
    public class LexyParser
    {
        public Components ParseFile(string fileName)
        {
            var code = File.ReadAllLines(fileName);
            var lines = code.Select((line, index) => new Line(index, line, code));

            return Parse(lines);
        }

        public Components Parse(IEnumerable<Line> lines)
        {
            if (lines == null) throw new ArgumentNullException(nameof(lines));

            var components = new Components();
            var currentIndent = 0;

            IRootComponent root = null;
            IComponent currentComponent = null;

            var componentStack = new Stack<IComponent>();
            var failed = false;

            foreach (var line in lines)
            {
                var indent = line.Indent();
                if (indent == 0 && !line.IsComment() && !line.IsEmpty())
                {
                    root = GetToken(line);
                    components.Add(root);

                    currentComponent = root;
                    currentIndent = indent;

                    failed = false;
                    componentStack.Clear();
                }
                else if (!failed)
                {
                    if (line.IsComment() || line.IsEmpty())
                    {
                        currentComponent?.Parse(line, components);
                    }
                    else
                    {
                        if (currentComponent == null)
                        {
                            throw new InvalidOperationException($"Invalid syntax: {line};");
                        }

                        try
                        {
                            if (currentComponent is RootComponent && indent < currentIndent
                             || !(currentComponent is RootComponent) && indent <= currentIndent)
                            {
                                currentComponent = componentStack.Pop();
                            }

                            var component = currentComponent.Parse(line, components);
                            if (component != currentComponent)
                            {
                                componentStack.Push(currentComponent);
                                currentComponent = component;
                            }

                            currentIndent = indent;
                        }
                        catch (InvalidOperationException exception)
                        {
                            Console.Write("Parse token failed: " + exception);

                            componentStack.Clear();
                            root.Fail(exception);
                            failed = true;
                        }
                    }
                }
            }

            return components;
        }

        private IRootComponent GetToken(Line line)
        {
            var tokenName = TokenName.Parse(line);

            return tokenName.Name switch
            {
                TokenNames.Function => Function.Parse(tokenName),
                TokenNames.Enum => EnumDefinition.Parse(tokenName),
                TokenNames.Scenario => Scenario.Parse(tokenName),
                TokenNames.Table => Table.Parse(tokenName),
                _ => throw new InvalidOperationException($"Unknown keyword: {tokenName.Name}")
            };
        }
    }

    internal class TokenNames
    {
        public const string Function = "Function";
        public const string Enum = "Enum";
        public const string Table = "Table";
        public const string Scenario = "Scenario";

        public const string Include = "Include";
        public const string Parameters = "Parameters";
        public const string Result = "Result";
        public const string Code = "Code";
        public const string ExpectError = "ExpectError";

        public const string Comment = "#";
        public const char CommentChar = '#';
        public const char TableSeparator = '|';
    }
}