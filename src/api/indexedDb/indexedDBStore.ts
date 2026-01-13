//adapted from use use-indexeddb (https://github.com/hc-oss/use-indexeddb/commit/f6e5deed3f3c1010c4b314d72b25b5a4f454f07f)

export interface IndexedDBColumn {
  name: string;
  keyPath: string;
  options?: IDBIndexParameters;
}

export interface IndexedDBStoreConfig {
  name: string;
  id: IDBObjectStoreParameters;
  indices: IndexedDBColumn[];
}

export interface IndexedDBConfig {
  databaseName: string;
  version: number;
  stores: IndexedDBStoreConfig[];
}

export interface IndexedDBStore<T> {
  getByID(id: string | number): Promise<T>;
  getOneByKey(keyPath: string, value: string | number): Promise<T | undefined>;
  getManyByKey(keyPath: string, value: string | number): Promise<T[]>;
  getAll(): Promise<T[]>;
  add(value: T, key?: any): Promise<number>;
  addIfNew(value: T, key?: any): Promise<number | null>;
  update(value: T, key?: any): Promise<any>;
  deleteByID(id: any): Promise<any>;
  deleteAll(): Promise<any>;
  openCursor(cursorCallback: (e: any) => void, keyRange?: IDBKeyRange): Promise<IDBCursorWithValue | void>;
}

const self = globalThis as unknown as DedicatedWorkerGlobalScope;

