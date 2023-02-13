import { getManager } from "typeorm";
import { Usuarios } from "../entities/Usuarios";
import { apiResponse } from "../Models/apiResponse";
import { Niveles } from "../entities/Niveles";
const jwt = require("jsonwebtoken");
const passport = require("passport");
const crypto = require("crypto");

const fs = require('fs');

let secretOrKey =  process.env.AUTH_KEY;

export class UsuariosBusiness{  

    async Create(user:Usuarios):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {}
        try {
            let date = new Date();
            let imagePathStructure = user.userName + "-" + date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear();
            let buffer = Buffer.from(user.avatar, "base64");
            let bufferPath:string = `/assets/UsuariosAvatar/${imagePathStructure}.png`;
            fs.writeFile(`.${bufferPath}`, buffer, (error) => {
                if (error) {
                    throw error;
                }
            });
            user.avatar = bufferPath;
            user.nivel = await getManager().getRepository(Niveles).findOne({where:{nombre: "NivelBajo"}})
            user.password = crypto.createHash("md5").update(user.password).digest("hex");
            let Usuario = await getManager().getRepository(Usuarios).save(user)
            return await this.GetById(Usuario.id);
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;
        }
    }

    async Login(email:string, password:string):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {}
        try {
            let usuario = await getManager().getRepository(Usuarios).findOne({where:{email, password}});
            if(usuario == null){
                throw "No Registra";
            }else{
                const token = jwt.sign({email, password, lastSession: new Date().getTime()}, secretOrKey);
                apiR.code = 200;
                apiR.message = "Usuario Logueado";
                apiR.data = {
                    email, token
                };
                return apiR;
            }
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;
        }
    }
    
    async ValidateExistence(user:Usuarios):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let UserName = await getManager().getRepository(Usuarios).findOne({where:{userName: user?.userName}})
            let Email = await getManager().getRepository(Usuarios).findOne({where:{email: user?.email}})
            if(Email != null){
                throw `El Email: ${Email.email} ya se encuentra en uso`;
            }else if(UserName != null){
                throw `El UserName: ${UserName.userName} ya se encuentra en uso`;
            }else{
                apiR.code = 200;
                apiR.message = "No se registra existencia"
                return apiR;
            }
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;          
        }
    }
    
    async GetById(id:number):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let User = await getManager().getRepository(Usuarios).findOne({where:{id: id}, relations:['nivel']})
            if(User != null){
                apiR.code = 200;
                apiR.message = "Usuario encontrado"
                apiR.data = User
                return apiR;
            }else{
                throw User;
            }
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;          
        }
    }
    
    async GetAll():Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let Users = await getManager().getRepository(Usuarios).find({relations:['nivel']})
            if(Users != null){
                apiR.code = 200;
                apiR.message = "Usuarios encontrados"
                apiR.data = Users
                return apiR;
            }else{
                throw Users;
            }
        } catch (error) {
            apiR.code = 400;
            apiR.message = error
            throw apiR;          
        }
    }
}