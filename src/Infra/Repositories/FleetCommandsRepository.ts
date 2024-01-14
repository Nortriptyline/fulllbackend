import type Fleet from '../../Domain/Models/Fleet'
import { SqliteRepository } from '../Sqlite/SqliteRepository'
import { type FleetCommandsInterface } from '../Interfaces/FleetCommandsInterface'

class FleetCommandsRepository extends SqliteRepository implements FleetCommandsInterface {
  /**
   * Save a fleet
   *
   * @param {Fleet} fleet Fleet to save
   * @returns
   */
  public async save(fleet: Fleet): Promise<Fleet> {
    const sql = 'INSERT INTO fleets (user_id) VALUES (?)'

    const res = await this.db.run(sql, [fleet.userId])

    if (res.lastID === undefined || res.lastID === null || res.lastID === 0 || Number.isNaN(res.lastID)) {
      throw new Error('Error while saving the fleet')
    }

    fleet.id = res.lastID
    return fleet
  }

  /**
   * Update a fleet
   *
   * @param {Fleet} fleet Fleet to update
   * @returns
   */
  public async update(fleet: Fleet): Promise<Fleet> {
    const sql = 'UPDATE fleets SET user_id = ? WHERE id = ?'

    const res = await this.db.run(sql, [fleet.userId, fleet.id])
    if (!res.lastID) {
      throw new Error('Error while updating the fleet')
    }

    await this.updateVehicles(fleet)

    return fleet
  }

  /**
   * Update the vehicles of a fleet
   * @param {Fleet} fleet Fleet to update
   */
  public async updateVehicles(fleet: Fleet): Promise<void> {
    if (fleet.vehicles.length === 0) {
      return
    }

    // We use a transaction to ensure that the update
    // of vehicles is atomic
    await this.db.run('BEGIN TRANSACTION')
    try {
      const sql = 'DELETE FROM fleets_vehicles WHERE fleet_id = ?'

      await this.db.run(sql, [fleet.id])
      const vehicles_id = fleet.vehicles.map((vehicle) => vehicle.id)

      // We use a prepared statement to insert the vehicles in bulk
      const sqlInsert = ` INSERT INTO fleets_vehicles (vehicle_id, fleet_id)
                                    VALUES ${vehicles_id.map(() => '(?, ?)').join(', ')}`

      const params = []
      for (const vehicle_id of vehicles_id) {
        params.push(vehicle_id, fleet.id)
      }

      await this.db.run(sqlInsert, params)
      await this.db.run('COMMIT')
    } catch (error) {
      await this.db.run('ROLLBACK')
      throw error
    }
  }
}

export default FleetCommandsRepository
