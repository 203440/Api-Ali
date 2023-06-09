import { Pet } from "../domain/petModel";
import { PetRepository } from "../domain/petRepository";

export class GetPetUseCase {
    constructor(private readonly petRepository: PetRepository) {}

    async execute(): Promise<Pet[]> {
        return await this.petRepository.findAll();
    }
}