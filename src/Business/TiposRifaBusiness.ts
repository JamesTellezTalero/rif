import { getManager } from "typeorm";
import { apiResponse } from "../Models/apiResponse";
import { TiposRifa } from "../entities/TiposRifa";

export class TiposRifaBusiness{  

    async Create(item:TiposRifa):Promise<TiposRifa>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let tipoRifa = await getManager().getRepository(TiposRifa).save(item)
            if(tipoRifa != null){
                return tipoRifa;
            }else{
                throw apiR = {
                    message: "Tipo No Creado",
                    code: 400,
                    data: tipoRifa 
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

    async Update(item:TiposRifa):Promise<TiposRifa>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let tipoRifa = await getManager().getRepository(TiposRifa).findOne({where:{id: item.id}})
            if(tipoRifa == null){
                apiR.code = 400;
                apiR.message = "Tipo Inexistente"
                apiR.data = tipoRifa
                throw apiR;
            }
            tipoRifa.name = item.name
            tipoRifa.recompenza = item.recompenza
            tipoRifa.status = item.status
            await getManager().getRepository(TiposRifa).save(item)
            tipoRifa = await getManager().getRepository(TiposRifa).findOne({where:{name: item.name}})
            if(tipoRifa != null){
                return tipoRifa;
            }else{
                throw apiR = {
                    message: "Tipo No Creado",
                    code: 400,
                    data: tipoRifa 
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

    async GetAll():Promise<TiposRifa[]>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let tipoRifa = await getManager().getRepository(TiposRifa).find()
            if(tipoRifa != null){
                return tipoRifa;
            }else{
                throw apiR = {
                    message: "Tipos No Encontrados",
                    code: 400,
                    data: tipoRifa 
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

    async GetById(id:number):Promise<TiposRifa>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let tipoRifa = await getManager().getRepository(TiposRifa).findOne({where:{id: id}})
            if(tipoRifa != null){
                return tipoRifa;
            }else{
                throw apiR = {
                    message: "Tipos No Encontrados",
                    code: 400,
                    data: tipoRifa 
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

    async GetByName(name:string):Promise<TiposRifa>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let tipoRifa = await getManager().getRepository(TiposRifa).findOne({where:{name: name}})
            if(tipoRifa != null){
                return tipoRifa;
            }else{
                throw apiR = {
                    message: "Tipos No Encontrados",
                    code: 400,
                    data: tipoRifa 
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