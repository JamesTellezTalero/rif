import { Table, TableForeignKey, createConnection } from "typeorm";
import { AppDataSource } from "../data-source";

var express = require('express');

const app = express();

// Tu código para configurar tu aplicación Express

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    // Establecer un temporizador para detener el servidor después de 5 minutos
    createConnection(AppDataSource).then(async (connection) => {
        console.log("Database Conected")
        const EstadosRifa = new Table({
            name: 'EstadosRifa',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'status',
                    type: 'boolean',
                    isNullable: false,
                    default: true
                },
                {
                    name: 'createAt',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: false,
                },
            ]
        });
        await connection.createQueryRunner().createTable(EstadosRifa);
        console.log("");
        console.log("Creacion de la tabla EstadosRifa");
        console.log("");
        const TiposRifa = new Table({
            name: 'TiposRifa',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'recompenza',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'status',
                    type: 'boolean',
                    isNullable: false,
                    default: true
                },
                {
                    name: 'createAt',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: false,
                },
            ]
        });
        await connection.createQueryRunner().createTable(TiposRifa);
        console.log("");
        console.log("Creacion de la tabla TiposRifa");
        console.log("");
        const TransactionStates = new Table({
            name: 'TransactionStates',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'status',
                    type: 'boolean',
                    isNullable: false,
                    default: true
                },
                {
                    name: 'createAt',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: false,
                },
            ]
        });
        await connection.createQueryRunner().createTable(TransactionStates);
        console.log("");
        console.log("Creacion de la tabla TransactionStates");
        console.log("");
        const Niveles = new Table({
            name: 'Niveles',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'monto',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'color',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'borde',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'multiplicadorEXP',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'status',
                    type: 'boolean',
                    isNullable: false,
                    default: true
                },
                {
                    name: 'createAt',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: false,
                },
            ]
        });
        await connection.createQueryRunner().createTable(Niveles);
        console.log("");
        console.log("Creacion de la tabla Niveles");
        console.log("");
        const Usuarios = new Table({
            name: 'Usuarios',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'userName',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'avatar',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'exp',
                    type: 'int',
                    isNullable: false,
                    default: 0,
                },
                {
                    name: 'nivel',
                    type: 'int',
                    isNullable: false,
                    default: 0,
                },
                {
                    name: 'status',
                    type: 'boolean',
                    isNullable: false,
                    default: true
                },
                {
                    name: 'createAt',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: false,
                },
            ]
        });
        await connection.createQueryRunner().createTable(Usuarios);
        console.log("");
        console.log("Creacion de la tabla Usuarios");
        console.log("");
        const Rifas = new Table({
            name: 'Rifas',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'tipoRifa',
                    type: 'int',
                    isNullable: false,
                    default: 0,
                },
                {
                    name: 'estadoRifa',
                    type: 'int',
                    isNullable: false,
                    default: 0,
                },
                {
                    name: 'usuario',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'posiblesGanadores',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'costoOportunidad',
                    type: 'int',
                    isNullable: false,
                    default: 0,
                },
                {
                    name: 'participantesTotales',
                    type: 'int',
                    isNullable: false,
                    default: 0,
                },
                {
                    name: 'montoRecaudado',
                    type: 'int',
                    isNullable: false,
                    default: 0,
                },
                {
                    name: 'image',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'status',
                    type: 'boolean',
                    isNullable: false,
                    default: true
                },
                {
                    name: 'createAt',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: false,
                },
            ]
        });
        await connection.createQueryRunner().createTable(Rifas);
        console.log("");
        console.log("Creacion de la tabla Rifas");
        console.log("");
        const Transacciones = new Table({
            name: 'Transacciones',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'orden',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'rifa',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'usuario',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'amount',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'transactionState',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'status',
                    type: 'boolean',
                    isNullable: false,
                    default: true
                },
                {
                    name: 'createAt',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: false,
                },
            ]
        });
        await connection.createQueryRunner().createTable(Transacciones);
        console.log("");
        console.log("Creacion de la tabla Transacciones");
        console.log("");
        const UsuariosGanadores = new Table({
            name: 'UsuariosGanadores',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'rifa',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'usuario',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'entregado',
                    type: 'boolean',
                    isNullable: false
                },
                {
                    name: 'status',
                    type: 'boolean',
                    isNullable: false,
                    default: true
                },
                {
                    name: 'createAt',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: false,
                },
            ]
        });
        await connection.createQueryRunner().createTable(UsuariosGanadores);
        console.log("");
        console.log("Creacion de la tabla UsuariosGanadores");
        console.log("");
        console.log('Server stopped');
        process.exit(0);
    }).catch(err => console.error(err));
}); 