using System;
using System.Collections.Generic;
using System.Linq;
using Lexy.Poc.Core.Parser;

namespace Lexy.Poc.Core.Language
{
    public class TableHeaders
    {
        public IList<TableHeader> Values { get; } = new List<TableHeader>();

        private TableHeaders(TableHeader[] values)
        {
            Values = values;
        }

        public static TableHeaders Parse(Line line)
        {
            throw new NotSupportedException();
            /* var headers = line.TrimmedContent.Trim(TokenValues.TableSeparator)
                .Split(TokenValues.TableSeparator)
                .Select(value => TableHeader.Parse(value, line))
                .ToArray();

            return new TableHeaders(headers); */
        }
    }
}