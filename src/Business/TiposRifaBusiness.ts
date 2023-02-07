import { getManager } from "typeorm";
import { apiResponse } from "../Models/apiResponse";
import { TiposRifa } from "../entities/TiposRifa";

export class TiposRifaBusiness{  

    async GetAll():Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let tipoRifa = await getManager().getRepository(TiposRifa).find()
            if(tipoRifa != null){
                apiR.code = 200;
                apiR.message = "Tipos Rifa encontrado"
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
                apiR.message = "Tipo Rifa encontrado"
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
                apiR.message = "Tipo Rifa encontrado"
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