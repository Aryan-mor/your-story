import Uuid from '@/types/_core/uuid';

/**
 * This class extends the built-in `Object` class and provides additional static methods for manipulating objects.
 */
export default class CObject extends Object {
  /**
   * Returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would.
   *
   * @param object The object whose property names are to be retrieved.
   * @returns An array of property names.
   *
   * @example
   * const users: Record<User['id'], any> = {};
   * const keys: string[] = Object.keys(users);
   * const keys2: User['id'][] = CObject.keys(users);
   */
  static override keys<KEY extends keyof any>(
    object: Record<KEY, unknown>,
  ): KEY[] {
    return Object.keys(object) as KEY[];
  }

  /**
   * Returns an array of a given object's own enumerable string-keyed property [key, value] pairs.
   *
   * @param record The object whose property pairs are to be retrieved.
   * @returns An array of property pairs.
   *
   * @example
   * const users: Record<User['id'], any> = {};
   * const entries: [string, any][] = Object.entries(users);
   * const entries2: [User['id'], any][] = CObject.entries(users);
   */
  static override entries<T extends string, U>(record: Record<T, U>): [T, U][] {
    return Object.entries(record) as [T, U][];
  }

  /**
   * Returns an object created by iterating over an array of key-value pairs.
   *
   * @param entries The array of key-value pairs.
   * @returns An object created from the key-value pairs.
   *
   * @example
   * const users: Record<User['id'], any> = {};
   * const entries: [User['id'], any][] = CObject.entries(users);
   * const newObj: Record<User['id'], any> = CObject.fromEntries(entries);
   */
  static override fromEntries<T extends keyof any, V>(
    entries: [T, V][],
  ): Record<T, V> {
    return Object.fromEntries(entries) as Record<T, V>;
  }

  /**
   * Returns a new object that is a shallow merge of the base object and the override object.
   *
   * @param override The object whose properties will override the base object's properties.
   * @param base The base object.
   * @returns A new object that is a shallow merge of the base object and the override object.
   *
   * @example
   * const users: Record<User['id'], any> = {};
   * const override: Partial<Record<User['id'], any>> = { 'user1': 'John' };
   * const filledObj: Record<User['id'], any> = CObject.safeFill(override, users);
   */
  static safeFill<T extends object>(
    override: Partial<T>,
    base: T = {} as T,
  ): T {
    return {
      ...base,
      ...override,
    };
  }

  /**
   * Returns an array of a given object's own enumerable property values.
   *
   * @param object The object whose property values are to be retrieved.
   * @returns An array of property values.
   *
   * @example
   * const users: Record<User['id'], any> = {};
   * const values: any[] = Object.values(users);
   * const values2: any[] = CObject.values(users);
   */
  static override values<VALUE>(object: Record<any, VALUE>): VALUE[] {
    return Object.values(object) as VALUE[];
  }

  static objectifyWithId<ITEM extends { id: Uuid } & Record<any, any>>(
    array: ITEM[],
  ): Record<ITEM['id'], ITEM> {
    return array.reduce(
      (acc, item) => {
        acc[item.id as keyof typeof acc] = item;
        return acc;
      },
      {} as Record<ITEM['id'], ITEM>,
    );
  }
}