export function createIndexedDBStore<T>(factory: IDBFactory, config: IndexedDBConfig, currentStore: string) {

  let transaction = 0;

  function validateStore(db: IDBDatabase, storeName: string) {
    return db.objectStoreNames.contains(storeName);
  }

  function validateBeforeTransaction(db: IDBDatabase, storeName: string, reject: Function) {
    if (!db) {
      reject("Queried before opening connection");
      return false;
    }
    if (!validateStore(db, storeName)) {
      reject(`Store ${storeName} not found`);
      return false;
    }
    return true;
  }

  function createTransaction(
    db: IDBDatabase,
    dbMode: IDBTransactionMode,
    currentStore: string,
    resolve: ((this: IDBTransaction, ev: Event) => any) | null,
    reject: ((this: IDBTransaction, ev: Event) => any) | null,
    abort: ((this: IDBTransaction, ev: Event) => any) | null = null
  ): IDBTransaction {
    let tx: IDBTransaction = db.transaction(currentStore, dbMode);
    tx.onerror = reject;
    tx.oncomplete = resolve;
    tx.onabort = abort;
    return tx;
  }

  async function getConnection(): Promise<IDBDatabase> {
    const idbInstance = self ? self.indexedDB : null;

    return new Promise<IDBDatabase>((resolve, reject) => {
      if (!idbInstance) {
        return reject("IndexedDB is null");
      }

      const request: IDBOpenDBRequest = idbInstance.open(config.databaseName, config.version);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (e: any) => {
        reject(e.target.error.name);
      };

      request.onupgradeneeded = (e: any) => {
        const db = e.target.result;
        config.stores.forEach(s => {
          if (!db.objectStoreNames.contains(s.name)) {
            const store = db.createObjectStore(s.name, s.id);
            s.indices.forEach(c => {
              store.createIndex(c.name, c.keyPath, c.options);
            });
          }
        });
      };
    });
  }

  function getByID(id: string | number) {
    const thisTransaction = ++transaction;
    console.log(`getByID: ${id}(${thisTransaction})`)
    return new Promise<T>((resolve, reject) => {
      getConnection()
        .then(db => {
          if (!validateBeforeTransaction(db, currentStore, reject)) return;
          let tx = createTransaction(db, "readonly", currentStore, (e) => console.log("Transaction getByID completed: " + JSON.stringify(e)), reject, null);
          let objectStore = tx.objectStore(currentStore);
          let request = objectStore.get(id);
          request.onsuccess = (e: any) => {
            console.log(`getByID: ${id}(${thisTransaction}): `, e.target.result, "...");
            resolve(e.target.result as T);
          };
          request.onerror = (e: any) => {
            console.log(`getByID: ${id}(${thisTransaction}): error `, e.target.result);
            reject(e.target.result as T);
          };
        })
        .catch(reject);
    });
  }

  function getOneByKey(keyPath: string, value: string | number) {
    return new Promise<T | undefined>((resolve, reject) => {
      getConnection()
        .then(db => {
          if (!validateBeforeTransaction(db, currentStore, reject)) return;
          let tx = createTransaction(db, "readonly", currentStore, (e) => console.log("Transaction getOneByKey completed: " + JSON.stringify(e)), reject);
          let objectStore = tx.objectStore(currentStore);
          let index = objectStore.index(keyPath);
          let request = index.get(value);
          request.onsuccess = (e: any) => {
            resolve(e.target.result);
          };
        })
        .catch(reject);
    });
  }

  function getManyByKey(keyPath: string, value: string | number) {
    return new Promise<T[]>((resolve, reject) => {
      getConnection()
        .then(db => {
          if (!validateBeforeTransaction(db, currentStore, reject)) return;
          let tx = createTransaction(db, "readonly", currentStore, (e) => console.log("Transaction getManyByKey completed: " + JSON.stringify(e)), reject);
          let objectStore = tx.objectStore(currentStore);
          let index = objectStore.index(keyPath);
          let request = index.getAll(value);
          request.onsuccess = (e: any) => {
            resolve(e.target.result);
          };
        })
        .catch(reject);
    });
  }

  function getAll() {
    return new Promise<T[]>((resolve, reject) => {
      getConnection()
        .then(db => {
          if (!validateBeforeTransaction(db, currentStore, reject)) return;
          let tx = createTransaction(db, "readonly", currentStore, () => console.log("getAll.validateBeforeTransaction.resolve"), reject);
          let objectStore = tx.objectStore(currentStore);
          let request = objectStore.getAll();
          request.onsuccess = (e: any) => {
            resolve(e.target.result as T[]);
          };
        })
        .catch(reject);
    });
  }

  function add(value: T, key?: any) {
    return new Promise<number>((resolve, reject) => {
      getConnection()
        .then(db => {
          if (!validateBeforeTransaction(db, currentStore, reject)) return;
          let tx = createTransaction(db, "readwrite", currentStore, (e) => console.log("Transaction add completed: " + JSON.stringify(e)), reject);
          let objectStore = tx.objectStore(currentStore);
          let request = objectStore.add(value);
          request.onsuccess = (e: any) => {
            (tx as any)?.commit?.();
            resolve(e.target.result);
          };
        })
        .catch(reject);
    });
  }

  function addIfNew(value: T, key?: any) {
    return new Promise<number | null>((resolve, reject) => {
      getConnection()
        .then(db => {
          if (!validateBeforeTransaction(db, currentStore, reject)) return;
          let tx = createTransaction(db, "readwrite", currentStore, (e) => console.log("Transaction add completed: " + JSON.stringify(e)), reject);
          let objectStore = tx.objectStore(currentStore);
          let request = objectStore.get(key);
          request.onsuccess = (e: any) => {
            if (e.target.result) {
              tx.abort();
              return resolve(null);
            }

            let request = objectStore.add(value);
            request.onsuccess = (e: any) => {
              tx.commit();
              resolve(e.target.result);
            };
          };
        })
        .catch(reject);
    });
  }

  function update(value: T, key?: any) {
    console.trace();
    console.log(`Update: ${key}(${++transaction}) - ${JSON.stringify(value)}`)
    return new Promise<any>((resolve, reject) => {
      getConnection()
        .then(db => {

          if (!validateBeforeTransaction(db, currentStore, reject)) return;
          let tx = createTransaction(db, "readwrite", currentStore, (e) => console.log(`Transaction update completed: ${key}(${transaction}) - ${JSON.stringify(e)}`), reject);
          let objectStore = tx.objectStore(currentStore);
          let request = objectStore.put(value);
          request.onsuccess = (e: any) => {
            tx.commit();
            resolve(e.target.result);
          };
        })
        .catch(reject);
    });
  }

  function deleteByID(id: any) {
    return new Promise<any>((resolve, reject) => {
      getConnection()
        .then(db => {
          if (!validateBeforeTransaction(db, currentStore, reject)) return;
          let tx = createTransaction(db, "readwrite", currentStore, (e) => console.log("Transaction deleteByID completed: " + JSON.stringify(e)), reject);
          let objectStore = tx.objectStore(currentStore);
          let request = objectStore.delete(id);
          request.onsuccess = (e: any) => {
            (tx as any)?.commit?.();
            resolve(e);
          };
        })
        .catch(reject);
    });
  }

  function deleteAll() {
    return new Promise<any>((resolve, reject) => {
      getConnection()
        .then(db => {
          if (!validateBeforeTransaction(db, currentStore, reject)) return;
          let tx = createTransaction(db, "readwrite", currentStore, (e) => console.log("Transaction deleteAll completed: " + JSON.stringify(e)), reject);
          let objectStore = tx.objectStore(currentStore);
          let request = objectStore.clear();
          request.onsuccess = (e: any) => {
            (tx as any)?.commit?.();
            resolve(e);
          };
        })
        .catch(reject);
    });
  }

  function openCursor(cursorCallback: (e: any) => void, keyRange?: IDBKeyRange) {
    return new Promise<IDBCursorWithValue | void>((resolve, reject) => {
      getConnection()
        .then(db => {
          if (!validateBeforeTransaction(db, currentStore, reject)) return;
          let tx = createTransaction(db, "readonly", config.databaseName, (e) => console.log("Transaction openCursor completed: " + JSON.stringify(e)), reject);
          let objectStore = tx.objectStore(config.databaseName);
          let request = objectStore.openCursor(keyRange);
          request.onsuccess = e => {
            cursorCallback(e);
            resolve();
          };
        })
        .catch(reject);
    });
  }

  return {
    add: add,
    addIfNew: addIfNew,
    update: update,
    deleteByID: deleteByID,
    deleteAll: deleteAll,
    openCursor: openCursor,
    getByID: getByID,
    getAll: getAll,
    getManyByKey: getManyByKey,
    getOneByKey: getOneByKey,
  };
}

export function workerIndexedDBStore<T>(config: IndexedDBConfig, storeName: string): IndexedDBStore<T> {
  return createIndexedDBStore<T>(self.indexedDB, config, storeName);
}

export function windowIndexedDBStore<T>(config: IndexedDBConfig, storeName: string): IndexedDBStore<T> {
  return createIndexedDBStore<T>(window.indexedDB, config, storeName);
}
