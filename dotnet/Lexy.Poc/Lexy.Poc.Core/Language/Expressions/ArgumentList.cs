using System;
using System.Collections.Generic;
using Lexy.Poc.Core.Parser;
using Lexy.Poc.Core.Parser.Tokens;

namespace Lexy.Poc.Core.Language.Expressions
{
    public static class ArgumentList
    {
        public static ArgumentTokenParseResult Parse(TokenList tokens)
        {
            if (tokens == null) throw new ArgumentNullException(nameof(tokens));
            if (tokens.Length == 0) return ArgumentTokenParseResult.Success();

            var result = new List<TokenList>();
            var argumentTokens = new List<Token>();

            foreach (var token in tokens)
            {
                if (token is OperatorToken { Type: OperatorType.ArgumentSeparator })
                {
                    if (argumentTokens.Count == 0)
                    {
                        return ArgumentTokenParseResult.Failed(@"Invalid token ','. No tokens before comma.");
                    }

                    result.Add(new TokenList(argumentTokens.ToArray()));
                    argumentTokens = new List<Token>();
                }
                else
                {
                    argumentTokens.Add(token);
                }
            }

            if (argumentTokens.Count == 0)
            {
                return ArgumentTokenParseResult.Failed(@"Invalid token ','. No tokens before comma.");
            }

            result.Add(new TokenList(argumentTokens.ToArray()));

            return ArgumentTokenParseResult.Success(result);
        }
    }
}