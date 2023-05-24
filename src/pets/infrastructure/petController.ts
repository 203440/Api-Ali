import { AddPetUseCase } from "../application/addPetUseCase";
import { GetIdPetUseCase } from "../application/getIdPetUseCase";
import { GetPetUseCase } from "../application/getPetUseCase";
import { Request, Response } from "express";

export class PetController {
    findById: any;
    constructor(
        private readonly addPetUseCase: AddPetUseCase ,
        private readonly getPetUseCase: GetPetUseCase,
        private readonly getIdPetUseCase: GetIdPetUseCase
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
    
    async getPetById(request: Request, response: Response) {
        const petId = request.params.id;
        const pet = await this.getIdPetUseCase.execute(petId);
        //if (pet) {
            response.status(200).json(pet);
        //} else {
            //response.status(404).json({ error: "Mascota no encontrada" });
       // }
    }
    
}