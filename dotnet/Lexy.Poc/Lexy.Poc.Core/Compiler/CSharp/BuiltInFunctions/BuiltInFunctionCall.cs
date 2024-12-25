using System;
using Lexy.Poc.Core.Language.Expressions;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Lexy.Poc.Core.Compiler.CSharp.BuiltInFunctions
{
    internal abstract class BuiltInFunctionCall
    {
        public BuiltInFunction BuiltInFunction { get; }

        protected BuiltInFunctionCall(BuiltInFunction builtInFunction)
        {
            BuiltInFunction = builtInFunction ?? throw new ArgumentNullException(nameof(builtInFunction));
        }

        public static BuiltInFunctionCall Create(FunctionCallExpression expression)
        {
            return expression.BuiltInFunction switch
            {
                LookupFunction lookupFunction => new LookUpFunctionCall(lookupFunction),
                _ => throw new InvalidOperationException($"Invalid built in function call: {expression.FunctionName}")
            };
        }

        public abstract MemberDeclarationSyntax CustomMethodSyntax(ICompileFunctionContext context);

        public abstract ExpressionSyntax CallExpressionSyntax(ICompileFunctionContext context);
    }
}