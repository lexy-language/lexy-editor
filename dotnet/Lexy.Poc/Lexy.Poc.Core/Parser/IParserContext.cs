using Lexy.Poc.Core.Language;

namespace Lexy.Poc.Core.Parser
{
    public interface IParserContext
    {
        IParserLogger Logger { get; }

        Line CurrentLine { get; }

        Components Components { get; }

        void ProcessComponent(IRootComponent component);

        bool ProcessLine();

        TokenValidator ValidateTokens<T>();
        TokenValidator ValidateTokens(string name);
    }
}