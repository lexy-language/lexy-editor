using System;
using Lexy.Poc.Core;
using Lexy.Poc.Core.Language.Expressions;
using Lexy.Poc.Core.Parser;
using Shouldly;

namespace Lexy.Poc.Parser.ExpressionParser
{
    public static class ParseExpressionTestExtensions
    {
        public static Expression ParseExpression(this ScopedServicesTestFixture fixture, string expression)
        {
            var context = fixture.GetService<IParserContext>();
            var tokenizer = fixture.GetService<ITokenizer>();
            var sourceFile = new SourceFile("generated.lexy");
            var line = new Line(0, expression);

            line.Tokenize(tokenizer, context);

            var result = ExpressionFactory.Parse(sourceFile, line.Tokens, line);
            result.Status.ShouldBe(ParseExpressionStatus.Success, result.ErrorMessage);
            return result.Expression;
        }

        public static void ParseExpressionExpectException(this ScopedServicesTestFixture fixture,
            string expression,
            string errorMessage)
        {
            var context = fixture.GetService<IParserContext>();
            var tokenizer = fixture.GetService<ITokenizer>();
            var sourceFile = new SourceFile("generated.lexy");
            var line = new Line(0, expression);

            line.Tokenize(tokenizer, context);

            var result = ExpressionFactory.Parse(sourceFile, line.Tokens, line);
            result.Status.ShouldBe(ParseExpressionStatus.Failed);
            result.ErrorMessage.ShouldBe(errorMessage);
        }
    }
}