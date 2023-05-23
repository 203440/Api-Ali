import { Router, Request, Response } from 'express';
import { AddPetUseCase } from '../application/addPetUseCase';
import { petRepositoryImp } from './petRepository';
import { Pet } from '../domain/petModel';

export const petRouter = Router();

const petRepository = new petRepositoryImp();
const addPetUseCase = new AddPetUseCase(petRepository);

petRouter.post('/', async (req: Request, res: Response) => {
    const { title, author, price } = req.body;

    try {
        const pet = new Pet( title, author, price);
        await addPetUseCase.execute(pet);
        res.status(201).json({ message: 'Pet added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

petRouter.get('/', async (req: Request, res: Response) => {
    try {
        const pet = await petRepository.findAll();
        res.status(200).json(pet);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});