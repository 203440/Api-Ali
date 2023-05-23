import { Pet } from "../domain/petModel";
import { PetRepository } from "../domain/petRepository";

export class AddPetUseCase {
    constructor(private readonly petRepository: PetRepository) {}

    async execute(pet: Pet): Promise<void> {
        await this.petRepository.save(pet);
    }
}