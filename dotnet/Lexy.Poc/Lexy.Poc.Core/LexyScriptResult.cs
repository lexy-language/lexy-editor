using System.Collections;

namespace Lexy.Poc.Core
{
    public class LexyScriptResult
    {
        private readonly IDictionary values = new Hashtable();

        public object this[string name]
        {
            get => values[name];
            set => values[name] = value;
        }

        public int Int(string name)
        {
            return (int)values[name];
        }
    }
}