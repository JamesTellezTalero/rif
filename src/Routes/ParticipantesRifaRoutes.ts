var express = require('express');
var router = express.Router();

let participantesRifa_controller = require('./../Controllers/ParticipantesRifaController');
var authMiddle = require('./../Middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.send('Bienvenido al BackEnd de Rif ||| <br>Sección de participantes rifa');
});

router.get('/GetAll', authMiddle.auth,  participantesRifa_controller.GetAll);
router.get('/GetById', authMiddle.auth,  participantesRifa_controller.GetById);
router.get('/GetByRifa', authMiddle.auth,  participantesRifa_controller.GetByRifa);

router.post('/Create', authMiddle.auth,  participantesRifa_controller.Create);

router.put('/Update', authMiddle.auth,  participantesRifa_controller.Update);

module.exports = router;
