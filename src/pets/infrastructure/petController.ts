import { AddPetUseCase } from "../application/addPetUseCase";
import { GetPetUseCase } from "../application/getPetUseCase";
import { Request, Response } from "express";

export class PetController {
    constructor(
        private readonly addPetUseCase: AddPetUseCase ,
        private readonly getPetUseCase: GetPetUseCase
    ) {}

    async addPet(request: Request, response: Response) {
        const pet = request.body;
        await this.addPetUseCase.execute(pet);
        response.status(201).send();
    }

    async getPet(request: Request, response: Response) {
        const pets = await this.getPetUseCase.execute();
        response.status(200).json(pets);
    }
    
}