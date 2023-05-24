import { Pet } from "../domain/petModel";
import { PetRepository } from "../domain/petRepository";
import pgPromise from "pg-promise";

const pgp = pgPromise();

const connectionOptions = {
  host: 'localhost',
  port: 5432,
  database: 'apiPets',
  user: 'postgres',
  password: '203440'
};

const db = pgp(connectionOptions);

export class petRepositoryImp implements PetRepository {
    async findById(id: string): Promise<Pet | null> {
        const query = 'SELECT * FROM pets WHERE id = $1';
        try {
            const result = await db.oneOrNone(query, id);
            if (result) {
                return new Pet(result.nombre, result.dueno, result.edad);
            }
            return null;
        } catch (error) {
            // Manejar el error
            console.error('Error al buscar la mascota por ID:', error);
            throw error;
        }
    }

    async save(pet: Pet): Promise<void> {
        await db.none('INSERT INTO pets(nombre, dueno, edad) VALUES($1, $2, $3)', [ pet.nombre, pet.dueno, pet.edad]);
    }

    async findAll(): Promise<Pet[]> {
        return await db.any('SELECT * FROM pets');
    }
}