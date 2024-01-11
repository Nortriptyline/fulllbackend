import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";
import Fleet from "../../src/Domain/Models/Fleet";
import Vehicle from "../../src/Domain/Models/Vehicle";
import FleetRepository from "../../src/Infra/Repositories/FleetRepository";
import Location from "../../src/Domain/Interfaces/Location";

let myFleet: Fleet;
let vehicle: Vehicle;
let fleetRepository: FleetRepository = FleetRepository.getInstance();
let location: Location;

Given('my fleet', function () {
    myFleet = new Fleet(1);
    // Save the fleet in the repository so that it can be retrieved later
    fleetRepository.save(myFleet);
});

Given('a vehicle', function () {
    vehicle = new Vehicle(1);
});

Given('I have registered this vehicle into my fleet', function () {
    myFleet.addVehicle(vehicle);
});

Given('the fleet of another user', function () {
    // Create and save the second fleet (id = 2) for the other user
    let anotherFleet = new Fleet(2);
    fleetRepository.save(anotherFleet);
});

Given('this vehicle has been registered into the other user\'s fleet', function () {
    // Retrieve the fleet of the other user (id = 2)
    let anotherFleet = fleetRepository.findById(2);
    anotherFleet?.addVehicle(vehicle);
});

Given('a location', function () {
    location = {latitude: 0, longitude: 0};
});

Given('my vehicle has been parked into this location', function () {
    vehicle.location = location;
})

When('I register this vehicle into my fleet', function () {
    myFleet.addVehicle(vehicle);
});

When('I try to register this vehicle into my fleet', function () {
    try {
        myFleet.addVehicle(vehicle);
    } catch {
        // Do nothing so the test can continue and check the error message later
    }
});

When('I park my vehicle at this location', function () {
    vehicle.location = location;
})

When('I try to park my vehicle at this location', function () {
    try {
        vehicle.location = location;
    } catch {
        // Do nothing so the test can continue and check the error message later
    }
})

Then('this vehicle should be part of my vehicle fleet', function () {
    assert(myFleet.getVehicles().includes(vehicle));
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
    assert.throws(() => myFleet.addVehicle(vehicle), {message: 'Vehicle already registered in the fleet'});
});

Then('the known location of my vehicle should verify this location', function() {
    assert(vehicle.location === location)
})

Then('I should be informed that my vehicle is already parked at this location', function() {
    assert.throws(() => vehicle.location = location, {message: 'Vehicle already parked at this location'});
})