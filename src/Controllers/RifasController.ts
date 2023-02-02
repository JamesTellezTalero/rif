import { RifasBusiness } from "../Business/RifasBusiness";
import { UsuariosBusiness } from "../Business/UsuariosBusiness";
import { apiResponse } from "../Models/apiResponse";
import { UsuariosUtils } from "../Utils/UsuariosUtils";
import { Rifas } from "../entities/Rifas";
import { Usuarios } from "../entities/Usuarios";

let RifasB = new RifasBusiness()

exports.Create = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        ////// CREAR CRUD ESTADOS RIFA
        let rifa:Rifas = req.body.rifa;
        if(rifa?.tipoRifa == null){
            apiR.code = 400;
            apiR.message = "No se reguistra el tipo de rifa"
        }
        if(rifa?.tipoRifa == null){
            apiR.code = 400;
            apiR.message = "No se reguistra el tipo de rifa"
        }
        return res.status(200).json(await RifasB.Create(rifa))
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
