import { getManager } from "typeorm";
import { Transacciones } from "../entities/Transacciones";
import { Rifas } from "../entities/Rifas";
import { TransactionStates } from "../entities/TransactionStates";
import { ParticipantesRifa } from "../entities/ParticipantesRifa";
import { PayPalBusiness } from "./PayPalBusiness";
import { PayPalOrderReq } from "../Models/PayPalModel";
import { TransactionStatesBusiness } from "./TransactionStatesBusiness";

const PayPalB = new PayPalBusiness();
const TransactionStatesB = new TransactionStatesBusiness();

export class TransaccionesBusiness{
    async Create(item:Transacciones):Promise<Transacciones>{
        return await getManager().getRepository(Transacciones).save(item);
    }

    async LinkOrder(item:Transacciones):Promise<Transacciones>{
        try {
            let paypalReq:PayPalOrderReq = {
                intent: "CAPTURE",
                purchase_units: [
                    {
                        items: [
                            {
                                name: item.id.toString(),
                                description: item.orden,
                                quantity: "1",
                                unit_amount: {
                                    currency_code: "USD",
                                    value: item.amount.toString()
                                }
                            }
                        ],
                        amount: {
                            currency_code: "USD",
                            value: "1",
                            breakdown: {
                                item_total: {
                                    currency_code: "USD",
                                    value: item.amount.toString()
                                }
                            }
                        }
                    }
                ],
                application_context: {
                    return_url: "https://example.com/return",
                    cancel_url: "https://example.com/cancel"
                }
            }
            let data = await PayPalB.CreateOrder(paypalReq);
            item.dinamicorden = data.id;
            let paymentlink = data.links.find(e => e.rel == 'approve');
            item.paymentlink = paymentlink.href;
            item.jsonresp = JSON.stringify(data);
            return await getManager().getRepository(Transacciones).save(item);
        } catch (error) {
            throw error;
        }
    }
    
    async Update(item:Transacciones):Promise<Transacciones>{
        return getManager().getRepository(Transacciones).save(item);
    }
    
    async UpdateTranPaymentState(idtran:number):Promise<Transacciones>{
        try {
            let tran = await this.GetById(idtran)
            let order = await PayPalB.ShowOrder(tran.dinamicorden)
            console.log(order); 
            if(order.status == "CREATED"){
                tran.transactionState = await TransactionStatesB.GetByName("Creada")
            } else if(order.status == "SAVED"){
                tran.transactionState = await TransactionStatesB.GetByName("Pendiente")
            } else if(order.status == "APPROVED"){
                tran.transactionState = await TransactionStatesB.GetByName("Exitosa")
            } else if(order.status == "VOIDED"){
                tran.transactionState = await TransactionStatesB.GetByName("Cancelada")
            } else if(order.status == "COMPLETED"){
                tran.transactionState = await TransactionStatesB.GetByName("Exitosa")
            } else if(order.status == "PAYER_ACTION_REQUIRED"){
                tran.transactionState = await TransactionStatesB.GetByName("Pendiente")
            } 
            return getManager().getRepository(Transacciones).save(tran);
        } catch (error) {
            throw error;
        }
    }

    async GetAll():Promise<Transacciones[]>{
        return getManager().getRepository(Transacciones).find({
            order: {
                id: 'DESC'
            }
        });
    }
    
    async GetById(id:number):Promise<Transacciones>{
        return getManager().getRepository(Transacciones).findOne({
            where:{ id },
            relations:['rifa', 'participanterifa', 'transactionState']
        });
    }
    
    async GetByOrden(orden:string):Promise<Transacciones>{
        return getManager().getRepository(Transacciones).findOne({
            where:{ orden },
            relations:['rifa', 'participanterifa', 'transactionState']
        });
    }

    async GetByRifa(rifa:Rifas):Promise<Transacciones[]>{
        return getManager().getRepository(Transacciones).find({
            where:{ rifa },
            relations:['rifa', 'participanterifa', 'transactionState'],
            order: {
                id: 'DESC'
            }
        });
    }

    async GetByParticipanteRifa(participanterifa:ParticipantesRifa):Promise<Transacciones[]>{
        return getManager().getRepository(Transacciones).find({
            where:{ participanterifa },
            relations:['rifa', 'participanterifa', 'transactionState'],
            order: {
                id: 'DESC'
            }
        });
    }

    async GetByState(transactionState:TransactionStates):Promise<Transacciones[]>{
        return getManager().getRepository(Transacciones).find({
            where:{ transactionState },
            relations:['rifa', 'participanterifa', 'transactionState'],
            order: {
                id: 'DESC'
            }
        });
    }
    
    async GetByStatesNames(names:Array<string>):Promise<Transacciones[]>{
        let trans = await getManager().getRepository(Transacciones).createQueryBuilder("T")
            .leftJoinAndSelect("T.transactionState", "TS")
            .where("TS.name IN (:...names)", {names})
            .getMany();
        return trans.filter(e => e.dinamicorden != null)
    }
}