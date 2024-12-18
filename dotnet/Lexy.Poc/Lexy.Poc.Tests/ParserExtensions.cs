using System;
using Lexy.Poc.Core.Language;
using Lexy.Poc.Core.Parser;
using Shouldly;

namespace Lexy.Poc
{
    public static class ParserExtensions
    {
        public static Function ParseFunction(this LexyParser parser, string code)
        {
            var codeLines = code.Split(Environment.NewLine);
            var context = parser.Parse(codeLines, true);
            var components = context.Components;

            if (components.Count != 1)
            {
                throw new InvalidOperationException("Only 1 component expected. Actual: " + components.Count);
            }

            var first = components.First();
            var function = first as Function;
            if (function == null)
            {
                throw new InvalidOperationException("Component not a function. Actual: " + first?.GetType());
            }

            return function;
        }

        public static Components ParseFunctionCode(this LexyParser parser, string code)
        {
            var codeLines = code.Split(Environment.NewLine);
            var context = parser.Parse(codeLines, true);
            var components = context.Components;

            if (components.Count != 1)
            {
                throw new InvalidOperationException("Only 1 token expected. Actual: " + components.Count);
            }

            var first = components.First();
            var function = first as Function;
            if (function == null)
            {
                throw new InvalidOperationException("Token not a function. Actual: " + first?.GetType());
            }

            return components;
        }
    }
}