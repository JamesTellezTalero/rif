import { getManager } from "typeorm";
import { apiResponse } from "../Models/apiResponse";
import { EstadosRifa } from "../entities/EstadosRifa";

const fs = require('fs');

export class EstadosRifaBusiness{  

    async GetAll():Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let estadosRifa = await getManager().getRepository(EstadosRifa).find()
            if(estadosRifa != null){
                apiR.code = 200;
                apiR.message = "Estados Rifa encontrado"
                apiR.data = estadosRifa
                return apiR;
            }else{
                throw estadosRifa;
            }
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;          
        }
    }

    async GetById(id:number):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let estadoRifa = await getManager().getRepository(EstadosRifa).findOne({where:{id: id}})
            if(estadoRifa != null){
                apiR.code = 200;
                apiR.message = "Estado Rifa encontrado"
                apiR.data = estadoRifa
                return apiR;
            }else{
                throw estadoRifa;
            }
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;          
        }
    }

    async GetByName(name:string):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let estadoRifa = await getManager().getRepository(EstadosRifa).findOne({where:{name: name}})
            if(estadoRifa != null){
                apiR.code = 200;
                apiR.message = "Estado Rifa encontrado"
                apiR.data = estadoRifa
                return apiR;
            }else{
                throw estadoRifa;
            }
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;          
        }
    }
}