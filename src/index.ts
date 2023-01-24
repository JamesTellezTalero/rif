import { createConnection } from "typeorm";
import { AppDataSource } from "./data-source"
import * as dotenv from 'dotenv';
import { UsuariosBusiness } from "./Business/UsuariosBusiness";

var cors = require("cors");
var express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

// Variables de entorno
dotenv.config({
    path: path.resolve(__dirname, "process.env"),
});

const app = express();
const port = process.env.PORT;

app.use(express.static(__dirname));
app.use("/assets", express.static("assets"));

let webRoutes = require("./Routes/WebRoutes");
let apiRoutes = require("./Routes/ApiRoutes");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json());

app.use("/", webRoutes);
app.use("/api", apiRoutes);

createConnection(AppDataSource).then(async (connection) => {
    // await queryRunner.createDatabase("rif", true);
    console.log("Database Conected")
    app.listen(port, ()=>{
        return console.log(`listen ${port}`);
    });
}).catch(err => console.error(err));
