using Lexy.Poc.Core.Parser;

namespace Lexy.Poc.Core.Language
{
    public class ScenarioExpectError : IComponent
    {
        public string Message { get; private set; }
        public bool HasValue { get => Message != null; }

        public IComponent Parse(Line line, Components components)
        {
            Message = line.Parameter();
            return this;
        }
    }
}