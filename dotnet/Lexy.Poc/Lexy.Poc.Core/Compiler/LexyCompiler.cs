using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using System.Reflection;
using Lexy.Poc.Core.Parser;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;

namespace Lexy.Poc.Core.Compiler
{
    public class LexyCompiler
    {
        public LexyExecutable Compile(LexySource lexyScript)
        {
            if (lexyScript == null) throw new ArgumentNullException(nameof(lexyScript));

            var source = lexyScript.CreateClassCode();
            var syntaxTree = CSharpSyntaxTree.ParseText(source.Code);

            var references = new List<MetadataReference>
            {
                MetadataReference.CreateFromFile(typeof(object).Assembly.Location),
                MetadataReference.CreateFromFile(typeof(LexyScriptResult).Assembly.Location)
            };

            Assembly.GetEntryAssembly().GetReferencedAssemblies()
                .ToList()
                .ForEach(reference =>
                    references.Add(MetadataReference.CreateFromFile(Assembly.Load(reference).Location)));

            var compilation = CSharpCompilation.Create(
                "LexyRuntime." + lexyScript.Function.Name,
                new[] { syntaxTree },
                references,
                new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary));

            using var dllStream = new MemoryStream();
            using var pdbStream = new MemoryStream();

            var emitResult = compilation.Emit(dllStream, pdbStream);
            if (!emitResult.Success)
                throw new InvalidOperationException("Compilation failed: " +
                                                    FormatCompilationErrors(emitResult.Diagnostics) +
                                                    Environment.NewLine + "code: " + source.Code);

            var assembly = Assembly.Load(dllStream.ToArray());
            var instance = assembly.CreateInstance(source.FullClassName);

            return new LexyExecutable(instance);
        }

        private string FormatCompilationErrors(ImmutableArray<Diagnostic> emitResult)
        {
            var stringWriter = new StringWriter();
            foreach (var diagnostic in emitResult) stringWriter.WriteLine("  " + diagnostic);
            return stringWriter.ToString();
        }
    }
}