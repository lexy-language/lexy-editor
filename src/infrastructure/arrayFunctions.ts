export function any<TItem>(array: ReadonlyArray<TItem>, where: ((value: TItem) => boolean) | null = null): boolean {
  for (const item of array) {
    if (where == null || where(item)) return true;
  }
  return false;
}
