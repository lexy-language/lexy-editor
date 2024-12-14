namespace Lexy.Poc.Core.Parser
{
    public class LexyFunction
    {
        public string Name { get; set; }

        public void ParseName(string parameter)
        {
            Name = parameter;
        }
    }
}