var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    console.log("hola/api");
    res.status(200).send('Bienvenido al BackEnd de Rif ||| <br> Este sitio se encuentra en desarrollo. ');
});

//#region ParticipantesRoutes
var ParticipantesRoutes = require('./ParticipantesRoutes');
router.use('/participantes', ParticipantesRoutes);
//#endregion

//#region Usuarios
var UsuariosRoutes = require('./UsuariosRoutes');
router.use('/usuarios', UsuariosRoutes);
//#endregion

//#region EstadosRifas
var EstadosRifaRoutes = require('./EstadosRifaRoutes');
router.use('/estadosrifas', EstadosRifaRoutes);
//#endregion

//#region Rifas
var RifasRoutes = require('./RifasRoutes');
router.use('/rifas', RifasRoutes);
//#endregion

//#region tiposrifa
var TiposRifaRoutes = require('./TiposRifaRoutes');
router.use('/tiposrifa', TiposRifaRoutes);
//#endregion

//#region tipodocumento
var TipoDocumentoRoutes = require('./TipoDocumentoRoutes');
router.use('/tipodocumento', TipoDocumentoRoutes);
//#endregion

module.exports = router;

