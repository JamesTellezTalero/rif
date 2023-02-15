import { Entity, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { UsuariosGanadores } from '../entities/UsuariosGanadores';

@EventSubscriber()
export class UsuariosGanadoresSubscriber {
    listenTo() {
        return UsuariosGanadores;
    }

    async beforeInsert(event: InsertEvent<UsuariosGanadores>) {
        event.entity.createAt = new Date();
    }

    async beforeUpdate(event: UpdateEvent<UsuariosGanadores>) {
        event.entity.updateAt = new Date();
    }
}