function fileKey(identifier: string) {
  return "file-code-" + identifier;
}

export function getLocalStorageCode(identifier: string): string | null {
  const key = fileKey(identifier);
  return localStorage.getItem(key);
}

export function setLocalStorageCode(identifier: string, code: string): void {
  const key = fileKey(identifier);
  localStorage.setItem(key, code);
}

export function clearLocalStorage(): void {
  localStorage.clear();
}
