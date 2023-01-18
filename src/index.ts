import { createConnection } from "typeorm";
import { AppDataSource } from "./data-source"

var express = require('express');

const app = express();

createConnection(AppDataSource).then(async (connection) => {
    // const migrationsRunner = new MigrationsRunner();
    // await migrationsRunner.runMigrations({
    //     connectionName: connection.name,
    //     migrations: [__dirname + '/migrations/*.ts'],
    //     transaction: 'all'
    // });
    console.log("Database Conected")
}).catch(err => console.error(err));

app.listen(3000, ()=>{
    console.log("listen");
});