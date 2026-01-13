import {parseNodes} from "../parseFunctions";
import {mapNodes, NodeModel} from "../../context/project/nodeModel";

function expectEachNodToHaveAName(actual: NodeModel[]) {

  function validateName(model: readonly NodeModel[], parent: string) {
    for (let index = 0; index < model.length; index++){
      const node = model[index];
      let path = parent + "[" + index + "](" + node.name + ")";
      if (!node.name || node.name == "") {
        result.push(path + ": no name");
      }
      validateName(node.children, path)
    }
  }

  let result: string[] = [];
  validateName(actual, "");
  if (result.length > 0) {
    throw new Error(result.join("\n"));
  }
}

test('map parsed nodes to model', async () => {

  let result = await parseNodes(`
table StringTable
  | string Discriminator | string SearchValue | number ResultNumber |
  | "da"                 | "a"                | 222                 |
  | "da"                 | "b"                | 333                 |
  | "db"                 | "a"                | 444                 |
  | "db"                 | "b"                | 555                 |

function LookUpNumberFunction
  parameters
    string Discriminator
    string Value
  results
    number Result
  Result = StringTable.LookUp(Discriminator, Value, StringTable.Discriminator, StringTable.SearchValue, StringTable.ResultNumber)

scenario LookUpFirstDiscriminator1
  function LookUpNumberFunction
  parameters
    Discriminator = "da"
    Value = "a"
  results
    Result = 222

enum MaritalStatus
  Single
  Married
  CivilPartnership

function EnumWithIfStatement
  parameters
    MaritalStatus MaritalStatus
  results
    number Tax
  if MaritalStatus == MaritalStatus.Single
    Tax = 0.45
  else
    Tax = 0.40

scenario CheckEnumComparisonInIfStatementTrue
  function EnumWithIfStatement
  parameters
    MaritalStatus = MaritalStatus.Single
  results
    Tax = 0.45    

enum CustomEnum
  First
  Second

type NestedType
  number InnerNumber = 0
  string InnerString = ""
  date InnerDate = d"0001-01-01T00:00:00"
  boolean InnerBoolean = false
  CustomEnum InnerEnum = CustomEnum.First

type DeclaredType
  number NumberValue = 0
  string StringValue = ""
  date DateValue = d"0001-01-01 00:00:00"
  boolean BooleanValue = false
  CustomEnum EnumValue = CustomEnum.First
  NestedType Object

scenario FieldsShouldHaveDefaultValue
  function
    parameters
    results
      DeclaredType Result
  results
    Result.NumberValue = 0
    Result.StringValue = ""
    Result.DateValue = d"0001-01-01T00:00:00"
    Result.BooleanValue = false
    Result.EnumValue = CustomEnum.First
    Result.Object.InnerNumber = 0
    Result.Object.InnerString = ""
    Result.Object.InnerDate = d"0001-01-01 00:00:00"
    Result.Object.InnerBoolean = false
    Result.Object.InnerEnum = CustomEnum.First
`);

  let model = mapNodes(result.nodes.values);

  let actual = JSON.stringify(model, null, 4);
  console.log(actual);

  expectEachNodToHaveAName(model)
});
