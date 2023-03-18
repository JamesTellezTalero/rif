import { Table, TableForeignKey, createConnection } from "typeorm";
import { AppDataSource } from "../data-source";

var express = require('express');

const app = express();

// Tu código para configurar tu aplicación Express

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    // Establecer un temporizador para detener el servidor después de 5 minutos
    createConnection(AppDataSource).then(async (connection) => {
        let queryRunner = await connection.createQueryRunner();
        console.log("Database Conected")
        const Participantes = new Table({
            name: 'Participantes',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'nombre',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'tipoDocumento',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'documento',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'telefono',
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
                    isNullable: true,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: true ,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ]
        });
        await queryRunner.createTable(Participantes);
        console.log("Creacion de la tabla Participantes");
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
                    isNullable: true,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: true ,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ]
        });
        await queryRunner.createTable(EstadosRifa);
        console.log("Creacion de la tabla EstadosRifa");
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
                    isNullable: true,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: true ,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ]
        });
        await queryRunner.createTable(TiposRifa);
        console.log("Creacion de la tabla TiposRifa");
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
                    isNullable: true,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: true ,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ]
        });
        await queryRunner.createTable(TransactionStates);
        console.log("Creacion de la tabla TransactionStates");
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
                    name: 'nombre',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'ganancias',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'totalExp',
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
                    isNullable: true,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: true ,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ]
        });
        await queryRunner.createTable(Niveles);
        console.log("Creacion de la tabla Niveles");
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
                    default: 1,
                },
                {
                    name: 'isAdmin',
                    type: 'boolean',
                    isNullable: false,
                    default: false
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
                    isNullable: true,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: true ,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ]
        });
        await queryRunner.createTable(Usuarios);
        console.log("Creacion de la tabla Usuarios");
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
                    name: 'participantesActuales',
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
                    name: 'startsAt',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'endsAt',
                    type: 'timestamp',
                    isNullable: true ,
                },
                {
                    name: 'createAt',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: true ,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ]
        });
        await queryRunner.createTable(Rifas);
        console.log("Creacion de la tabla Rifas");
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
                    isNullable: true
                },
                {
                    name: 'dinamicorden',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'paymentlink',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'jsonresp',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'currency',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'paymentmethod',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'rifa',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'participanterifa',
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
                    isNullable: true,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: true ,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ]
        });
        await queryRunner.createTable(Transacciones);
        console.log("Creacion de la tabla Transacciones");
        const GanadoresRifa = new Table({
            name: 'GanadoresRifa',
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
                    name: 'participanteRifa',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'entregado',
                    type: 'boolean',
                    isNullable: true,
                    default: false
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
                    isNullable: true,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: true ,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ]
        });
        await queryRunner.createTable(GanadoresRifa);
        console.log("Creacion de la tabla GanadoresRifa");
        const ParticipantesRifa = new Table({
            name: 'ParticipantesRifa',
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
                    name: 'participante',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'status',
                    type: 'boolean',
                    isNullable: false,
                    default: false
                },
                {
                    name: 'createAt',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: true ,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ]
        });
        await queryRunner.createTable(ParticipantesRifa);
        console.log("Creacion de la tabla ParticipantesRifa");
        const TipoDocumento = new Table({
            name: 'TipoDocumento',
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
                    name: 'code',
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
                    isNullable: true,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: true ,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ]
        });
        await queryRunner.createTable(TipoDocumento);
        console.log("Creacion de la tabla TipoDocumento");
        const PaymentMethodKeys = new Table({
            name: 'PaymentMethodKeys',
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
                    name: 'paymentMethod',
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
                    isNullable: true,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: true ,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ]
        });
        await queryRunner.createTable(PaymentMethodKeys);
        console.log("Creacion de la tabla PaymentMethodKeys");
        const UserKeys = new Table({
            name: 'UserKeys',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'usuario',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'key',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'value',
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
                    isNullable: true,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: true ,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ]
        });
        await queryRunner.createTable(UserKeys);
        console.log("Creacion de la tabla UserKeys");
        const PaymentMethods = new Table({
            name: 'PaymentMethods',
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
                    name: 'url',
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
                    isNullable: true,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: true ,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ]
        });
        await queryRunner.createTable(PaymentMethods);
        console.log("Creacion de la tabla PaymentMethods");
        const Currencies = new Table({
            name: 'Currencies',
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
                    name: 'code',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'symbol',
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
                    isNullable: true,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    isNullable: true ,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ]
        });
        await queryRunner.createTable(Currencies);
        console.log("Creacion de la tabla Currencies");
        console.log('Server Stopped After Generate All Tables');
        process.exit(0);
    }).catch(err => console.error(err));
}); 
