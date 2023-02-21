var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    res.status(200).send('Bienvenido al BackEnd de Rif ||| <br> Este sitio se encuentra en desarrollo. ');
});

//#region ParticipantesRifaRoutes
var ParticipantesRifaRoutes = require('./ParticipantesRifaRoutes');
router.use('/participantesrifa', ParticipantesRifaRoutes);
//#endregion

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

//#region tipodocumento
var TransactionStatesRoutes = require('./TransactionStatesRoutes');
router.use('/transactionstates', TransactionStatesRoutes);
//#endregion

module.exports = router;

