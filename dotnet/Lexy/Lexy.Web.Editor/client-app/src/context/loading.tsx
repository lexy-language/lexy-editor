export function isLoading(value: any): value is Loading {
  return value?.isLoading === true;
}

export class Loading {
  isLoading = true;
}