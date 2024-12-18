using System;
using System.Collections.Generic;
using Lexy.Poc.Core.Compiler;
using Lexy.Poc.Core.Language;

namespace Lexy.Poc.Core.Parser
{
    public class WriterCode
    {
        public const string Namespace = "Lexy.Runtime";
    }
    public class FunctionWriter : IRootTokenWriter
    {

        public GeneratedClass CreateCode(IRootComponent component, Components components)
        {
            if (!(component is Function function))
            {
                throw new InvalidOperationException("Root token not Function");
            }

            var writer = new ClassWriter();

            writer.OpenScope($"namespace {WriterCode.Namespace}");

            var name = function.Name.ClassName();

            writer.OpenScope($"public class {name}");

            WriteParameters(function, writer, components);
            WriteResult(function, writer, components);
            WriteRunMethod(function, writer);

            writer.CloseScope();
            writer.CloseScope();

            return new GeneratedClass(function, WriterCode.Namespace, name, writer.ToString());
        }

        private void WriteParameters(Function function, ClassWriter stringWriter, Components components)
        {
            WriteVariables(stringWriter, function.Parameters.Variables, components);
        }

        private void WriteResult(Function function, ClassWriter stringWriter, Components components)
        {
            var variables = function.Results.Variables;

            WriteVariables(stringWriter, variables, components);
            WriteResultMethod(stringWriter, variables);
        }

        private void WriteResultMethod(ClassWriter stringWriter, IList<VariableDefinition> resultVariables)
        {
            var resultType = $"{typeof(Core.FunctionResult).Namespace}.{nameof(Core.FunctionResult)}";

            stringWriter.OpenScope($"public {resultType} __Result()");
            stringWriter.WriteLine($"var result = new {resultType}();");

            foreach (var variable in resultVariables)
                stringWriter.WriteLine($"result[\"{variable.Name}\"] = {variable.Name};");

            stringWriter.WriteLine("return result;");
            stringWriter.CloseScope();
        }

        private void WriteVariables(ClassWriter stringWriter, IList<VariableDefinition> variables, Components components)
        {
            foreach (var variable in variables)
            {
                stringWriter.WriteLineStart($"public {MapType(variable.Type, components)} {variable.Name}");
                if (variable.Default != null) stringWriter.Write($" = {variable.Default.Value}");
                stringWriter.Write(";");
                stringWriter.EndLine();
            }
        }

        private string MapType(string variableType, Components components)
        {
            if (components.ContainsEnum(variableType))
            {
                return variableType;
            }

            return variableType switch
            {
                TypeNames.Int => "int",
                TypeNames.Number => "decimal",
                TypeNames.Boolean => "bool",
                TypeNames.DateTime => "System.DateTime",
                _ => throw new InvalidOperationException("Unknown type: " + variableType)
            };
        }

        private void WriteRunMethod(Function function, ClassWriter writer)
        {
            writer.OpenScope("public void __Run()");

            foreach (var line in function.Code.Lines)
            {
                if (!string.IsNullOrWhiteSpace(line.Value))
                {
                    writer.WriteLine($"{line.Value};");
                }
            }

            writer.CloseScope();
        }
    }

    public class EnumWriter : IRootTokenWriter
    {
        public GeneratedClass CreateCode(IRootComponent component, Components components)
        {
            if (!(component is EnumDefinition enumDefinition))
            {
                throw new InvalidOperationException("Root token not Function");
            }

            var writer = new ClassWriter();
            var name = enumDefinition.Name.Value;

            writer.OpenScope($"namespace {WriterCode.Namespace}");
            writer.OpenScope($"public enum {name}");

            WriteValues(enumDefinition, writer, components);

            writer.CloseScope();
            writer.CloseScope();

            return new GeneratedClass(enumDefinition, WriterCode.Namespace, name, writer.ToString());

        }

        private void WriteValues(EnumDefinition enumDefinition, ClassWriter classWriter, Components components)
        {
            foreach (var value in enumDefinition.Assignments)
            {
                classWriter.WriteLine($"{value.Name} = {value.Value},");
            }
        }
    }
}