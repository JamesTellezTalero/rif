import { Entity, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { Transacciones } from '../entities/Transacciones';

@EventSubscriber()
export class TransaccionesSubscriber {
    listenTo() {
        return Transacciones;
    }

    async beforeInsert(event: InsertEvent<Transacciones>) {
        event.entity.createAt = new Date();
    }

    async beforeUpdate(event: UpdateEvent<Transacciones>) {
        event.entity.updateAt = new Date();
    }
}