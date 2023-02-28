import { GanadoresRifaBusiness } from "../Business/GanadoresRifaBusiness";
import { ParticipantesRifaBusiness } from "../Business/ParticipantesRifaBusiness";
import { RifasBusiness } from "../Business/RifasBusiness";
import { apiResponse } from "../Models/apiResponse";

const GanadoresRifaB = new GanadoresRifaBusiness();
const RifasB = new RifasBusiness();
const ParticipantesRifaB = new ParticipantesRifaBusiness();

exports.DefinirGanadores = async (req, res) =>{
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let item = req.body.ganadorRifa;
        if(item == null ){
            apiR.code = 400;
            apiR.message = "No se registra el <ganadorRifa>"
            throw apiR;
        }
        if(item.rifa == null || item.rifa.id == null){
            apiR.code = 400;
            apiR.message = "No se registra la propiedad <rifa> o <rifa.id>"
            throw apiR;
        }
        let rifa = await RifasB.GetById(item.rifa.id);
        if(rifa == null ){
            apiR.code = 400;
            apiR.message = "No se existe la <rifa> Enviada"
            throw apiR;
        }
        let current = new Date();
        if(rifa.endsAt > current){
            apiR.code = 400;
            apiR.message = "La <rifa> Enviada se encuentra vigente"
            throw apiR;
        }
        if(rifa.ganadoresRifas.length < rifa.posiblesGanadores){
            apiR.data = await GanadoresRifaB.DefinirGanadores(rifa);
            apiR.message = "Ganadores Creados";
            apiR.code = 200;
            return res.status(apiR.code).json({... apiR})
        }else {
            apiR.code = 400;
            apiR.message = "La <rifa> Enviada ya tiene definidos sus Ganadores"
            throw apiR;
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

exports.GetByRifa = async (req, res) =>{
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let id = req.query.id;
        if(id == null ){
            apiR.code = 400;
            apiR.message = "No se registra el <id>"
            throw apiR;
        }
        let rifa = await RifasB.GetById(id);
        if(rifa == null ){
            apiR.code = 400;
            apiR.message = "No se existe el <id> Enviado"
            throw apiR;
        }
        apiR.data = await GanadoresRifaB.GetByRifa(rifa.id);
        apiR.code = 200;
        apiR.message = "Ganadores Encontrados";
        return res.status(apiR.code).json({... apiR})
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