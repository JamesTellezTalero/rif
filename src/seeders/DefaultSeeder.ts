import { Table, TableForeignKey, createConnection, getManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { Usuarios } from "../entities/Usuarios";
import { Niveles } from "../entities/Niveles";
import { EstadosRifa } from "../entities/EstadosRifa";
import { TransactionStates } from "../entities/TransactionStates";
import { TiposRifa } from "../entities/TiposRifa";
import { TipoDocumento } from "../entities/TipoDocumento";
import { Rifas } from "../entities/Rifas";
import { Participantes } from "../entities/Participantes";
import { ParticipantesRifa } from "../entities/ParticipantesRifa";
import { GanadoresRifa } from "../entities/GanadoresRifa";
import { Transacciones } from "../entities/Transacciones";
import { StringUtils } from "../Utils/StringUtils";
import { TransaccionesBusiness } from "../Business/TransaccionesBusiness";

var express = require('express');
const crypto = require("crypto");

const app = express();

const StringU = new StringUtils();
const TransaccionesB = new TransaccionesBusiness();

// Tu código para configurar tu aplicación Express

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    // Establecer un temporizador para detener el servidor después de 5 minutos
    createConnection(AppDataSource).then(async (connection) => {
        let date = new Date();

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
            UsuariosAdmin.password =  crypto.createHash("md5").update("123456").digest("hex").toUpperCase();
            UsuariosAdmin.avatar = "./init";
            UsuariosAdmin.nivel = await getManager().getRepository(Niveles).findOne({where:{nombre: "NivelAlto"}});
            UsuariosAdmin.isAdmin = true;
            UsuariosAdmin.createAt = new Date();
            await getManager().getRepository(Usuarios).save(UsuariosAdmin)
            console.log("Seeder UsuariosAdmin");
            
            const UsuariosNormal = new Usuarios();
            UsuariosNormal.userName = "normal user";
            UsuariosNormal.email = "jtalero10@outlook.es";
            UsuariosNormal.password = crypto.createHash("md5").update("123456").digest("hex").toUpperCase();
            UsuariosNormal.avatar = "./init";
            UsuariosNormal.nivel = await getManager().getRepository(Niveles).findOne({where:{nombre: "NivelBajo"}});
            UsuariosNormal.createAt = new Date();
            await getManager().getRepository(Usuarios).save(UsuariosNormal)
            console.log("Seeder UsuariosNormal");
        }
        
        let tipoDocumentoExt = await getManager().getRepository(TipoDocumento).find()
        if(tipoDocumentoExt.length == 0){
            const TipoDocumentoCedula = new TipoDocumento();
            TipoDocumentoCedula.name = "cedula Ciudadania";
            TipoDocumentoCedula.code = "CC";
            TipoDocumentoCedula.createAt = new Date();
            await getManager().getRepository(TipoDocumento).save(TipoDocumentoCedula)
            console.log("Seeder TipoDocumentoCedula");
        }
        
        let RifasExt = await getManager().getRepository(Rifas).find()
        if(RifasExt.length == 0){
            const RifaInicial = new Rifas();
            RifaInicial.usuario = await getManager().getRepository(Usuarios).findOne({where:{email: "jtalero91@gmail.com"}});
            RifaInicial.estadoRifa = await getManager().getRepository(EstadosRifa).findOne({where:{name: "EnCurso"}});
            RifaInicial.tipoRifa = await getManager().getRepository(TiposRifa).findOne({where:{name: "Efectivo"}});
            RifaInicial.name = "Rifa Uno";
            RifaInicial.description = "Soy la descripcion de la rifa Uno";
            RifaInicial.posiblesGanadores = 1;
            RifaInicial.costoOportunidad = 1;
            RifaInicial.participantesTotales = 1;
            RifaInicial.image = "./";
            RifaInicial.createAt = new Date();
            RifaInicial.startsAt = new Date();
            RifaInicial.endsAt = new Date();
            RifaInicial.endsAt.setMonth(RifaInicial.endsAt.getMonth() +1 )
            await getManager().getRepository(Rifas).save(RifaInicial)
            console.log("Seeder RifaInical");
        }

        let participantesExt = await getManager().getRepository(Participantes).find()
        if(participantesExt.length == 0){
            const ParticipanteInicial = new Participantes();
            ParticipanteInicial.nombre = "James de pruebas";
            ParticipanteInicial.email = "james22@gmail.com";
            ParticipanteInicial.tipoDocumento = await getManager().getRepository(TipoDocumento).findOne({where:{code: 'CC'}})
            ParticipanteInicial.documento = "1000856992";
            ParticipanteInicial.telefono = "3205663079";
            await getManager().getRepository(Participantes).save(ParticipanteInicial)
            console.log("Seeder ParticipanteInicial");
        }

        let participantesRifaExt = await getManager().getRepository(ParticipantesRifa).find()
        if(participantesRifaExt.length == 0){
            const ParticipanteRifaInicial = new ParticipantesRifa();
            ParticipanteRifaInicial.rifa = await getManager().getRepository(Rifas).findOne({where:{name: 'Rifa Uno'}})
            ParticipanteRifaInicial.participante = await getManager().getRepository(Participantes).findOne({where:{email: 'james22@gmail.com'}})
            await getManager().getRepository(ParticipantesRifa).save(ParticipanteRifaInicial)
            console.log("Seeder ParticipanteRifaInicial");
        }

        let ganadoresRifaExt = await getManager().getRepository(GanadoresRifa).find()
        if(ganadoresRifaExt.length == 0){
            const GanadoresRifaInicial = new GanadoresRifa();
            GanadoresRifaInicial.rifa = await getManager().getRepository(Rifas).findOne({where:{name: 'Rifa Uno'}})
            GanadoresRifaInicial.participanteRifa = await getManager().getRepository(ParticipantesRifa).findOne({where:{id: 1}})
            await getManager().getRepository(GanadoresRifa).save(GanadoresRifaInicial)
            console.log("Seeder GanadoresRifaInicial");
        }

        let transaccionesExt = await getManager().getRepository(Transacciones).find()
        if(transaccionesExt.length == 0){
            const TransaccionInicial = new Transacciones();
            TransaccionInicial.rifa = await getManager().getRepository(Rifas).findOne({where:{name: 'Rifa Uno'}})
            TransaccionInicial.participanterifa = await getManager().getRepository(ParticipantesRifa).findOne({where:{
                status: false
            }})
            if(TransaccionInicial.participanterifa == null){
                const ParticipanteRifaInicial = new ParticipantesRifa();
                ParticipanteRifaInicial.rifa = await getManager().getRepository(Rifas).findOne({where:{name: 'Rifa Uno'}})
                ParticipanteRifaInicial.participante = await getManager().getRepository(Participantes).findOne({where:{email: 'james22@gmail.com'}})
                TransaccionInicial.participanterifa = await getManager().getRepository(ParticipantesRifa).save(ParticipanteRifaInicial)
                console.log("Seeder ParticipanteRifaInicial");
            }
            TransaccionInicial.transactionState = await getManager().getRepository(TransactionStates).findOne({where:{name: 'Creada'}})
            TransaccionInicial.orden = `${await StringU.agregarCaracteresIzquierda(`${TransaccionInicial.rifa.id}`, 5, '0')}-${await StringU.agregarCaracteresIzquierda(`${TransaccionInicial.participanterifa.id}`, 5, '0')}-${date.getTime()}`
            TransaccionInicial.amount = TransaccionInicial.rifa.costoOportunidad;
            let tran = await getManager().getRepository(Transacciones).save(TransaccionInicial)
            tran.transactionState = await getManager().getRepository(TransactionStates).findOne({where:{name: 'Exitosa'}})
            await TransaccionesB.Update(tran);
            console.log("Seeder TransaccionInicial");
        }

        console.log('Server stopped after create seeders');
        process.exit(0);
    }).catch(err => console.error(err));
}); 