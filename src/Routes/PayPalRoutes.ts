var express = require('express')
var router = express.Router()

let paypal_controller = require('../Controllers/PayPalController')
let auth_middleware = require('../middlewares/authMiddleware')

router.get('/', (req, res)=>{
    res.status(200).send('Bienvenido al BackEnd de Rif ||| <br>Sección de PayPal')
})

router.get('/Authentication', auth_middleware.auth, paypal_controller.Authentication)
router.get('/ShowOrder', auth_middleware.auth, paypal_controller.ShowOrder)

router.post('/CreateOrder', auth_middleware.auth, paypal_controller.CreateOrder)

module.exports = router;