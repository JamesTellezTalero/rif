import { getManager } from "typeorm";
import { apiResponse } from "../Models/apiResponse";
import { Rifas } from "../entities/Rifas";
import { EstadosRifa } from "../entities/EstadosRifa";
const fs = require('fs');

export class RifasBusiness{  

    async Create(rifa:Rifas):Promise<Rifas>{
        let apiR = new apiResponse();
        apiR.data = {}
        try {
            let date = new Date();
            let imagePathStructure = (rifa.name.replace(/ /g, "-")) + "-" + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
            let buffer = Buffer.from(rifa.image, "base64");
            let bufferPath:string = `/assets/RifasImages/${imagePathStructure}.png`;
            fs.writeFile(`.${bufferPath}`, buffer, (error) => {
                if (error) {
                    throw error;
                }
            });
            rifa.image = bufferPath;
            rifa.estadoRifa = await getManager().getRepository(EstadosRifa).findOne({where:{name: "Creada"}});
            rifa = await getManager().getRepository(Rifas).save(rifa)
            if(rifa != null){
                return rifa;
            }else{
                throw apiR = {
                    message: "Rifa No Creada",
                    code: 400,
                    data: rifa 
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

    async UpdateById(rifa:Rifas):Promise<Rifas>{
        let apiR = new apiResponse();
        apiR.data = {}
        try {
            let date = new Date();
            let oldRifa = await getManager().getRepository(Rifas).findOne({where:{id: rifa.id}})
            if(oldRifa == null){
                throw apiR = {
                    message: "Rifa no encontrada",
                    code: 400,
                    data: oldRifa 
                }
            }
            let imagePathStructure = (rifa.name.replace(/ /g, "-")) + "-" + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
            let buffer = Buffer.from(rifa.image, "base64");
            let bufferPath:string = `/assets/RifasImages/${imagePathStructure}.png`;
            fs.unlink(`.${oldRifa.image}`, (error) => {
                if (error) {
                    throw error;
                }
                fs.writeFile(`.${bufferPath}`, buffer, (error) => {
                    if (error) {
                        throw error;
                    }
                });
            });
            
            oldRifa.image = bufferPath;
            oldRifa.name = rifa.name;
            oldRifa.description = rifa.description;
            oldRifa.posiblesGanadores = rifa.posiblesGanadores;
            oldRifa.costoOportunidad = rifa.costoOportunidad;
            oldRifa.participantesTotales = rifa.participantesTotales;
            oldRifa.startsAt = rifa.startsAt;
            oldRifa.endsAt = rifa.endsAt;
            oldRifa.status = rifa.status;
            oldRifa = await getManager().getRepository(Rifas).save(oldRifa)
            if(oldRifa != null){
                return oldRifa;
            }else{
                throw apiR = {
                    message: "Rifa No Actualizada",
                    code: 400,
                    data: oldRifa 
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

    async GetAll():Promise<Rifas[]>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let rifas = await getManager().getRepository(Rifas).find({relations:["estadoRifa", "tipoRifa", "usuario"]})
            return rifas;
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

    async GetById(id:number):Promise<Rifas>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let Rifa = await getManager().getRepository(Rifas).findOne({where:{id: id}, relations:["estadoRifa", "tipoRifa", "usuario", "participantesRifas", "participantesRifas.participante"]})
            if(Rifa != null){
                Rifa.participantesRifas = Rifa.participantesRifas.filter(e => e.status == true)
            }
            return Rifa;
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