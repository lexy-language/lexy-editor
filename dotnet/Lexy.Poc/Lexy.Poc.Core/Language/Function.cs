using System;
using System.Collections.Generic;
using System.Linq;
using Lexy.Poc.Core.Parser;

namespace Lexy.Poc.Core.Language
{
    public class Function : RootComponent
    {
        private static readonly LambdaComparer<IRootComponent> componentComparer =
            new LambdaComparer<IRootComponent>((token1, token2) => token1.TokenName == token2.TokenName);

        public Comments Comments { get; } = new Comments();
        public FunctionName Name { get; } = new FunctionName();
        public FunctionParameters Parameters { get; } = new FunctionParameters();
        public FunctionResult Result { get; } = new FunctionResult();
        public FunctionCode Code { get; } = new FunctionCode();
        public FunctionIncludes Include { get; } = new FunctionIncludes();
        public override string TokenName => Name.Value;

        private Function(string name)
        {
            Name.ParseName(name);
        }

        internal static Function Parse(TokenName name)
        {
            return new Function(name.Parameter);
        }

        public override IComponent Parse(Line line, Components components)
        {
            var name = line.FirstTokenName();
            return name switch
            {
                TokenNames.Parameters => Parameters,
                TokenNames.Result => Result,
                TokenNames.Code => Code,
                TokenNames.Include => Include,
                TokenNames.Comment => Comments,
                _ => throw new InvalidOperationException($"Invalid token '{name}'. {line}")
            };
        }

        public IEnumerable<IRootComponent> GetDependencies(Components components)
        {
            var result = new List<IRootComponent>();
            AddEnumTypes(components, Parameters.Variables, result);
            AddEnumTypes(components, Result.Variables, result);
            return result.Distinct(componentComparer);
        }

        private static void AddEnumTypes(Components components, IList<VariableDefinition> variableDefinitions, List<IRootComponent> result)
        {
            foreach (var parameter in variableDefinitions)
            {
                if (!TypeNames.Exists(parameter.Type))
                {
                    var dependency = components.GetEnum(parameter.Type);
                    if (dependency == null)
                    {
                        throw new InvalidOperationException("Type or enum not found: " + parameter.Type);
                    }

                    result.Add(dependency);
                }
            }
        }
    }
}