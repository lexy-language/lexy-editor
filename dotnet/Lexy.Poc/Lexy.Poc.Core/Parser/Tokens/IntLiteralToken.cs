using System.Globalization;

namespace Lexy.Poc.Core.Parser
{
    internal class IntLiteralToken : Token
    {
        public int NumberValue { get; }

        public override string Value => NumberValue.ToString(CultureInfo.InvariantCulture);

        public IntLiteralToken(int value)
        {
            NumberValue = value;
        }

        public static IntLiteralToken Parse(string value)
        {
            var number = int.Parse(value);
            return new IntLiteralToken(number);
        }
    }
}