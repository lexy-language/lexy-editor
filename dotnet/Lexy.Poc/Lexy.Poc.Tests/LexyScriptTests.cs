using System.Collections.Generic;
using Lexy.Poc.Core;
using NUnit.Framework;
using Shouldly;

namespace Lexy.Poc
{
    public class LexyScriptTests
    {
        [Test]
        public void TestSimpleReturn()
        {
            var script = LexyScript.Create(@"function: Test simple return
result:
  int Result

Result = 777");
            var result = script.Run();
            result.Int("Result").ShouldBe(777);
        }

        [Test]
        public void TestParameterDefaultReturn()
        {
            var script = LexyScript.Create(@"function: Test simple return
parameters:
  int Input = 5

result:
  int Result

Result = Input");
            var result = script.Run();
            result.Int("Result").ShouldBe(5);
        }

        [Test]
        public void TestAssignmentReturn()
        {
            var script = LexyScript.Create(@"function: Test simple return
parameters:
  int Input = 5

result:
  int Result

Result = Input");
            var result = script.Run(new Dictionary<string, object>
            {
                { "Input", 777 }
            });
            result.Int("Result").ShouldBe(777);
        }
    }
}