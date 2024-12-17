using Lexy.Poc.Core.Parser;

namespace Lexy.Poc.Core.Language
{
    public class ScenarioFunctionName : IComponent
    {
        public string Value { get; private set; }

        public IComponent Parse(Line line, Components components)
        {
            Value = line.Parameter();
            return this;
        }

        public override string ToString() => Value;
    }
}