import axios from "axios";
import { PayPalAuthResponse, PayPalOrderReq } from "../Models/PayPalModel";
import { RifasBusiness } from "./RifasBusiness";

const RifasB = new RifasBusiness();

let PAYPAL_URL = process.env.PAYPAL_URL
let CLIENT_ID = process.env.CLIENT_ID
let CLIENT_SECRET = process.env.CLIENT_SECRET
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

    async Authentication():Promise<PayPalAuthResponse>{
        let url = PAYPAL_URL + "v1/oauth2/token?grant_type=client_credentials"
        let auth = Buffer. from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
        let resp = await axios.post(url, null, {
            headers: {
                Authorization: `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        console.log(resp.data);
        return resp.data
    }
    
    async CreateOrder(paypalReq: PayPalOrderReq){
        let url = PAYPAL_URL + "v2/checkout/orders"
        let auth = await this.Authentication();
        let resp = await axios.post(url, paypalReq, {
            headers: {
                Authorization: `Bearer ${auth.access_token}`,
                'Content-Type': 'application/json',
            }
        })
        return resp.data
    }
    
    async ShowOrder(){
        let url = PAYPAL_URL + "v2/checkout/orders/8YR11998844534841"
        let auth = await this.Authentication();
        let resp = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${auth}`,
                'Content-Type': 'application/json',
            }
        })
        return resp.data
    }
}