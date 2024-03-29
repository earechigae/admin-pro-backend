/*
    Path: '/api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSigIn, renewToken} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', [
    check('email', 'El correo es obligatorio').notEmpty(),
    check('email', 'El correo es de un formato incorrecto').isEmail(), 
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);


router.post('/google', [
    check('token', 'El token de Google es obligatorio').notEmpty()
], googleSigIn);


router.get('/renew', validarJWT, renewToken);

module.exports = router;