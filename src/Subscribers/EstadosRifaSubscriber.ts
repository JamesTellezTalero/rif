import { Entity, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { EstadosRifa } from '../entities/EstadosRifa';

@EventSubscriber()
export class EstadosRifaSubscriber {
    listenTo() {
        return EstadosRifa;
    }

    async beforeInsert(event: InsertEvent<EstadosRifa>) {
        event.entity.createAt = new Date();
    }

    async beforeUpdate(event: UpdateEvent<EstadosRifa>) {
        event.entity.updateAt = new Date();
    }
}