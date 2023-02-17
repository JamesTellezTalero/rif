import { ParticipantesBusiness } from "../Business/ParticipantesBusiness";
import {  StringUtils} from "../Utils/StringUtils";
import { apiResponse } from "../Models/apiResponse";
import { Participantes } from "../entities/Participantes";
import { TipoDocumentoBusiness } from "../Business/TipoDocumentoBusiness";

let StringU = new StringUtils()
let ParticipantesB = new ParticipantesBusiness()
let TipoDocumentoB = new TipoDocumentoBusiness()

exports.Create = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let participante:Participantes = req.body;
        let emailExist = await StringU.validateEmail(participante?.email);
        if(!emailExist){
            apiR.code = 400;
            apiR.message = "Email invalido";
            throw apiR;
        }else if(participante?.documento == null || participante?.documento == ""){
            apiR.code = 400;
            apiR.message = "documento invalido";
            throw apiR;
        }else if(participante?.telefono == null || participante?.telefono == ""){
            apiR.code = 400;
            apiR.message = "telefono invalido";
            throw apiR;
        }else if(participante?.nombre == null || participante?.nombre == ""){
            apiR.code = 400;
            apiR.message = "nombre de participante invalido";
            throw apiR;
        }else if(participante?.tipoDocumento == null){
            apiR.code = 400;
            apiR.message = "tipoDocumento Vacio";
            throw apiR;
        }else if(participante?.tipoDocumento?.code == null){
            apiR.code = 400;
            apiR.message = "tipoDocumento <code> Vacio";
            throw apiR;
        }
        participante.tipoDocumento = await TipoDocumentoB.GetByCode(participante?.tipoDocumento?.code); 
        if(participante.tipoDocumento == null){
            apiR.code = 400;
            apiR.message = "tipoDocumento invalido";
            throw apiR;
        }
        await ParticipantesB.ValidateExistence(participante)
        participante.createAt = new Date();
        let newParticipante = await ParticipantesB.Create(participante);
        apiR.message = "Participante Creado"
        apiR.code = 200;
        apiR.data = newParticipante;
        return res.status(apiR.code).json({
            ... apiR
        })
    }
    catch (error){
        console.log(error);
        if(error?.code === 400){
            return res.status(error.code).json({
                ... error
            });
        }else{
            apiR.code = 500;
            apiR.message = "Se presentó una excepcion no controlada.";
            return res.status(apiR.code).json({
                ... apiR
            });
        }
    }
}

exports.GetById = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let id:number = req.query.id;
        let exist = await ParticipantesB.GetById(id);
        if(exist != null){
            apiR.code = 200;
            apiR.message = "Participante encontrado"
            apiR.data = exist
            return res.status(apiR.code).json({
                ... apiR
            })
        }else{
            throw apiR ={
                code: 400,
                message: `Participante no encontrado`,
                data: exist
            };
        }
    } catch (error) {
        console.log(error);
        if(error?.code === 400){
            return res.status(error.code).json({
                ... error
            });
        }else{
            apiR.code = 500;
            apiR.message = "Se presentó una excepcion no controlada.";
            return res.status(apiR.code).json({
                ... apiR
            });
        }   
    }
}

exports.GetByEmail = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let email:string = req.body.email;
        let exist = await ParticipantesB.GetByEmail(email);
        if(exist != null){
            apiR.code = 200;
            apiR.message = "Participante encontrado"
            apiR.data = exist
            return res.status(apiR.code).json({
                ... apiR
            })
        }else{
            throw apiR ={
                code: 400,
                message: `Participante no encontrado`,
                data: exist
            };
        }
    } catch (error) {
        console.log(error);
        if(error?.code === 400){
            return res.status(error.code).json({
                ... error
            });
        }else{
            apiR.code = 500;
            apiR.message = "Se presentó una excepcion no controlada.";
            return res.status(apiR.code).json({
                ... apiR
            });
        }   
    }
}

exports.GetByDocumento = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let documento:string = req.body.documento;
        let exist = await ParticipantesB.GetByDocumento(documento);
        if(exist != null){
            apiR.code = 200;
            apiR.message = "Participante encontrado"
            apiR.data = exist    
            return res.status(apiR.code).json({
                ... apiR
            })
        }else{
            throw apiR ={
                code: 400,
                message: `Participante no encontrado`,
                data: exist
            };
        }
    } catch (error) {
        console.log(error);
        if(error?.code === 400){
            return res.status(error.code).json({
                ... error
            });
        }else{
            apiR.code = 500;
            apiR.message = "Se presentó una excepcion no controlada.";
            return res.status(apiR.code).json({
                ... apiR
            });
        }   
    }
}