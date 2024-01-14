import Fleet from '../../../Domain/Models/Fleet'
import Vehicle from '../../../Domain/Models/Vehicle'
import { SqliteRepository } from '../../../Infra/Sqlite/SqliteRepository'
import { FleetQueriesInterface } from '../Interfaces/FleetQueriesInterface'

class FleetQueriesRepository extends SqliteRepository implements FleetQueriesInterface {
  /**
   * Convert a fleet from the database format to the domain format
   */
  private fromDbFromat(res: any): Fleet {
    const fleet = new Fleet({
      userId: res.user_id,
      id: res.id,
    })

    return fleet
  }

  /**
   * Fetch the vehicles of a fleet and add them to the fleet object
   * @param {Fleet} fleet
   * @returns
   */
  private async loadVehicles(fleet: Fleet): Promise<Fleet> {
    const sql = `
      SELECT vehicles.id, vehicles.plate_number FROM vehicles
      INNER JOIN fleets_vehicles ON vehicles.id = fleets_vehicles.vehicle_id
      WHERE fleets_vehicles.fleet_id = ?
    `

    const vehicles = await this.db.all(sql, [fleet.id])

    if (vehicles.length === 0) {
      return fleet
    }

    fleet.vehicles = vehicles.map((vehicle: any) => {
      return new Vehicle({
        id: vehicle.id,
        plateNumber: vehicle.plate_number,
      })
    })

    return fleet
  }

  /**
   * Return a fleet by its id
   *
   * @param {number} id
   * @returns
   */
  public async findById(id: number): Promise<Fleet | null> {
    const sql = `SELECT * FROM fleets WHERE id = ?`

    const res = await this.db.get(sql, [id])

    if (!res) {
      return null
    }

    let fleet = this.fromDbFromat(res)
    fleet = await this.loadVehicles(fleet)

    return fleet
  }
}

export default FleetQueriesRepository
