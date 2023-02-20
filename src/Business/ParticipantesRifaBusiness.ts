import { getManager } from "typeorm";
import { apiResponse } from "../Models/apiResponse";
import { ParticipantesRifa } from "../entities/ParticipantesRifa";

export class ParticipantesRifaBusiness{  

    async Create(item:ParticipantesRifa):Promise<ParticipantesRifa>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let participanteRifa = await getManager().getRepository(ParticipantesRifa).save(item)
            if(participanteRifa != null){
                return participanteRifa;
            }else{
                throw apiR = {
                    message: "Participante Rifa No Creado",
                    code: 400,
                    data: participanteRifa 
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

    async Update(participanteRifa:ParticipantesRifa, status: boolean):Promise<ParticipantesRifa>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            participanteRifa.status = status
            participanteRifa = await getManager().getRepository(ParticipantesRifa).save(participanteRifa)
            if(participanteRifa != null){
                return participanteRifa;
            }else{
                throw apiR = {
                    message: "Paricipante Rifa No Actualizado",
                    code: 400,
                    data: participanteRifa 
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

    async GetAll():Promise<ParticipantesRifa[]>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let participantesRifa = await getManager().getRepository(ParticipantesRifa).find({relations:['rifa', 'participante']})
            return participantesRifa;
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

    async GetById(id:number):Promise<ParticipantesRifa>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let estadoRifa = await getManager().getRepository(ParticipantesRifa).findOne({where:{id: id}, relations:['rifa', 'participante']})
            return estadoRifa;
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
    
    async GetByRifa(id:number):Promise<ParticipantesRifa[]>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let estadoRifa = await getManager().getRepository(ParticipantesRifa).createQueryBuilder('Participantes')
                .innerJoinAndSelect('Participantes.rifa', 'R')
                .innerJoinAndSelect('Participantes.participante', 'P')
                .where('R.id = :id', {id})
                .getMany()
            return estadoRifa;
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