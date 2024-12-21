using System;

namespace Lexy.Poc.Core.Language
{
    public interface IRootComponent : IComponent
    {
        string ComponentName { get; }
    }
}