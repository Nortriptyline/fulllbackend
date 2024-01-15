import Database from './Database'
import { Database as SQLiteDatabase } from 'sqlite'

export abstract class SqliteRepository {
  protected db: SQLiteDatabase

  constructor() {
    // Getting a promise that will resolve to the database instance
    const dbPromise = Database.getInstance()

    // The 'db' property is set to a new Proxy object that will intercept all property accesses
    this.db = new Proxy(
      {}, // The target object is an empty object
      {
        get: (_, prop: keyof SQLiteDatabase) => {
          // This function is called when a property is accessed on the 'db' object
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
