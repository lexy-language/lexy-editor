using System;
using Lexy.Poc.Core.Language.Expressions;
using Lexy.Poc.Core.Parser.Tokens;
using Shouldly;

namespace Lexy.Poc.Parser.ExpressionParser
{
    public static class ExpressionTestExtensions
    {
        public static void ValidateOfType<T>(this object value, Action<T> validate) where T : class
        {
            if (value == null) throw new ArgumentNullException(nameof(value));

            var specificValue = value as T;
            if (specificValue == null)
            {
                throw new InvalidOperationException(
                    $"Values '{value.GetType().Name}' should be of type ‘{typeof(T).Name}'");
            }

            validate(specificValue);
        }

        public static void ValidateVariableExpression(this Expression expression, string name)
        {
            expression.ValidateOfType<VariableExpression>(left =>
                left.VariableName.ShouldBe(name));
        }

        public static void ValidateNumericLiteralExpression(this Expression expression, decimal value)
        {
            expression.ValidateOfType<LiteralExpression>(literal =>
            {
                literal.Literal.ValidateOfType<NumberLiteralToken>(number =>
                    number.NumberValue.ShouldBe(value));
            });
        }
    }
}