import { Entity, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { TiposRifa } from '../entities/TiposRifa';

@EventSubscriber()
export class TiposRifaSubscriber {
    listenTo() {
        return TiposRifa;
    }

    async beforeInsert(event: InsertEvent<TiposRifa>) {
        event.entity.createAt = new Date();
    }

    async beforeUpdate(event: UpdateEvent<TiposRifa>) {
        event.entity.updateAt = new Date();
    }
}