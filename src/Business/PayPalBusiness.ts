import axios from "axios";
import { EnvConfig } from '../Config/EnvConfig';
import { PayPalAuthResponse, PayPalOrderReq, PayPalOrderRes } from "../Models/PayPalModel";
import { RifasBusiness } from "./RifasBusiness";
import { UserKeysBusiness } from "./UserKeysBusiness";
import { UsuariosBusiness } from "./UsuariosBusiness";
import { apiResponse } from "../Models/apiResponse";

const RifasB = new RifasBusiness();
const UserKeysB = new UserKeysBusiness();
const UsuariosB = new UsuariosBusiness();

export class PayPalBusiness{

    async GenerarEstructuraOrder(idRifa:number):Promise<PayPalOrderReq>{
        let rifa = await RifasB.GetById(idRifa);
        console.log(rifa);
        // {
        //     "intent": "CAPTURE",
        //     "purchase_units": [
        //         {
        //             "items": [
        //                 {
        //                     "name": "T-Shirt",
        //                     "description": "Green XL",
        //                     "quantity": "1",
        //                     "unit_amount": {
        //                         "currency_code": "USD",
        //                         "value": "1"
        //                     }
        //                 }
        //             ],
        //             "amount": {
        //                 "currency_code": "USD",
        //                 "value": "1",
        //                 "breakdown": {
        //                     "item_total": {
        //                         "currency_code": "USD",
        //                         "value": "1"
        //                     }
        //                 }
        //             }
        //         }
        //     ],
        //     "application_context": {
        //         "return_url": "https://example.com/return",
        //         "cancel_url": "https://example.com/cancel"
        //     }
        // }
        return new PayPalOrderReq();
    }

    async Authentication(idUsuario:number):Promise<PayPalAuthResponse>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let usuario = await UsuariosB.GetById(idUsuario)
            if (usuario.id == null){
                apiR.code = 400;
                apiR.message = "Usuario Inexistente"
                apiR.data = []
                throw apiR;
            }
            let keys = await UserKeysB.GetByUsuarioId(idUsuario)
            let Client = keys.find(e => e.key.name == "CLIENT_ID");
            let Sercret = keys.find(e => e.key.name == "CLIENT_SECRET");
            if (Client?.value == null || Sercret?.value == null){
                apiR.code = 400;
                apiR.message = "LLaves Inconsistentes"
                apiR.data = []
                throw apiR;
            }
            const config = await EnvConfig.getInstance();
            const pUrl = await config.get('PAYPAL_URL');
            let url = pUrl + "v1/oauth2/token?grant_type=client_credentials"
            let auth = Buffer. from(`${Client.value}:${Sercret.value}`).toString('base64');
            let resp = await axios.post(url, null, {
                headers: {
                    Authorization: `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            return resp.data
        } catch (error) {
            throw error;
        }
    }
    
    async CreateOrder(paypalReq: PayPalOrderReq, idUsuario:number):Promise<PayPalOrderRes>{
        try {
            const config = await EnvConfig.getInstance();
            const pUrl = await config.get('PAYPAL_URL');
            let url = pUrl + "v2/checkout/orders"
            let auth = await this.Authentication(idUsuario);
            let resp = await axios.post(url, paypalReq, {
                headers: {
                    Authorization: `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json',
                }
            })
            return resp.data
        } catch (error) {
            throw error
        }
    }
    
    async ShowOrder(idOrder: string, idUsuario):Promise<PayPalOrderRes>{
        try {
            const config = await EnvConfig.getInstance();
            const pUrl = await config.get('PAYPAL_URL');
            let url = pUrl + "v2/checkout/orders/" + idOrder
            let auth = await this.Authentication(idUsuario);
            let resp = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json',
                }
            })
            return resp.data
        } catch (error) {
            console.log(error);
            let resp = new PayPalOrderRes()
            resp.status = "ERROR"; 
            return resp;
        }
    }
}