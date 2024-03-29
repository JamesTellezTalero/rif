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
        }else if(rifa?.tipoRifa == null){
            apiR.code = 400;
            apiR.message = "No se registra <tipoRifa>"
            throw apiR;
        }else if(rifa?.usuario == null){
            apiR.code = 400;
            apiR.message = "No se registra <usuario>"
            throw apiR;
        }else if(rifa?.name == null){
            apiR.code = 400;
            apiR.message = "No se registra <name>"
            throw apiR;
        }else if(rifa?.description == null){
            apiR.code = 400;
            apiR.message = "No se registra <description>"
            throw apiR;
        }else if(rifa?.posiblesGanadores == null){
            apiR.code = 400;
            apiR.message = "No se registra <posiblesGanadores>"
            throw apiR;
        }else if(rifa?.costoOportunidad == null){
            apiR.code = 400;
            apiR.message = "No se registra <costoOportunidad>"
            throw apiR;
        }else if(rifa?.participantesTotales == null){
            apiR.code = 400;
            apiR.message = "No se registra <participantesTotales>"
            throw apiR;
        }else if(rifa?.image == null){
            apiR.code = 400;
            apiR.message = "No se registra <image>"
            throw apiR;
        }else if(rifa?.startsAt == null){
            apiR.code = 400;
            apiR.message = "No se registra <startsAt>"
            throw apiR;
        }else if(rifa?.endsAt == null){
            apiR.code = 400;
            apiR.message = "No se registra <endsAt>"
            throw apiR;
        }else {
            let newRifa = await RifasB.Create(rifa);
            apiR.code = 200;
            apiR.message = "Rifa Creada"
            apiR.data = newRifa
            return res.status(200).json({
                ... apiR
            })
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
        }else if(rifa?.id == null){
            apiR.code = 400;
            apiR.message = "No se registra <id>"
            throw apiR;
        }else if(rifa?.image == null){
            apiR.code = 400;
            apiR.message = "No se registra <image>"
            throw apiR;
        }else if(rifa?.name == null){
            apiR.code = 400;
            apiR.message = "No se registra <name>"
            throw apiR;
        }else if(rifa?.description == null){
            apiR.code = 400;
            apiR.message = "No se registra <description>"
            throw apiR;
        }else if(rifa?.posiblesGanadores == null){
            apiR.code = 400;
            apiR.message = "No se registra <posiblesGanadores>"
            throw apiR;
        }else if(rifa?.costoOportunidad == null){
            apiR.code = 400;
            apiR.message = "No se registra <costoOportunidad>"
            throw apiR;
        }else if(rifa?.participantesTotales == null){
            apiR.code = 400;
            apiR.message = "No se registra <participantesTotales>"
            throw apiR;
        }else if(rifa?.startsAt == null){
            apiR.code = 400;
            apiR.message = "No se registra <startsAt>"
            throw apiR;
        }else if(rifa?.endsAt == null){
            apiR.code = 400;
            apiR.message = "No se registra <endsAt>"
            throw apiR;
        }else if(rifa?.status == null){
            apiR.code = 400;
            apiR.message = "No se registra <status>"
            throw apiR;
        }else {
            let updatedRifa = await RifasB.UpdateById(rifa) 
            apiR.code = 200;
            apiR.message = "Rifa Actualizada"
            apiR.data = updatedRifa
            return res.status(200).json({
                ... apiR
            })
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
        let rifas = await RifasB.GetAll();
        if(rifas.length > 0){
            apiR.code = 200;
            apiR.message = "Rifas encontradas"
            apiR.data = rifas
            return res.status(200).json({
                ... apiR
            })
        }else{
            throw apiR = {
                message: "Rifas No Encontradas",
                code: 400,
                data: rifas 
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
        ////// CREAR CRUD ESTADOS RIFA
        let id = req.query.id;
        if(id == null){
            apiR.code = 400;
            apiR.message = "No se registra <id>"
            throw apiR;
        }
        let rifa = await RifasB.GetById(id)
        if(rifa){
            apiR.code = 200;
            apiR.message = "Rifa encontrada"
            apiR.data = rifa
            return res.status(200).json({
                ... apiR
            })
        }else{
            throw apiR = {
                message: "Rifa No Encontrada",
                code: 400,
                data: rifa 
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
