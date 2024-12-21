using System;
using System.Collections.Generic;
using Lexy.Poc.Core.Parser;

namespace Lexy.Poc.Core.Language
{
    public abstract class RootComponent : IRootComponent
    {

        public abstract string ComponentName { get; }

        public abstract IComponent Parse(IParserContext context);

    }
}