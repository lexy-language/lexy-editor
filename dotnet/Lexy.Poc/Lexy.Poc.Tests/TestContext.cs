using System;
using System.Diagnostics;
using Lexy.Poc.Core.Parser;
using Microsoft.Extensions.DependencyInjection;

namespace Lexy.Poc
{
    public static class TestContext
    {
        public static IParserContext TestLine(this IServiceProvider serviceProvider, string value)
        {
            if (serviceProvider == null) throw new ArgumentNullException(nameof(serviceProvider));

            var code = new []{ value };

            var codeContext = serviceProvider.GetRequiredService<ISourceCodeDocument>();
            codeContext.SetCode(code);

            var context = serviceProvider.GetRequiredService<IParserContext>();
            context.ProcessLine();

            return context;
        }

        public static TokenValidator ValidateTokens(this IParserContext context)
        {
            var methodInfo = new StackTrace().GetFrame(1).GetMethod();
            return context.ValidateTokens(methodInfo.ReflectedType.Name);
        }
    }
}