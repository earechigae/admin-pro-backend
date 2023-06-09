/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT }= require('../middlewares/validar-jwt');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');


const router = Router();

router.get('/', validarJWT, getUsuarios );

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').notEmpty(),
        check('email', 'El formato del email es incorrecto').isEmail(),
        validarCampos/*, 
        check('email', 'El email especificado no es válido')*/
    ], 
crearUsuario );

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').notEmpty(),
        check('email', 'El formato del email es incorrecto').isEmail(),
        //check('role', 'El rol es obligatiorio').notEmpty(),
        validarCampos
    ], 
actualizarUsuario);


router.delete('/:id', [
    validarJWT
], borrarUsuario);


module.exports = router;