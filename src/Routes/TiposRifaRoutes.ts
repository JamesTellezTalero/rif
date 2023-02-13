var express = require('express');
var router = express.Router();

let tiposRifas_controller = require('./../Controllers/TiposRifaController');
var authMiddle = require('./../Middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.send('Bienvenido al BackEnd de Rif ||| <br>Sección de tipos rifa');
});

router.get('/GetAll', authMiddle.auth,  tiposRifas_controller.GetAll);
router.get('/GetById', authMiddle.auth,  tiposRifas_controller.GetById);
router.get('/GetByName', authMiddle.auth,  tiposRifas_controller.GetByName);

router.post('/Create', authMiddle.auth,  tiposRifas_controller.Create);


module.exports = router;
