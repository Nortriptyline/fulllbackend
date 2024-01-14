import assert from "assert";
import { Before, Given, When, Then } from "@cucumber/cucumber";
import Fleet from "../../src/Domain/Models/Fleet";
import Vehicle from "../../src/Domain/Models/Vehicle";
import Location from "../../src/Domain/Interfaces/Location";
import { RegisterVehicleHandler } from "../../src/App/Handlers/RegisterVehicleHandler";
import { CreateHandler } from "../../src/App/Handlers/CreateHandler";
import { LocalizeVehicleHandler } from "../../src/App/Handlers/LocalizeVehicleHandler";
import { initializeDatabaseHandler } from "../../src/App/Handlers/initializeDatabaseHandler";
import VehicleCommandsRepository from "../../src/App/Commands/Repositories/VehicleCommandsRepository";

const vehicleCommandsRepository = new VehicleCommandsRepository();
let anotherFleet: Fleet;
let location: Location;
let myFleet: Fleet;
let vehicle: Vehicle;

// Reset the database before each scenario
Before(async function () {
    await initializeDatabaseHandler();
})

Given('my fleet', async function (): Promise<void> {
    myFleet = await CreateHandler({ userId: 1 })
    // Assert we have a fleet with userid = 1 and an id which is a number
    assert(myFleet.userId === 1);
    assert(typeof myFleet.id === 'number');
});

Given('a vehicle', async function (): Promise<void> {
    vehicle = new Vehicle({
        plateNumber: "GD-505-GN"
    });
    vehicle = await vehicleCommandsRepository.save(vehicle);

    assert(vehicle.plateNumber === "GD-505-GN");
    assert(typeof vehicle.id === 'number' && vehicle.id > 0);
});

Given('I have registered this vehicle into my fleet', async function (): Promise<void> {
    myFleet = await RegisterVehicleHandler({
        fleetId: myFleet.id,
        vehiclePlateNumber: vehicle.plateNumber
    });
});

Given('the fleet of another user', async function () {
    // Create and save the second fleet (id = 2) for the other user
    anotherFleet = await CreateHandler({ userId: 2 })
});

Given('this vehicle has been registered into the other user\'s fleet', async function () {
    anotherFleet = await RegisterVehicleHandler({
        fleetId: anotherFleet.id,
        vehiclePlateNumber: vehicle.plateNumber
    })
});

Given('a location', function () {
    location = {
        latitude: 0,
        longitude: 0,
        altitude: 0
    };
});

Given('my vehicle has been parked into this location', async function () {
    vehicle = await LocalizeVehicleHandler({
        fleetId: myFleet.id,
        vehiclePlateNumber: vehicle.plateNumber,
        latitude: location.latitude,
        longitude: location.longitude,
        altitude: location.altitude
    })
})

When('I register this vehicle into my fleet', async function () {
    myFleet = await RegisterVehicleHandler({
        fleetId: myFleet.id,
        vehiclePlateNumber: vehicle.plateNumber
    })
});

When('I try to register this vehicle into my fleet', async function () {
    try {
        await RegisterVehicleHandler({
            fleetId: myFleet.id,
            vehiclePlateNumber: vehicle.plateNumber
        })
    } catch {
        // Do nothing so the test can continue and check the error message later
    }
});

When('I park my vehicle at this location', async function () {
    vehicle = await LocalizeVehicleHandler({
        fleetId: myFleet.id,
        vehiclePlateNumber: vehicle.plateNumber,
        latitude: location.latitude,
        longitude: location.longitude,
        altitude: location.altitude
    })
})

When('I try to park my vehicle at this location', async function () {
    try {
        vehicle = await LocalizeVehicleHandler({
            fleetId: myFleet.id,
            vehiclePlateNumber: vehicle.plateNumber,
            latitude: location.latitude,
            longitude: location.longitude,
            altitude: location.altitude
        })
    } catch {
        // Do nothing so the test can continue and check the error message later
    }
})

Then('this vehicle should be part of my vehicle fleet', function () {
    // Assert myFleet contains vehicle
    assert(myFleet.vehicles.some(vehicle => vehicle.id === vehicle.id && vehicle.plateNumber === vehicle.plateNumber));
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
    assert.throws(() => myFleet.addVehicle(vehicle), { message: 'Vehicle already registered in the fleet' });
});

Then('the known location of my vehicle should verify this location', function () {
    assert(
        vehicle.location &&
        vehicle.location.latitude === location.latitude &&
        vehicle.location.longitude === location.longitude &&
        vehicle.location.altitude === location.altitude
    )
})

Then('I should be informed that my vehicle is already parked at this location', function () {
    assert.throws(() => vehicle.location = location, { message: 'Vehicle already parked at this location' });
})