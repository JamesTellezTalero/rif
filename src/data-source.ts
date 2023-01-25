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
        Rifas,
        TiposRifa,
        Transacciones,
        TransactionStates,
        Usuarios,
        UsuariosGanadores
    ],
    migrations: [],
    subscribers: [],
}
