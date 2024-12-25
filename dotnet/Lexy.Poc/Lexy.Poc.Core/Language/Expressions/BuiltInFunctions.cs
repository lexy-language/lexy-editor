using System;
using System.Collections.Generic;
using Lexy.Poc.Core.Parser;

namespace Lexy.Poc.Core.Language.Expressions
{
    public static class BuiltInFunctions
    {
        private static readonly IDictionary<string, Func<SourceReference, IReadOnlyList<Expression>, ParseBuiltInFunctionsResult>> Values =
            new Dictionary<string, Func<SourceReference, IReadOnlyList<Expression>, ParseBuiltInFunctionsResult>>
        {
            { "INT", IntFunction.Parse },
            { "LOOKUP", LookupFunction.Parse }
        };

        public static ParseBuiltInFunctionsResult Parse(string functionName, SourceReference reference,
            IReadOnlyList<Expression> arguments)
        {
            return Values.TryGetValue(functionName, out var value)
                ? value(reference, arguments)
                : ParseBuiltInFunctionsResult.Failed($"Unknown function name: '{functionName}'");
        }
    }
}