import Vehicle from '../../Domain/Models/Vehicle'
import VehicleCommandsRepository from '../Commands/Repositories/VehicleCommandsRepository'
import { LocalizeVehicleArgs } from '../Commands/localizeVehicle'
import FleetQueriesRepository from '../Queries/Repositories/FleetQueriesRepository'
import VehicleQueriesRepository from '../Queries/Repositories/VehicleQueriesRepository'

export const LocalizeVehicleHandler = async (args: LocalizeVehicleArgs): Promise<Vehicle> => {
  const fleetQueriesRepository = new FleetQueriesRepository()

  const vehicleCommandsRepository = new VehicleCommandsRepository()
  const vehicleQueriesRepository = new VehicleQueriesRepository()

  const fleet = await fleetQueriesRepository.findById(args.fleetId)

  if (!fleet) {
    throw new Error(`Fleet not found with id ${args.fleetId}`)
  }

  let vehicle = fleet.vehicles.find((vehicle: Vehicle) => {
    return vehicle.plateNumber === args.vehiclePlateNumber
  })

  if (!vehicle) {
    throw new Error(`Vehicle not found into the fleet ${fleet.id}`)
  }

  vehicle = await vehicleQueriesRepository.loadLastLocation(vehicle)

  const location = {
    latitude: args.latitude,
    longitude: args.longitude,
    altitude: args.altitude ?? null,
  }

  vehicle.location = location
  vehicleCommandsRepository.addLocation(vehicle)

  return vehicle
}
