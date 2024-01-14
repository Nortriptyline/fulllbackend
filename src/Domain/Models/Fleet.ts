import Vehicle from './Vehicle'

class Fleet {
  private _id: number
  private _userId: number
  private _vehicles: Array<Vehicle> = []

  constructor(data: any) {
    this._id = data.id
    this._userId = data.userId
  }

  get id(): number {
    return this._id
  }

  set id(value: number) {
    this._id = value
  }

  get userId(): number {
    return this._userId
  }

  set userId(value: number) {
    this._userId = value
  }

  get vehicles(): Array<Vehicle> {
    return this._vehicles
  }

  set vehicles(value: Array<Vehicle>) {
    this._vehicles = value
  }

  public addVehicle(vehicle: Vehicle): void {
    if (
      this.vehicles.some((v) => {
        return v.plateNumber === vehicle.plateNumber || v.id === vehicle.id
      })
    ) {
      throw new Error('Vehicle already registered in the fleet')
    }
    this.vehicles.push(vehicle)
  }
}

export default Fleet
