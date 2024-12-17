using System.Collections.Generic;
using System.Linq;
using Lexy.Poc.Core.Parser;

namespace Lexy.Poc.Core.Language
{
    public class ScenarioParameters : IComponent
    {
        public IList<AssignmentDefinition> Assignments { get; } = new List<AssignmentDefinition>();

        public IComponent Parse(Line line, Components components)
        {
            var assignment = AssignmentDefinition.Parse(line);
            Assignments.Add(assignment);
            return this;
        }
    }
}