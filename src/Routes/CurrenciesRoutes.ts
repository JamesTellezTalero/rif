var express = require('express');
var router = express.Router();

let currencies_controller = require('./../Controllers/CurrenciesController');
var authMiddle = require('./../Middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.send('Bienvenido al BackEnd de Rif ||| <br>Sección de currencies');
});

router.get('/GetAll', authMiddle.auth,  currencies_controller.GetAll);
router.get('/GetById', authMiddle.auth,  currencies_controller.GetById);
router.get('/GetByCode', authMiddle.auth,  currencies_controller.GetByCode);

router.post('/Create', authMiddle.auth,  currencies_controller.Create);

router.put('/Update', authMiddle.auth,  currencies_controller.Update);

module.exports = router;
