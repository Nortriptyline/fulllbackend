import type Vehicle from '../../../Domain/Models/Vehicle'

export interface VehicleCommandsInterface {
  save: (vehicle: Vehicle) => Promise<Vehicle>
  update: (vehicle: Vehicle) => Promise<Vehicle>
}
