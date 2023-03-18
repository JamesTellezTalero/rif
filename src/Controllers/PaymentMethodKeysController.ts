import { PaymentMethodKeysBusiness } from "../Business/PaymentMethodKeysBusiness";
import { PaymentMethodsBusiness } from "../Business/PaymentMethodsBusiness";
import { apiResponse } from "../Models/apiResponse";
import { Rifas } from "../entities/Rifas";

let PaymentMethodKeysB = new PaymentMethodKeysBusiness();
let PaymentMethodsB = new PaymentMethodsBusiness();

exports.Create = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let item = req.body.PaymentMethodKey;
        if(item == null){
            apiR.code = 400;
            apiR.message = "No se registra el <PaymentMethodKey>"
            throw apiR;
        }
        if(item.name == null){
            apiR.code = 400;
            apiR.message = "No se registra el <name>"
            throw apiR;
        }
        if(item.paymentMethod == null){
            apiR.code = 400;
            apiR.message = "No se registra el <paymentMethod>"
            throw apiR;
        }
        item.paymentMethod = await PaymentMethodsB.GetById(item.paymentMethod); 
        if(item.paymentMethod == null || item.paymentMethod.status == false){
            apiR.code = 400;
            apiR.message = "No se registra o no existe el <paymentMethod>"
            throw apiR;
        }
        let resp = await PaymentMethodKeysB.Create(item);
        apiR.code = 200;
        apiR.message = "Key Creado"
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

exports.GetAll = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let resp = await PaymentMethodKeysB.GetAll();
        if(resp.length > 0){
            apiR.code = 200;
            apiR.message = "Keys encontrados"
            apiR.data = resp
            return res.status(apiR.code).json({... apiR})
        }else{
            throw apiR = {
                message: "Keys No Encontrado",
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
        let resp = await PaymentMethodKeysB.GetById(id);
        if(resp != null){
            apiR.code = 200;
            apiR.message = "Key encontrado"
            apiR.data = resp
            return res.status(apiR.code).json({... apiR})
        }else{
            throw apiR = {
                message: "Key No Encontrado",
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

exports.GetByPaymentMethodId = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let idpaymentmethod = req.body.idpaymentmethod;
        if(idpaymentmethod == null){
            apiR.code = 400;
            apiR.message = "No se registra el <idpaymentmethod>"
            throw apiR;
        }
        let resp = await PaymentMethodKeysB.GetByPaymentMethodId(idpaymentmethod);
        if(resp != null){
            apiR.code = 200;
            apiR.message = "Key encontrado"
            apiR.data = resp
            return res.status(apiR.code).json({... apiR});
        }else{
            throw apiR = {
                message: "Key No Encontrado",
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
