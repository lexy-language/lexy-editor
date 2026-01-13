import {parseLines} from "../../api/parser";
import {NodeFileSystem} from "../nodeFileSystem";
import {runScenarios} from "../../context/compilation/runScenarios"; // This import style requires "esModuleInterop", see "side notes"

test('parse big file', async () => {
  const fileSystem = new NodeFileSystem();
  const fullPath = fileSystem.combine(fileSystem.currentFolder(), "/context/big.lexy")
  const bigLexy = await fileSystem.readAllLines(fullPath)
  console.log("Lines: " + bigLexy.length);

  const result = await parseLines("big.lexy", bigLexy, fileSystem );
  console.log("Nodes: " + result.nodes.length);
  console.log("Elapsed: " + result.elapsed);

  const continueCheck = () => new Promise<boolean>((resolve) => resolve(true));
  const runScenariosResult = runScenarios("big.lexy", result.nodes, result.dependencies, result.logger, continueCheck);
  console.log("Logging: ", runScenariosResult);
});
