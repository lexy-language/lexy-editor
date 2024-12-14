using System.Collections.Generic;

namespace Lexy.Poc.Core.Parser
{
    public class LexyParameters : ILexySection
    {
        public IList<VariableDefinition> Variables { get; } = new List<VariableDefinition>();

        public void Parse(string line)
        {
            var variableDefinition = VariableDefinition.Parse(line);
            Variables.Add(variableDefinition);
        }
    }
}