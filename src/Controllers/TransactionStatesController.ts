import { TransactionStatesBusiness } from "../Business/TransactionStatesBusiness";
import { apiResponse } from "../Models/apiResponse";

let TransactionStatesB = new TransactionStatesBusiness();

exports.Create = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let item = req.body.transactionState;
        if(item == null){
            apiR.code = 400;
            apiR.message = "No se registra el <transactionState>"
            throw apiR;
        }else if(item.name == null){
            apiR.code = 400;
            apiR.message = "No se registra el <name>"
            throw apiR;
        }else {
            let resp = await TransactionStatesB.Create(item);
            apiR.code = 200;
            apiR.message = "Estado Creado"
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
        let item = req.body.transactionState;
        if(item == null){
            apiR.code = 400;
            apiR.message = "No se registra el <transactionState>"
            throw apiR;
        }else if(item.id == null){
            apiR.code = 400;
            apiR.message = "No se registra el <id>"
            throw apiR;
        }else if(item.name == null){
            apiR.code = 400;
            apiR.message = "No se registra el <name>"
            throw apiR;
        }else if(item.status == null){
            apiR.code = 400;
            apiR.message = "No se registra el <status>"
            throw apiR;
        }else {
            let resp = await TransactionStatesB.Update(item);
            apiR.code = 200;
            apiR.message = "Estado Actualizado"
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
        let resp = await TransactionStatesB.GetAll();
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
        let resp = await TransactionStatesB.GetById(id);
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
        let resp = await TransactionStatesB.GetByName(name);
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
