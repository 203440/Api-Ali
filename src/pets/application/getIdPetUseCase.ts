import { Pet } from "../domain/petModel";
import { PetRepository } from "../domain/petRepository";

export class GetIdPetUseCase {
    constructor(private readonly petRepository: PetRepository) {}

    async execute(id: string): Promise<Pet | null> {
        return await this.petRepository.findById(id);
    }
}
