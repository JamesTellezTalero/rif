import { Transacciones } from "../entities/Transacciones";

export class TransaccionesBusiness{
    async Create(item:Transacciones):Promise<Transacciones>{
        return item;
    }
}