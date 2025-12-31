import { SQLiteDatabase } from 'expo-sqlite';
import { getDatabase } from '../index';

export abstract class BaseRepository {
  protected get db(): SQLiteDatabase {
    return getDatabase();
  }

  protected async runAsync(sql: string, params: any[] = []): Promise<void> {
    await this.db.runAsync(sql, params);
  }

  protected async getAllAsync<T>(sql: string, params: any[] = []): Promise<T[]> {
    return await this.db.getAllAsync<T>(sql, params);
  }

  protected async getFirstAsync<T>(sql: string, params: any[] = []): Promise<T | null> {
    return await this.db.getFirstAsync<T>(sql, params);
  }
}
