var express = require('express');
var router = express.Router();

let rifas_controller = require('./../Controllers/RifasController');
var authMiddle = require('./../Middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.send('Bienvenido al BackEnd de Rif ||| <br>Sección de usuarios');
});

router.post('/Create', rifas_controller.Create);
// router.get('/GetById', authMiddle.auth,  rifas_controller.GetById);



module.exports = router;
