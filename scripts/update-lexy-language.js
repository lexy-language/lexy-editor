import fs from "fs";
import path from "path";

//we store all lexy (.lexy and .md) files from the lexy-language repository in an embedded json
//todo: they should be fetched from the server in the future

const getFilesRecursively = (parent, directory) => {
  const filesInDirectory = fs.readdirSync(directory, { withFileTypes: true });

  function copyFolder(file, absolute) {
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
  }

  function copyFile(absolute, file) {
    console.log(absolute);
    const fileNode = {
      name: file.name,
      identifier: parent.identifier + "|" + file.name,
      code: fs.readFileSync(absolute).toString('utf8')
    };
    parent.files.push(fileNode);
  }

  for (const file of filesInDirectory) {
    const absolute = path.join(directory, file.name);
    if (!file.isFile()) {
      copyFolder(file, absolute);
    } else if (file.name.endsWith("lexy") || file.name.endsWith("md")) {
      copyFile(absolute, file);
    }
  }
};

const root = {
  name: "Lexy",
  identifier: "Lexy",
  files: [],
  folders: []
};

getFilesRecursively(root, "../src/lexy-language");

console.log(JSON.stringify(root, null, 2));

fs.writeFileSync("../src/lexyLanguage.json", JSON.stringify(root, null, 2))