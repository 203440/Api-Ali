import { Pet } from "./petModel";

export interface PetRepository {
    findAll(): Promise<Pet[]>;
    save(book: Pet): Promise<void>;
    
}