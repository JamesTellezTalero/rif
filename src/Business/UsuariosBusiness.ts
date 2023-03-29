import { getManager } from "typeorm";
import { Usuarios } from "../entities/Usuarios";
import { apiResponse } from "../Models/apiResponse";
import { Niveles } from "../entities/Niveles";
import { DatesUtils } from "../Utils/DatesUtils";
import { EnvConfig } from '../Config/EnvConfig';

var jwt = require("jsonwebtoken");
const passport = require("passport");
const crypto = require("crypto");

const fs = require('fs');

// let secretOrKey =  process.env.AUTH_KEY;

const DatesU = new DatesUtils();

export class UsuariosBusiness{  

    async Create(user:Usuarios):Promise<Usuarios>{
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
            user.password = crypto.createHash("md5").update(user.password).digest("hex").toUpperCase();
            let Usuario = await getManager().getRepository(Usuarios).save(user)
            return await this.GetById(Usuario.id);
        } catch (error) {
            if(error?.code === 400){
                throw apiR;          
            } else{
                apiR.code = 500;
                apiR.message = error
                throw apiR;          
            }    
        }
    }

    async UpdatePassword(email:string, password:string, newPassword:string):Promise<Usuarios>{
        let apiR = new apiResponse();
        apiR.data = {}
        try {
            let usuario = await getManager().getRepository(Usuarios).findOne({where:{email, password}});
            if(usuario == null){
                throw apiR = {
                    message: "No Registra",
                    code: 400,
                    data: usuario 
                }
            }
            usuario.password = crypto.createHash("md5").update(newPassword).digest("hex").toUpperCase();
            let Usuario = await getManager().getRepository(Usuarios).save(usuario)
            return await this.GetById(Usuario.id);
        } catch (error) {
            if(error?.code === 400){
                throw apiR;          
            } else{
                apiR.code = 500;
                apiR.message = error
                throw apiR;          
            }    
        }
    }

    async Login(email:string, password:string):Promise<Object>{
        let apiR = new apiResponse();
        apiR.data = {}
        try {
            const config = await EnvConfig.getInstance();
            const secretOrKey = await config.get('AUTH_KEY');
            let usuario = await getManager().getRepository(Usuarios).findOne({where:{email, password}});
            if(usuario == null){
                throw apiR = {
                    message: "No Registra",
                    code: 400,
                    data: usuario 
                }
            }else{
                const token = jwt.sign({email, password, lastSession: new Date().getTime()}, secretOrKey);
                return {
                    email, token
                };
            }
        } catch (error) {
            if(error?.code === 400){
                throw apiR;          
            } else{
                apiR.code = 500;
                apiR.message = error
                throw apiR;          
            }    
        }
    }

    async DecrypLogin(token):Promise<Usuarios>{
        let apiR = new apiResponse();
        apiR.data = {}
        try {
            const config = await EnvConfig.getInstance();
            const secretOrKey = await config.get('AUTH_KEY');
            return jwt.verify(token, secretOrKey, async (err, decoded) => {
                console.log(decoded);
                let currentDate = new Date().getTime()
                if (err) {
                    apiR = {
                        code: 400,
                        message: "Token is ,not valid" ,
                        data: {}
                    } 
                    throw apiR;
                }else if (decoded?.lastSession == null){
                    apiR = {
                        code: 400,
                        message: "Corrupt Token", 
                        data: {}
                    } 
                    throw apiR;
                }else if ((await DatesU.moreThanTwoHoursDifference(currentDate, decoded?.lastSession)) == true){
                    apiR = {
                        code: 400,
                        message: "Expired Token", 
                        data: {}
                    } 
                    throw apiR;
                }
                else{
                    let usuario = await getManager().getRepository(Usuarios).findOne({where:{email: decoded.email, password: decoded.password}});
                    if(usuario == null){
                        throw apiR = {
                            message: "No Registra",
                            code: 400,
                            data: usuario 
                        }
                    }
                    return usuario
                }
            });
        } catch (error) {
            if(error?.code === 400){
                throw apiR;          
            } else{
                apiR.code = 500;
                apiR.message = error
                throw apiR;          
            }    
        }
    }
    
    async ValidateExistence(user:Usuarios):Promise<boolean>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let UserName = await getManager().getRepository(Usuarios).findOne({where:{userName: user?.userName}})
            let Email = await getManager().getRepository(Usuarios).findOne({where:{email: user?.email}})
            if(Email != null){
                throw apiR ={
                    code: 400,
                    message: `El Email: ${Email.email} ya se encuentra en uso`,
                    data: {}
                }
            }else if(UserName != null){
                throw apiR ={
                    code: 400,
                    message: `El UserName: ${UserName.userName} ya se encuentra en uso`,
                    data: {}
                }
            }else{
                return false;
            }
        } catch (error) {
            if(error?.code === 400){
                throw apiR;          
            } else{
                apiR.code = 500;
                apiR.message = error
                throw apiR;          
            }           
        }
    }
    
    async GetAll():Promise<Usuarios[]>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let Users = await getManager().getRepository(Usuarios).find({relations:['nivel']})
            return Users;
        } catch (error) {
            if(error?.code === 400){
                throw apiR;          
            } else{
                apiR.code = 500;
                apiR.message = error
                throw apiR;          
            }            
        }
    }
    
    async GetById(id:number):Promise<Usuarios>{
        let apiR = new apiResponse();
        apiR.data = {};
        try {
            let User = await getManager().getRepository(Usuarios).findOne({where:{id: id}, relations:['nivel']})
            return User;
        } catch (error) {
            if(error?.code === 400){
                throw apiR;          
            } else{
                apiR.code = 500;
                apiR.message = error
                throw apiR;          
            }         
        }
    }
}