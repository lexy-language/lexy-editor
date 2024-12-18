using NUnit.Framework;

namespace Lexy.Poc.Tokenizer
{
    public class StringLiteralsTests
    {
        [Test]
        public void TestQuotedLiteral()
        {
            TestContext
                .TestLine(@"   ""This is a quoted literal""")
                .ValidateTokens()
                    .Count(1)
                    .QuotedString(0, "This is a quoted literal")
                .Assert();
        }

        [Test]
        public void TestStringLiteral()
        {
            TestContext
                .TestLine(@"   ThisIsAStringLiteral")
                .ValidateTokens()
                    .Count(1)
                    .StringLiteral(0, "ThisIsAStringLiteral")
                .Assert();
        }
    }

    public class DateTimeLiteralsTests
    {
        [Test]
        public void TestQuotedLiteral()
        {
            TestContext
                .TestLine(@"   OutDateTime = d""2024/12/16 13:26:55""")
                .ValidateTokens()
                    .Count(3)
                    .DateTime(2, 2024, 12, 16, 13, 26, 55)
                .Assert();
        }
    }
}