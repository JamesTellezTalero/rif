import { createConnection } from "typeorm";
import { AppDataSource } from "./data-source"
import * as dotenv from 'dotenv';
import { UsuariosBusiness } from "./Business/UsuariosBusiness";
import passport = require("passport");
import { GanadoresRifaBusiness } from "./Business/GanadoresRifaBusiness";
import { EnvConfig } from "./Config/EnvConfig";

var cors = require("cors");
var express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require("body-parser");
const CronJob = require('cron').CronJob;

const app = express();

app.use(express.static(__dirname));
app.use("/assets", express.static("assets"));

let webRoutes = require("./Routes/WebRoutes");
let apiRoutes = require("./Routes/ApiRoutes");

// Variables de entorno
dotenv.config({
    path: path.resolve(__dirname, "process.env"),
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use("/", webRoutes);
app.use("/api", apiRoutes);

createConnection(AppDataSource).then(async (connection) => {
    // await queryRunner.createDatabase("rif", true);
    console.log("Database Conected")
    const config = await EnvConfig.getInstance();
    const host = await config.get('HOST');
    const port = await config.get('PORT');
    app.listen(port, ()=>{
        return console.log(`listen ${host}:${port}`);
    });
}).catch(err => console.error(err));


// const GanadoresB = new GanadoresRifaBusiness();
// const GanadoresRifaCron = new CronJob('*/1 * * * *', async function() {
//     try {
//         const d = new Date();
//         console.log('Generando ganadores:', d);
//         await GanadoresB.DefinirGanadoresPendientes();
//     } catch (error) {
//         console.log(error);
//     }
// });
// GanadoresRifaCron.start();
// const UpdateTransactionsCron = new CronJob('*/10 * * * * *', async function() {
//     try {
//         await axios.put(`http://${host}:${port}/api/transacciones/UpdateTranPaymentsState`, {}, {
//             headers: {
//                 Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp0YWxlcm85MUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQ1NiIsImxhc3RTZXNzaW9uIjoxNjc2MjQzMjQ0Mjg3LCJpYXQiOjE2NzYyNDMyNDR9.Hwc-PQcMUAv1e-2D5jRgKY7LYrkI5Z-LXwO7xNaUJhg",
//                 'Content-Type': 'application/json'
//             }    
//         });
//     } catch (error) {
//         console.log(error);
//     }
// });
// UpdateTransactionsCron.start();