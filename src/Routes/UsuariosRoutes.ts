var express = require('express');
var router = express.Router();

var usuarios_controller = require('./../Controllers/UsuariosController');
var authMiddle = require('./../Middlewares/authMiddleware');

router.get('/', (req, res) => { 
    res.send('Bienvenido al BackEnd de Rif ||| <br>Sección de usuarios');
});

router.put('/UpdatePassword', usuarios_controller.UpdatePassword);

router.post('/Create', usuarios_controller.Create);
router.post('/Login', usuarios_controller.Login);

router.get('/GetAll', authMiddle.auth,  usuarios_controller.GetAll);
router.get('/GetById', authMiddle.auth,  usuarios_controller.GetById);



module.exports = router;
