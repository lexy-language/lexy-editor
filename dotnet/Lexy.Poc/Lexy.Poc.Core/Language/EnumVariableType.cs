namespace Lexy.Poc.Core.Language
{
    public class CustomVariableType : VariableType
    {
        public string EnumName { get; }

        public CustomVariableType(string enumName)
        {
            EnumName = enumName;
        }

        public override string ToString()
        {
            return EnumName;
        }
    }
}