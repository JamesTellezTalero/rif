import { Entity, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { TipoDocumento } from '../entities/TipoDocumento';

@EventSubscriber()
export class TipoDocumentoSubscriber  {
    listenTo() {
        return TipoDocumento;
    }

    async beforeInsert(event: InsertEvent<TipoDocumento>) {
        event.entity.createAt = new Date();
    }

    async beforeUpdate(event: UpdateEvent<TipoDocumento>) {
        event.entity.updatedAt = new Date();
    }
}