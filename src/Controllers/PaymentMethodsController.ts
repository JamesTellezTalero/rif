import { PaymentMethodsBusiness } from "../Business/PaymentMethodsBusiness";
import { apiResponse } from "../Models/apiResponse";
import { Rifas } from "../entities/Rifas";

let PaymentMethodsB = new PaymentMethodsBusiness();

exports.Create = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let item = req.body.PaymentMethod;
        if(item == null){
            apiR.code = 400;
            apiR.message = "No se registra el <PaymentMethod>"
            throw apiR;
        }else if(item.name == null){
            apiR.code = 400;
            apiR.message = "No se registra el <name>"
            throw apiR;
        }else if(item.url == null){
            apiR.code = 400;
            apiR.message = "No se registra el <url>"
            throw apiR;
        }
        let resp = await PaymentMethodsB.Create(item);
        apiR.code = 200;
        apiR.message = "Metodo Creado"
        apiR.data = resp
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

exports.Update = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let item = req.body.PaymentMethod;
        if(item == null){
            apiR.code = 400;
            apiR.message = "No se registra el <PaymentMethod>"
            throw apiR;
        }else if(item.id == null){
            apiR.code = 400;
            apiR.message = "No se registra el <id>"
            throw apiR;
        }else if(item.name == null){
            apiR.code = 400;
            apiR.message = "No se registra el <name>"
            throw apiR;
        }else if(item.url == null){
            apiR.code = 400;
            apiR.message = "No se registra el <url>"
            throw apiR;
        }else if(item.status == null){
            apiR.code = 400;
            apiR.message = "No se registra el <status>"
            throw apiR;
        }else {
            let resp = await PaymentMethodsB.Update(item);
            apiR.code = 200;
            apiR.message = "Metodo Actualizado"
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
        let resp = await PaymentMethodsB.GetAll();
        if(resp.length > 0){
            apiR.code = 200;
            apiR.message = "Metodos encontrados"
            apiR.data = resp
            return res.status(apiR.code).json({... apiR})
        }else{
            throw apiR = {
                message: "Metodos No Encontrado",
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
        let resp = await PaymentMethodsB.GetById(id);
        if(resp != null){
            apiR.code = 200;
            apiR.message = "Metodo encontrado"
            apiR.data = resp
            return res.status(apiR.code).json({... apiR})
        }else{
            throw apiR = {
                message: "Metodo No Encontrado",
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
        let resp = await PaymentMethodsB.GetByName(name);
        if(resp != null){
            apiR.code = 200;
            apiR.message = "Metodo encontrado"
            apiR.data = resp
            return res.status(apiR.code).json({... apiR});
        }else{
            throw apiR = {
                message: "Metodo No Encontrado",
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
