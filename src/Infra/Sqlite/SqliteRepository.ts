import Database from './Database'
import { Database as SQLiteDatabase } from 'sqlite'

export abstract class SqliteRepository {
  protected db: SQLiteDatabase

  constructor() {
    const dbPromise = Database.getInstance()

    this.db = new Proxy(
      {},
      {
        get: (_, prop: keyof SQLiteDatabase) => {
          return (...args: any[]) => {
            return dbPromise.then((db) => {
              const method = db[prop] as (...args: any[]) => any
              if (typeof method === 'function') {
                return method.apply(db, args)
              }
              throw new Error(`Property ${String(prop)} is not a function`)
            })
          }
        },
      }
    ) as any as SQLiteDatabase
  }
}
