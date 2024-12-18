namespace Lexy.Poc.Core.Parser
{
    internal class NumericLiteralToken : ParsableToken
    {
        private bool hasDecimalSeparator;

        public NumericLiteralToken(char value) : base(value)
        {
        }

        public override ParseTokenResult Parse(char value, ParserContext parserContext)
        {
            if (char.IsDigit(value))
            {
                AppendValue(value);
                return ParseTokenResult.InProgress();
            }

            if (value == TokenValues.DecimalSeparator)
            {
                if (hasDecimalSeparator)
                {
                    return ParseTokenResult.Invalid("Only one decimal separator expected");
                }

                hasDecimalSeparator = true;
                AppendValue(value);
                return ParseTokenResult.InProgress();
            }

            return Finish();
        }

        public override ParseTokenResult Finalize(ParserContext parserContext)
        {
            return Finish();
        }

        private ParseTokenResult Finish()
        {
            var newToken = hasDecimalSeparator ? NumberLiteralToken.Parse(Value) : (Token) IntLiteralToken.Parse(Value);
            return ParseTokenResult.Finished(false, newToken);
        }
    }
}