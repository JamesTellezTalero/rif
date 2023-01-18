var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    console.log("hola/api");
    res.status(200).send('Bienvenido al BackEnd de Rif ||| <br> Este sitio se encuentra en desarrollo. ');
});

//#region Consumoswebhook
var UsuariosRoutes = require('./UsuariosRoutes');
router.use('/usuarios', UsuariosRoutes);
//#endregion

module.exports = router;

