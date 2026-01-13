import React, {useMemo} from "react";
import {IndexedDBStore, windowIndexedDBStore, workerIndexedDBStore} from "./indexedDb/indexedDBStore";
import {idbConfig} from "./idbConfig";

interface Operation {
  id: string,
  timestamp: string
}

export interface OperationStateStorage {
  getOperationState(key: string): Promise<string | null>;
  updateOperationState(key: string, timestamp: string): Promise<void>;
}

function operationStorage(filesStore: IndexedDBStore<Operation>): OperationStateStorage {

  const {getByID, update} = filesStore;

  async function getOperationState(key: string): Promise<string | null> {
    const value = await getByID(key);
    return value != null ? value.timestamp : null;
  }

  async function updateOperationState(key: string, timestamp: string): Promise<void> {
    await update({id: key, timestamp: timestamp}, key);
  }

  return {
    getOperationState: getOperationState,
    updateOperationState: updateOperationState
  }
}

export function useOperationStateStorage(): OperationStateStorage {
  const store = useMemo(() => {
    const storeOperationState = windowIndexedDBStore<Operation>(idbConfig, "operation-state");
    return operationStorage(storeOperationState);
  }, []);
  return store;
}

export function workerOperationStateStorage(): OperationStateStorage {
  const storeOperationState = workerIndexedDBStore<Operation>(idbConfig, "operation-state");
  return operationStorage(storeOperationState);
}
