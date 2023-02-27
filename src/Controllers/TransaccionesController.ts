import { ParticipantesBusiness } from "../Business/ParticipantesBusiness";
import { ParticipantesRifaBusiness } from "../Business/ParticipantesRifaBusiness";
import { RifasBusiness } from "../Business/RifasBusiness";
import { TransaccionesBusiness } from "../Business/TransaccionesBusiness";
import { TransactionStatesBusiness } from "../Business/TransactionStatesBusiness";
import { apiResponse } from "../Models/apiResponse";
import { StringUtils } from "../Utils/StringUtils";
import { ParticipantesRifa } from "../entities/ParticipantesRifa";
import { Rifas } from "../entities/Rifas";
import { Transacciones } from "../entities/Transacciones";

const RifasB = new RifasBusiness();
const ParticipantesB = new ParticipantesBusiness();
const ParticipantesRifaB = new ParticipantesRifaBusiness();
const TransactionStatesB = new TransactionStatesBusiness();
const TransaccionesB = new TransaccionesBusiness();

const StringU = new StringUtils();

exports.Create = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let item = req.body.transaccion
        let transaccion = new Transacciones();
        let participante = new ParticipantesRifa();
        if(item == null){
            throw apiR = {
                code: 400,
                message: "No se registra el objeto transaccion",
                data:{}
            }
        }
        item.rifa = (item.rifa != null && item.rifa.id != null ) ? item.rifa: null; 
        if(item.rifa == null){
            throw apiR = {
                code: 400,
                message: "No se registra la propiedad <rifa> o <rifa.id>",
                data:{}
            }
        }
        transaccion.rifa = await RifasB.GetById(item.rifa.id);
        if(transaccion.rifa == null){
            throw apiR = {
                message: "No Existe la <rifa> Enviada",
                code: 400,
                data: {}
            }
        }
        item.participante = (item?.participante != null && item?.participante.id != null ) ? item.participante: null; 
        if(item.participante == null){
            throw apiR = {
                code: 400,
                message: "No se registra la propiedad <participante> o <participante.id>",
                data:{}
            }
        }
        participante.participante = await ParticipantesB.GetById(item.participante.id)
        if(participante.participante == null){
            throw apiR = {
                message: "No Existe el <participante> Enviado",
                code: 400,
                data: {}
            }
        }
        participante.rifa = transaccion.rifa;
        transaccion.participanterifa = await ParticipantesRifaB.Create(participante);
        transaccion.amount = transaccion.rifa.costoOportunidad;
        let date = new Date();
        transaccion.orden = `${await StringU.agregarCaracteresIzquierda(`${transaccion.rifa.id}`, 5, '0')}-${await StringU.agregarCaracteresIzquierda(`${transaccion.participanterifa.id}`, 5, '0')}-${date.getTime()}`
        transaccion.transactionState = await TransactionStatesB.GetByName("Creada");
        apiR.data = await TransaccionesB.Create(transaccion);
        res.status(200).json(apiR)
    } catch (error) {
        console.log(error);
        if(error?.code === 400){
            return res.status(error.code).json({
                ... error
            });
        }else{
            apiR.code = 500;
            apiR.message = "Se presentó una excepcion no controlada.";
            return res.status(apiR.code).json({
                ... apiR
            });
        }
    }
}

exports.Update = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let item = req.body.transaccion
        let transaccion = new Transacciones();
        if(item == null){
            throw apiR = {
                code: 400,
                message: "No se registra el objeto transaccion",
                data:{}
            }
        }else if(item.id == null){
            throw apiR = {
                message: "No registra la propiedad <id>",
                code: 400,
                data: {}
            }
        }
        transaccion = await TransaccionesB.GetById(transaccion.id)
        if(transaccion == null){
            throw apiR = {
                message: "No Existe la <transaccion> Enviado",
                code: 400,
                data: {}
            }
        }
        transaccion.participanterifa = (item?.participanterifa != null && item?.participanterifa.id != null) ? item.participanterifa: null; 
        if(transaccion.participanterifa == null){
            throw apiR = {
                code: 400,
                message: "No se registra la propiedad <participanterifa> o <participanterifa.id>",
                data:{}
            }
        }
        transaccion.participanterifa = await ParticipantesRifaB.GetById(transaccion.participanterifa.id)
        if(transaccion.participanterifa == null){
            throw apiR = {
                message: "No Existe el <participanterifa> Enviado",
                code: 400,
                data: {}
            }
        }
        item.rifa = (item.rifa != null && item.rifa.id != null ) ? item.rifa: null; 
        if(item.rifa == null){
            throw apiR = {
                code: 400,
                message: "No se registra la propiedad <rifa> o <rifa.id>",
                data:{}
            }
        }
        if(transaccion.rifa.id != item.rifa.id ){
            throw apiR = {
                message: "La Transaccion no Puede cambiar de <rifa>",
                code: 400,
                data: {}
            }
        }
        transaccion.amount = transaccion.rifa.costoOportunidad;
        transaccion.transactionState = (item.transactionState != null && item.transactionState.name != null ) ? item.transactionState: null; 
        if(transaccion.transactionState == null){
            throw apiR = {
                code: 400,
                message: "No se registra la propiedad <transactionState> o <transactionState.name>",
                data:{}
            }
        }
        transaccion.transactionState = await TransactionStatesB.GetByName(transaccion.transactionState.name);
        if(transaccion.transactionState == null){
            throw apiR = {
                message: "No existe la propiedad <transactionState>",
                code: 400,
                data: {}
            }
        }
        apiR.data = await TransaccionesB.Update(transaccion)
        res.status(200).json(apiR)
    } catch (error) {
        console.log(error);
        if(error?.code === 400){
            return res.status(error.code).json({
                ... error
            });
        }else{
            apiR.code = 500;
            apiR.message = "Se presentó una excepcion no controlada.";
            return res.status(apiR.code).json({
                ... apiR
            });
        }
    }
}

