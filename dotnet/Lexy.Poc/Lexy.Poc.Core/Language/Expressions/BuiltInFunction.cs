using Lexy.Poc.Core.Parser;

namespace Lexy.Poc.Core.Language.Expressions
{
    public abstract class BuiltInFunction : Node
    {
        protected BuiltInFunction(SourceReference reference) : base(reference)
        {
        }

        public abstract VariableType DeriveReturnType(IValidationContext context);
    }
}