import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(async () => {
    console.log("Database Conected")
}).catch(error => console.log(error))

var express = require('express');

const app = express();

app.listen(3000, ()=>{
    console.log("listen");
});