exports.UpdateState = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let id = req.query.id
        if(id == null){
            throw apiR = {
                message: "No registra la propiedad <id>",
                code: 400,
                data: {}
            }
        }
        let state = req.query.state
        if(state == null){
            throw apiR = {
                message: "No registra la propiedad <state>",
                code: 400,
                data: {}
            }
        }
        let transaccion = await TransaccionesB.GetById(id)
        if(transaccion == null){
            throw apiR = {
                message: "No Existe el <id> Enviado",
                code: 400,
                data: {}
            }
        }
        transaccion.transactionState = await TransactionStatesB.GetById(state);
        if(transaccion.transactionState == null){
            throw apiR = {
                message: "No Existe el <state> Enviado",
                code: 400,
                data: {}
            }
        }
        apiR.data = await TransaccionesB.Update(transaccion)
        res.status(200).json(apiR)
    } catch (error) {
        console.log(error);
        if(error?.code === 400){
            return res.status(error.code).json({
                ... error
            });
        }else{
            apiR.code = 500;
            apiR.message = "Se presentó una excepcion no controlada.";
            return res.status(apiR.code).json({
                ... apiR
            });
        }
    }
}

exports.GetAll = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        apiR.code = 200;
        apiR.message = "Transacciones encontradas";
        apiR.data = await TransaccionesB.GetAll();
        res.status(200).json(apiR)
    } catch (error) {
        console.log(error);
        if(error?.code === 400){
            return res.status(error.code).json({
                ... error
            });
        }else{
            apiR.code = 500;
            apiR.message = "Se presentó una excepcion no controlada.";
            return res.status(apiR.code).json({
                ... apiR
            });
        }
    }
}

exports.GetById = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let id = req.query.id;
        if(id == null){
            throw apiR = {
                message: "No registra la propiedad <id>",
                code: 400,
                data: {}
            }
        }
        apiR.code = 200;
        apiR.message = "Transacciones encontradas";
        apiR.data = await TransaccionesB.GetById(id);
        res.status(200).json(apiR)
    } catch (error) {
        console.log(error);
        if(error?.code === 400){
            return res.status(error.code).json({
                ... error
            });
        }else{
            apiR.code = 500;
            apiR.message = "Se presentó una excepcion no controlada.";
            return res.status(apiR.code).json({
                ... apiR
            });
        }
    }
}

exports.GetByOrden = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let orden = req.query.orden;
        if(orden == null){
            throw apiR = {
                message: "No registra la propiedad <orden>",
                code: 400,
                data: {}
            }
        }
        apiR.code = 200;
        apiR.message = "Transacciones encontradas";
        apiR.data = await TransaccionesB.GetByOrden(orden);
        res.status(200).json(apiR)
    } catch (error) {
        console.log(error);
        if(error?.code === 400){
            return res.status(error.code).json({
                ... error
            });
        }else{
            apiR.code = 500;
            apiR.message = "Se presentó una excepcion no controlada.";
            return res.status(apiR.code).json({
                ... apiR
            });
        }
    }
}

exports.GetByRifa = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let rifa = req.query.rifa;
        if(rifa == null){
            throw apiR = {
                message: "No registra la propiedad <rifa>",
                code: 400,
                data: {}
            }
        }
        rifa = await RifasB.GetById(rifa)
        if(rifa == null){
            throw apiR = {
                message: "No Existe la propiedad <rifa>",
                code: 400,
                data: {}
            }
        }
        apiR.code = 200;
        apiR.message = "Transacciones encontradas";
        apiR.data = await TransaccionesB.GetByRifa(rifa);
        res.status(200).json(apiR)
    } catch (error) {
        console.log(error);
        if(error?.code === 400){
            return res.status(error.code).json({
                ... error
            });
        }else{
            apiR.code = 500;
            apiR.message = "Se presentó una excepcion no controlada.";
            return res.status(apiR.code).json({
                ... apiR
            });
        }
    }
}

exports.GetByState = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let state = req.query.state;
        if(state == null){
            throw apiR = {
                message: "No registra la propiedad <state>",
                code: 400,
                data: {}
            }
        }
        state = await TransactionStatesB.GetById(state)
        if(state == null){
            throw apiR = {
                message: "No Existe la propiedad <state>",
                code: 400,
                data: {}
            }
        }
        apiR.code = 200;
        apiR.message = "Transacciones encontradas";
        apiR.data = await TransaccionesB.GetByState(state);
        res.status(200).json(apiR)
    } catch (error) {
        console.log(error);
        if(error?.code === 400){
            return res.status(error.code).json({
                ... error
            });
        }else{
            apiR.code = 500;
            apiR.message = "Se presentó una excepcion no controlada.";
            return res.status(apiR.code).json({
                ... apiR
            });
        }
    }
}