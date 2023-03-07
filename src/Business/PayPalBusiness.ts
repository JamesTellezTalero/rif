import axios from "axios";

let PAYPAL_URL = process.env.PAYPAL_URL
let CLIENT_ID = process.env.CLIENT_ID
let CLIENT_SECRET = process.env.CLIENT_SECRET
export class PayPalBusiness{
    async Authentication(){
        let url = PAYPAL_URL + "v1/oauth2/token?grant_type=client_credentials"
        let auth = Buffer. from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
        let resp = await axios.post(url, null, {
            headers: {
                Authorization: `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        return resp.data.access_token 
    }
    
    async CreateOrder(){
        let url = PAYPAL_URL + "v2/checkout/orders"
        let auth = await this.Authentication();
        let resp = await axios.post(url, {
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "items": [
                        {
                            "name": "T-Shirt",
                            "description": "Green XL",
                            "quantity": "1",
                            "unit_amount": {
                                "currency_code": "USD",
                                "value": "1"
                            }
                        }
                    ],
                    "amount": {
                        "currency_code": "USD",
                        "value": "1",
                        "breakdown": {
                            "item_total": {
                                "currency_code": "USD",
                                "value": "1"
                            }
                        }
                    }
                }
            ],
            "application_context": {
                "return_url": "https://example.com/return",
                "cancel_url": "https://example.com/cancel"
            }
        }, {
            headers: {
                Authorization: `Bearer ${auth}`,
                'Content-Type': 'application/json',
            }
        })
        return resp.data
    }
    
    async ShowOrder(){
        let url = PAYPAL_URL + "v2/checkout/orders/0DL996186U452430Y"
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