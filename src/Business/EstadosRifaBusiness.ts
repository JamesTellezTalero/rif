import { getManager } from "typeorm";
import { apiResponse } from "../Models/apiResponse";
import { EstadosRifa } from "../entities/EstadosRifa";

const fs = require('fs');

export class EstadosRifaBusiness{  

    async Create(item:EstadosRifa):Promise<EstadosRifa>{
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
                return estadoRifa;
            }else{
                throw apiR = {
                    message: "Estado No Creado",
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

    async Update(item:EstadosRifa):Promise<EstadosRifa>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let estadoRifa = await getManager().getRepository(EstadosRifa).findOne({where:{id: item.id}})
            if(estadoRifa == null){
                apiR.code = 400;
                apiR.message = "Estado Inexistente"
                apiR.data = estadoRifa
                throw apiR;
            }
            estadoRifa.name = item.name
            estadoRifa.status = item.status
            console.log(estadoRifa);
            await getManager().getRepository(EstadosRifa).save(estadoRifa)
            estadoRifa = await getManager().getRepository(EstadosRifa).findOne({where:{name: estadoRifa.name}})
            if(estadoRifa != null){
                return estadoRifa;
            }else{
                throw apiR = {
                    message: "Estado No Actualizado",
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

    async GetAll():Promise<EstadosRifa[]>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let estadosRifa = await getManager().getRepository(EstadosRifa).find()
            return estadosRifa;
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

    async GetById(id:number):Promise<EstadosRifa>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let estadoRifa = await getManager().getRepository(EstadosRifa).findOne({where:{id: id}})
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

    async GetByName(name:string):Promise<EstadosRifa>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let estadoRifa = await getManager().getRepository(EstadosRifa).findOne({where:{name: name}})
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