using System;
using Lexy.Poc.Core.Parser;

namespace Lexy.Poc.Core.Language
{
    public class Scenario : RootComponent
    {
        public Comments Comments { get; } = new Comments();
        public ScenarioName Name { get; } = new ScenarioName();
        public ScenarioFunctionName FunctionName { get; } = new ScenarioFunctionName();
        public ScenarioParameters Parameters { get; } = new ScenarioParameters();
        public ScenarioResults Results { get; } = new ScenarioResults();
        public ScenarioExpectError ExpectError { get; } = new ScenarioExpectError();
        public ScenarioTable Table { get; } = new ScenarioTable();

        public override string ComponentName => Name.Value;

        private Scenario(string name)
        {
            Name.ParseName(name);
        }

        internal static Scenario Parse(ComponentName name)
        {
            return new Scenario(name.Parameter);
        }

        public override IComponent Parse(IParserContext context)
        {
            var line = context.CurrentLine;
            if (line.IsTokenType<CommentToken>(0))
            {
                return Comments;
            }

            var name = line.TokenValue(0);
            if (!line.IsTokenType<KeywordToken>(0))
            {
                context.Logger.Fail($"Invalid token '{name}'. Keyword expected.", ComponentName);
                return null;
            }

            return name switch
            {
                TokenValues.Function => FunctionName.Parse(context),
                TokenValues.Parameters => Parameters,
                TokenValues.Results => Results,
                TokenValues.Table => Table,
                TokenValues.Comment => Comments,
                TokenValues.ExpectError => ExpectError.Parse(context),
                _ => InvalidToken(context, name)
            };
        }

        private IComponent InvalidToken(IParserContext parserContext, string name)
        {
            parserContext.Logger.Fail($"Invalid token '{name}'.", ComponentName);
            return null;
        }
    }
}
