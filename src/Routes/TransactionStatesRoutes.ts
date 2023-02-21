var express = require('express');
var router = express.Router();

let transactionStates_controller = require('./../Controllers/TransactionStatesController');
var authMiddle = require('./../Middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.send('Bienvenido al BackEnd de Rif ||| <br>Sección de estados rifa');
});

router.get('/GetAll', authMiddle.auth,  transactionStates_controller.GetAll);
router.get('/GetById', authMiddle.auth,  transactionStates_controller.GetById);
router.get('/GetByName', authMiddle.auth,  transactionStates_controller.GetByName);

router.post('/Create', authMiddle.auth,  transactionStates_controller.Create);

router.put('/Update', authMiddle.auth,  transactionStates_controller.Update);

module.exports = router;
