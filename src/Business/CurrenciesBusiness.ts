import { getManager } from "typeorm";
import { apiResponse } from "../Models/apiResponse";
import { Currencies } from "../entities/Currencies";

const fs = require('fs');

export class CurrenciesBusiness{  

    async Create(item:Currencies):Promise<Currencies>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let currency = await getManager().getRepository(Currencies).findOne({where:{name: item.name}})
            if(currency != null){
                apiR.code = 400;
                apiR.message = "Currency Existente"
                apiR.data = currency
                throw apiR;
            }
            await getManager().getRepository(Currencies).save(item)
            currency = await getManager().getRepository(Currencies).findOne({where:{name: item.name}})
            if(currency != null){
                return currency;
            }else{
                throw apiR = {
                    message: "Currency No Creado",
                    code: 400,
                    data: currency 
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

    async Update(item:Currencies):Promise<Currencies>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let currency = await getManager().getRepository(Currencies).findOne({where:{id: item.id}})
            if(currency == null){
                apiR.code = 400;
                apiR.message = "Currency Inexistente"
                apiR.data = currency
                throw apiR;
            }
            currency.name = item.name
            currency.code = item.code
            currency.symbol = item.symbol
            currency.status = item.status
            console.log(currency);
            await getManager().getRepository(Currencies).save(currency)
            currency = await getManager().getRepository(Currencies).findOne({where:{name: currency.name}})
            if(currency != null){
                return currency;
            }else{
                throw apiR = {
                    message: "Currency No Actualizado",
                    code: 400,
                    data: currency 
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

    async GetAll():Promise<Currencies[]>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let currencies = await getManager().getRepository(Currencies).find()
            return currencies;
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

    async GetById(id:number):Promise<Currencies>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let currency = await getManager().getRepository(Currencies).findOne({where:{id: id}})
            return currency;
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

    async GetByCode(code:string):Promise<Currencies>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let currency = await getManager().getRepository(Currencies).findOne({where:{code: code}})
            return currency;
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