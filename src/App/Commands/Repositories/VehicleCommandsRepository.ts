import Vehicle from '../../../Domain/Models/Vehicle'
import { SqliteRepository } from '../../../Infra/Sqlite/SqliteRepository'
import { VehicleCommandsInterface } from '../Interfaces/VehicleCommandsInterface'
import VehicleQueriesRepository from '../../Queries/Repositories/VehicleQueriesRepository'

class VehicleCommandsRepository extends SqliteRepository implements VehicleCommandsInterface {
  public async save(vehicle: Vehicle): Promise<Vehicle> {
    const sql = `
            INSERT INTO vehicles (plate_number)
            VALUES (?)
        `

    try {
      const res = await this.db.run(sql, [vehicle.plateNumber])

      if (!res.lastID) {
        throw new Error('Error while saving the vehicle')
      }

      vehicle.id = res.lastID
      vehicle.isNew = false
      return vehicle
    } catch (e: any) {
      if (e.code === 'SQLITE_CONSTRAINT') {
        const vehicleRepository = new VehicleQueriesRepository()
        const existingVehicle = await vehicleRepository.findByPlateNumber(vehicle.plateNumber)
        return existingVehicle as Vehicle
      } else {
        throw new Error('Error while saving the vehicle')
      }
    }
  }

  public async update(vehicle: Vehicle): Promise<Vehicle> {
    const sql = `
            UPDATE vehicles
            SET plate_number = ?
            WHERE id = ?
        `

    const res = await this.db.run(sql, [vehicle.plateNumber, vehicle.id])

    if (!res.changes) {
      throw new Error('Error while updating the vehicle')
    }

    return vehicle
  }

  public async addLocation(vehicle: Vehicle): Promise<Vehicle> {
    if (!vehicle.location) {
      throw new Error('No location provided')
    }

    const sql = `INSERT INTO locations (vehicle_id, latitude, longitude, altitude) VALUES (?, ?, ?, ?)`
    await this.db.run(sql, [
      vehicle.id,
      vehicle.location?.latitude,
      vehicle.location?.longitude,
      vehicle.location?.altitude,
    ])

    return vehicle
  }
}

export default VehicleCommandsRepository
