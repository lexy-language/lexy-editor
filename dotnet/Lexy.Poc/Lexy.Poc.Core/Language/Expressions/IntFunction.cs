using System;
using System.Collections.Generic;
using Lexy.Poc.Core.Parser;

namespace Lexy.Poc.Core.Language.Expressions
{
    public class IntFunction : BuiltInFunction
    {
        private const string FunctionHelp = "INT expects 1 arguments (Value)";

        private const int Arguments = 1;
        private const int ArgumentValue = 0;

        public Expression ValueExpression { get; }

        private IntFunction(Expression valueExpression, SourceReference tableNameArgumentReference)
            : base(tableNameArgumentReference)
        {
            ValueExpression = valueExpression ?? throw new ArgumentNullException(nameof(valueExpression));
        }

        public static ParseBuiltInFunctionsResult Parse(SourceReference functionCallReference, IReadOnlyList<Expression> arguments)
        {
            if (arguments.Count != Arguments)
            {
                return ParseBuiltInFunctionsResult.Failed($"Invalid number of arguments. {FunctionHelp}");
            }

            var valueExpression = arguments[ArgumentValue];
            var valueExpressionReference = arguments[ArgumentValue].Reference;

            var lookupFunction = new IntFunction(valueExpression, valueExpressionReference);
            return ParseBuiltInFunctionsResult.Success(lookupFunction);
        }

        public override IEnumerable<INode> GetChildren()
        {
            yield return ValueExpression;
        }

        protected override void Validate(IValidationContext context)
        {
            var conditionValueType = ValueExpression.DeriveType(context);
            if (conditionValueType == null || !conditionValueType.Equals(PrimitiveType.Number))
            {
                context.Logger.Fail(Reference, $"Invalid argument 1. Value should be of type 'Number' but if '{conditionValueType}. {FunctionHelp}");
            }
        }

        public override VariableType DeriveReturnType(IValidationContext context) =>
            ValueExpression?.DeriveType(context);
    }
}