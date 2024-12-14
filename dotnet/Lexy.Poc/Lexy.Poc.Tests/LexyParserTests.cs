using Lexy.Poc.Core.Parser;
using NUnit.Framework;
using Shouldly;

namespace Lexy.Poc
{
    public class LexyParserTests
    {
        [Test]
        public void TestSimpleReturn()
        {
            var code = @"function: Test simple return
result:
  number Result

Result = 777";

            var parser = new LexyParser();
            var script = parser.Parse(code);

            script.Function.Name.ShouldBe("Test simple return");
            script.Result.Variables.Count.ShouldBe(1);
            script.Result.Variables[0].Name.ShouldBe("Result");
            script.Result.Variables[0].Type.ShouldBe("number");
            script.ScriptCode.Lines.Count.ShouldBe(1);
            script.ScriptCode.Lines[0].ShouldBe("Result = 777");
        }
    }
}