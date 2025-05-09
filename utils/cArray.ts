import Uuid from '@/types/_core/uuid';

export type NotEmptyArray<T> = [T, ...T[]];

/**
 * This class extends the built-in `Array` class and provides additional static methods for manipulating arrays.
 */
export default class CArray extends Array {
  /**
   * Returns an array of IDs from an array of objects with an [id](cci:1://file:///C:/Users/aryan/OneDrive/Documents/D-Projects/agyle/ui/src/utils/cArray.ts:38:2-47:3) property.
   *
   * @param array The array of objects with an [id](cci:1://file:///C:/Users/aryan/OneDrive/Documents/D-Projects/agyle/ui/src/utils/cArray.ts:38:2-47:3) property.
   * @returns An array of IDs.
   *
   * @example
   * const users: { id: Uuid, name: string }[] = [{ id: '1', name: 'John' }, { id: '2', name: 'Jane' }];
   * const ids: Uuid[] = CArray.itemsToIds(users);
   */
  static itemsToIds<ITEM extends { id: Uuid }>(array: ITEM[]): ITEM['id'][] {
    return array.map<ITEM['id']>((it) => it.id);
  }

  /**
   * Returns an array of unique objects from an array of objects with an [id](cci:1://file:///C:/Users/aryan/OneDrive/Documents/D-Projects/agyle/ui/src/utils/cArray.ts:38:2-47:3) property.
   *
   * @param array The array of objects with an [id](cci:1://file:///C:/Users/aryan/OneDrive/Documents/D-Projects/agyle/ui/src/utils/cArray.ts:38:2-47:3) property.
   * @returns An array of unique objects.
   *
   * @example
   * const users: { id: Uuid, name: string }[] = [{ id: '1', name: 'John' }, { id: '1', name: 'John' }, { id: '2', name: 'Jane' }];
   * const uniqueUsers: { id: Uuid, name: string }[] = CArray.uniqWithId(users);
   */
  static uniqWithId<ITEM extends { id: Uuid | string | number }>(
    array: ITEM[],
  ): ITEM[] {
    const seen = new Set<ITEM['id']>();
    return array.filter((item) => {
      if (seen.has(item.id)) {
        return false;
      }
      seen.add(item.id);
      return true;
    });
  }

  static shuffle<ITEM>(array: ITEM[]) {
    const arr = [...array]; // Create a shallow copy to avoid mutating the original array
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Pick a random index
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
  }

  /**
   * Returns a new array that is the concatenation of multiple arrays, ignoring any `undefined` arrays.
   *
   * @param arrays The arrays to concatenate.
   * @returns A new array that is the concatenation of the input arrays.
   *
   * @example
   * const arr1: number[] = [1, 2];
   * const arr2: number[] = [3, 4];
   * const arr3: number[] | undefined = undefined;
   * const concatenated: number[] = CArray.safeConcat(arr1, arr2, arr3);
   */
  static safeConcat<ITEM>(...arrays: (ITEM[] | undefined)[]): ITEM[] {
    let concatenatedArray: ITEM[] = [];
    for (const arr of arrays) {
      concatenatedArray = [...concatenatedArray.concat(arr || [])];
    }
    return concatenatedArray;
  }

  /**
   * Returns a new array that is the result of pushing an item onto an existing array, or creating a new array if the existing array is `undefined`.
   *
   * @param array The existing array.
   * @param item The item to push onto the array.
   * @returns A new array that is the result of pushing the item onto the existing array.
   *
   * @example
   * const arr: number[] | undefined = [1, 2];
   * const newArr: number[] = CArray.safePush(arr, 3);
   */
  static safePush<ITEM>(array: ITEM[] | undefined, item: ITEM): ITEM[] {
    return CArray.safeConcat(array, [item]);
  }

  /**
   * Returns a new array that is the result of overriding an item in an existing array with a new item, or creating a new array if the existing array is `undefined`.
   *
   * @param array The existing array.
   * @param newItem The new item to override the existing item with.
   * @returns A new array that is the result of overriding the existing item with the new item.
   *
   * @example
   * const arr: { id: Uuid, name: string }[] = [{ id: '1', name: 'John' }];
   * const newArr: { id: Uuid, name: string }[] = CArray.safeOverrideItem(arr, { id: '1', name: 'Jane' });
   */
  static safeOverrideItem<ITEM extends { id: Uuid }>(
    array: ITEM[] | undefined,
    newItem: ITEM,
  ): ITEM[] {
    const data = [...(array ?? [])];
    if (!data) {
      return [newItem];
    }

    const findIndex = data.findIndex((item) => item.id === newItem.id);
    if (findIndex === -1) {
      return [newItem, ...data];
    }
    data[findIndex] = newItem;
    return data;
  }

  /**
   * Returns a new array that is the result of overriding multiple items in an existing array with new items, or creating a new array if the existing array is `undefined`.
   *
   * @param array The existing array.
   * @param newItems The new items to override the existing items with.
   * @returns A new array that is the result of overriding the existing items with the new items.
   *
   * @example
   * const arr: { id: Uuid, name: string }[] = [{ id: '1', name: 'John' }, { id: '2', name: 'Jane' }];
   * const newItems: { id: Uuid, name: string }[] = [{ id: '1', name: 'Jim' }, { id: '3', name: 'Bob' }];
   * const newArr: { id: Uuid, name: string }[] = CArray.safeOverride(arr, newItems);
   */
  static safeOverride<ITEM extends { id: Uuid }>(
    array: ITEM[] | undefined,
    newItems: ITEM[],
  ) {
    let data = [...(array ?? [])];
    for (const newItem of newItems ?? []) {
      data = CArray.safeOverrideItem(data, newItem);
    }
    return data;
  }

  /**
   * Returns a type guard that checks if an array is not empty.
   *
   * @param arr The array to check.
   * @returns A type guard that checks if the array is not empty.
   *
   * @example
   * const arr: number[] | undefined = [1, 2];
   * if (CArray.isNotEmpty(arr)) {
   *   console.log(arr[0]); // arr is now known to be a non-empty array
   * }
   */
  static isNotEmpty<T>(arr: T[] | undefined): arr is NotEmptyArray<T> {
    return !!arr && arr.length > 0;
  }

  /**
   * Returns a type guard that checks if an array is empty.
   *
   * @param arr The array to check.
   * @returns A type guard that checks if the array is empty.
   *
   * @example
   * const arr: number[] | undefined = undefined;
   * if (CArray.isEmpty(arr)) {
   *   console.log('Array is empty');
   * }
   */
  static isEmpty(arr: any): arr is [] | undefined | null {
    return this.isArray(arr) && arr.length === 0;
  }
}
