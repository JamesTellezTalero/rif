var express = require('express');
var router = express.Router();

let tipoDocumento_controller = require('./../Controllers/TipoDocumentoController');
var authMiddle = require('./../Middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.send('Bienvenido al BackEnd de Rif ||| <br>Sección de Tipo Documento');
});

router.post('/Create', authMiddle.auth,  tipoDocumento_controller.Create);
router.put('/Update', authMiddle.auth,  tipoDocumento_controller.Update);

router.get('/GetAll', authMiddle.auth,  tipoDocumento_controller.GetAll);
router.get('/GetById', authMiddle.auth,  tipoDocumento_controller.GetById);
router.get('/GetByCode', authMiddle.auth,  tipoDocumento_controller.GetByCode);

module.exports = router;
