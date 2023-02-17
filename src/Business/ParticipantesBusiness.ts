import { getManager } from "typeorm";
import { Participantes } from "../entities/Participantes";
import { apiResponse } from "../Models/apiResponse";

export class ParticipantesBusiness{  

    async Create(participante:Participantes):Promise<Participantes>{
        let apiR = new apiResponse();
        apiR.data = {}
        try {
            let Participante = await getManager().getRepository(Participantes).save(participante)
            return await this.GetById(Participante.id);
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;
        }
    }
    
    async ValidateExistence(participante:Participantes):Promise<string>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let documento = await getManager().getRepository(Participantes).findOne({where:{documento: participante?.documento}})
            let Email = await getManager().getRepository(Participantes).findOne({where:{email: participante?.email}})
            if(Email != null){
                throw apiR ={
                    code: 400,
                    message: `El Email: ${Email.email} ya se encuentra en uso`,
                    data: {}
                };
            }else if(documento != null){
                throw apiR ={
                    code: 400,
                    message: `El documento: ${documento.documento} ya se encuentra en uso`,
                    data: {}
                }
            }else{
                return "No se registra el participante";
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
    
    async GetById(id:number):Promise<Participantes>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let Participante = await getManager().getRepository(Participantes).findOne({where:{id: id, status: true}, relations:['tipoDocumento']})
            return Participante;
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
    
    async GetByEmail(email:string):Promise<Participantes>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let Participante = await getManager().getRepository(Participantes).findOne({where:{email}, relations:['tipoDocumento']})
            return Participante;
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

    async GetByDocumento(documento:string):Promise<Participantes>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let Participante = await getManager().getRepository(Participantes).findOne({where:{documento}, relations:['tipoDocumento']})
            return Participante;
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