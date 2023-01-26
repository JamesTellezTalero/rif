import { Entity, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { Rifas } from '../entities/Rifas';

@EventSubscriber()
export class RifasSubscriber {
    listenTo() {
        return Rifas;
    }

    async beforeInsert(event: InsertEvent<Rifas>) {
        event.entity.createAt = new Date();
    }

    async beforeUpdate(event: UpdateEvent<Rifas>) {
        event.entity.updatedAt = new Date();
    }
}