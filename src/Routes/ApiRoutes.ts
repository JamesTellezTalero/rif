var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    res.status(200).send('Bienvenido al BackEnd de Rif ||| <br> Este sitio se encuentra en desarrollo. ');
});

//#region Currencies
var CurrenciesRoutes = require('./CurrenciesRoutes');
router.use('/currencies', CurrenciesRoutes);
//#endregion

//#region EstadosRifas
var EstadosRifaRoutes = require('./EstadosRifaRoutes');
router.use('/estadosrifas', EstadosRifaRoutes);
//#endregion

//#region GanadoresRifas
var GanadoresRifas = require('./GanadoresRifaRoutes');
router.use('/ganadoresrifas', GanadoresRifas);
//#endregion

//#region ParticipantesRifaRoutes
var ParticipantesRifaRoutes = require('./ParticipantesRifaRoutes');
router.use('/participantesrifa', ParticipantesRifaRoutes);
//#endregion

//#region ParticipantesRoutes
var ParticipantesRoutes = require('./ParticipantesRoutes');
router.use('/participantes', ParticipantesRoutes);
//#endregion

//#region PaymentMethodKeysRoutes
var PaymentMethodKeysRoutes = require('./PaymentMethodKeysRoutes');
router.use('/paymentmethodkeys', PaymentMethodKeysRoutes);
//#endregion

//#region PaymentMethodsRoutes
var PaymentMethodsRoutes = require('./PaymentMethodsRoutes');
router.use('/paymentmethods', PaymentMethodsRoutes);
//#endregion

//#region PayPalRoutes
var PayPalRoutes = require('./PayPalRoutes');
router.use('/paypal', PayPalRoutes);
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

//#region transacciones
var TransaccionesRoutes = require('./TransactionsRoutes')
router.use('/transacciones', TransaccionesRoutes)
//#endregion

//#region Usuarios
var UsuariosRoutes = require('./UsuariosRoutes');
router.use('/usuarios', UsuariosRoutes);
//#endregion

//#region userkeys
var UserKeysRoutes = require('./UserKeysRoutes');
router.use('/userkeys', UserKeysRoutes);
//#endregion

module.exports = router;

