import { getManager } from "typeorm";
import { UserKeys } from "../entities/UserKeys";
import { apiResponse } from "../Models/apiResponse";
import { UsuariosBusiness } from "./UsuariosBusiness";

const UsuariosB = new UsuariosBusiness();

export class UserKeysBusiness{  

    async Create(key:UserKeys):Promise<UserKeys>{
        let apiR = new apiResponse();
        apiR.data = {}
        try {
            let Key = await getManager().getRepository(UserKeys).save(key)
            return await this.GetById(Key.id);
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;
        }
    }
    
    async Update(key:UserKeys):Promise<UserKeys>{
        let apiR = new apiResponse();
        apiR.data = {}
        try {
            let Key = await getManager().getRepository(UserKeys).save(key)
            return await this.GetById(Key.id);
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;
        }
    }
    
    async GetAll():Promise<UserKeys[]>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let key = await getManager().getRepository(UserKeys).find({relations:['key']})
            return key;
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
    
    async GetById(id:number):Promise<UserKeys>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let key = await getManager().getRepository(UserKeys).findOne({where:{id: id}, relations:['key']})
            return key;
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
    
    async GetByUsuarioId(id:number):Promise<UserKeys[]>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let usuario = await UsuariosB.GetById(id);
            let key = await getManager().getRepository(UserKeys).find({where:{usuario}, relations:['key']})
            return key;
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