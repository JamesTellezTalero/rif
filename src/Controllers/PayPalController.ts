import { PayPalBusiness } from "../Business/PayPalBusiness"
import { PayPalOrderReq } from "../Models/PayPalModel";
import { apiResponse } from "../Models/apiResponse";

const PayPalB = new  PayPalBusiness();

exports.Authentication = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        apiR.data = await PayPalB.Authentication()
        apiR.code = 200;
        apiR.message = "create token"
        res.status(apiR.code).send(apiR)
    } catch (error) {
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

exports.CreateOrder = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let paypalReq = new PayPalOrderReq();
        paypalReq = {
            ... req.body
        }
        // console.log(paypalReq.purchase_units);
        // console.log(paypalReq.purchase_units);
        // if(paypalReq.intent == null){
        //     throw {
        //         code: 400,
        //         message: "La propiedad <intent> no ha sido enviada."
        //     }
        // } else if(paypalReq.purchase_units == null){
        //     throw {
        //         code: 400,
        //         message: "La propiedad <purchase_units> no ha sido enviada."
        //     }
        // } else if(paypalReq.application_context == null){
        //     throw {
        //         code: 400,
        //         message: "La propiedad <application_context> no ha sido enviada."
        //     }
        // } else if(paypalReq.application_context.cancel_url == null){
        //     throw {
        //         code: 400,
        //         message: "La propiedad <application_contex.cancel_urlt> no ha sido enviada."
        //     }
        // } else if(paypalReq.application_context.return_url == null){
        //     throw {
        //         code: 400,
        //         message: "La propiedad <application_contex.return_urlt> no ha sido enviada."
        //     }
        // }
        apiR.data = await PayPalB.CreateOrder(req.body);
        apiR.code = 200;
        apiR.message = "create token"
        res.status(apiR.code).send(apiR)
    } catch (error) {
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

exports.ShowOrder = async (req, res) => {
    let resp = await PayPalB.ShowOrder()
    res.status(200).send(resp)
} 