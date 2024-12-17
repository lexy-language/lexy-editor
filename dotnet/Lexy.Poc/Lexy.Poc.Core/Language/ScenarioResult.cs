using System.Collections.Generic;
using Lexy.Poc.Core.Parser;

namespace Lexy.Poc.Core.Language
{
    public class ScenarioResult : IComponent
    {
        public IList<AssignmentDefinition> Assignments { get; } = new List<AssignmentDefinition>();

        public IComponent Parse(Line line, Components components)
        {
            if (line.IsEmpty()) return this;

            var assignment = AssignmentDefinition.Parse(line);
            Assignments.Add(assignment);
            return this;
        }
    }
}