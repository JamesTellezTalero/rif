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
import { GanadoresRifaSubscriber } from "./Subscribers/GanadoresRifaSubscriber"
import { ParticipantesRifaSubscriber } from "./Subscribers/ParticipantesRifaSubscriber"
import { EstadosRifa } from "./entities/EstadosRifa"
import { Niveles } from "./entities/Niveles"
import { Participantes } from "./entities/Participantes"
import { Rifas } from "./entities/Rifas"
import { TipoDocumento } from "./entities/TipoDocumento"
import { TiposRifa } from "./entities/TiposRifa"
import { TransactionStates } from "./entities/TransactionStates"
import { Transacciones } from "./entities/Transacciones"
import { Usuarios } from "./entities/Usuarios"
import { ParticipantesRifa } from "./entities/ParticipantesRifa"
import { GanadoresRifa } from "./entities/GanadoresRifa"
import { UserKeys } from "./entities/UserKeys"
import { PaymentMethods } from "./entities/PaymentMethods"
import { PaymentMethodKeys } from "./entities/PaymentMethodKeys"
import { UserKeysSubscriber } from "./Subscribers/UserKeysSubscriber"
import { PaymentMethodsSubscriber } from "./Subscribers/PaymentMethodsSubscriber"
import { PaymentMethodKeysSubscriber } from "./Subscribers/PaymentMethodKeysSubscriber"
import { Currencies } from "./entities/Currencies"
import { CurrenciesSubscriber } from "./Subscribers/CurrenciesSubscriber"

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
        Currencies,
        EstadosRifa,
        GanadoresRifa,
        Niveles,
        Participantes,
        ParticipantesRifa,
        PaymentMethodKeys,
        PaymentMethods,
        Rifas,
        TipoDocumento,
        TiposRifa,
        Transacciones,
        TransactionStates,
        UserKeys,
        Usuarios,
    ],
    migrations: [],
    subscribers: [
        CurrenciesSubscriber,
        EstadosRifaSubscriber,
        GanadoresRifaSubscriber,
        NivelesSubscriber,
        ParticipantesSubscriber,
        RifasSubscriber,
        TipoDocumentoSubscriber,
        TiposRifaSubscriber,
        TransaccionesSubscriber,
        TransactionStatesSubscriber,
        ParticipantesRifaSubscriber,
        PaymentMethodKeysSubscriber,
        PaymentMethodsSubscriber,
        UsuariosSubscriber,
        UserKeysSubscriber,
    ],
}
