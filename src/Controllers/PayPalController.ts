import { PayPalBusiness } from "../Business/PayPalBusiness"
import { TransaccionesBusiness } from "../Business/TransaccionesBusiness";
import { PayPalOrderReq } from "../Models/PayPalModel";
import { apiResponse } from "../Models/apiResponse";

const PayPalB = new  PayPalBusiness();
const TransaccionesB = new TransaccionesBusiness();

exports.Authentication = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        ///// PENDING
        apiR.data = await PayPalB.Authentication(1)
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
    // let id = req.query.id;
    // // token del usuario
    // let id = req.query.id;
    // let resp = await PayPalB.ShowOrder(id)
    // res.status(200).send(resp)
    res.status(200).send("resp")
} 