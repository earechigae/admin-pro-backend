const jwt = require('jsonwebtoken');
const { response } = require('express');
const Usuario = require('../models/usuario');

const validarJWT = async(req, res = response, next) => {
    //Leer el token
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
                    ok: false,
                    msg: 'No hay token en la petición'
                });
    }

    try{
        //console.log(token);
        const { uid } = jwt.verify(token, process.env.JWT_SECRET, {});
        req.uid = uid;
        //console.log(uid);
    }catch(error){
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();
}

const validarAdminRole = async(req, res = response, next) => {
    const uid = req.uid;

    try{
        const usuarioDb = await Usuario.findById(uid);

        if(!usuarioDb){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        if(usuarioDb.role !== 'ADMIN_ROLE' ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para realizar esta acción'
            });
        }

        next();

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Hable con el administrador'
        });
    }
}


const validarAdminRole_o_MismoUsuario= async(req, res = response, next) => {
    const uid = req.uid;
    const id = req.params.id;
    
    try{
        const usuarioDb = await Usuario.findById(uid);

        if(!usuarioDb){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        if(usuarioDb.role === 'ADMIN_ROLE' || uid === id ){
            next();
            return;
        }else{
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para realizar esta acción'
            });
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Hable con el administrador'
        });
    }
}


module.exports = {
    validarJWT, 
    validarAdminRole, 
    validarAdminRole_o_MismoUsuario
}