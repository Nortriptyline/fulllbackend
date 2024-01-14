import { CreateArgs } from '../Commands/create'
import Fleet from '../../Domain/Models/Fleet'
import FleetCommandsRepository from '../../Infra/Repositories/FleetCommandsRepository'

export const CreateHandler = async (args: CreateArgs): Promise<Fleet> => {
  const fleetRepository = new FleetCommandsRepository()

  // Create a fleet for the user with the given ID
  let fleet = new Fleet({
    userId: args.userId,
  })

  fleet = await fleetRepository.save(fleet)

  // Print the ID of the created fleet
  console.log(fleet.id)

  return fleet
}
