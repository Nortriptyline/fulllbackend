#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { createCommand } from "./App/Commands/create";

interface Commands {
    [key: string]: yargs.CommandModule
}

const commandKey = process.argv[2];

const commands: Commands = {
    create: createCommand
}

yargs(hideBin(process.argv))
    .scriptName("fleet")
    .usage("$0 <cmd> [args]")
    .command(commands[commandKey])
    .help()
    .argv;
