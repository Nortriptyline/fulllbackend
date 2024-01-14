import { SqliteRepository } from './SqliteRepository'

export default class DatabaseInitializer extends SqliteRepository {
  public async createAllTables(): Promise<void> {
    await this.createFleetsTable()
    await this.createVehiclesTable()
    await this.createFleetsVehiclesTable()
    await this.createLocationsTable()
  }

  public async dropAllTables(): Promise<void> {
    await this.dropFleetVehiclesTable()
    await this.dropFleetsTable()
    await this.dropVehiclesTable()
    await this.dropLocationsTable()
  }

  public async createFleetsTable(): Promise<void> {
    const sql = `
            CREATE TABLE fleets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL
            )
        `

    await this.db.exec(sql)
  }

  public async dropFleetsTable(): Promise<void> {
    const sql = `DROP TABLE IF EXISTS fleets`
    await this.db.exec(sql)
  }

  public async createVehiclesTable(): Promise<void> {
    const sql = `
            CREATE TABLE IF NOT EXISTS vehicles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                plate_number TEXT NOT NULL
            )
        `

    // Given that the license plate is unique, we can create an index for it
    const createIndexSql = `
            CREATE UNIQUE INDEX IF NOT EXISTS idx_vehicles_plate_number 
            ON vehicles (plate_number)
        `

    await this.db.exec(sql)
    await this.db.exec(createIndexSql)
  }

  public async dropVehiclesTable(): Promise<void> {
    const sql = `DROP TABLE IF EXISTS vehicles`
    await this.db.exec(sql)
  }

  public async createLocationsTable(): Promise<void> {
    const sql = `
            CREATE TABLE IF NOT EXISTS locations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                vehicle_id INTEGER NOT NULL,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL,
                altitude REAL,
                inserted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(vehicle_id) REFERENCES vehicles(id)
            )
        `

    await this.db.exec(sql)
  }

  public async dropLocationsTable(): Promise<void> {
    const sql = `DROP TABLE IF EXISTS locations`
    await this.db.exec(sql)
  }

  public async createFleetsVehiclesTable(): Promise<void> {
    const sql = `
            CREATE TABLE IF NOT EXISTS fleets_vehicles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fleet_id INTEGER NOT NULL,
                vehicle_id INTEGER NOT NULL,
                FOREIGN KEY(fleet_id) REFERENCES fleets(id),
                FOREIGN KEY(vehicle_id) REFERENCES vehicles(id)
            )
        `

    await this.db.exec(sql)
  }

  public async dropFleetVehiclesTable(): Promise<void> {
    const sql = `DROP TABLE IF EXISTS fleets_vehicles`
    await this.db.exec(sql)
  }
}
