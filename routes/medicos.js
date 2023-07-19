/*
    Medicos
    Ruta: /api/medicos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarHospitalId } = require('../middlewares/validar-hospital-id');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');


const router = Router();

router.get('/', /*validarJWT,*/ getMedicos );

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del médico es mandatorio').notEmpty(),
        check('hospital', 'El id del hospital es mandatorio').notEmpty(),
        check('hospital', 'El hospital id debe de ser válido').isMongoId(),
        validarHospitalId,
        validarCampos
    ], 
    crearMedico );

router.put('/:id', [
        /*validarJWT,*/

    ], 
    actualizarMedico);


router.delete('/:id', [
    /*validarJWT*/
    ], borrarMedico);


module.exports = router;