import Uuid, { newUuid } from '@/types/_core/uuid';
import fs from 'fs/promises';

export enum DataType {
  Stories = 'Stories',
  Levels = 'Levels',
}

const DataPaths: Record<DataType, string> = {
  [DataType.Stories]: 'app/api/database/stories.json',
  [DataType.Levels]: 'app/api/database/levels.json',
};

export default class Database {
  static async readData<T>(dataType: DataType): Promise<T | null> {
    try {
      const filePath = DataPaths[dataType];
      const fileContent = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(fileContent) as T;
    } catch (error) {
      console.error(`Error reading ${dataType} data:`, error);
      return null;
    }
  }

  static async writeData<T>(dataType: DataType, data: T): Promise<boolean> {
    try {
      const filePath = DataPaths[dataType];
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (error) {
      console.error(`Error writing ${dataType} data:`, error);
      return false;
    }
  }

  static async upsertItem<
    T extends { id?: undefined | Uuid } & Record<any, any>,
  >(dataType: DataType, item: T): Promise<false | T> {
    try {
      const data = (await this.readData<T[]>(dataType)) || [];
      const safeItem: T = {
        id: newUuid(),
        ...item,
      };
      const index = data.findIndex(
        (existingItem) => existingItem.id === item.id,
      );
      if (index !== -1) {
        data[index] = safeItem; // Update existing item
      } else {
        data.push(safeItem); // Create new item
      }
      const res = await this.writeData(dataType, data);
      if (res) return safeItem;
      return false;
    } catch (error) {
      console.error(`Error upserting item in ${dataType} data:`, error);
      return false;
    }
  }
}
