import { getManager } from "typeorm";
import { Participantes } from "../entities/Participantes";
import { apiResponse } from "../Models/apiResponse";
import { Niveles } from "../entities/Niveles";
const jwt = require("jsonwebtoken");
const passport = require("passport");
const crypto = require("crypto");

const fs = require('fs');

let secretOrKey =  process.env.AUTH_KEY;

export class ParticipantesBusiness{  

    async Create(participante:Participantes):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {}
        try {
            // let Participante = await getManager().getRepository(Participantes).save(participante)
            // return await this.GetById(Participante.id);
            apiR.code = 200;
            apiR.data = {status: true};
            return apiR;
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;
        }
    }
    
    async ValidateExistence(participante:Participantes):Promise<apiResponse>{
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
                apiR.code = 200;
                apiR.message = "No se registra existencia"
                return apiR;
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
    
    async GetById(id:number):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let Participante = await getManager().getRepository(Participantes).findOne({where:{id: id}, relations:['tipoDocumento']})
            if(Participante != null){
                apiR.code = 200;
                apiR.message = "Participante encontrado"
                apiR.data = Participante
                return apiR;
            }else{
                throw apiR ={
                    code: 400,
                    message: `Participante no encontrado`,
                    data: Participante
                };
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