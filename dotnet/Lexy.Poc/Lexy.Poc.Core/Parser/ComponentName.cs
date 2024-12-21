
namespace Lexy.Poc.Core.Parser
{
    internal class ComponentName
    {
        public string Parameter { get; }
        public string Name { get; }

        private ComponentName(string name, string parameter)
        {
            Parameter = parameter;
            Name = name;
        }

        public static ComponentName Parse(Line line, IParserContext context)
        {
            var valid = context.ValidateTokens<ComponentName>()
                .Count(2)
                .Keyword(0)
                .StringLiteral(1)
                .IsValid;

            return !valid ? null : new ComponentName(line.TokenValue(0), line.TokenValue(1));
        }

        public override string ToString() => $"{Name} {Parameter}";
    }
}