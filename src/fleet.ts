#!/usr/bin/env node
// Shebang to allow the script to be run as a standalone executable with Node.js

import yargs from 'yargs'
import { accessSync } from 'fs'
import { hideBin } from 'yargs/helpers'
import { createCommand } from './App/Commands/create'
import { localizeVehicleCommand } from './App/Commands/localizeVehicle'
import { registerVehicleCommand } from './App/Commands/registerVehicle'
import { initializeDatabaseCommand } from './App/Commands/initializeDatabase'
import { initializeDatabaseHandler } from './App/Handlers/initializeDatabaseHandler'

// Define the Commands type so we can map the command line arguments to the commands
interface Commands {
  [key: string]: yargs.CommandModule
}

main()

async function main() {
  // Get the command from the command line arguments
  const commandKey = process.argv[2]

  // Map the command line arguments to the commands
  const commands: Commands = {
    'initialize-database': initializeDatabaseCommand,
    create: createCommand,
    'register-vehicle': registerVehicleCommand,
    'localize-vehicle': localizeVehicleCommand,
  }

  yargs(hideBin(process.argv)) // Pass the command line arguments to yargs, hiding the script name and node executable
    .scriptName('fleet') // Set the script name that will be used in the usage message and examples
    .usage('$0 <cmd> [args]') // Set the usage message the command name will be automatically inserted and the command arguments will be shown in the examples

  // Register each command with yargs
  Object.values(commands).forEach((command) => {
    yargs.command(command)
  })

  // Before going further, check if the command is valid
  if (Object.keys(commands).includes(commandKey) === false) {
    // If the command is not valid, show the help message and exit
    yargs.showHelp()
    process.exit(1)
  }

  // If the command is not initialize-database, check if the database has been initialized
  if (commandKey !== 'initialize-database') {
    // If the database has not been initialized, show an error message and exit by looking for fleet.sqlite in the current directory
    try {
      const perms = accessSync('fleet.sqlite')
      if (perms === undefined) throw new Error('Database not initialized, run fleet initialize-database')
    } catch {
      // Automatically initialize the database if file not found
      await initializeDatabaseHandler()
    }
  }

  yargs.help().argv // Enable the help option // Parse the command line arguments
}
