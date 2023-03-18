import { EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { PaymentMethodKeys } from "../entities/PaymentMethodKeys";

@EventSubscriber()
export class PaymentMethodKeysSubscriber {
    listenTo(){
        return PaymentMethodKeys;
    }

    async beforeInsert(event:InsertEvent<PaymentMethodKeys>){
        event.entity.createAt = new Date();
    }

    async beforeUpdate(event:UpdateEvent<PaymentMethodKeys>){
        event.entity.updateAt = new Date();
    }
}