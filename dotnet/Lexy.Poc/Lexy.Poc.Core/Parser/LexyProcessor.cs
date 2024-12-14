using System;

namespace Lexy.Poc.Core.Parser
{
    public class LexyParser
    {
        public LexySource Parse(string code)
        {
            if (code == null) throw new ArgumentNullException(nameof(code));

            var lines = code.Split(Environment.NewLine);
            var function = new LexyFunction();
            var parameters = new LexyParameters();
            var result = new LexyResult();
            var script = new LexyScriptCode();

            ILexySection current = null;

            for (var index = 0; index < lines.Length; index++)
            {
                var line = lines[index];
                var indent = line.StartsWith("  ");
                if (indent)
                {
                    if (current == null)
                    {
                        throw new InvalidOperationException($"No indent expected at line: {index} ({line});");
                    }

                    current.Parse(line);
                }
                else
                {
                    var sectionName = SectionName.Parse(line);
                    if (sectionName != null)
                    {
                        switch (sectionName.Name)
                        {
                            case "function":
                                function.ParseName(sectionName.Parameter);
                                break;
                            case "parameters":
                                current = parameters;
                                break;
                            case "result":
                                current = result;
                                break;
                        }
                    }
                    else
                    {
                        script.Parse(line);
                    }
                }
            }

            return new LexySource(function, parameters, result, script);
        }
    }
}