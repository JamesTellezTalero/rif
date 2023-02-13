var express = require('express');
var router = express.Router();

var participantes_controller = require('./../Controllers/ParticipantesController');
var authMiddle = require('./../Middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.send('Bienvenido al BackEnd de Rif ||| <br>Sección de participantes');
});

router.post('/Create', authMiddle.auth, participantes_controller.Create);

router.get('/GetById', authMiddle.auth,  participantes_controller.GetById);



module.exports = router;
