import Vehicle from '../../Domain/Models/Vehicle'

export interface VehicleQueriesInterface {
  findById(id: number): Promise<Vehicle | null>
  findByPlateNumber(plateNumber: string): Promise<Vehicle | null>
  loadLastLocation(vehicle: Vehicle): Promise<Vehicle>
}
