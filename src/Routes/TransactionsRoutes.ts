var express = require('express')
var router = express.Router()

var authMiddle = require('../middlewares/authMiddleware');

let transacciones_controller = require('../Controllers/TransaccionesController')

router.get('/', (req, res) => {
    res.send('Bienvenido al BackEnd de Rif ||| <br>Sección de transactions');
});

router.post('/Create', authMiddle.auth, transacciones_controller.Create)

router.put('/Update', authMiddle.auth, transacciones_controller.Update)
router.put('/UpdateState', authMiddle.auth, transacciones_controller.UpdateState)
router.put('/UpdateTranPaymentsState', authMiddle.auth, transacciones_controller.UpdateTranPaymentsState)

router.get('/GetAll', authMiddle.auth, transacciones_controller.GetAll)
router.get('/GetById', authMiddle.auth, transacciones_controller.GetById)
router.get('/GetByOrden', authMiddle.auth, transacciones_controller.GetByOrden)
router.get('/GetByRifa', authMiddle.auth, transacciones_controller.GetByRifa)
router.get('/GetByState', authMiddle.auth, transacciones_controller.GetByState)
module.exports = router;