namespace Lexy.Poc.Core.Parser
{
    public interface ILexyParser
    {
        IParserContext ParseFile(string fileName, bool throwException = true);
        IParserContext Parse(string[] code, bool throwException = true);
    }
}