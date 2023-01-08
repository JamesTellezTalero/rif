import { UsuariosBusiness } from "../Business/UsuariosBusiness";
import { apiResponse } from "../Models/apiResponse";
import { UsuariosUtils } from "../Utils/UsuariosUtils";
import { Usuarios } from "../entities/Usuarios";

let UsuariosU = new UsuariosUtils()
let UsuariosB = new UsuariosBusiness()

exports.Create = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let usuario:Usuarios = req.body;
        let emailExist = await UsuariosU.validateEmail(usuario?.email);
        if(!emailExist){
            apiR.code = 400;
            apiR.message = "Email invalido";
            throw apiR;
        }else if(usuario?.password == null || usuario?.password == ""){
            apiR.code = 400;
            apiR.message = "Contraseña invalida";
            throw apiR;
        }else if(usuario?.userName == null || usuario?.userName == ""){
            apiR.code = 400;
            apiR.message = "Nombre de usuario invalido";
            throw apiR;
        }else if(usuario?.avatar == null || usuario?.avatar == ""){
            apiR.code = 400;
            apiR.message = "Avatar Vacio";
            throw apiR;
        }
        let UsuarioExist = await UsuariosB.ValidateExistence(usuario)
        if( UsuarioExist.code == 400 && UsuarioExist.message == usuario?.email){
            UsuarioExist.message = "El email ingresado ya se encuentra registrado."
            throw UsuarioExist;
        }else if( UsuarioExist.code == 400 && UsuarioExist.message == usuario?.userName){
            UsuarioExist.message = "El nombre de usuario ingresado ya se encuentra registrado."
            throw UsuarioExist;
        }
        usuario.password.toUpperCase()
        console.log(usuario);
        let newUsuario = await UsuariosB.Create(usuario);
        if(newUsuario.code == 200){
            return res.status(newUsuario.code).json({
                response: newUsuario
            })
        }else{
            throw newUsuario;
        }
    }
    catch (error){
        console.log(error);
        if(error?.code === 400){
            return res.status(error.code).json({
                response: error
            });
        }else{
            apiR.code = 500;
            apiR.message = "Se presentó una excepcion no controlada.";
            return res.status(apiR.code).json({
                response:apiR
            });
        }
    }
};