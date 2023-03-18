var express = require('express');
var router = express.Router();

let userKeysController_controller = require('./../Controllers/UserKeysController');
var authMiddle = require('./../Middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.send('Bienvenido al BackEnd de Rif ||| <br>Sección de User Keys');
});

router.get('/GetAll', authMiddle.auth,  userKeysController_controller.GetAll);
router.get('/GetById', authMiddle.auth,  userKeysController_controller.GetById);
router.get('/GetByUsuarioId', authMiddle.auth,  userKeysController_controller.GetByUsuarioId);

router.post('/Create', authMiddle.auth,  userKeysController_controller.Create);
router.put('/Update', authMiddle.auth,  userKeysController_controller.Update);

module.exports = router;
