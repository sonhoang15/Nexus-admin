type StorageValue = string | number | boolean | object | null;

class StorageHelper {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  set<T extends StorageValue>(key: string, value: T): void {
    if (value === null) {
      this.remove(key);
      return;
    }

    const storedValue =
      typeof value === "string" ? value : JSON.stringify(value);

    this.storage.setItem(key, storedValue);
  }

  get<T>(key: string): T | null {
    const value = this.storage.getItem(key);
    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}

export const storage = new StorageHelper(localStorage);
