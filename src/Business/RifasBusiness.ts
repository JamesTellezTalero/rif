import { getManager } from "typeorm";
import { Usuarios } from "../entities/Usuarios";
import { apiResponse } from "../Models/apiResponse";
import { Niveles } from "../entities/Niveles";
import { Rifas } from "../entities/Rifas";
import { EstadosRifa } from "../entities/EstadosRifa";
import { EstadosRifaBusiness } from "./EstadosRifaBusiness";

const EstadosRifaB = new EstadosRifaBusiness();

const fs = require('fs');

export class RifasBusiness{  

    async Create(rifa:Rifas):Promise<apiResponse>{
        let apiR = new apiResponse();
        apiR.data = {}
        try {
            let date = new Date();
            let imagePathStructure = (rifa.name.replace(" ", "-")) + "-" + date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear();
            let buffer = Buffer.from(rifa.image, "base64");
            let bufferPath:string = `/assets/RifasImages/${imagePathStructure}.png`;
            fs.writeFile(`.${bufferPath}`, buffer, (error) => {
                if (error) {
                    throw error;
                }
            });
            rifa.image = bufferPath;
            rifa.estadoRifa = await getManager().getRepository(EstadosRifa).findOne({where:{name: "Creada"}});
            rifa = await getManager().getRepository(Rifas).save(rifa)
            if(rifa != null){
                apiR.code = 200;
                apiR.message = "Rifa Creada"
                apiR.data = rifa
                return apiR;
            }else{
                throw rifa;
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
            if(User){
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
}