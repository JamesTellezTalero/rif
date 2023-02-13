import { RifasBusiness } from "../Business/RifasBusiness";
import { UsuariosBusiness } from "../Business/UsuariosBusiness";
import { apiResponse } from "../Models/apiResponse";
import { Rifas } from "../entities/Rifas";
import { Usuarios } from "../entities/Usuarios";

let RifasB = new RifasBusiness()

exports.Create = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        ////// CREAR CRUD ESTADOS RIFA
        let rifa = req.body.rifa;
        if(rifa == null){
            apiR.code = 400;
            apiR.message = "No se registra <rifa>"
            throw apiR;
        }
        if(rifa?.tipoRifa == null){
            apiR.code = 400;
            apiR.message = "No se registra <tipoRifa>"
            throw apiR;
        }
        if(rifa?.usuario == null){
            apiR.code = 400;
            apiR.message = "No se registra <usuario>"
            throw apiR;
        }
        if(rifa?.name == null){
            apiR.code = 400;
            apiR.message = "No se registra <name>"
            throw apiR;
        }
        if(rifa?.description == null){
            apiR.code = 400;
            apiR.message = "No se registra <description>"
            throw apiR;
        }
        if(rifa?.posiblesGanadores == null){
            apiR.code = 400;
            apiR.message = "No se registra <posiblesGanadores>"
            throw apiR;
        }
        if(rifa?.costoOportunidad == null){
            apiR.code = 400;
            apiR.message = "No se registra <costoOportunidad>"
            throw apiR;
        }
        if(rifa?.participantesTotales == null){
            apiR.code = 400;
            apiR.message = "No se registra <participantesTotales>"
            throw apiR;
        }
        if(rifa?.image == null){
            apiR.code = 400;
            apiR.message = "No se registra <image>"
            throw apiR;
        }
        if(rifa?.startsAt == null){
            apiR.code = 400;
            apiR.message = "No se registra <startsAt>"
            throw apiR;
        }
        if(rifa?.endsAt == null){
            apiR.code = 400;
            apiR.message = "No se registra <endsAt>"
            throw apiR;
        }
        return res.status(200).json(await RifasB.Create(rifa))
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

exports.UpdateById = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        ////// CREAR CRUD ESTADOS RIFA
        let rifa = req.body.rifa;
        if(rifa == null){
            apiR.code = 400;
            apiR.message = "No se registra <rifa>"
            throw apiR;
        }
        if(rifa?.id == null){
            apiR.code = 400;
            apiR.message = "No se registra <id>"
            throw apiR;
        }
        if(rifa?.image == null){
            apiR.code = 400;
            apiR.message = "No se registra <image>"
            throw apiR;
        }
        if(rifa?.name == null){
            apiR.code = 400;
            apiR.message = "No se registra <name>"
            throw apiR;
        }
        if(rifa?.description == null){
            apiR.code = 400;
            apiR.message = "No se registra <description>"
            throw apiR;
        }
        if(rifa?.posiblesGanadores == null){
            apiR.code = 400;
            apiR.message = "No se registra <posiblesGanadores>"
            throw apiR;
        }
        if(rifa?.costoOportunidad == null){
            apiR.code = 400;
            apiR.message = "No se registra <costoOportunidad>"
            throw apiR;
        }
        if(rifa?.participantesTotales == null){
            apiR.code = 400;
            apiR.message = "No se registra <participantesTotales>"
            throw apiR;
        }
        if(rifa?.startsAt == null){
            apiR.code = 400;
            apiR.message = "No se registra <startsAt>"
            throw apiR;
        }
        if(rifa?.endsAt == null){
            apiR.code = 400;
            apiR.message = "No se registra <endsAt>"
            throw apiR;
        }
        if(rifa?.status == null){
            apiR.code = 400;
            apiR.message = "No se registra <status>"
            throw apiR;
        }
        return res.status(200).json(await RifasB.UpdateById(rifa))
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
        ////// CREAR CRUD ESTADOS RIFA
        let id = req.query.id;
        if(id == null){
            apiR.code = 400;
            apiR.message = "No se registra <id>"
            throw apiR;
        }
        return res.status(200).json(await RifasB.GetById(id))
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
        return res.status(200).json(await RifasB.GetAll())
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
