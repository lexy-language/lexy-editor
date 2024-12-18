using System;
using System.Collections.Generic;
using System.Linq;
using Lexy.Poc.Core.Parser;

namespace Lexy.Poc.Core.Language
{
    public class Function : RootComponent
    {
        private static readonly LambdaComparer<IRootComponent> componentComparer =
            new LambdaComparer<IRootComponent>((token1, token2) => token1.Keyword == token2.Keyword);

        public Comments Comments { get; } = new Comments();
        public FunctionName Name { get; } = new FunctionName();
        public FunctionParameters Parameters { get; } = new FunctionParameters();
        public FunctionResults Results { get; } = new FunctionResults();
        public FunctionCode Code { get; } = new FunctionCode();
        public FunctionIncludes Include { get; } = new FunctionIncludes();
        public override string Keyword => Name.Value;

        private Function(string name)
        {
            Name.ParseName(name);
        }

        internal static Function Parse(ComponentName name)
        {
            return new Function(name.Parameter);
        }

        public override IComponent Parse(ParserContext context)
        {
            var line = context.CurrentLine;
            if (line.IsTokenType<CommentToken>(0))
            {
                return Comments;
            }

            var name = line.TokenValue(0);
            if (!line.IsTokenType<KeywordToken>(0))
            {
                return InvalidToken(name, line, context);
            }

            return name switch
            {
                TokenValues.Parameters => Parameters,
                TokenValues.Results => Results,
                TokenValues.Code => Code,
                TokenValues.Include => Include,
                 _ => InvalidToken(name, line, context)
            };
        }

        private IComponent InvalidToken(string name, Line line, ParserContext parserContext)
        {
            parserContext.Fail($"Invalid token '{name}'. {line}");
            return null;
        }

        public IEnumerable<IRootComponent> GetDependencies(Components components)
        {
            var result = new List<IRootComponent>();
            AddEnumTypes(components, Parameters.Variables, result);
            AddEnumTypes(components, Results.Variables, result);
            return result.Distinct(componentComparer);
        }

        private static void AddEnumTypes(Components components, IList<VariableDefinition> variableDefinitions, List<IRootComponent> result)
        {
            foreach (var parameter in variableDefinitions)
            {
                if (!TypeNames.Contains(parameter.Type))
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