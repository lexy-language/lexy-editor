using Microsoft.Extensions.Logging;

namespace Lexy.Poc.Core.Compiler
{
    public class CompilerContext
    {
        public ExecutionEnvironment ExecutionEnvironment { get; }
        public ILogger Logger { get; }

        public CompilerContext(ExecutionEnvironment executionEnvironment)
        {
            ExecutionEnvironment = executionEnvironment;
            using var factory = LoggerFactory.Create(builder => builder.AddConsole());

            Logger = factory.CreateLogger("Program");
        }
    }
}