export const idbConfig = {
  databaseName: "lexy",
  version: 2,
  stores: [
    {
      name: "operation-state",
      id: { keyPath: "id", autoIncrement: false },
      indices: []
    },
    {
      name: "code-files",
      id: { keyPath: "id", autoIncrement: true },
      indices: []
    }
  ]
};
