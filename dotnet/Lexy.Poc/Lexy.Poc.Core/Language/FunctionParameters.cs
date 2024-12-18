using System.Collections.Generic;
using Lexy.Poc.Core.Parser;

namespace Lexy.Poc.Core.Language
{
    public class FunctionParameters : IComponent
    {
        public IList<VariableDefinition> Variables { get; } = new List<VariableDefinition>();

        public IComponent Parse(ParserContext context)
        {
            var line = context.CurrentLine;

            if (line.IsEmpty()) return this;

            var variableDefinition = VariableDefinition.Parse(context);
            Variables.Add(variableDefinition);
            return this;
        }
    }
}