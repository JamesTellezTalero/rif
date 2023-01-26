import { Entity, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { Usuarios } from '../entities/Usuarios';

@EventSubscriber()
export class UsuariosSubscriber {
    listenTo() {
        return Usuarios;
    }

    async beforeInsert(event: InsertEvent<Usuarios>) {
        event.entity.createAt = new Date();
    }

    async beforeUpdate(event: UpdateEvent<Usuarios>) {
        event.entity.updatedAt = new Date();
    }
}
