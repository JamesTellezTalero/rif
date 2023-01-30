import { Entity, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { UsuariosParticipantes } from '../entities/UsuariosParticipantes';

@EventSubscriber()
export class UsuariosParticipantesSubscriber  {
    listenTo() {
        return UsuariosParticipantes;
    }

    async beforeInsert(event: InsertEvent<UsuariosParticipantes>) {
        event.entity.createAt = new Date();
    }

    async beforeUpdate(event: UpdateEvent<UsuariosParticipantes>) {
        event.entity.updatedAt = new Date();
    }
}