namespace Lexy.Poc.Core.Parser
{
    internal class TokenValues
    {
        public const string FunctionComponent = "Function:";
        public const string EnumComponent = "Enum:";
        public const string TableComponent = "Table:";
        public const string ScenarioComponent = "Scenario:";

        public const string Function = "Function";
        public const string Table = "Table";

        public const string Include = "Include";
        public const string Parameters = "Parameters";
        public const string Results = "Results";
        public const string Code = "Code";
        public const string ExpectError = "ExpectError";

        public const string Comment = "#";
        public const char CommentChar = '#';

        public const char TableSeparator = '|';
        public const char Quote = '\"';
        public const char Assignment = '=';

        public const char DecimalSeparator = '.';
        public const char DateTimeStarter = 'd';

        public const string BooleanTrue = "true";
        public const string BooleanFalse = "false";

        public const char Slash = '/';
        public const char Colon = ':';
        public const char Space = ' ';
    }
}