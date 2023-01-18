var express = require('express');
var router = express.Router();


router.get('/', (req, res)=>{
    console.log("hola ");
    res.status(200).send("Bienvenido a rif")
});

module.exports = router;

