import { getManager } from "typeorm";
import { Usuarios } from "../entities/Usuarios";
import { apiResponse } from "../Models/apiResponse";
const fs = require('fs');

export class UsuariosBusiness{  

    async Create(user:Usuarios):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {}
        try {
            let buffer = Buffer.from(user.avatar, "base64");
            let bufferPath:string = `/assets/${user.userName}.png`;
            fs.writeFile(`.${bufferPath}`, buffer, (error) => {
                if (error) {
                    throw error;
                }
            });
            user.avatar = bufferPath;
            let Usuario = await getManager().getRepository(Usuarios).save(user)
            return await this.GetById(Usuario.id);;
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;
        }
    }

    async Login(email:string, password:string):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {}
        try {
            let usuario = await getManager().getRepository(Usuarios).findOne({where:{email, password}});
            if(!usuario){
                throw "No Registra";
            }else{
                apiR.code = 200;
                apiR.message = "Usuario Logueado";
                apiR.data = usuario;
                return apiR;
            }
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;
        }
    }
    
    async ValidateExistence(user:Usuarios):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let UserName = await getManager().getRepository(Usuarios).findOne({where:{userName: user?.userName}})
            let Email = await getManager().getRepository(Usuarios).findOne({where:{email: user?.email}})
            if(Email){
                console.log(Email);
                throw Email.email;
            }else if(UserName){
                console.log(UserName);
                throw UserName.userName;
            }else{
                apiR.code = 200;
                apiR.message = "No se registra existencia"
                return apiR;
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
            let User = await getManager().getRepository(Usuarios).findOne({where:{id: id}, relations:['nivel2']})
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