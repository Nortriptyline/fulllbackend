import yargs from 'yargs'
import { initializeDatabaseHandler } from '../Handlers/initializeDatabaseHandler'

export const initializeDatabaseCommand: yargs.CommandModule = {
  command: 'initialize-database',
  describe: 'Initialize the database',
  handler: () => {
    initializeDatabaseHandler()
  },
}
