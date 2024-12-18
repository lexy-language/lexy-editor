using NUnit.Framework;

namespace Lexy.Poc.Tokenizer
{
    public class BooleanLiteralsTests
    {
        [Test]
        public void TestBooleanTrueLiteral()
        {
            TestContext
                .TestLine(@"   true")
                .ValidateTokens()
                    .Count(1)
                    .Boolean(0, true)
                .Assert();
        }

        [Test]
        public void TestBooleanFalseLiteral()
        {
            TestContext
                .TestLine(@"   false")
                .ValidateTokens()
                    .Count(1)
                    .Boolean(0, false)
                .Assert();
        }

    }
}