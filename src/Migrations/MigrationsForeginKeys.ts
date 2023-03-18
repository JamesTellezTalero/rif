import { Table, TableForeignKey, createConnection } from "typeorm";
import { AppDataSource } from "../data-source";

var express = require('express');

const app = express();

// Tu código para configurar tu aplicación Express

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    // Establecer un temporizador para detener el servidor después de 5 minutos
    createConnection(AppDataSource).then(async (connection) => {
        let connect = await connection.createQueryRunner();


        const Transacciones_TransactionState_ForeignKey = new TableForeignKey({
            columnNames: ['transactionState'],
            referencedColumnNames: ['id'],
            referencedTableName: 'TransactionStates',
            name: 'transactionState_id',
            onDelete: 'SET NULL'
        });
        await connect.createForeignKey("Transacciones", Transacciones_TransactionState_ForeignKey);
        console.log("Transacciones transactionState Foreign key agregada");


        const Transacciones_Usuario_ForeignKey = new TableForeignKey({
            columnNames: ['participanterifa'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ParticipantesRifa',
            name: 'participanterifa_id',
            onDelete: 'SET NULL'
        });
        await connect.createForeignKey("Transacciones", Transacciones_Usuario_ForeignKey);
        console.log("Transacciones usuario Foreign key agregada");


        const Transacciones_Rifa_ForeignKey = new TableForeignKey({
            columnNames: ['rifa'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Rifas',
            name: 'rifa_id',
            onDelete: 'SET NULL'
        });
        await connect.createForeignKey("Transacciones", Transacciones_Rifa_ForeignKey);
        console.log("Transacciones rifa Foreign key agregada");


        const Usuarios_Nivel_ForeignKey = new TableForeignKey({
            columnNames: ['nivel'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Niveles',
            name: 'nivel_id',
            onDelete: 'SET NULL'
        });
        await connect.createForeignKey("Usuarios", Usuarios_Nivel_ForeignKey);
        console.log("Usuarios nivel Foreign key agregada");


        const Rifas_Tipo_ForeignKey = new TableForeignKey({
            columnNames: ['tipoRifa'],
            referencedColumnNames: ['id'],
            referencedTableName: 'TiposRifa',
            name: 'tipoRifa_id',
            onDelete: 'SET NULL'
        });
        await connect.createForeignKey("Rifas", Rifas_Tipo_ForeignKey);
        console.log("Rifas tipoRifa Foreign key agregada");


        const Rifas_Estado_ForeignKey = new TableForeignKey({
            columnNames: ['estadoRifa'],
            referencedColumnNames: ['id'],
            referencedTableName: 'EstadosRifa',
            name: 'estadoRifa_id',
            onDelete: 'SET NULL'
        });
        await connect.createForeignKey("Rifas", Rifas_Estado_ForeignKey);
        console.log("Rifas estadoRifa Foreign key agregada");


        const Rifas_Usuario_ForeignKey = new TableForeignKey({
            columnNames: ['usuario'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Usuarios',
            name: 'usuario_id',
            onDelete: 'SET NULL'
        });
        await connect.createForeignKey("Rifas", Rifas_Usuario_ForeignKey);
        console.log("Rifas usuario Foreign key agregada");


        const GanadoresRifa_Rifa_ForeignKey = new TableForeignKey({
            columnNames: ['rifa'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Rifas',
            name: 'rifa_id',
            onDelete: 'SET NULL'
        });
        await connect.createForeignKey("GanadoresRifa", GanadoresRifa_Rifa_ForeignKey);
        console.log("GanadoresRifa rifa Foreign key agregada");


        const GanadoresRifa_ParticipanteRifa_ForeignKey = new TableForeignKey({
            columnNames: ['participanteRifa'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ParticipantesRifa',
            name: 'participanteRifa_id',
            onDelete: 'SET NULL'
        });
        await connect.createForeignKey("GanadoresRifa", GanadoresRifa_ParticipanteRifa_ForeignKey);
        console.log("GanadoresRifa Foreign key agregada");


        const ParticipantesRifa_Rifa_ForeignKey = new TableForeignKey({
            columnNames: ['rifa'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Rifas',
            name: 'rifa_id',
            onDelete: 'SET NULL'
        });
        await connect.createForeignKey("ParticipantesRifa", ParticipantesRifa_Rifa_ForeignKey);
        console.log("ParticipantesRifa rifa Foreign key agregada");


        const ParticipantesRifa_Participante_ForeignKey = new TableForeignKey({
            columnNames: ['participante'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Participantes',
            name: 'participante_id',
            onDelete: 'SET NULL'
        });
        await connect.createForeignKey("ParticipantesRifa", ParticipantesRifa_Participante_ForeignKey);
        console.log("ParticipantesRifa participantes Foreign key agregada");


        const Participantes_DocumentType_ForeignKey = new TableForeignKey({
            columnNames: ['tipoDocumento'],
            referencedColumnNames: ['id'],
            referencedTableName: 'TipoDocumento',
            name: 'tipoDocumento_id',
            onDelete: 'SET NULL'
        });
        await connect.createForeignKey("Participantes", Participantes_DocumentType_ForeignKey);
        console.log("DocumentTypesParticipantes usuario Foreign key agregada");


        const PaymentMethodKeys_PaymentMethod_ForeignKey = new TableForeignKey({
            columnNames: ['paymentMethod'],
            referencedColumnNames: ['id'],
            referencedTableName: 'PaymentMethods',
            name: 'PaymentMethods_id',
            onDelete: 'SET NULL'
        });
        await connect.createForeignKey("PaymentMethodKeys", PaymentMethodKeys_PaymentMethod_ForeignKey);
        console.log("PaymentMethodKeys paymentMethod Foreign key agregada");


        const UserKeys_PaymentMethod_ForeignKey = new TableForeignKey({
            columnNames: ['key'],
            referencedColumnNames: ['id'],
            referencedTableName: 'PaymentMethodKeys',
            name: 'PaymentMethodKeys_id',
            onDelete: 'SET NULL'
        });
        await connect.createForeignKey("UserKeys", UserKeys_PaymentMethod_ForeignKey);
        console.log("UserKeys key Foreign key agregada");

        
        const UserKeys_Usuarios_ForeignKey = new TableForeignKey({
            columnNames: ['usuario'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Usuarios',
            name: 'Usuarios_id',
            onDelete: 'SET NULL'
        });
        await connect.createForeignKey("UserKeys", UserKeys_Usuarios_ForeignKey);
        console.log("UserKeys usuario Foreign key agregada");


        const Transacciones_PaymentMethod_ForeignKey = new TableForeignKey({
            columnNames: ['paymentmethod'],
            referencedColumnNames: ['id'],
            referencedTableName: 'PaymentMethods',
            name: 'PaymentMethods_id',
            onDelete: 'SET NULL'
        });
        await connect.createForeignKey("Transacciones", Transacciones_PaymentMethod_ForeignKey);
        console.log("Transacciones paymentmethod Foreign key agregada");


        const Transacciones_Currencies_ForeignKey = new TableForeignKey({
            columnNames: ['currency'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Currencies',
            name: 'Currencies_id',
            onDelete: 'SET NULL'
        });
        await connect.createForeignKey("Transacciones", Transacciones_Currencies_ForeignKey);
        console.log("Transacciones currency Foreign key agregada");
        console.log('Server stopped after 5 minutes');
        process.exit(0);
    }).catch(err => console.error(err));
}); 