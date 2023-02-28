import { createConnection } from "typeorm";
import { AppDataSource } from "./data-source"
import * as dotenv from 'dotenv';
import { UsuariosBusiness } from "./Business/UsuariosBusiness";
import passport = require("passport");
import { GanadoresRifaBusiness } from "./Business/GanadoresRifaBusiness";

var cors = require("cors");
var express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require("body-parser");
const CronJob = require('cron').CronJob;

// Variables de entorno
dotenv.config({
    path: path.resolve(__dirname, "process.env"),
});

const app = express();
const host = process.env.HOST;
const port = process.env.PORT;

app.use(express.static(__dirname));
app.use("/assets", express.static("assets"));

let webRoutes = require("./Routes/WebRoutes");
let apiRoutes = require("./Routes/ApiRoutes");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use("/", webRoutes);
app.use("/api", apiRoutes);

createConnection(AppDataSource).then(async (connection) => {
    // await queryRunner.createDatabase("rif", true);
    console.log("Database Conected")
    app.listen(port, ()=>{
        return console.log(`listen ${port}`);
    });
}).catch(err => console.error(err));


// const job = new CronJob('* * */1 * * *', function() {
// const GanadoresB = new GanadoresRifaBusiness();
// const job = new CronJob('*/1 * * * * *', async function() {
//     try {
//         const d = new Date();
//         console.log('Generando ganadores:', d);
//         await GanadoresB.DefinirGanadoresPendientes();
//     } catch (error) {
//         console.log(error);
//     }
// });
// job.start();