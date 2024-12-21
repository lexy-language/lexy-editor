using Lexy.Poc.Core.Language;

namespace Lexy.Poc.Core.Compiler
{
    public interface ILexyCompiler
    {
        ExecutionEnvironment Compile(Components components, Function function);
    }
}