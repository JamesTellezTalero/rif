import { Entity, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { Currencies } from '../entities/Currencies';

@EventSubscriber()
export class CurrenciesSubscriber {
    listenTo() {
        return Currencies;
    }

    async beforeInsert(event: InsertEvent<Currencies>) {
        event.entity.createAt = new Date();
    }

    async beforeUpdate(event: UpdateEvent<Currencies>) {
        event.entity.updateAt = new Date();
    }
}