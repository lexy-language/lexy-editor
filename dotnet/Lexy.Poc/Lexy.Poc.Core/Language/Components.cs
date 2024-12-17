using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace Lexy.Poc.Core.Language
{
    public class Components
    {
        private IList<IComponent> values = new Collection<IComponent>();

        public int Count => values.Count;


        public bool ContainsEnum(string enumName)
        {
            return values
                .OfType<EnumDefinition>()
                .Any(definition => definition.Name.Value == enumName);
        }

        public Function GetFunction(string name)
        {
            return values
                .OfType<Function>()
                .FirstOrDefault(function => function.Name.Value == name);
        }

        public Function GetSingleFunction()
        {
            return values
                .OfType<Function>()
                .SingleOrDefault();
        }

        public IEnumerable<Scenario> GetScenarios() => values.OfType<Scenario>();

        public IRootComponent GetEnum(string name)
        {
            return values
                .OfType<EnumDefinition>()
                .FirstOrDefault(enumDefinition => enumDefinition.Name.Value == name);
        }

        public void Add(IComponent component) => values.Add(component);

        public IComponent First() => values.FirstOrDefault();
    }
}