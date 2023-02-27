import { Entity, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { Transacciones } from '../entities/Transacciones';
import { TransaccionesBusiness } from '../Business/TransaccionesBusiness';
import { RifasBusiness } from '../Business/RifasBusiness';
import { ParticipantesRifaBusiness } from '../Business/ParticipantesRifaBusiness';

const TransaccionesB = new TransaccionesBusiness();
const RifasB = new RifasBusiness();
const ParticipantesRifaB = new ParticipantesRifaBusiness();

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
        let actual = await TransaccionesB.GetById(event.entity.id)
        let participante = await ParticipantesRifaB.GetById(event.entity.participanterifa.id)
        if(event.entity.transactionState.name == 'Exitosa' && actual.transactionState.name != 'Exitosa'){
            await RifasB.ProcesarTransaccion(actual, true)
            await ParticipantesRifaB.Update(participante, true)
        }else if(event.entity.transactionState.name != 'Exitosa' && actual.transactionState.name == 'Exitosa'){
            await RifasB.ProcesarTransaccion(actual, false)
            await ParticipantesRifaB.Update(participante, false)
        }
    }
}