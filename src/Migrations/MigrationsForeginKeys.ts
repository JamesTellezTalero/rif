import { Table, TableForeignKey, createConnection } from "typeorm";
import { AppDataSource } from "../data-source";

var express = require('express');

const app = express();

// Tu código para configurar tu aplicación Express

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    // Establecer un temporizador para detener el servidor después de 5 minutos
    createConnection(AppDataSource).then(async (connection) => {
        const Transacciones_TransactionState_ForeignKey = new TableForeignKey({
            columnNames: ['transactionState'],
            referencedColumnNames: ['id'],
            referencedTableName: 'TransactionStates',
            name: 'transactionState_id',
            onDelete: 'SET NULL'
        });
        await connection.createQueryRunner().createForeignKey("Transacciones", Transacciones_TransactionState_ForeignKey);
        console.log("Transacciones transactionState Foreign key agregada");
        const Transacciones_Usuario_ForeignKey = new TableForeignKey({
            columnNames: ['usuario'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Usuarios',
            name: 'usuario_id',
            onDelete: 'SET NULL'
        });
        await connection.createQueryRunner().createForeignKey("Transacciones", Transacciones_Usuario_ForeignKey);
        console.log("Transacciones usuario Foreign key agregada");
        const Transacciones_Rifa_ForeignKey = new TableForeignKey({
            columnNames: ['rifa'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Rifas',
            name: 'rifa_id',
            onDelete: 'SET NULL'
        });
        await connection.createQueryRunner().createForeignKey("Transacciones", Transacciones_Rifa_ForeignKey);
        console.log("Transacciones rifa Foreign key agregada");
        const Usuarios_Nivel_ForeignKey = new TableForeignKey({
            columnNames: ['nivel'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Niveles',
            name: 'nivel_id',
            onDelete: 'SET NULL'
        });
        await connection.createQueryRunner().createForeignKey("Usuarios", Usuarios_Nivel_ForeignKey);
        console.log("Usuarios nivel Foreign key agregada");
        const Rifas_Tipo_ForeignKey = new TableForeignKey({
            columnNames: ['tipoRifa'],
            referencedColumnNames: ['id'],
            referencedTableName: 'TiposRifa',
            name: 'tipoRifa_id',
            onDelete: 'SET NULL'
        });
        await connection.createQueryRunner().createForeignKey("Rifas", Rifas_Tipo_ForeignKey);
        console.log("Rifas tipoRifa Foreign key agregada");
        const Rifas_Estado_ForeignKey = new TableForeignKey({
            columnNames: ['estadoRifa'],
            referencedColumnNames: ['id'],
            referencedTableName: 'EstadosRifa',
            name: 'estadoRifa_id',
            onDelete: 'SET NULL'
        });
        await connection.createQueryRunner().createForeignKey("Rifas", Rifas_Estado_ForeignKey);
        console.log("Rifas estadoRifa Foreign key agregada");
        const Rifas_Usuario_ForeignKey = new TableForeignKey({
            columnNames: ['usuario'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Usuarios',
            name: 'usuario_id',
            onDelete: 'SET NULL'
        });
        await connection.createQueryRunner().createForeignKey("Rifas", Rifas_Usuario_ForeignKey);
        console.log("Rifas usuario Foreign key agregada");
        const UsuariosGanadores_Rifa_ForeignKey = new TableForeignKey({
            columnNames: ['rifa'],
            referencedColumnNames: ['id'],
            referencedTableName: 'UsuariosGanadores',
            name: 'rifa_id',
            onDelete: 'SET NULL'
        });
        await connection.createQueryRunner().createForeignKey("UsuariosGanadores", UsuariosGanadores_Rifa_ForeignKey);
        console.log("UsuariosGanadores rifa Foreign key agregada");
        const UsuariosGanadores_Usuario_ForeignKey = new TableForeignKey({
            columnNames: ['usuario'],
            referencedColumnNames: ['id'],
            referencedTableName: 'UsuariosGanadores',
            name: 'usuario_id',
            onDelete: 'SET NULL'
        });
        await connection.createQueryRunner().createForeignKey("UsuariosGanadores", UsuariosGanadores_Usuario_ForeignKey);
        console.log("Rifas usuario Foreign key agregada");
        const UsuariosParticipantes_Rifa_ForeignKey = new TableForeignKey({
            columnNames: ['rifa'],
            referencedColumnNames: ['id'],
            referencedTableName: 'UsuariosParticipantes',
            name: 'rifa_id',
            onDelete: 'SET NULL'
        });
        await connection.createQueryRunner().createForeignKey("UsuariosParticipantes", UsuariosParticipantes_Rifa_ForeignKey);
        console.log("UsuariosParticipantes rifa Foreign key agregada");
        const UsuariosParticipantes_Usuario_ForeignKey = new TableForeignKey({
            columnNames: ['usuario'],
            referencedColumnNames: ['id'],
            referencedTableName: 'UsuariosParticipantes',
            name: 'usuario_id',
            onDelete: 'SET NULL'
        });
        await connection.createQueryRunner().createForeignKey("UsuariosParticipantes", UsuariosParticipantes_Usuario_ForeignKey);
        console.log("UsuariosParticipantes usuario Foreign key agregada");
        console.log('Server stopped after 5 minutes');
        process.exit(0);
    }).catch(err => console.error(err));
}); 