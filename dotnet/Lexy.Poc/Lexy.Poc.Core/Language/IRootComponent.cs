using System;

namespace Lexy.Poc.Core.Language
{
    public interface IRootComponent : IComponent
    {
        public bool HasErrors { get; }
        string Keyword { get; }

        void Fail(string exception);
    }
}