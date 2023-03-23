import axios from "axios";
import { PayPalAuthResponse, PayPalOrderReq, PayPalOrderRes } from "../Models/PayPalModel";
import { RifasBusiness } from "./RifasBusiness";
import { UserKeysBusiness } from "./UserKeysBusiness";
import { UsuariosBusiness } from "./UsuariosBusiness";
import { apiResponse } from "../Models/apiResponse";

const RifasB = new RifasBusiness();
const UserKeysB = new UserKeysBusiness();
const UsuariosB = new UsuariosBusiness();

// let PAYPAL_URL = "https://api-m.sandbox.paypal.com/";
// let CLIENT_ID = "ATwaz0qlu8XdbcOp37O7VWNDVr0cWCiwM4O-ZJ2-L-vTY5vUx7Tp2Bye9Y5fVE_cesGPKDakvA5xO5HN";
// let CLIENT_SECRET = "EIKyRiYRocpdSoOYs_A7Xd_-QKIQ6uPJLKlq6CcX4wrh67tMrj9uvNgWbd965BVojxUJNDWeo5XPb-Tf";
// PAYPAL_URL=https://api-m.sandbox.paypal.com/
// CLIENT_ID=ATwaz0qlu8XdbcOp37O7VWNDVr0cWCiwM4O-ZJ2-L-vTY5vUx7Tp2Bye9Y5fVE_cesGPKDakvA5xO5HN
// CLIENT_SECRET=EIKyRiYRocpdSoOYs_A7Xd_-QKIQ6uPJLKlq6CcX4wrh67tMrj9uvNgWbd965BVojxUJNDWeo5XPb-Tf
// let PAYPAL_URL = process.env.PAYPAL_URL
// let CLIENT_ID = process.env.CLIENT_ID
// let CLIENT_SECRET = process.env.CLIENT_SECRET

export class PayPalBusiness{
    private PAYPAL_URL = process.env.PAYPAL_URL

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
            let url = this.PAYPAL_URL + "v1/oauth2/token?grant_type=client_credentials"
            let auth = Buffer. from(`${Client.value}:${Sercret.value}`).toString('base64');
            let resp = await axios.post(url, null, {
                headers: {
                    Authorization: `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            console.log(resp.data);
            return resp.data
        } catch (error) {
            throw error;
        }
    }
    
    async CreateOrder(paypalReq: PayPalOrderReq, idUsuario:number):Promise<PayPalOrderRes>{
        try {
            let url = this.PAYPAL_URL + "v2/checkout/orders"
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
            let url = this.PAYPAL_URL + "v2/checkout/orders/" + idOrder
            let auth = await this.Authentication(idUsuario);
            let resp = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${auth.access_token}`,
                    'Content-Type': 'application/json',
                }
            })
            return resp.data
        } catch (error) {
            throw error;
        }
    }
}