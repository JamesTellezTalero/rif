import { getManager } from "typeorm";
import { apiResponse } from "../Models/apiResponse";
import { GanadoresRifa } from "../entities/GanadoresRifa";

export class GanadoresRifaBusiness{  

    async Create(item:GanadoresRifa):Promise<GanadoresRifa>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let ganadorRifa = await getManager().getRepository(GanadoresRifa).save(item)
            if(ganadorRifa != null){
                return ganadorRifa;
            }else{
                throw apiR = {
                    message: "Participante Rifa No Creado",
                    code: 400,
                    data: ganadorRifa 
                }
            }
        } catch (error) {
            if(error?.code === 400){
                throw apiR;          
            } else{
                apiR.code = 500;
                apiR.message = error
                throw apiR;          
            }   
        }
    }

    async Update(ganadorRifa:GanadoresRifa, status: boolean):Promise<GanadoresRifa>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            ganadorRifa.status = status
            ganadorRifa = await getManager().getRepository(GanadoresRifa).save(ganadorRifa)
            if(ganadorRifa != null){
                return ganadorRifa;
            }else{
                throw apiR = {
                    message: "Paricipante Rifa No Actualizado",
                    code: 400,
                    data: ganadorRifa 
                }
            }
        } catch (error) {
            if(error?.code === 400){
                throw apiR;          
            } else{
                apiR.code = 500;
                apiR.message = error
                throw apiR;          
            }   
        }
    }

    async GetAll():Promise<GanadoresRifa[]>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let ganadoresRifa = await getManager().getRepository(GanadoresRifa).find({relations:['rifa', 'participante']})
            return ganadoresRifa;
        } catch (error) {
            if(error?.code === 400){
                throw apiR;          
            } else{
                apiR.code = 500;
                apiR.message = error
                throw apiR;          
            }          
        }
    }

    async GetById(id:number):Promise<GanadoresRifa>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let ganadorRifa = await getManager().getRepository(GanadoresRifa).findOne({where:{id: id}, relations:['rifa', 'participante']})
            return ganadorRifa;
        } catch (error) {
            if(error?.code === 400){
                throw apiR;          
            } else{
                apiR.code = 500;
                apiR.message = error
                throw apiR;          
            }         
        }
    }
    
    async GetByRifa(id:number):Promise<GanadoresRifa[]>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let ganadoresRifa = await getManager().getRepository(GanadoresRifa).createQueryBuilder('Participantes')
                .innerJoinAndSelect('Participantes.rifa', 'R')
                .innerJoinAndSelect('Participantes.participante', 'P')
                .where('R.id = :id', {id})
                .getMany()
            return ganadoresRifa;
        } catch (error) {
            if(error?.code === 400){
                throw apiR;          
            } else{
                apiR.code = 500;
                apiR.message = error
                throw apiR;          
            }         
        }
    }
}