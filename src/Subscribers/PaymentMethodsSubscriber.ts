import { EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { PaymentMethods } from "../entities/PaymentMethods";

@EventSubscriber()
export class PaymentMethodsSubscriber {
    listenTo(){
        return PaymentMethods;
    }

    async beforeInsert(event:InsertEvent<PaymentMethods>){
        event.entity.createAt = new Date();
    }

    async beforeUpdate(event:UpdateEvent<PaymentMethods>){
        event.entity.updateAt = new Date();
    }
}