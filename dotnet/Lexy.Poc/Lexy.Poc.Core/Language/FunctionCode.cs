using System.Collections.Generic;
using Lexy.Poc.Core.Parser;

namespace Lexy.Poc.Core.Language
{
    public class FunctionCode : IComponent
    {
        public IList<string> Lines { get; } = new List<string>();

        public IComponent Parse(Line line, Components components)
        {
            Lines.Add(line.TrimmedContent);
            return this;
        }
    }
}