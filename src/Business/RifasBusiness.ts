import { getManager } from "typeorm";
import { Usuarios } from "../entities/Usuarios";
import { apiResponse } from "../Models/apiResponse";
import { Niveles } from "../entities/Niveles";
import { Rifas } from "../entities/Rifas";
import { EstadosRifa } from "../entities/EstadosRifa";
import { EstadosRifaBusiness } from "./EstadosRifaBusiness";

const EstadosRifaB = new EstadosRifaBusiness();

const fs = require('fs');

export class RifasBusiness{  

    async Create(rifa:Rifas):Promise<apiResponse>{
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
                apiR.code = 200;
                apiR.message = "Rifa Creada"
                apiR.data = rifa
                return apiR;
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

    async UpdateById(rifa:Rifas):Promise<apiResponse>{
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
                apiR.code = 200;
                apiR.message = "Rifa Actualizada"
                apiR.data = oldRifa
                return apiR;
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

    async GetAll():Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let rifas = await getManager().getRepository(Rifas).find({relations:["estadoRifa", "tipoRifa", "usuario"]})
            if(rifas){
                apiR.code = 200;
                apiR.message = "Rifas encontradas"
                apiR.data = rifas
                return apiR;
            }else{
                throw apiR = {
                    message: "Rifa No Actualizada",
                    code: 400,
                    data: rifas 
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

    async GetById(id:number):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let Rifa = await getManager().getRepository(Rifas).findOne({where:{id: id}, relations:["estadoRifa", "tipoRifa", "usuario"]})
            if(Rifa){
                apiR.code = 200;
                apiR.message = "Rifa encontrada"
                apiR.data = Rifa
                return apiR;
            }else{
                throw apiR = {
                    message: "Rifa No Actualizada",
                    code: 400,
                    data: Rifa 
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
}