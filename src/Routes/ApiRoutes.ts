var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    console.log("hola/api");
    res.status(200).send('Bienvenido al BackEnd de Rif ||| <br> Este sitio se encuentra en desarrollo. ');
});

//#region Usuarios
var UsuariosRoutes = require('./UsuariosRoutes');
router.use('/usuarios', UsuariosRoutes);
//#endregion

//#region Rifas
var RifasRoutes = require('./RifasRoutes');
router.use('/rifas', RifasRoutes);
//#endregion

module.exports = router;

