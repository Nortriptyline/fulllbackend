import type yargs from 'yargs'
import { RegisterVehicleHandler } from '../Handlers/RegisterVehicleHandler'

export interface RegisterVehicleArgs {
  fleetId: number
  vehiclePlateNumber: string
}

export const registerVehicleCommand: yargs.CommandModule = {
  command: 'register-vehicle <fleetId> <vehiclePlateNumber>',
  describe: 'Register a vehicle to a fleet by its plate number',
  builder: (yargs) => {
    return yargs
      .positional('fleetId', {
        describe: 'The ID of the fleet to register the vehicle to',
        type: 'number',
      })
      .positional('vehiclePlateNumber', {
        describe: 'The plate number of the vehicle to register',
        type: 'string',
      })
  },
  handler: async (argv) => {
    const args: RegisterVehicleArgs = {
      fleetId: argv.fleetId as number,
      vehiclePlateNumber: argv.vehiclePlateNumber as string,
    }

    await RegisterVehicleHandler(args)
  },
}
