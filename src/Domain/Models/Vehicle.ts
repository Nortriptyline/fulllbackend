import Location from '../Interfaces/Location'
class Vehicle {
  private _id: number
  private _plateNumber: string
  private _location: Location | null
  private _isNew: boolean

  constructor(data: any) {
    this._id = data.id
    this._plateNumber = data.plateNumber
    this._location = data.location
    this._isNew = data.is_new ?? true
  }

  get id(): number {
    return this._id
  }

  set id(value: number) {
    this._id = value
  }

  get plateNumber(): string {
    return this._plateNumber
  }

  set plateNumber(value: string) {
    this._plateNumber = value
  }

  get isNew(): boolean {
    return this._isNew
  }

  set isNew(value: boolean) {
    this._isNew = value
  }

  get location(): Location | null {
    return this._location
  }

  set location(value: Location | null) {
    if (!value) {
      throw new Error('Location cannot be null')
    }

    if (
      value.altitude == this._location?.altitude &&
      value.latitude == this._location?.latitude &&
      value.longitude == this._location?.longitude
    ) {
      throw new Error('Vehicle already parked at this location')
    }

    this._location = value
  }
}

export default Vehicle
