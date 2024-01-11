import { Argv } from "yargs";

export const builder = (yargs: Argv) => {
    return yargs.positional("userId", {
        describe: "The user ID of the user to create",
        type: "number",
    })
}

export const handler = (argv: any): void => {
    
}