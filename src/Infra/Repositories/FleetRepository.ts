import Fleet from "../../Domain/Models/Fleet";

/**
 * This repository is responsible for managing the fleets.
 * 
 * Since it is managing in-memory data, this repository is a singleton.
 * It is not a good practice to use a singleton for a repository, but it is
 * a good practice to use a singleton for in-memory data.
 */
class FleetRepository {
    private static instance: FleetRepository;
    private fleets: Array<Fleet> = [];

    private constructor(){}

    public static getInstance(): FleetRepository {
        if (!FleetRepository.instance) {
            FleetRepository.instance = new FleetRepository();
        }
        return FleetRepository.instance;
    }

    public save(fleet: Fleet): void {
        this.fleets.push(fleet);
    }

    public findById(id: number): Fleet | undefined {
        return this.fleets.find(fleet => fleet.id === id);
    }
}

export default FleetRepository;