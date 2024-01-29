let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;

export enum Stores {
  Users = "users",
}

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    request = indexedDB.open("usersDB");

    request.onupgradeneeded = () => {
      db = request.result;
      if (!db.objectStoreNames.contains(Stores.Users)) {
        console.log("Creating users store");
        db.createObjectStore(Stores.Users, { keyPath: "id" });
      }
    };

    request.onsuccess = () => {
      db = request.result;
      version = db.version;
      console.log("request.onsuccess - initDB", version);
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export const addData = <T>(
  storeName: string,
  data: T
): Promise<T | string | null> => {
  return new Promise((resolve) => {
    request = indexedDB.open("usersDB", version);

    request.onsuccess = () => {
      console.log("request.onsuccess - addData", data);
      db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.add(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve("Unknown error");
      }
    };
  });
};
