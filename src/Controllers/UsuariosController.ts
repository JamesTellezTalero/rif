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
        await UsuariosB.ValidateExistence(usuario)
        usuario.createAt = new Date();
        let newUsuario = await UsuariosB.Create(usuario);
        apiR.code = 200;
        apiR.message = "Usuario Creado";
        apiR.data = newUsuario;
        return res.status(apiR.code).json({
            ... apiR
        })
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
        apiR.code = 200;
        apiR.message = "Contraseña Actualizada";
        apiR.data = newPassword;
        return res.status(apiR.code).json({
            ... apiR
        })
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
        apiR.code = 200;
        apiR.message = "Usuario Logueado";
        apiR.data = loged;
        return res.status(apiR.code).json({
            ... apiR
        })
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
        let Users = await UsuariosB.GetAll();
        
        if(Users.length > 0){
            apiR.code = 200;
            apiR.message = "Usuarios encontrados"
            apiR.data = Users
            return res.status(apiR.code).json({
                ... apiR
            })
        }else{
            throw apiR ={
                code: 400,
                message: `Usuarios No Encontrados`,
                data: Users
            }
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
        if(exist != null){
            apiR.code = 200;
            apiR.message = "Usuario encontrado"
            apiR.data = exist
            return res.status(apiR.code).json({
                ... apiR
            })
        }else{
            throw apiR ={
                code: 400,
                message: `Usuario No Encontrado`,
                data: exist
            }
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