import { TiposRifaBusiness } from "../Business/TiposRifaBusiness";
import { apiResponse } from "../Models/apiResponse";
import { Rifas } from "../entities/Rifas";

let TiposRifaB = new TiposRifaBusiness();

exports.Create = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let item = req.body.tipoRifa;
        if(item == null){
            apiR.code = 400;
            apiR.message = "No se registra el <tipoRifa>"
            throw apiR;
        }
        if(item.name == null){
            apiR.code = 400;
            apiR.message = "No se registra el <name>"
            throw apiR;
        }
        if(item.recompenza == null){
            apiR.code = 400;
            apiR.message = "No se registra el <recompenza>"
            throw apiR;
        }
        let tipoRifa = await TiposRifaB.GetByName(item.name)
        if(tipoRifa != null){
            apiR.code = 400;
            apiR.message = "Tipo Existente"
            apiR.data = tipoRifa
            return res.status(apiR.code).json({
                ... apiR
            })
        } else {
            let resp = await TiposRifaB.Create(item);
            apiR.code = 200;
            apiR.message = "Tipo Creado"
            apiR.data = resp
            return res.status(apiR.code).json({
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

exports.Update = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let item = req.body.tipoRifa;
        if(item == null){
            apiR.code = 400;
            apiR.message = "No se registra el <tipoRifa>"
            throw apiR;
        }
        if(item.id == null){
            apiR.code = 400;
            apiR.message = "No se registra el <id>"
            throw apiR;
        }
        if(item.name == null){
            apiR.code = 400;
            apiR.message = "No se registra el <name>"
            throw apiR;
        }
        if(item.recompenza == null){
            apiR.code = 400;
            apiR.message = "No se registra el <recompenza>"
            throw apiR;
        }
        let resp = await TiposRifaB.Update(item);
        apiR.code = 200;
        apiR.message = "Tipo Creado"
        apiR.data = resp
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

exports.GetAll = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let resp = await TiposRifaB.GetAll();
        apiR.code = 200;
        apiR.message = "Tipos encontrados"
        apiR.data = resp
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
        let id = req.query.id;
        if(id == null){
            apiR.code = 400;
            apiR.message = "No se registra el <id>"
            throw apiR;
        }
        let resp = await TiposRifaB.GetById(id);
        
        apiR.code = 200;
        apiR.message = "Tipo encontrado"
        apiR.data = resp
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

exports.GetByName = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let name = req.body.name;
        if(name == null){
            apiR.code = 400;
            apiR.message = "No se registra el <name>"
            throw apiR;
        }
        let resp = await TiposRifaB.GetByName(name);
        apiR.code = 200;
        apiR.message = "Tipo encontrado"
        apiR.data = resp
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
