import { Entity, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { ParticipantesRifa } from '../entities/ParticipantesRifa';

@EventSubscriber()
export class ParticipantesRifaSubscriber  {
    listenTo() {
        return ParticipantesRifa;
    }

    async beforeInsert(event: InsertEvent<ParticipantesRifa>) {
        event.entity.createAt = new Date();
    }

    async beforeUpdate(event: UpdateEvent<ParticipantesRifa>) {
        event.entity.updateAt = new Date();
    }
}