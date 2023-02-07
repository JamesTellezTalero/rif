import { TiposRifaBusiness } from "../Business/tiposRifaBusiness";
import { apiResponse } from "../Models/apiResponse";
import { Rifas } from "../entities/Rifas";

let TiposRifaB = new TiposRifaBusiness();

exports.GetAll = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let resp = await TiposRifaB.GetAll();
        return res.status(resp.code).json({resp})
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
            apiR.message = "No se reguistra el <id>"
            throw apiR;
        }
        let resp = await TiposRifaB.GetById(id);
        return res.status(resp.code).json({resp})
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

exports.GetByName = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let name = req.body.name;
        if(name == null){
            apiR.code = 400;
            apiR.message = "No se reguistra el <name>"
            throw apiR;
        }
        let resp = await TiposRifaB.GetByName(name);
        return res.status(resp.code).json({resp})
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
