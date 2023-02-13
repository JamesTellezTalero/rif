import { getManager } from "typeorm";
import { apiResponse } from "../Models/apiResponse";
import { TiposRifa } from "../entities/TiposRifa";

export class TiposRifaBusiness{  

    async Create(item:TiposRifa):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let tipoRifa = await getManager().getRepository(TiposRifa).findOne({where:{name: item.name}})
            if(tipoRifa != null){
                apiR.code = 200;
                apiR.message = "Tipo Existente"
                apiR.data = tipoRifa
                return apiR;
            }
            await getManager().getRepository(TiposRifa).save(item)
            tipoRifa = await getManager().getRepository(TiposRifa).findOne({where:{name: item.name}})
            if(tipoRifa != null){
                apiR.code = 200;
                apiR.message = "Tipo Creado"
                apiR.data = tipoRifa
                return apiR;
            }else{
                throw tipoRifa;
            }
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;          
        }
    }

    async GetAll():Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let tipoRifa = await getManager().getRepository(TiposRifa).find()
            if(tipoRifa != null){
                apiR.code = 200;
                apiR.message = "Tipos encontrados"
                apiR.data = tipoRifa
                return apiR;
            }else{
                throw tipoRifa;
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
            let tipoRifa = await getManager().getRepository(TiposRifa).findOne({where:{id: id}})
            if(tipoRifa != null){
                apiR.code = 200;
                apiR.message = "Tipo encontrado"
                apiR.data = tipoRifa
                return apiR;
            }else{
                throw tipoRifa;
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
            let tipoRifa = await getManager().getRepository(TiposRifa).findOne({where:{name: name}})
            if(tipoRifa != null){
                apiR.code = 200;
                apiR.message = "Tipo encontrado"
                apiR.data = tipoRifa
                return apiR;
            }else{
                throw tipoRifa;
            }
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;          
        }
    }
}