import { Entity, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { GanadoresRifa } from '../entities/GanadoresRifa';

@EventSubscriber()
export class GanadoresRifaSubscriber {
    listenTo() {
        return GanadoresRifa;
    }

    async beforeInsert(event: InsertEvent<GanadoresRifa>) {
        event.entity.createAt = new Date();
    }

    async beforeUpdate(event: UpdateEvent<GanadoresRifa>) {
        event.entity.updateAt = new Date();
    }
}