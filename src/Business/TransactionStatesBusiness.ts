import { getManager } from "typeorm";
import { apiResponse } from "../Models/apiResponse";
import { TransactionStates } from "../entities/TransactionStates";

const fs = require('fs');

export class TransactionStatesBusiness{  

    async Create(item:TransactionStates):Promise<TransactionStates>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let transactionState = await getManager().getRepository(TransactionStates).findOne({where:{name: item.name}})
            if(transactionState != null){
                apiR.code = 400;
                apiR.message = "Estado Existente"
                apiR.data = transactionState
                throw apiR;
            }
            await getManager().getRepository(TransactionStates).save(item)
            transactionState = await getManager().getRepository(TransactionStates).findOne({where:{name: item.name}})
            if(transactionState != null){
                return transactionState;
            }else{
                throw apiR = {
                    message: "Estados No Creado",
                    code: 400,
                    data: transactionState 
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

    async Update(item:TransactionStates):Promise<TransactionStates>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let transactionState = await getManager().getRepository(TransactionStates).findOne({where:{id: item.id}})
            if(transactionState == null){
                apiR.code = 400;
                apiR.message = "Estado Inexistente"
                apiR.data = transactionState
                throw apiR;
            }
            transactionState.name = item.name
            transactionState.status = item.status
            await getManager().getRepository(TransactionStates).save(transactionState)
            transactionState = await getManager().getRepository(TransactionStates).findOne({where:{name: transactionState.name}})
            if(transactionState != null){
                return transactionState;
            }else{
                throw apiR = {
                    message: "Estados No Actualizado",
                    code: 400,
                    data: transactionState 
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

    async GetAll():Promise<TransactionStates[]>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let transactionStates = await getManager().getRepository(TransactionStates).find()
            return transactionStates;
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

    async GetById(id:number):Promise<TransactionStates>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let transactionState = await getManager().getRepository(TransactionStates).findOne({where:{id: id}})
            return transactionState;
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

    async GetByName(name:string):Promise<TransactionStates>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let transactionState = await getManager().getRepository(TransactionStates).findOne({where:{name: name}})
            return transactionState;
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