using System;
using System.Collections.Generic;
using System.Text;

namespace Lexy.Poc.Core
{
    public static class EnumerableExtensions
    {
        public static IEnumerable<TItem> ForEach<TItem>(this IEnumerable<TItem> enumerable, Action<TItem> action)
        {
            if (enumerable == null) throw new ArgumentNullException(nameof(enumerable));
            if (action == null) throw new ArgumentNullException(nameof(action));

            foreach (var item in enumerable)
            {
                action(item);
            }

            return enumerable;
        }

        public static string Format<TItem>(this IEnumerable<TItem> enumerable, int indentLevel)
        {
            if (enumerable == null) throw new ArgumentNullException(nameof(enumerable));

            var indent = indentLevel > 0 ? new string(' ', 4) : string.Empty;
            var builder = new StringBuilder();
            builder.AppendLine();
            foreach (var item in enumerable)
            {
                builder.AppendLine(indent + item.ToString());
            }

            return builder.ToString();
        }

    }
}