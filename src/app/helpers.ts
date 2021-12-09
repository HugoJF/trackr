export function mapWithKeys<K extends string | number | symbol, V>(object: Record<K, V>, fn: (value: V, key: K) => any) {
  return Object.entries(object).reduce((result, [key, value]) => ({
    ...result,
    [key]: fn(value as V, key as K),
  }), {})
}
