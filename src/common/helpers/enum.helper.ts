export type DynamicEnum<T extends readonly string[]> = {
  [K in T[number] as Uppercase<K>]: K;
} & {
  asArray: () => T;
};

/**
 * Creates a dynamic enum object with uppercase keys and an `asArray` method.
 * @param values - A read-only array of string values (`as const`)
 */
export function createDynamicEnum<T extends readonly string[]>(
  values: T,
): DynamicEnum<T> {
  const obj = {} as any;

  for (const val of values) {
    obj[val.toUpperCase()] = val;
  }

  obj.asArray = () => values;

  return obj;
}
