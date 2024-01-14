import yargs, { Argv } from 'yargs'
import { CreateHandler } from '../Handlers/CreateHandler'

export interface CreateArgs {
  userId: number
}

export const createCommand: yargs.CommandModule = {
  command: 'create <userId>',
  describe: 'Create a fleet for the user with the given ID',
  builder: (yargs: Argv) => {
    return yargs.positional('userId', {
      describe: 'The user ID of the user to create',
      type: 'number',
    })
  },
  handler: (argv) => {
    const args: CreateArgs = {
      userId: argv.userId as number,
    }

    CreateHandler(args)
  },
}
