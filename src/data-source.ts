import "reflect-metadata"
import { ConnectionOptions, DataSource } from "typeorm"
import { Niveles } from "./entities/Niveles"
import { Rifas } from "./entities/Rifas"
import { TiposRifa } from "./entities/TiposRifa"
import { Transacciones } from "./entities/Transacciones"
import { TransactionStates } from "./entities/TransactionStates"
import { Usuarios } from "./entities/Usuarios"
import { UsuariosGanadores } from "./entities/UsuariosGanadores"
import { EstadosRifa } from "./entities/EstadosRifa"
import { EstadosRifaSubscriber } from "./Subscribers/EstadosRifaSubscriber"
import { UsuariosSubscriber } from "./Subscribers/UsuariosSubscriber"
import { NivelesSubscriber } from "./Subscribers/NivelesSubscriber"
import { RifasSubscriber } from "./Subscribers/RifasSubscriber"
import { TiposRifaSubscriber } from "./Subscribers/TiposRifaSubscriber"
import { TransaccionesSubscriber } from "./Subscribers/TransaccionesSubscriber"
import { TransactionStatesSubscriber } from "./Subscribers/TransactionStatesSubscriber"
import { UsuariosGanadoresSubscriber } from "./Subscribers/UsuariosGanadoresSubscriber"
import { UsuariosParticipantes } from "./entities/UsuariosParticipantes"
import { Participantes } from "./entities/Participantes"
import { TipoDocumento } from "./entities/TipoDocumento"
import { UsuariosParticipantesSubscriber } from "./Subscribers/UsuariosParticipantesSubscriber"
import { ParticipantesSubscriber } from "./Subscribers/ParticipantesSubscriber"
import { TipoDocumentoSubscriber } from "./Subscribers/TipoDocumentoSubscriber"

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
