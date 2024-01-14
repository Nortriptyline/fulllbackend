import type Fleet from '../../Domain/Models/Fleet'

export interface FleetCommandsInterface {
  save: (fleet: Fleet) => Promise<Fleet>
  update: (fleet: Fleet) => Promise<Fleet>
  updateVehicles: (fleet: Fleet) => Promise<void>
}
