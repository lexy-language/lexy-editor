using System;

namespace Lexy.Poc.Core.Parser
{
    public class VariableDefinition
    {
        public VariableDefinition(string name, string type, string @default = null)
        {
            Type = type;
            Name = name;
            Default = @default;
        }

        public string Default { get; }
        public string Type { get; }
        public string Name { get; }

        public static VariableDefinition Parse(string line)
        {
            var parts = line.Trim().Split(" ");
            if (parts.Length == 2) return new VariableDefinition(parts[1], parts[0]);
            if (parts.Length == 4)
            {
                if (parts[2] != "=")
                    throw new InvalidOperationException("'=' expected. Invalid variable definition on line: " + line);
                return new VariableDefinition(parts[1], parts[0], parts[3]);
            }

            throw new InvalidOperationException("Invalid variable definition on line: " + line);
        }
    }
}