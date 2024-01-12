import yargs from "yargs"
import { CreateArgs } from "../Commands/create"

export const createHandler = (args: CreateArgs) => {
    // Create a fleet for the user with the given ID
    console.log(args.userId)
}