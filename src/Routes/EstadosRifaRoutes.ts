var express = require('express');
var router = express.Router();

let estadosRifas_controller = require('./../Controllers/EstadosRifaController');
var authMiddle = require('./../Middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.send('Bienvenido al BackEnd de Rif ||| <br>Sección de usuarios');
});

router.get('/GetAll', authMiddle.auth,  estadosRifas_controller.GetAll);
router.get('/GetById', authMiddle.auth,  estadosRifas_controller.GetById);
router.get('/GetByName', authMiddle.auth,  estadosRifas_controller.GetByName);

router.post('/Create', authMiddle.auth,  estadosRifas_controller.Create);


module.exports = router;
