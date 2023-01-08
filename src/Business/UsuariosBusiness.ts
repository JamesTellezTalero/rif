import { getManager } from "typeorm";
import { Usuarios } from "../entities/Usuarios";
import { apiResponse } from "../Models/apiResponse";

export class UsuariosBusiness{  
    async Create(user:Usuarios):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {}
        try {
            let Usuario = await getManager().getRepository(Usuarios).save(user)
            apiR.code = 200;
            apiR.message = "Usuario guardado con exito";
            apiR.data = Usuario;
            return apiR;
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
                apiR.code = 400;
                apiR.message = Email.email
                throw apiR;
            }else if(UserName){
                console.log(UserName);
                apiR.code = 400;
                apiR.message = UserName.userName
                throw apiR;
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
}