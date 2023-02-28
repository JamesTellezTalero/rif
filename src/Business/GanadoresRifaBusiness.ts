import { getManager } from "typeorm";
import { apiResponse } from "../Models/apiResponse";
import { GanadoresRifa } from "../entities/GanadoresRifa";
import { Rifas } from "../entities/Rifas";
import { ParticipantesRifaBusiness } from "./ParticipantesRifaBusiness";
import { RifasBusiness } from "./RifasBusiness";

const RifasB = new RifasBusiness();
const ParticipantesRifaB = new ParticipantesRifaBusiness();
export class GanadoresRifaBusiness{  
    async DefinirGanadores(rifa:Rifas):Promise<GanadoresRifa[]>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            const min = 0;
            const max = rifa.posiblesGanadores-1;
            for (let i = 0; i < rifa.posiblesGanadores; i++) {
                rifa = await RifasB.GetById(rifa.id)
                let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
                let participanteR = await ParticipantesRifaB.GetById(rifa.participantesRifas[randomNumber].id)
                let rifasExt = rifa.ganadoresRifas.filter(e => e.participanteRifa.id == participanteR.id);
                let item = {participanteRifa: participanteR, rifa}
                if(rifasExt.length > 0){
                    i--;
                }else {
                    await getManager().getRepository(GanadoresRifa).save(item)
                }
                
            }
            return await this.GetByRifa(rifa.id);
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
                .innerJoinAndSelect('Participantes.participanteRifa', 'P')
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