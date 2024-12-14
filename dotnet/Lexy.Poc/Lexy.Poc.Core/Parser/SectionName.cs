namespace Lexy.Poc.Core.Parser
{
    internal class SectionName
    {
        public SectionName(string name, string parameter)
        {
            Parameter = parameter;
            Name = name;
        }

        public string Parameter { get; }
        public string Name { get; }

        public static SectionName Parse(string line)
        {
            var indexOfSeparator = line.IndexOf(":");
            if (indexOfSeparator == -1) return null;

            var name = line.Substring(0, indexOfSeparator).Trim();
            var parameter = line.Substring(indexOfSeparator + 1).Trim();
            return new SectionName(name, parameter);
        }
    }
}