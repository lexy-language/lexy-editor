import {useMemo} from "react";
import {IndexedDBStore, windowIndexedDBStore, workerIndexedDBStore} from "./indexedDb/indexedDBStore";
import {idbConfig} from "./idbConfig";

interface FileCode {
  id: string,
  versionId: number,
  code: string
}

export interface CodeFileStorage {
  getCodeFile(identifier: string): Promise<string | null>;
  storeCodeFile(identifier: string, code: string, versionId: number, override: boolean): Promise<boolean>;
  clearCodeFiles(): Promise<any>;
}

function codeFileStorage(filesStore: IndexedDBStore<FileCode>): CodeFileStorage {

  const {getByID, addIfNew, update, deleteAll} = filesStore;

  function getCodeFile(identifier: string): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) =>
      getByID(identifier)
        .then(value => {
          if (value) {
            console.log(`>>>>>> get <<< code file ${value.id} version: ${value.versionId}`)
            resolve(value.code);
          } else {
            resolve(null);
          }
        })
        .catch(reject));
  }

  function storeCodeFile(identifier: string, code: string, versionId: number, override: boolean): Promise<boolean> {

    console.log(`>>>>>> store <<< code file ${identifier} version: ${versionId}`)

    if (!override) {
      return new Promise<boolean>((resolve, reject) => {
        addIfNew({id: identifier, code: code, versionId: versionId}, identifier)
          .then(id => resolve(id != null))
          .catch(reject);
      });
    }

    return new Promise<boolean>((resolve, reject) => {
      update({id: identifier, code: code, versionId: versionId}, identifier)
        .then(_ => {
          console.log(`>>>>>> stored <<< code file ${identifier} version: ${versionId}`)
          resolve(true);
        })
        .catch(reject);
    });
  }

  function clearCodeFiles(): Promise<any> {
    return deleteAll();
  }

  return {
    getCodeFile: getCodeFile,
    storeCodeFile: storeCodeFile,
    clearCodeFiles: clearCodeFiles
  }
}

export function useCodeFileStorage(): CodeFileStorage {
  return useMemo(() => {
    const storeFiles = windowIndexedDBStore<FileCode>(idbConfig, "code-files");
    return codeFileStorage(storeFiles);
  }, []);
}

export function workerCodeFileStorage(): CodeFileStorage {
  const storeFiles = workerIndexedDBStore<FileCode>(idbConfig, "code-files");
  return codeFileStorage(storeFiles);
}
