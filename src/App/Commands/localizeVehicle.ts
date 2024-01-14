import yargs, { Argv } from "yargs";
import { localizeVehicleHandler } from "../Handlers/localizeVehicleHandler";

export interface LocalizeVehicleArgs {
    fleetId: number,
    vehiclePlateNumber: string,
    latitude: number,
    longitude: number,
    altitude: number | null,
}

export const localizeVehicleCommand: yargs.CommandModule = {
    command: "localize-vehicle <fleetId> <vehiclePlateNumber> latitude longitude [altitude]",
    describe: "Set the location of a vehicle by its plate number in a fleet",
    builder: (yargs: Argv) => {
        return yargs.positional("fleetId", {
            describe: "The ID of the fleet the vehicle belongs to",
            type: "number",
        })
        .positional("vehiclePlateNumber", {
            describe: "The plate number of the vehicle to localize",
            type: "string",
        })
        .positional("latitude", {
            describe: "The latitude of the vehicle in degrees",
            type: "number",
        })
        .positional("longitude", {
            describe: "The longitude of the vehicle in degrees",
            type: "number",
        })
        .positional("altitude", {
            describe: "The altitude of the vehicle in meters",
            type: "number",
            default: null,
            demandOption: true,
        })
    },
    handler: (argv) => {
        const args: LocalizeVehicleArgs = {
            fleetId: argv.fleetId as number,
            vehiclePlateNumber: argv.vehiclePlateNumber as string,
            latitude: argv.latitude as number,
            longitude: argv.longitude as number,
            altitude: argv.altitude as number | null,
        }

        localizeVehicleHandler(args)
    }
}