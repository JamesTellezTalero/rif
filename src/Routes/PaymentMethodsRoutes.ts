var express = require('express');
var router = express.Router();

let paymentMethods_controller = require('./../Controllers/PaymentMethodsController');
var authMiddle = require('./../Middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.send('Bienvenido al BackEnd de Rif ||| <br>Sección de estados rifa');
});

router.get('/GetAll', authMiddle.auth,  paymentMethods_controller.GetAll);
router.get('/GetById', authMiddle.auth,  paymentMethods_controller.GetById);
router.get('/GetByName', authMiddle.auth,  paymentMethods_controller.GetByName);

router.post('/Create', authMiddle.auth,  paymentMethods_controller.Create);

router.put('/Update', authMiddle.auth,  paymentMethods_controller.Update);

module.exports = router;
