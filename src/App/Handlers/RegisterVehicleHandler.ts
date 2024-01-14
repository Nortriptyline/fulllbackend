import Fleet from '../../Domain/Models/Fleet'
import Vehicle from '../../Domain/Models/Vehicle'
import FleetCommandsRepository from '../Commands/Repositories/FleetCommandsRepository'
import VehicleCommandsRepository from '../Commands/Repositories/VehicleCommandsRepository'
import { RegisterVehicleArgs } from '../Commands/registerVehicle'
import FleetQueriesRepository from '../Queries/Repositories/FleetQueriesRepository'
import VehicleQueriesRepository from '../Queries/Repositories/VehicleQueriesRepository'

export const RegisterVehicleHandler = async (args: RegisterVehicleArgs): Promise<Fleet> => {
  const fleetRepository = new FleetCommandsRepository()
  const vehicleRepository = new VehicleCommandsRepository()

  const fleetQRepository = new FleetQueriesRepository()
  const vehicleQRepository = new VehicleQueriesRepository()

  // This part should implement a transaction to ensure data consistency
  // But in cas of event sourcing, we don't need to do that
  const fleet = await fleetQRepository.findById(args.fleetId)

  if (!fleet) {
    throw new Error(`Fleet not found with id ${args.fleetId}`)
  }

  let vehicle = await vehicleQRepository.findByPlateNumber(args.vehiclePlateNumber)
  if (!vehicle) {
    vehicle = new Vehicle({
      plateNumber: args.vehiclePlateNumber,
    })
    await await vehicleRepository.save(vehicle)
  }

  fleet.addVehicle(vehicle)
  await fleetRepository.updateVehicles(fleet)

  return fleet
}
