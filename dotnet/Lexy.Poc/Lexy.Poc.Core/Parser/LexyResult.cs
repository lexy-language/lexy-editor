using System;
using System.Collections.Generic;

namespace Lexy.Poc.Core.Parser
{
    public class LexyResult : ILexySection
    {
        public IList<VariableDefinition> Variables { get; } = new List<VariableDefinition>();

        public void Parse(string line)
        {
            var variableDefinition = VariableDefinition.Parse(line);
            if (variableDefinition.Default != null)
                throw new InvalidOperationException("Result variable " + variableDefinition.Name +
                                                    " should not have a default value. (Line:" + line + ")");
            Variables.Add(variableDefinition);
        }
    }
}