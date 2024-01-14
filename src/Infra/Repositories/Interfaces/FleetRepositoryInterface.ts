import Fleet from '../../../Domain/Models/Fleet'

export interface FleetRepositoryInterface {
  save(flett: Fleet): void
  findById(id: number): Promise<Fleet | null>
}
