import Vehicle from '../../Domain/Models/Vehicle'
import { SqliteRepository } from '../Sqlite/SqliteRepository'
import { VehicleQueriesInterface } from '../Interfaces/VehicleQueriesInterface'

class VehicleQueriesRepository extends SqliteRepository implements VehicleQueriesInterface {
  private fromDbFromat(res: any): Vehicle {
    const vehicle = new Vehicle({
      id: res.id,
      plateNumber: res.plate_number,
      is_new: false,
    })

    return vehicle
  }

  /**
   * Return a vehicle by its id
   * @param {number} id
   * @returns
   */
  public async findById(id: number): Promise<Vehicle | null> {
    const sql = `
            SELECT id, plate_number FROM vehicles
            WHERE id = ?
            `
    const res = await this.db.get(sql, [id])

    if (!res) {
      return null
    }

    let vehicle = this.fromDbFromat(res)
    vehicle = await this.loadLastLocation(vehicle)
    return vehicle
  }

  /**
   * Return a vehicle by its plate number
   * @param {string} plateNumber
   * @returns
   */
  public async findByPlateNumber(plateNumber: string): Promise<Vehicle | null> {
    const sql = `
            SELECT id, plate_number FROM vehicles
            WHERE plate_number = ?
            `
    const res = await this.db.get(sql, [plateNumber])

    if (!res) {
      return null
    }
    let foundVehicle = this.fromDbFromat(res)
    foundVehicle = await this.loadLastLocation(foundVehicle)
    return foundVehicle
  }

  async loadLastLocation(vehicle: Vehicle): Promise<Vehicle> {
    const sql = `
            SELECT * FROM locations
            WHERE vehicle_id = ?
            ORDER BY inserted_at DESC
            LIMIT 1
        `

    const res = await this.db.get(sql, [vehicle.id])

    if (!res) {
      return vehicle
    }

    vehicle.location = {
      latitude: res.latitude,
      longitude: res.longitude,
      altitude: res.altitude,
    }

    return vehicle
  }
}

export default VehicleQueriesRepository
