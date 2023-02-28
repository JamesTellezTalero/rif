var express = require('express');
var router = express.Router();

let ganadoresRifa_controller = require('./../Controllers/GanadoresRifaController');
var authMiddle = require('./../Middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.send('Bienvenido al BackEnd de Rif ||| <br>Sección de ganadores rifa');
});

router.post('/DefinirGanadores', authMiddle.auth, ganadoresRifa_controller.DefinirGanadores)

router.get('/GetByRifa', authMiddle.auth, ganadoresRifa_controller.GetByRifa)

module.exports = router;
