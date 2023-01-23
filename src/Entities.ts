import { Table, TableForeignKey, createConnection } from "typeorm";
import { AppDataSource } from "./data-source";

var express = require('express');

const app = express();

// Tu código para configurar tu aplicación Express

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    // Establecer un temporizador para detener el servidor después de 5 minutos
    createConnection(AppDataSource).then(async (connection) => {
        console.log("Database Conected")
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
                    name: 'status',
                    type: 'boolean',
                    isNullable: false,
                    default: true
                },
            ]
        });
        await connection.createQueryRunner().createTable(Niveles);
        console.log("Tabla creada");
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
            ]
        });
        await connection.createQueryRunner().createTable(Usuarios);
        console.log("Tabla creada");
        const foreignKey = new TableForeignKey({
            columnNames: ['nivel'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Niveles',
            name: 'usuarios_Niveles_id',
            onDelete: 'SET NULL'
        });
        await connection.createQueryRunner().createForeignKey("Usuarios", foreignKey);
        console.log("Foreign key agregada");
        console.log('Server stopped after 5 minutes');
        process.exit(0);
    }).catch(err => console.error(err));
}); 