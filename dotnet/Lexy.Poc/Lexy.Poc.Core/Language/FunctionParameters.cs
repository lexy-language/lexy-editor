using System.Collections.Generic;
using Lexy.Poc.Core.Parser;

namespace Lexy.Poc.Core.Language
{
    public class FunctionParameters : IComponent
    {
        public IList<VariableDefinition> Variables { get; } = new List<VariableDefinition>();

        public IComponent Parse(IParserContext context)
        {
            var variableDefinition = VariableDefinition.Parse(context);
            if (variableDefinition != null)
            {
                Variables.Add(variableDefinition);
            }
            return this;
        }
    }
}