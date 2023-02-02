import { getManager } from "typeorm";
import { Usuarios } from "../entities/Usuarios";
import { apiResponse } from "../Models/apiResponse";
import { Niveles } from "../entities/Niveles";

const fs = require('fs');

export class RifasBusiness{  

    async Create(rifa):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {}
        try {
            console.log("im here");
            apiR.data = {status: true}
            return apiR;
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
            let User = await getManager().getRepository(Usuarios).findOne({where:{id: id}, relations:['nivel']})
            if(User){
                apiR.code = 200;
                apiR.message = "Usuario encontrado"
                apiR.data = User
                return apiR;
            }else{
                throw User;
            }
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;          
        }
    }
}