import {useMemo} from "react";
import {IndexedDBStore, windowIndexedDBStore, workerIndexedDBStore} from "./indexedDb/indexedDBStore";
import {idbConfig} from "./idbConfig";

interface FileCode {
  id: string,
  code: string
}

export interface CodeFileStorage {
  getCodeFile(identifier: string): Promise<string | null>;
  storeCodeFile(identifier: string, code: string, override: boolean): Promise<boolean>;
  clearCodeFiles(): Promise<any>;
}

function codeFileStorage(filesStore: IndexedDBStore<FileCode>): CodeFileStorage {

  const {getByID, addIfNew, update, deleteAll} = filesStore;

  function getCodeFile(identifier: string): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) =>
      getByID(identifier)
        .then(value => value ? resolve(value.code) : resolve(null))
        .catch(reject));
  }

  function storeCodeFile(identifier: string, code: string, override: boolean): Promise<boolean> {
    if (!override) {
      return new Promise<boolean>((resolve, reject) => {
        addIfNew({id: identifier, code: code}, identifier)
          .then(id => resolve(id != null))
          .catch(reject);
      });
    }

    return new Promise<boolean>((resolve, reject) => {
      update({id: identifier, code: code}, identifier)
        .then(_ => resolve(true))
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
