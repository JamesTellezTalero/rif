import "reflect-metadata"
import { DataSource } from "typeorm"
import { Niveles } from "./entities/Niveles"
import { Rifas } from "./entities/Rifas"
import { TiposRifa } from "./entities/TiposRifa"
import { Transacciones } from "./entities/Transacciones"
import { TransaccionStates } from "./entities/TransaccionStates"
import { Usuarios } from "./entities/Usuarios"
import { UsuariosGanadores } from "./entities/UsuariosGanadores"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "root",
    database: "rif",
    synchronize: false,
    logging: false,
    entities: [
        Niveles,
        Rifas,
        TiposRifa,
        Transacciones,
        TransaccionStates,
        Usuarios,
        UsuariosGanadores
    ],
    migrations: [],
    subscribers: [],
})
