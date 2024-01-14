import { Database as SQLiteDatabase, open } from 'sqlite'
import sqlite3 from 'sqlite3'

class Database {
  private static instance: Database
  private db: SQLiteDatabase | undefined

  private constructor() {}

  public static async getInstance(): Promise<SQLiteDatabase> {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return await Database.instance.getDb()
  }

  private async getDb(): Promise<SQLiteDatabase> {
    if (!this.db) {
      this.db = await open({
        filename: './fleet.sqlite',
        driver: sqlite3.Database,
      })
    }
    return this.db
  }
}

export default Database
