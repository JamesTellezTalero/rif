import { getManager } from "typeorm";
import { apiResponse } from "../Models/apiResponse";
import { TipoDocumento } from "../entities/TipoDocumento";

export class TipoDocumentoBusiness{  

    async Create(item:TipoDocumento):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let tipoDocumento = await getManager().getRepository(TipoDocumento).findOne({where:{name: item.code}})
            if(tipoDocumento != null){
                apiR.code = 200;
                apiR.message = "Tipo Existente"
                apiR.data = tipoDocumento
                return apiR;
            }
            await getManager().getRepository(TipoDocumento).save(item)
            tipoDocumento = await getManager().getRepository(TipoDocumento).findOne({where:{code: item.code}})
            if(tipoDocumento != null){
                apiR.code = 200;
                apiR.message = "Tipo Creado"
                apiR.data = tipoDocumento
                return apiR;
            }else{
                throw tipoDocumento;
            }
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;          
        }
    }

    async Update(item:TipoDocumento):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let tipoDocumento = await getManager().getRepository(TipoDocumento).findOne({where:{id: item.id}})
            if(tipoDocumento == null){
                apiR.code = 400;
                apiR.message = "Tipo Inexistente"
                apiR.data = tipoDocumento
                return apiR;
            }
            tipoDocumento.name = item.name;
            tipoDocumento.code = item.code;
            tipoDocumento.status = item.status;
            await getManager().getRepository(TipoDocumento).save(tipoDocumento)
            let newTipoDocumento = await getManager().getRepository(TipoDocumento).findOne({where:{id: item.id}})
            if(newTipoDocumento != null){
                apiR.code = 200;
                apiR.message = "Tipo Creado"
                apiR.data = newTipoDocumento
                return apiR;
            }else{
                throw newTipoDocumento;
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
            let tipoDocumento = await getManager().getRepository(TipoDocumento).find()
            if(tipoDocumento != null){
                apiR.code = 200;
                apiR.message = "Tipos encontrados"
                apiR.data = tipoDocumento
                return apiR;
            }else{
                throw tipoDocumento;
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
            let tipoDocumento = await getManager().getRepository(TipoDocumento).findOne({where:{id: id}})
            if(tipoDocumento != null){
                apiR.code = 200;
                apiR.message = "Tipo encontrado"
                apiR.data = tipoDocumento
                return apiR;
            }else{
                throw tipoDocumento;
            }
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;          
        }
    }

    async GetByCode(code:string):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let tipoDocumento = await getManager().getRepository(TipoDocumento).findOne({where:{code: code}})
            if(tipoDocumento != null){
                apiR.code = 200;
                apiR.message = "Tipo encontrado"
                apiR.data = tipoDocumento
                return apiR;
            }else{
                throw tipoDocumento;
            }
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;          
        }
    }
}