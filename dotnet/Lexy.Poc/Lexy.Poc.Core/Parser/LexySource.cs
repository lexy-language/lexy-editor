using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Lexy.Poc.Core.Parser
{
    public class LexySource
    {
        public LexySource(LexyFunction function, LexyParameters parameters, LexyResult result,
            LexyScriptCode scriptCode)
        {
            Function = function;
            Parameters = parameters;
            Result = result;
            ScriptCode = scriptCode;
        }

        public LexyFunction Function { get; }
        public LexyParameters Parameters { get; }
        public LexyResult Result { get; }
        public LexyScriptCode ScriptCode { get; }

        public LexyClass CreateClassCode()
        {
            var stringWriter = new StringWriter();
            const string @namespace = "LexyRuntime";
            stringWriter.WriteLine("namespace " + @namespace);
            stringWriter.WriteLine("{");

            var name = ClassName(Function.Name);

            stringWriter.WriteLine($"    class {name}");
            stringWriter.WriteLine("    {");

            WriteParameters(stringWriter);
            WriteResult(stringWriter);
            WriteRunMethod(stringWriter);

            stringWriter.WriteLine("     }");
            stringWriter.WriteLine("}");

            return new LexyClass(@namespace, name, stringWriter.ToString());
        }

        private void WriteParameters(StringWriter stringWriter)
        {
            WriteVariables(stringWriter, Parameters.Variables);
        }

        private void WriteResult(StringWriter stringWriter)
        {
            WriteVariables(stringWriter, Result.Variables);
            WriteResultMethod(stringWriter, Result.Variables);
        }

        private void WriteResultMethod(StringWriter stringWriter, IList<VariableDefinition> resultVariables)
        {
            var resultType = $"{typeof(LexyScriptResult).Namespace}.{nameof(LexyScriptResult)}";

            stringWriter.WriteLine($"       public {resultType} __Result()");
            stringWriter.WriteLine("        {");
            stringWriter.WriteLine($"            var result = new {resultType}();");

            foreach (var variable in resultVariables)
                stringWriter.WriteLine($"            result[\"{variable.Name}\"] = {variable.Name};");

            stringWriter.WriteLine("            return result;");
            stringWriter.WriteLine("        }");
        }

        private void WriteVariables(StringWriter stringWriter, IList<VariableDefinition> variables)
        {
            foreach (var variable in variables)
            {
                stringWriter.Write("        public " + MapType(variable.Type) + " " + variable.Name);
                if (variable.Default != null) stringWriter.Write(" = " + variable.Default);
                stringWriter.WriteLine(";");
            }
        }

        private string MapType(string variableType)
        {
            return variableType switch
            {
                "int" => "int",
                "number" => "decimal",
                "bool" => "bool",
                _ => throw new InvalidOperationException("Unknown type: " + variableType)
            };
        }

        private void WriteRunMethod(StringWriter stringWriter)
        {
            stringWriter.WriteLine("        public void __Run()");
            stringWriter.WriteLine("        {");

            foreach (var line in ScriptCode.Lines) stringWriter.WriteLine($"            {line};");

            stringWriter.WriteLine("        }");
        }

        private string ClassName(string functionName)
        {
            var nameBuilder = new StringBuilder("Function");
            foreach (var @char in functionName.Where(char.IsLetter)) nameBuilder.Append(@char);
            return nameBuilder.ToString();
        }
    }
}