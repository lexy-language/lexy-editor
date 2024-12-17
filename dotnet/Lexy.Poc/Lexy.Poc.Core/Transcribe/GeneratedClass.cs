using Lexy.Poc.Core.Language;

namespace Lexy.Poc.Core.Parser
{
    public class GeneratedClass
    {
        public IRootComponent Component { get; }
        public string Ns { get; }
        public string ClassName { get; }
        public string Code { get; }
        public string FullClassName => $"{Ns}.{ClassName}";

        public GeneratedClass(IRootComponent component, string @namespace, string className, string code)
        {
            Component = component;
            Ns = @namespace;
            ClassName = className;
            Code = code;
        }
    }
}