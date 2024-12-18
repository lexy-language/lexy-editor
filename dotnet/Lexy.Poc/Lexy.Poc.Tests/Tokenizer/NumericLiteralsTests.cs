using NUnit.Framework;

namespace Lexy.Poc.Tokenizer
{
    public class NumericLiteralsTests
    {
        [Test]
        public void TestInt0Literal()
        {
            TestContext
                .TestLine(@"   0")
                .ValidateTokens()
                    .Count(1)
                    .IntLiteral(0, 0)
                .Assert();
        }

        [Test]
        public void TestIntLiteral()
        {
            TestContext
                .TestLine(@"   456")
                .ValidateTokens()
                    .Count(1)
                    .IntLiteral(0, 456)
                .Assert();
        }

        [Test]
        public void TestDecimalLiteral()
        {
            TestContext
                .TestLine(@"   456.78")
                .ValidateTokens()
                    .Count(1)
                    .NumberLiteral(0, 456.78m)
                .Assert();
        }
    }
}