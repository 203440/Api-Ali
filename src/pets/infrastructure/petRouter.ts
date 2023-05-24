import { Router, Request, Response } from 'express';
import { AddPetUseCase } from '../application/addPetUseCase';
import { petRepositoryImp } from './petRepositoryinf';
import { Pet } from '../domain/petModel';
import { GetIdPetUseCase } from '../application/getIdPetUseCase';
import { PetController } from './petController';
import { GetPetUseCase } from '../application/getPetUseCase';

export const petRouter = Router();

const petRepository = new petRepositoryImp();
const addPetUseCase = new AddPetUseCase(petRepository);
const getPetUseCase = new GetPetUseCase(petRepository); // Pasar el repositorio al caso de uso
const getIdPetUseCase = new GetIdPetUseCase(petRepository); // Pasar el repositorio al caso de uso
const petController = new PetController(addPetUseCase, getPetUseCase, getIdPetUseCase);

petRouter.post('/', async (req: Request, res: Response) => {
    const { nombre, dueno, edad } = req.body;

    try {
        const pet = new Pet( nombre, dueno, edad);
        await addPetUseCase.execute(pet);
        res.status(201).json({ message: 'Pet added' });
    } catch (error) {
        res.status(500).json({ message: 'Error' });
    }
});

petRouter.get("/:id", async (req: Request, res: Response) => {
    await petController.getPetById(req, res);
  });

petRouter.get('/', async (req: Request, res: Response) => {
    try {
        const pet = await petRepository.findAll();
        res.status(200).json(pet);
    } catch (error) {
        res.status(500).json({ message: 'Error' });
    }
});