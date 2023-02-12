import "reflect-metadata"
import { ConnectionOptions, DataSource } from "typeorm"
////
import { EstadosRifaSubscriber } from "./Subscribers/EstadosRifaSubscriber"
import { UsuariosSubscriber } from "./Subscribers/UsuariosSubscriber"
import { NivelesSubscriber } from "./Subscribers/NivelesSubscriber"
import { ParticipantesSubscriber } from "./Subscribers/ParticipantesSubscriber"
import { RifasSubscriber } from "./Subscribers/RifasSubscriber"
import { TipoDocumentoSubscriber } from "./Subscribers/TipoDocumentoSubscriber"
import { TiposRifaSubscriber } from "./Subscribers/TiposRifaSubscriber"
import { TransaccionesSubscriber } from "./Subscribers/TransaccionesSubscriber"
import { TransactionStatesSubscriber } from "./Subscribers/TransactionStatesSubscriber"
import { UsuariosGanadoresSubscriber } from "./Subscribers/UsuariosGanadoresSubscriber"
import { UsuariosParticipantesSubscriber } from "./Subscribers/UsuariosParticipantesSubscriber"
import { EstadosRifa } from "./entities/EstadosRifa"
import { Niveles } from "./entities/Niveles"
import { Participantes } from "./entities/Participantes"
import { Rifas } from "./entities/Rifas"
import { TipoDocumento } from "./entities/TipoDocumento"
import { TiposRifa } from "./entities/TiposRifa"
import { TransactionStates } from "./entities/TransactionStates"
import { Transacciones } from "./entities/Transacciones"
import { Usuarios } from "./entities/Usuarios"
import { UsuariosGanadores } from "./entities/UsuariosGanadores"
import { UsuariosParticipantes } from "./entities/UsuariosParticipantes"

export const AppDataSource:ConnectionOptions ={
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "root",
    database: "rif",
    synchronize: true,
    logging: false,
    entities: [
        EstadosRifa,
        Niveles,
        Participantes,
        Rifas,
        TipoDocumento,
        TiposRifa,
        Transacciones,
        TransactionStates,
        Usuarios,
        UsuariosGanadores,
        UsuariosParticipantes
    ],
    migrations: [],
    subscribers: [
        EstadosRifaSubscriber,
        NivelesSubscriber,
        ParticipantesSubscriber,
        RifasSubscriber,
        TipoDocumentoSubscriber,
        TiposRifaSubscriber,
        TransaccionesSubscriber,
        TransactionStatesSubscriber,
        UsuariosSubscriber,
        UsuariosGanadoresSubscriber,
        UsuariosParticipantesSubscriber
    ],
}
