export function isValueType(value: any) {
  return typeof value === 'number'
    || typeof value === 'string'
    || value instanceof String
    || value instanceof Date
    || toString.call(value) === '[object Boolean]';
}