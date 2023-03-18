import { getManager } from "typeorm";
import { apiResponse } from "../Models/apiResponse";
import { PaymentMethods } from "../entities/PaymentMethods";

const fs = require('fs');

export class PaymentMethodsBusiness{  

    async Create(item:PaymentMethods):Promise<PaymentMethods>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let paymentMethod = await getManager().getRepository(PaymentMethods).findOne({where:{name: item.name}})
            if(paymentMethod != null){
                apiR.code = 400;
                apiR.message = "Estado Existente"
                apiR.data = paymentMethod
                throw apiR;
            }
            await getManager().getRepository(PaymentMethods).save(item)
            paymentMethod = await getManager().getRepository(PaymentMethods).findOne({where:{name: item.name}})
            if(paymentMethod != null){
                return paymentMethod;
            }else{
                throw apiR = {
                    message: "Estados No Creado",
                    code: 400,
                    data: paymentMethod 
                }
            }
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

    async Update(item:PaymentMethods):Promise<PaymentMethods>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let paymentMethod = await getManager().getRepository(PaymentMethods).findOne({where:{id: item.id}})
            if(paymentMethod == null){
                apiR.code = 400;
                apiR.message = "Estado Inexistente"
                apiR.data = paymentMethod
                throw apiR;
            }
            paymentMethod.name = item.name
            paymentMethod.url = item.url
            paymentMethod.status = item.status
            console.log(paymentMethod);
            await getManager().getRepository(PaymentMethods).save(paymentMethod)
            paymentMethod = await getManager().getRepository(PaymentMethods).findOne({where:{name: paymentMethod.name}})
            if(paymentMethod != null){
                return paymentMethod;
            }else{
                throw apiR = {
                    message: "Estados No Actualizado",
                    code: 400,
                    data: paymentMethod 
                }
            }
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

    async GetAll():Promise<PaymentMethods[]>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let paymentMethods = await getManager().getRepository(PaymentMethods).find()
            return paymentMethods;
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

    async GetById(id:number):Promise<PaymentMethods>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let paymentMethod = await getManager().getRepository(PaymentMethods).findOne({where:{id: id}})
            return paymentMethod;
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

    async GetByName(name:string):Promise<PaymentMethods>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let paymentMethod = await getManager().getRepository(PaymentMethods).findOne({where:{name: name}})
            return paymentMethod;
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