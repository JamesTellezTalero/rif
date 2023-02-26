import { getManager } from "typeorm";
import { Transacciones } from "../entities/Transacciones";
import { Rifas } from "../entities/Rifas";
import { TransactionStates } from "../entities/TransactionStates";

export class TransaccionesBusiness{
    async Create(item:Transacciones):Promise<Transacciones>{
        return getManager().getRepository(Transacciones).save(item);
    }
    
    async Update(item:Transacciones):Promise<Transacciones>{
        return getManager().getRepository(Transacciones).save(item);
    }

    async GetAll():Promise<Transacciones[]>{
        return getManager().getRepository(Transacciones).find({
            order: {
                id: 'DESC'
            }
        });
    }
    
    async GetById(id:number):Promise<Transacciones>{
        return getManager().getRepository(Transacciones).findOne({
            where:{ id },
            relations:['rifa', 'participanterifa', 'transactionState']
        });
    }
    
    async GetByOrden(orden:string):Promise<Transacciones>{
        return getManager().getRepository(Transacciones).findOne({
            where:{ orden },
            relations:['rifa', 'participanterifa', 'transactionState']
        });
    }

    async GetByRifa(rifa:Rifas):Promise<Transacciones[]>{
        return getManager().getRepository(Transacciones).find({
            where:{ rifa },
            relations:['rifa', 'participanterifa', 'transactionState'],
            order: {
                id: 'DESC'
            }
        });
    }

    async GetByState(transactionState:TransactionStates):Promise<Transacciones[]>{
        return getManager().getRepository(Transacciones).find({
            where:{ transactionState },
            relations:['rifa', 'participanterifa', 'transactionState'],
            order: {
                id: 'DESC'
            }
        });
    }
}