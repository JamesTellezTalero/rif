import { getManager } from "typeorm";
import { apiResponse } from "../Models/apiResponse";
import { EstadosRifa } from "../entities/EstadosRifa";

const fs = require('fs');

export class EstadosRifaBusiness{  

    async Create(item:EstadosRifa):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let estadoRifa = await getManager().getRepository(EstadosRifa).findOne({where:{name: item.name}})
            if(estadoRifa != null){
                apiR.code = 400;
                apiR.message = "Estado Existente"
                apiR.data = estadoRifa
                throw apiR;
            }
            await getManager().getRepository(EstadosRifa).save(item)
            estadoRifa = await getManager().getRepository(EstadosRifa).findOne({where:{name: item.name}})
            if(estadoRifa != null){
                apiR.code = 200;
                apiR.message = "Estado Creado"
                apiR.data = estadoRifa
                return apiR;
            }else{
                throw apiR = {
                    message: "Estados No Creado",
                    code: 400,
                    data: estadoRifa 
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
            let estadosRifa = await getManager().getRepository(EstadosRifa).find()
            if(estadosRifa != null){
                apiR.code = 200;
                apiR.message = "Estados encontrados"
                apiR.data = estadosRifa
                return apiR;
            }else{
                throw apiR = {
                    message: "Estados No Encontrado",
                    code: 400,
                    data: estadosRifa 
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
            let estadoRifa = await getManager().getRepository(EstadosRifa).findOne({where:{id: id}})
            if(estadoRifa != null){
                apiR.code = 200;
                apiR.message = "Estado encontrado"
                apiR.data = estadoRifa
                return apiR;
            }else{
                throw apiR = {
                    message: "Estado No Encontrado",
                    code: 400,
                    data: estadoRifa 
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

    async GetByName(name:string):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let estadoRifa = await getManager().getRepository(EstadosRifa).findOne({where:{name: name}})
            if(estadoRifa != null){
                apiR.code = 200;
                apiR.message = "Estado encontrado"
                apiR.data = estadoRifa
                return apiR;
            }else{
                throw apiR = {
                    message: "Estado No Encontrado",
                    code: 400,
                    data: estadoRifa 
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