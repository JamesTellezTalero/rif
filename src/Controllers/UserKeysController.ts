import { UserKeysBusiness } from "../Business/UserKeysBusiness";
import { PaymentMethodsBusiness } from "../Business/PaymentMethodsBusiness";
import { apiResponse } from "../Models/apiResponse";
import { Rifas } from "../entities/Rifas";
import { UsuariosBusiness } from "../Business/UsuariosBusiness";
import { PaymentMethodKeysBusiness } from "../Business/PaymentMethodKeysBusiness";

let UserKeysB = new UserKeysBusiness();
let PaymentMethodKeysB = new PaymentMethodKeysBusiness();
let UsuariosB = new UsuariosBusiness();

exports.Create = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let item = req.body.UserKey;
        if(item == null){
            apiR.code = 400;
            apiR.message = "No se registra el <UserKey>"
            throw apiR;
        }
        if(item.value == null){
            apiR.code = 400;
            apiR.message = "No se registra el <value>"
            throw apiR;
        }
        if(item.key == null){
            apiR.code = 400;
            apiR.message = "No se registra el <key>"
            throw apiR;
        }
        item.key = await PaymentMethodKeysB.GetById(item.key); 
        if(item.key == null || item.key.status == false){
            apiR.code = 400;
            apiR.message = "No se registra o no existe el <key>"
            throw apiR;
        }
        if(item.usuario == null){
            apiR.code = 400;
            apiR.message = "No se registra el <usuario>"
            throw apiR;
        }
        item.usuario = await UsuariosB.GetById(item.usuario); 
        if(item.usuario == null || item.usuario.status == false){
            apiR.code = 400;
            apiR.message = "No se registra o no existe el <usuario>"
            throw apiR;
        }
        let resp = await UserKeysB.Create(item);
        apiR.code = 200;
        apiR.message = "Key Creado"
        apiR.data = resp
        return res.status(apiR.code).json({... apiR})
    }
    catch (error){
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
        let userKeySend = req.body.UserKey;
        if(userKeySend == null){
            apiR.code = 400;
            apiR.message = "No se registra el <UserKey>"
            throw apiR;
        }
        if(userKeySend.id == null){
            apiR.code = 400;
            apiR.message = "No se registra el <id>"
            throw apiR;
        }
        let item = await UserKeysB.GetById(userKeySend.id);
        if(item == null){
            apiR.code = 400;
            apiR.message = "No existe el <id>"
            throw apiR;
        }
        item.value = userKeySend.value
        if(item.value == null){
            apiR.code = 400;
            apiR.message = "No se registra el <value>"
            throw apiR;
        }
        item.status = userKeySend.status
        if(item.status == null){
            apiR.code = 400;
            apiR.message = "No se registra el <status>"
            throw apiR;
        }
        if(userKeySend.key == null){
            apiR.code = 400;
            apiR.message = "No se registra el <key>"
            throw apiR;
        }
        item.key = await PaymentMethodKeysB.GetById(userKeySend.key); 
        if(item.key == null || item.key.status == false){
            apiR.code = 400;
            apiR.message = "No se registra o no existe el <key>"
            throw apiR;
        }
        let resp = await UserKeysB.Update(item);
        apiR.code = 200;
        apiR.message = "Key Creado"
        apiR.data = resp
        return res.status(apiR.code).json({... apiR})
    }
    catch (error){
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
        let resp = await UserKeysB.GetAll();
        if(resp.length > 0){
            apiR.code = 200;
            apiR.message = "Keys encontrados"
            apiR.data = resp
            return res.status(apiR.code).json({... apiR})
        }else{
            throw apiR = {
                message: "Keys No Encontrado",
                code: 400,
                data: resp 
            }
        }
    }
    catch (error){
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
            apiR.code = 400;
            apiR.message = "No se registra el <id>"
            throw apiR;
        }
        let resp = await UserKeysB.GetById(id);
        if(resp != null){
            apiR.code = 200;
            apiR.message = "Key encontrado"
            apiR.data = resp
            return res.status(apiR.code).json({... apiR})
        }else{
            throw apiR = {
                message: "Key No Encontrado",
                code: 400,
                data: resp 
            }
        }
    }
    catch (error){
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

exports.GetByUsuarioId = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let id = req.query.id;
        if(id == null){
            apiR.code = 400;
            apiR.message = "No se registra el <id>"
            throw apiR;
        }
        let resp = await UserKeysB.GetByUsuarioId(id);
        if(resp != null){
            apiR.code = 200;
            apiR.message = "Key encontrado"
            apiR.data = resp
            return res.status(apiR.code).json({... apiR})
        }else{
            throw apiR = {
                message: "Key No Encontrado",
                code: 400,
                data: resp 
            }
        }
    }
    catch (error){
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
