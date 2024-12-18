
namespace Lexy.Poc.Core.Parser
{
    public class KeywordToken : Token

    {
    public override string Value { get; }

    public KeywordToken(string keyword)
    {
        Value = keyword;
    }
    }
}