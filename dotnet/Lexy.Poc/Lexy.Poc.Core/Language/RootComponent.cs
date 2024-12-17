using System;
using Lexy.Poc.Core.Parser;

namespace Lexy.Poc.Core.Language
{
    public abstract class RootComponent : IRootComponent
    {
        public Exception FailedException { get; private set; }

        public abstract string TokenName { get; }

        public abstract IComponent Parse(Line line, Components components);

        public void Fail(Exception exception)
        {
            FailedException = exception;
        }
    }
}