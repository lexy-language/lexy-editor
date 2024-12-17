using Lexy.Poc.Core.Parser;

namespace Lexy.Poc.Core.Language
{
    public interface IComponent
    {
        IComponent Parse(Line line, Components components);
    }
}