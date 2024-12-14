using System;
using System.IO;
using Lexy.Poc.Core.Compiler;
using Lexy.Poc.Core.Parser;

namespace Lexy.Poc.Core
{
    public class LexyScript
    {
        public static LexyScript LoadFile(string fileName)
        {

            var lines = File.ReadLines(fileName);

            return null;
        }

        public static LexyExecutable Create(string code)
        {
            if (code == null) throw new ArgumentNullException(nameof(code));

            var parser = new LexyParser();
            var lexyScript = parser.Parse(code);

            var compiler = new LexyCompiler();
            return compiler.Compile(lexyScript);
        }

        public LexyScriptResult Run()
        {
            throw new System.NotImplementedException();
        }
    }
}