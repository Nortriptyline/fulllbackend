import Vehicle from '../../../Domain/Models/Vehicle'

export interface VehicleRepositoryInterface {
  findById(id: number): Promise<Vehicle | null>
  findByPlateNumber(plateNumber: string): Promise<Vehicle | null>
  save(vehicle: Vehicle): Promise<Vehicle>
}
