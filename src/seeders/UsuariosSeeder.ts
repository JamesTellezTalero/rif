import { Table, TableForeignKey, createConnection, getManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { Usuarios } from "../entities/Usuarios";
import { Niveles } from "../entities/Niveles";
import { EstadosRifa } from "../entities/EstadosRifa";
import { TransactionStates } from "../entities/TransactionStates";
import { TiposRifa } from "../entities/TiposRifa";

var express = require('express');

const app = express();

// Tu código para configurar tu aplicación Express

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    // Establecer un temporizador para detener el servidor después de 5 minutos
    createConnection(AppDataSource).then(async (connection) => {

        let nivelesExt = await getManager().getRepository(Niveles).find()
        if(nivelesExt.length == 0){
            const NivelBajo = new Niveles();
            NivelBajo.nombre = "NivelBajo";
            NivelBajo.ganancias = 70;
            NivelBajo.totalExp = 50;
            NivelBajo.color = "#FFFFFF";
            NivelBajo.borde = "Polvo";
            NivelBajo.multiplicadorExp = 10;
            NivelBajo.createAt = new Date();
            await getManager().getRepository(Niveles).save(NivelBajo)
            console.log("Seeder NivelBajo");
    
            const NivelMedio = new Niveles();
            NivelMedio.nombre = "NivelMedio";
            NivelMedio.ganancias = 80;
            NivelMedio.totalExp = 150;
            NivelMedio.color = "#AAAAAA";
            NivelMedio.borde = "Viento";
            NivelMedio.multiplicadorExp = 20;
            NivelMedio.createAt = new Date();
            await getManager().getRepository(Niveles).save(NivelMedio)
            console.log("Seeder NivelMedio");
    
            const NivelAlto = new Niveles();
            NivelAlto.nombre = "NivelAlto";
            NivelAlto.ganancias = 90;
            NivelAlto.totalExp = 300;
            NivelAlto.color = "#000000";
            NivelAlto.borde = "Vacio";
            NivelAlto.multiplicadorExp = 30;
            NivelAlto.createAt = new Date();
            await getManager().getRepository(Niveles).save(NivelAlto)
            console.log("Seeder NivelAlto");
        }

        let estadosRifasExt = await getManager().getRepository(EstadosRifa).find()
        if(estadosRifasExt.length == 0){
            const EstadosRifaFinalizada = new EstadosRifa();
            EstadosRifaFinalizada.name = "Finalizada";
            EstadosRifaFinalizada.createAt = new Date();
            await getManager().getRepository(EstadosRifa).save(EstadosRifaFinalizada)
            console.log("Seeder EstadosRifaFinalizada");
            
            const EstadosRifaEnCurso = new EstadosRifa();
            EstadosRifaEnCurso.name = "EnCurso";
            EstadosRifaEnCurso.createAt = new Date();
            await getManager().getRepository(EstadosRifa).save(EstadosRifaEnCurso)
            console.log("Seeder EstadosRifaEnCurso");
            
            const EstadosRifaCancelada = new EstadosRifa();
            EstadosRifaCancelada.name = "Cancelada";
            EstadosRifaCancelada.createAt = new Date();
            await getManager().getRepository(EstadosRifa).save(EstadosRifaCancelada)
            console.log("Seeder EstadosRifaCancelada");
            
            const EstadosRifaCreada = new EstadosRifa();
            EstadosRifaCreada.name = "Creada";
            EstadosRifaCreada.createAt = new Date();
            await getManager().getRepository(EstadosRifa).save(EstadosRifaCreada)
            console.log("Seeder EstadosRifaCreada");
        }

        let transactionStatesExt = await getManager().getRepository(TransactionStates).find()
        if(transactionStatesExt.length == 0){
            const TransactionStatesCreada = new TransactionStates();
            TransactionStatesCreada.name = "Creada";
            TransactionStatesCreada.createAt = new Date();
            await getManager().getRepository(TransactionStates).save(TransactionStatesCreada)
            console.log("Seeder TransactionStatesCreada");
            
            const TransactionStatesExitosa = new TransactionStates();
            TransactionStatesExitosa.name = "Exitosa";
            TransactionStatesExitosa.createAt = new Date();
            await getManager().getRepository(TransactionStates).save(TransactionStatesExitosa)
            console.log("Seeder TransactionStatesExitosa");
            
            const TransactionStatesFallida = new TransactionStates();
            TransactionStatesFallida.name = "Fallida";
            TransactionStatesFallida.createAt = new Date();
            await getManager().getRepository(TransactionStates).save(TransactionStatesFallida)
            console.log("Seeder TransactionStatesFallida");
            
            const TransactionStatesCancelada = new TransactionStates();
            TransactionStatesCancelada.name = "Cancelada";
            TransactionStatesCancelada.createAt = new Date();
            await getManager().getRepository(TransactionStates).save(TransactionStatesCancelada)
            console.log("Seeder TransactionStatesCancelada");
            
            const TransactionStatesPendiente = new TransactionStates();
            TransactionStatesPendiente.name = "Pendiente";
            TransactionStatesPendiente.createAt = new Date();
            await getManager().getRepository(TransactionStates).save(TransactionStatesPendiente)
            console.log("Seeder TransactionStatesPendiente");
            
            const TransactionStatesRembolsada = new TransactionStates();
            TransactionStatesRembolsada.name = "Rembolsada";
            TransactionStatesRembolsada.createAt = new Date();
            await getManager().getRepository(TransactionStates).save(TransactionStatesRembolsada)
            console.log("Seeder TransactionStatesRembolsada");
        }

        let tiposRifaExt = await getManager().getRepository(TiposRifa).find()
        if(tiposRifaExt.length == 0){
            const TiposRifaEfectivo = new TiposRifa();
            TiposRifaEfectivo.name = "Efectivo";
            TiposRifaEfectivo.recompenza = "Pago Efectivo";
            TiposRifaEfectivo.createAt = new Date();
            await getManager().getRepository(TiposRifa).save(TiposRifaEfectivo)
            console.log("Seeder TiposRifaEfectivo");
        }
        
        let usuariosExt = await getManager().getRepository(Usuarios).find()
        if(usuariosExt.length == 0){
            const UsuariosAdmin = new Usuarios();
            UsuariosAdmin.userName = "admin";
            UsuariosAdmin.email = "jtalero91@gmail.com";
            UsuariosAdmin.password = "123456";
            UsuariosAdmin.avatar = "./init";
            UsuariosAdmin.nivel = await getManager().getRepository(Niveles).findOne({where:{nombre: "NivelAlto"}});
            UsuariosAdmin.isAdmin = true;
            UsuariosAdmin.createAt = new Date();
            await getManager().getRepository(Usuarios).save(UsuariosAdmin)
            console.log("Seeder UsuariosAdmin");
            
            const UsuariosNormal = new Usuarios();
            UsuariosNormal.userName = "normal user";
            UsuariosNormal.email = "jtalero10@outlook.es";
            UsuariosNormal.password = "123456";
            UsuariosNormal.avatar = "./init";
            UsuariosNormal.nivel = await getManager().getRepository(Niveles).findOne({where:{nombre: "NivelBajo"}});
            UsuariosNormal.createAt = new Date();
            await getManager().getRepository(Usuarios).save(UsuariosNormal)
            console.log("Seeder UsuariosNormal");
        }

        console.log('Server stopped after create seeders');
        process.exit(0);
    }).catch(err => console.error(err));
}); 