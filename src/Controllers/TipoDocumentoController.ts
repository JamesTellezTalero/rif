import { TipoDocumentoBusiness } from "../Business/TipoDocumentoBusiness";
import { apiResponse } from "../Models/apiResponse";
import { Rifas } from "../entities/Rifas";

let TipoDocumentoB = new TipoDocumentoBusiness();

exports.Create = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let item = req.body.tipoDocumento;
        if(item == null){
            apiR.code = 400;
            apiR.message = "No se registra el <tipoDocumento>"
            throw apiR;
        }
        if(item.code == null){
            apiR.code = 400;
            apiR.message = "No se registra el <code>"
            throw apiR;
        }
        if(item.name == null){
            apiR.code = 400;
            apiR.message = "No se registra el <name>"
            throw apiR;
        }
        let exist = await TipoDocumentoB.GetByCode(item.code) 
        if(exist != null){
            apiR.code = 200;
            apiR.message = "Tipo Existente"
            apiR.data = exist
            return res.status(apiR.code).json({...apiR})
        }else{
            let resp = await TipoDocumentoB.Create(item);
            apiR.code = 200;
            apiR.message = "Tipo Creado"
            apiR.data = resp
            return res.status(apiR.code).json({...apiR})
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
        let item = req.body.tipoDocumento;
        if(item == null){
            apiR.code = 400;
            apiR.message = "No se registra el <tipoDocumento>"
            throw apiR;
        }
        if(item.id == null){
            apiR.code = 400;
            apiR.message = "No se registra el <id>"
            throw apiR;
        }
        if(item.code == null){
            apiR.code = 400;
            apiR.message = "No se registra el <code>"
            throw apiR;
        }
        if(item.name == null){
            apiR.code = 400;
            apiR.message = "No se registra el <name>"
            throw apiR;
        }
        if(item.status == null){
            apiR.code = 400;
            apiR.message = "No se registra el <status>"
            throw apiR;
        }
        let resp = await TipoDocumentoB.Update(item);
        
        apiR.code = 200;
        apiR.message = "Tipo Creado"
        apiR.data = resp
        return res.status(apiR.code).json({...apiR})
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
        let resp = await TipoDocumentoB.GetAll();
        if(resp.length > 0){
            apiR.code = 200;
            apiR.message = "Tipos encontrados"
            apiR.data = resp
            return res.status(apiR.code).json({...apiR})
        }else{
            throw apiR = {
                message: "Tipo No Encontrado",
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
        let resp = await TipoDocumentoB.GetById(id);
        if(resp != null){
            apiR.code = 200;
            apiR.message = "Tipo encontrado"
            apiR.data = resp
            return res.status(apiR.code).json({...apiR})
        }else{
            throw apiR = {
                message: "Tipo No Encontrado",
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

exports.GetByCode = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let code = req.body.code;
        if(code == null){
            apiR.code = 400;
            apiR.message = "No se registra el <code>"
            throw apiR;
        }
        let resp = await TipoDocumentoB.GetByCode(code);
        if(resp != null){
            apiR.code = 200;
            apiR.message = "Tipo encontrado"
            apiR.data = resp
            return res.status(apiR.code).json({...apiR})
        }else{
            throw apiR = {
                message: "Tipo No Encontrado",
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
