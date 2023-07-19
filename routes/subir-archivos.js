/*
    Subir Archivos
    Ruta: /api/subir-archivos/:tabla/:id
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { subirArchivo, retornaImagen } = require('../controllers/subir-archivos');

const router = Router();
router.use(expressFileUpload());

router.put('/:tabla/:id', [
        validarJWT
    ], subirArchivo );

router.get('/:tabla/:foto', [
        
    ], retornaImagen );


module.exports = router;