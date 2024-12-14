using System.Collections.Generic;

namespace Lexy.Poc.Core.Parser
{
    public class LexyScriptCode
    {
        public IList<string> Lines { get; } = new List<string>();

        public void Parse(string line)
        {
            if (string.IsNullOrEmpty(line) && Lines.Count == 0)
                //Ignore leading empty lines
                return;

            Lines.Add(line);
        }
    }
}