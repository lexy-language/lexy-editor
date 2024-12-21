using Lexy.Poc.Core.Parser;

namespace Lexy.Poc.Core.Language
{
    public class Expression
    {
        public string Value { get; private set; }

        public static Expression Parse(Token[] tokens)
        {
            var expression = new Expression();
            foreach (var token in tokens)
            {
                expression.Value += token.Value;
            }

            return expression;
        }
    }
}