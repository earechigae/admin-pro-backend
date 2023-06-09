/*
    Path: '/api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
    check('email', 'El correo es obligatorio').notEmpty(),
    check('email', 'El correo es de un formato incorrecto').isEmail(), 
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);


module.exports = router;