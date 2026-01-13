export function isLoading(value: any): value is Loading {
  return value?.isLoading === true;
}

export function hasValue<T>(value: any): value is T {
  return value != null && !isLoading(value);
}

export const loading = {
  isLoading: true
}

export class Loading {
  isLoading = true;
}
