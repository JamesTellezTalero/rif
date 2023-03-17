import axios from "axios";
import { PayPalAuthResponse, PayPalOrderReq, PayPalOrderRes } from "../Models/PayPalModel";
import { RifasBusiness } from "./RifasBusiness";

const RifasB = new RifasBusiness();

let PAYPAL_URL = "https://api-m.sandbox.paypal.com/";
let CLIENT_ID = "ATwaz0qlu8XdbcOp37O7VWNDVr0cWCiwM4O-ZJ2-L-vTY5vUx7Tp2Bye9Y5fVE_cesGPKDakvA5xO5HN";
let CLIENT_SECRET = "EIKyRiYRocpdSoOYs_A7Xd_-QKIQ6uPJLKlq6CcX4wrh67tMrj9uvNgWbd965BVojxUJNDWeo5XPb-Tf";
// PAYPAL_URL=https://api-m.sandbox.paypal.com/
// CLIENT_ID=ATwaz0qlu8XdbcOp37O7VWNDVr0cWCiwM4O-ZJ2-L-vTY5vUx7Tp2Bye9Y5fVE_cesGPKDakvA5xO5HN
// CLIENT_SECRET=EIKyRiYRocpdSoOYs_A7Xd_-QKIQ6uPJLKlq6CcX4wrh67tMrj9uvNgWbd965BVojxUJNDWeo5XPb-Tf
// let PAYPAL_URL = process.env.PAYPAL_URL
// let CLIENT_ID = process.env.CLIENT_ID
// let CLIENT_SECRET = process.env.CLIENT_SECRET

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
        try {
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
        } catch (error) {
            throw error;
        }
    }
    
    async CreateOrder(paypalReq: PayPalOrderReq):Promise<PayPalOrderRes>{
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
    
    async ShowOrder(idOrder: string):Promise<PayPalOrderRes>{
        try {
            let url = PAYPAL_URL + "v2/checkout/orders/" + idOrder
            let auth = await this.Authentication();
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