import { Entity, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { Participantes } from '../entities/Participantes';

@EventSubscriber()
export class ParticipantesSubscriber  {
    listenTo() {
        return Participantes;
    }

    async beforeInsert(event: InsertEvent<Participantes>) {
        event.entity.createAt = new Date();
    }

    async beforeUpdate(event: UpdateEvent<Participantes>) {
        event.entity.updatedAt = new Date();
    }
}