import { UsuariosBusiness } from "../Business/UsuariosBusiness";
import { apiResponse } from "../Models/apiResponse";
import { StringUtils } from "../Utils/StringUtils";
import { Usuarios } from "../entities/Usuarios";

let StringU = new StringUtils()
let UsuariosB = new UsuariosBusiness()

exports.Create = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let usuario:Usuarios = req.body;
        let emailExist = await StringU.validateEmail(usuario?.email);
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
        usuario.createAt = new Date();
        let newUsuario = await UsuariosB.Create(usuario);
        if(newUsuario.code == 200){
            newUsuario.message = "Usuario Creado"
            return res.status(newUsuario.code).json({
                ... newUsuario
            })
        }else{
            throw newUsuario;
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

exports.UpdatePassword = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let usuario = req.body;
        if(!usuario?.email == null || usuario?.email == ""){
            apiR.code = 400;
            apiR.message = "No registra la propiedad <email>";
            throw apiR;
        }else if(usuario?.password == null || usuario?.password == ""){
            apiR.code = 400;
            apiR.message = "No registra la propiedad <password>";
            throw apiR;
        }else if(usuario?.newPassword == null || usuario?.newPassword == ""){
            apiR.code = 400;
            apiR.message = "Contraseña No registra la propiedad <newPassword>";
            throw apiR;
        }
        usuario.password.toUpperCase();
        usuario.createAt = new Date();
        let newPassword = await UsuariosB.UpdatePassword(usuario.email, usuario.password, usuario.newPassword);
        if(newPassword.code == 200){
            newPassword.message = "Contraseña Actualizada"
            return res.status(newPassword.code).json({
                ... newPassword
            })
        }else{
            throw newPassword;
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

exports.Login = async (req, res) => {
    let apiR = new apiResponse();
    apiR.data = {}
    try {
        let email:string = req.body.email;
        let password:string = req.body.password;
        if(email == null || email == ""){
            apiR.code = 400;
            apiR.message = "Email invalido";
            throw apiR;
        }else if(password == null || password == ""){
            apiR.code = 400;
            apiR.message = "Contraseña invalida";
            throw apiR;
        }
        let loged = await UsuariosB.Login(email, password);
        if(loged.code == 200){
            return res.status(loged.code).json({
                ... loged
            })
        }else{
            throw loged;
        }
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
        let id:number = req.query.id;
        let exist = await UsuariosB.GetById(id);
        if(exist.code == 200){
            return res.status(exist.code).json({
                ... exist
            })
        }else{
            throw exist;
        }
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
        let exist = await UsuariosB.GetAll();
        if(exist.code == 200){
            return res.status(exist.code).json({
                ... exist
            })
        }else{
            throw exist;
        }
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