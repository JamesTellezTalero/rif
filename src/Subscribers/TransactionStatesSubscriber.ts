import { Entity, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { TransactionStates } from '../entities/TransactionStates';

@EventSubscriber()
export class TransactionStatesSubscriber {
    listenTo() {
        return TransactionStates;
    }

    async beforeInsert(event: InsertEvent<TransactionStates>) {
        event.entity.createAt = new Date();
    }

    async beforeUpdate(event: UpdateEvent<TransactionStates>) {
        event.entity.updateAt = new Date();
    }
}