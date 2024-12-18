using Lexy.Poc.Core;
using NUnit.Framework;

namespace Lexy.Poc.Tokenizer
{
    public class TypeLiteralsTests
    {
        [Test]
        public void TestIntTypeLiteral()
        {
            TestContext
                .TestLine(@"   int Value")
                .ValidateTokens()
                    .Count(2)
                    .StringLiteral(0, "int")
                    .StringLiteral(1, "Value")
                .Assert();
        }

        [Test]
        public void TestNumberTypeLiteral()
        {
            TestContext
                .TestLine(@"   number Value")
                .ValidateTokens()
                    .Count(2)
                    .StringLiteral(0, "number")
                    .StringLiteral(1, "Value")
                .Assert();
        }

        [Test]
        public void TestStringTypeLiteral()
        {
            TestContext
                .TestLine(@"   string Value")
                .ValidateTokens()
                    .Count(2)
                    .StringLiteral(0, "string")
                    .StringLiteral(1, "Value")
                .Assert();
        }

        [Test]
        public void TestDateTimeTypeLiteral()
        {
            TestContext
                .TestLine(@"   datetime Value")
                .ValidateTokens()
                    .Count(2)
                    .StringLiteral(0, "datetime")
                    .StringLiteral(1, "Value")
                .Assert();
        }

        [Test]
        public void TestBooleanTypeLiteral()
        {
            TestContext
                .TestLine(@"   boolean Value")
                .ValidateTokens()
                    .Count(2)
                    .StringLiteral(0, "boolean")
                    .StringLiteral(1, "Value")
                .Assert();
        }
    }
}