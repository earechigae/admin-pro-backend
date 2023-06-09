const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios//,
        //uid: req.uid
        //msg: "Obteniendo usuario"
        // usuarios: [{
        //     id: 123,
        //     nombre: "Erick"
        // }]
    });
}


const crearUsuario = async(req, res = response) => {
    //console.log(req.body);
    let usuario = null;
    let token = null;
    const {email, password, nombre} = req.body;

    try{
        const existeEmail = await Usuario.findOne({ email });

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }
        //const usuario = new Usuario(req.body);
        usuario = new Usuario(req.body);
        
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        
        // Persiste usuario
        await usuario.save();

        //Generar token - JWT
        token = await generarJWT(usuario.id);
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado .. Revisar logs'
        });
    }

    res.json({
        ok: true,
        usuario: usuario,
        token: token
    });
}

const actualizarUsuario = async(req, res = response) => {
    // TODO: Validar token y comprobar si es el usuario correcto
    const uid = req.params.id;

    try{
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuariuo con ese Id'
            });
        }

        // Actualizaciones
        //cons campos = req.body;
        const { password, google, email, ...campos } = req.body;
        if(usuarioDB.email !== email){
            //const existeEmail = await Usuario.findOne({ email: req.body.emaill });
            const existeEmail = await Usuario.findOne({ email });
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese correo'
                });
            }
        }
        campos.email = email;
        //delete campos.password;
        //delete campos.google;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
            usuario: usuarioActualizado,
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const borrarUsuario = async(req, res = response) => {
    const uid = req.params.id;

    try{

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese Id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true, 
            uid: uid,
            msg: 'Usuario eliminado'
        });
    }catch(error){
        console.log(error);
        res.status.json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


module.exports = {
    getUsuarios, 
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}