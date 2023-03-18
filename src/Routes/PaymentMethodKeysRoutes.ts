var express = require('express');
var router = express.Router();

let paymentMethodKeys_controller = require('./../Controllers/PaymentMethodKeysController');
var authMiddle = require('./../Middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.send('Bienvenido al BackEnd de Rif ||| <br>Sección de llaves metodos de pago');
});

router.get('/GetAll', authMiddle.auth,  paymentMethodKeys_controller.GetAll);
router.get('/GetById', authMiddle.auth,  paymentMethodKeys_controller.GetById);
router.get('/GetByPaymentMethodId', authMiddle.auth,  paymentMethodKeys_controller.GetByPaymentMethodId);

router.post('/Create', authMiddle.auth,  paymentMethodKeys_controller.Create);

module.exports = router;
