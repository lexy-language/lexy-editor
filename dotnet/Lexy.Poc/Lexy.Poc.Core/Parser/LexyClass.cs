namespace Lexy.Poc.Core.Parser
{
    public class LexyClass
    {
        public LexyClass(string @namespace, string className, string code)
        {
            Ns = @namespace;
            ClassName = className;
            Code = code;
        }

        public string Ns { get; }
        public string ClassName { get; }
        public string Code { get; }
        public string FullClassName => $"{Ns}.{ClassName}";
    }
}