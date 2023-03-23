import { PayPalBusiness } from "../Business/PayPalBusiness"
import { TransaccionesBusiness } from "../Business/TransaccionesBusiness";
import { UsuariosBusiness } from "../Business/UsuariosBusiness";
import { PayPalOrderReq } from "../Models/PayPalModel";
import { apiResponse } from "../Models/apiResponse";

const PayPalB = new  PayPalBusiness();
const TransaccionesB = new TransaccionesBusiness();
const UsuariosB = new UsuariosBusiness();

exports.Authentication = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        ///// PENDING
        let user = await UsuariosB.DecrypLogin(req.headers.authorization.split(" ")[1])
        apiR.data = await PayPalB.Authentication(user.id)
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
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        ///// PENDING
        let user = await UsuariosB.DecrypLogin(req.headers.authorization.split(" ")[1])
        let id = req.query.id;
        if(id == null){
            apiR.data = {}
            apiR.code = 400;
            apiR.message = "No se registra la propiedad <id>"
            throw apiR;
        }else{
            apiR.data = await PayPalB.ShowOrder(id, user.id)
            apiR.code = 200;
            apiR.message = "create token"
            res.status(200).send(apiR)
        }
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