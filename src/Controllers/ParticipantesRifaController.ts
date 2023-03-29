import { EstadosRifaBusiness } from "../Business/EstadosRifaBusiness";
import { ParticipantesBusiness } from "../Business/ParticipantesBusiness";
import { ParticipantesRifaBusiness } from "../Business/ParticipantesRifaBusiness";
import { RifasBusiness } from "../Business/RifasBusiness";
import { TransaccionesBusiness } from "../Business/TransaccionesBusiness";
import { apiResponse } from "../Models/apiResponse";
import { Rifas } from "../entities/Rifas";

let RifasB = new RifasBusiness();
let ParticipantesB = new ParticipantesBusiness();
let ParticipantesRifaB = new ParticipantesRifaBusiness();
let TransaccionesB = new TransaccionesBusiness();

exports.Create = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let item = req.body.participanteRifa;
        if(item == null){
            apiR.code = 400;
            apiR.message = "No se registra el <participanteRifa>"
            throw apiR;
        }else if(item.rifa == null){
            apiR.code = 400;
            apiR.message = "No se registra el <rifa>"
            throw apiR;
        }else if(item.participante == null){
            apiR.code = 400;
            apiR.message = "No se registra el <participante>"
            throw apiR;
        }
        let Rifa = await RifasB.GetById(item.rifa);
        if(Rifa == null){
            apiR.code = 400;
            apiR.message = "La Rifa enviada no existe"
            throw apiR;
        }
        let current = new Date();
        if(Rifa.endsAt < current){
            apiR.code = 400;
            apiR.message = "La Rifa Ya ha terminado"
            throw apiR;
        }else if(Rifa.participantesRifas.length == Rifa.participantesTotales){
            apiR.code = 400;
            apiR.message = "La Rifa Ya no tiene más plazas"
            throw apiR;
        } 
        item.rifa = Rifa;
        item.participante = await ParticipantesB.GetById(item.participante);
        if(item.participante == null){
            apiR.code = 400;
            apiR.message = "El Participante enviado no existe"
            throw apiR;
        }else {
            let resp = await ParticipantesRifaB.Create(item);
            apiR.code = 200;
            apiR.message = "Participante Rifa Creado"
            apiR.data = resp
            return res.status(apiR.code).json({... apiR})
        }
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

exports.Update = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let id = req.query.id;
        if(id == null){
            apiR.code = 400;
            apiR.message = "No se registra el <id>"
            throw apiR;
        }
        let status = req.body.status;
        if(status == null){
            apiR.code = 400;
            apiR.message = "No se registra el <status>"
            throw apiR;
        }
        let participanteRifa = await ParticipantesRifaB.GetById(id)
        if(participanteRifa == null){
            apiR.code = 400;
            apiR.message = "Paricipante Rifa Inexistente"
            apiR.data = participanteRifa
            throw apiR;
        }
        let Rifa = await RifasB.GetById(participanteRifa.rifa.id);
        let current = new Date();
        if(Rifa.endsAt < current){
            apiR.code = 400;
            apiR.message = "La Rifa Ya ha terminado"
            throw apiR;
        } else if(Rifa.participantesRifas.length == Rifa.participantesTotales && status == true){
            apiR.code = 400;
            apiR.message = "La Rifa Ya no tiene más plazas"
            throw apiR;
        } 
        let trans = await TransaccionesB.GetByParticipanteRifa(participanteRifa);
        trans = trans.filter(e => e.transactionState.name == "Exitosa")
        if(trans.length < 0 && status == false){
            apiR.code = 400;
            apiR.message = "El participante Tiene una transaccion Exitosa"
            throw apiR;
        } else{
            let resp = await ParticipantesRifaB.Update(participanteRifa, status);
            apiR.code = 200;
            apiR.data = resp
            apiR.message = "Estado Actualizado"
            return res.status(apiR.code).json({... apiR})
        }
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

exports.GetAll = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let resp = await ParticipantesRifaB.GetAll();
        if(resp.length > 0){
            apiR.code = 200;
            apiR.message = "Estados encontrados"
            apiR.data = resp
            return res.status(apiR.code).json({... apiR})
        }else{
            throw apiR = {
                message: "Estados No Encontrado",
                code: 400,
                data: resp 
            }
        }
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
        let id = req.query.id;
        if(id == null){
            apiR.code = 400;
            apiR.message = "No se registra el <id>"
            throw apiR;
        }
        let resp = await ParticipantesRifaB.GetById(id);
        if(resp != null){
            apiR.code = 200;
            apiR.message = "Estado encontrado"
            apiR.data = resp
            return res.status(apiR.code).json({... apiR})
        }else{
            throw apiR = {
                message: "Estado No Encontrado",
                code: 400,
                data: resp 
            }
        }
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

exports.GetByRifa = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let id = req.query.id;
        if(id == null){
            apiR.code = 400;
            apiR.message = "No se registra el <id>"
            throw apiR;
        }
        let resp = await ParticipantesRifaB.GetByRifa(id);
        if(resp != null){
            apiR.code = 200;
            apiR.message = "Estado encontrado"
            apiR.data = resp
            return res.status(apiR.code).json({... apiR});
        }else{
            throw apiR = {
                message: "Estado No Encontrado",
                code: 400,
                data: resp 
            }
        }
        
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
