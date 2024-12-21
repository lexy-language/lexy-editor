using System.Collections.Generic;

namespace Lexy.Poc.Core.Parser
{
    internal static class Keywords
    {
        private static readonly IList<string> values = new List<string>
        {
            TokenValues.FunctionComponent,
            TokenValues.EnumComponent,
            TokenValues.TableComponent,
            TokenValues.ScenarioComponent,

            TokenValues.Function,
            TokenValues.Table,

            TokenValues.Include,
            TokenValues.Parameters,
            TokenValues.Results,
            TokenValues.Code,
            TokenValues.ExpectError,
            TokenValues.ExpectRootErrors,

            TokenValues.Comment,
        };

        public static bool Contains(string keyword) => values.Contains(keyword);
    }
}