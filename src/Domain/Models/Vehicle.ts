import Location from "../Interfaces/Location";
class Vehicle {
    private _id: number;
    private _location: Location | null;

    constructor(id: number) {
        this._id = id;
        this._location = null;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get location(): Location | null {
        return this._location;
    }

    set location(value: Location | null) {
        if (value === this._location) {
            throw new Error('Vehicle already parked at this location');
        }

        this._location = value;
    }

}

export default Vehicle;
