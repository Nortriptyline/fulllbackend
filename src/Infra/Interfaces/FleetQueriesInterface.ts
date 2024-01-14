import type Fleet from '../../Domain/Models/Fleet'

export interface FleetQueriesInterface {
  findById: (id: number) => Promise<Fleet | null>
}
