import Vehicle from "./Vehicle";

class Fleet {
    private vehicles: Array<Vehicle> = [];

    constructor(public id: number){}

    public addVehicle(vehicle: Vehicle): void {
        if (this.vehicles.includes(vehicle)) {
            throw new Error('Vehicle already registered in the fleet');
        }
        this.vehicles.push(vehicle);
    }

    public getVehicles(): Array<Vehicle> {
        return this.vehicles;
    }
}

export default Fleet