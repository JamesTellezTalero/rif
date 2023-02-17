import { getManager } from "typeorm";
import { apiResponse } from "../Models/apiResponse";
import { TipoDocumento } from "../entities/TipoDocumento";

export class TipoDocumentoBusiness{  

    async Create(item:TipoDocumento):Promise<TipoDocumento>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let tipoDocumento = await getManager().getRepository(TipoDocumento).save(item)
            if(tipoDocumento != null){
                return tipoDocumento;
            }else{
                throw apiR = {
                    message: "Tipo No Creado",
                    code: 400,
                    data: tipoDocumento 
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

    async Update(item:TipoDocumento):Promise<TipoDocumento>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let tipoDocumento = await getManager().getRepository(TipoDocumento).findOne({where:{id: item.id}})
            if(tipoDocumento == null){
                throw apiR = {
                    message: "Tipo Inexistente",
                    code: 400,
                    data: tipoDocumento 
                }
            }
            tipoDocumento.name = item.name;
            tipoDocumento.code = item.code;
            tipoDocumento.status = item.status;
            await getManager().getRepository(TipoDocumento).save(tipoDocumento)
            let newTipoDocumento = await getManager().getRepository(TipoDocumento).findOne({where:{id: item.id}})
            if(newTipoDocumento != null){
                return newTipoDocumento;
            }else{
                throw apiR = {
                    message: "Tipo no Creado",
                    code: 400,
                    data: newTipoDocumento 
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

    async GetAll():Promise<TipoDocumento[]>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let tipoDocumento = await getManager().getRepository(TipoDocumento).find()
            if(tipoDocumento != null){
                return tipoDocumento;
            }else{
                throw apiR = {
                    message: "Tipos No Encontrados",
                    code: 400,
                    data: tipoDocumento 
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

    async GetById(id:number):Promise<TipoDocumento>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let tipoDocumento = await getManager().getRepository(TipoDocumento).findOne({where:{id: id}})
            if(tipoDocumento != null){
                return tipoDocumento;
            }else{
                throw apiR = {
                    message: "Tipo No Encontrado",
                    code: 400,
                    data: tipoDocumento 
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

    async GetByCode(code:string):Promise<TipoDocumento>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let tipoDocumento = await getManager().getRepository(TipoDocumento).findOne({where:{code: code}})
            if(tipoDocumento != null){
                return tipoDocumento;
            }else{
                throw apiR = {
                    message: "Tipo No Encontrado",
                    code: 400,
                    data: tipoDocumento 
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