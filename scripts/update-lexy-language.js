import fs from "fs";
import path from "path";

const getFilesRecursively = (parent, directory) => {
  const filesInDirectory = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of filesInDirectory) {
    const absolute = path.join(directory, file.name);
    if (!file.isFile()) {
      const folder = {
        name: file.name,
        identifier: parent.identifier + "|" + file.name,
        files: [],
        folders: []
      }
      getFilesRecursively(folder, absolute);
      if (folder.files.length > 0 || folder.folders.length > 0) {
        parent.folders.push(folder)
      }
    } else if (file.name.endsWith("lexy")) {
      console.log(absolute);
      const fileNode = {
        name: file.name,
        identifier: parent.identifier + "|" + file.name,
        code: fs.readFileSync(absolute).toString('utf8')
      };
      parent.files.push(fileNode);
    }
  }
};

const root = {
  name: "Lexy",
  identifier: "Lexy",
  files: [],
  folders: []
};

getFilesRecursively(root, "../src/lexy-language/src");

console.log(JSON.stringify(root, null, 2));

fs.writeFileSync("../src/lexyLanguage.json", JSON.stringify(root, null, 2))