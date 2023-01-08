var express = require('express');
var router = express.Router();

var usuarios_controller = require('./../Controllers/UsuariosController');

router.get('/', (req, res) => {
    console.log("hola/usuario");
    res.send('Bienvenido al BackEnd de Rif ||| <br>Sección de usuarios');
});

router.post('/Create', usuarios_controller.Create);
// router.post('/Update', bancos_controller.Update);

// router.get('/GetAll', bancos_controller.GetAll);
// router.get('/GetById', bancos_controller.GetById);



module.exports = router;
