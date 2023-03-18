import { getManager } from "typeorm";
import { PaymentMethodKeys } from "../entities/PaymentMethodKeys";
import { apiResponse } from "../Models/apiResponse";
import { PaymentMethodsBusiness } from "./PaymentMethodsBusiness";

const PaymentMethodsB = new PaymentMethodsBusiness();

export class PaymentMethodKeysBusiness{  

    async Create(key:PaymentMethodKeys):Promise<PaymentMethodKeys>{
        let apiR = new apiResponse();
        apiR.data = {}
        try {
            let Key = await getManager().getRepository(PaymentMethodKeys).save(key)
            return await this.GetById(Key.id);
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;
        }
    }
    
    async GetAll():Promise<PaymentMethodKeys[]>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let key = await getManager().getRepository(PaymentMethodKeys).find({relations:['paymentMethod']})
            return key;
        } catch (error) {
            if(error?.code === 400){
                throw apiR;          
            } else{
                apiR.code = 500;
                apiR.message = error
                throw apiR;          
            }            
        }
    }
    
    async GetById(id:number):Promise<PaymentMethodKeys>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let key = await getManager().getRepository(PaymentMethodKeys).findOne({where:{id: id}, relations:['paymentMethod']})
            return key;
        } catch (error) {
            if(error?.code === 400){
                throw apiR;          
            } else{
                apiR.code = 500;
                apiR.message = error
                throw apiR;          
            }            
        }
    }
    
    async GetByPaymentMethodId(id:number):Promise<PaymentMethodKeys[]>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let paymentMethod = await PaymentMethodsB.GetById(id);
            let key = await getManager().getRepository(PaymentMethodKeys).find({where:{paymentMethod}, relations:['paymentMethod']})
            return key;
        } catch (error) {
            if(error?.code === 400){
                throw apiR;          
            } else{
                apiR.code = 500;
                apiR.message = error
                throw apiR;          
            }            
        }
    }
}