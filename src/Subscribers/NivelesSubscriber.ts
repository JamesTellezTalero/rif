import { Entity, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { Niveles } from '../entities/Niveles';

@EventSubscriber()
export class NivelesSubscriber {
    listenTo() {
        return Niveles;
    }

    async beforeInsert(event: InsertEvent<Niveles>) {
        event.entity.createAt = new Date();
    }

    async beforeUpdate(event: UpdateEvent<Niveles>) {
        event.entity.updateAt = new Date();
    }
}