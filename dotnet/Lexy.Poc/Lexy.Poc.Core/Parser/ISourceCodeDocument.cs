using System.Collections.Generic;

namespace Lexy.Poc.Core.Parser
{
    public interface ISourceCodeDocument
    {
        Line CurrentLine { get; }
        IEnumerable<Line> Code { get; }

        void SetCode(string[] lines);

        bool HasMoreLines();
        Line NextLine();
    }
}