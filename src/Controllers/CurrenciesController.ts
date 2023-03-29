import { CurrenciesBusiness } from "../Business/CurrenciesBusiness";
import { apiResponse } from "../Models/apiResponse";
import { Rifas } from "../entities/Rifas";

let CurrenciesB = new CurrenciesBusiness();

exports.Create = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let item = req.body.currency;
        if(item == null){
            apiR.code = 400;
            apiR.message = "No se registra el <currency>"
            throw apiR;
        }else if(item.name == null){
            apiR.code = 400;
            apiR.message = "No se registra el <name>"
            throw apiR;
        }else if(item.symbol == null){
            apiR.code = 400;
            apiR.message = "No se registra el <symbol>"
            throw apiR;
        }else if(item.code == null){
            apiR.code = 400;
            apiR.message = "No se registra el <code>"
            throw apiR;
        }else {
            let resp = await CurrenciesB.Create(item);
            apiR.code = 200;
            apiR.message = "Currency Creado"
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
        let item = req.body.currency;
        if(item == null){
            apiR.code = 400;
            apiR.message = "No se registra el <currency>"
            throw apiR;
        }else if(item.id == null){
            apiR.code = 400;
            apiR.message = "No se registra el <id>"
            throw apiR;
        }else if(item.name == null){
            apiR.code = 400;
            apiR.message = "No se registra el <name>"
            throw apiR;
        }else if(item.code == null){
            apiR.code = 400;
            apiR.message = "No se registra el <code>"
            throw apiR;
        }else if(item.symbol == null){
            apiR.code = 400;
            apiR.message = "No se registra el <symbol>"
            throw apiR;
        }else if(item.status == null){
            apiR.code = 400;
            apiR.message = "No se registra el <status>"
            throw apiR;
        }else {
            let resp = await CurrenciesB.Update(item);
            apiR.code = 200;
            apiR.message = "Currency Actualizado"
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

exports.GetAll = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let resp = await CurrenciesB.GetAll();
        if(resp.length > 0){
            apiR.code = 200;
            apiR.message = "Currencies encontrados"
            apiR.data = resp
            return res.status(apiR.code).json({... apiR})
        }else{
            throw apiR = {
                message: "Currencies No Encontrados",
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
        let resp = await CurrenciesB.GetById(id);
        if(resp != null){
            apiR.code = 200;
            apiR.message = "Currency encontrado"
            apiR.data = resp
            return res.status(apiR.code).json({... apiR})
        }else{
            throw apiR = {
                message: "Currency No Encontrado",
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
        let resp = await CurrenciesB.GetByCode(code);
        if(resp != null){
            apiR.code = 200;
            apiR.message = "Currency encontrado"
            apiR.data = resp
            return res.status(apiR.code).json({... apiR});
        }else{
            throw apiR = {
                message: "Currency No Encontrado",
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
