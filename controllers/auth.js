const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');

const login = async(req, res = response) => {
    const { email, password } = req.body;

    try{

        const usuarioDB = await Usuario.findOne({ email });
        //Verificar email
        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg: 'Email inválido'
            });
        }

        //Verifica contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contaseña inválida'
            });
        }

        //Generar token - JWT
        const token = await generarJWT(usuarioDB.id)

        res.json({
            ok: true,
            token: token,
            menu: getMenuFrontEnd(usuarioDB.role)
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const googleSigIn = async(req, res = response) => {
    try{
        //const googleUser = await googleVerify(req.body.token);
        const { email, name, picture } = await googleVerify(req.body.token);
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if(!usuarioDB){
            usuario = new Usuario({
                nombre: name,
                email, 
                password: '@@@',
                img: picture,
                google: true
            });
        }else{
            usuario = usuarioDB;
            usuario.google = true;
        }

        await usuario.save();

        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            email, name, picture,
            token,
            menu: getMenuFrontEnd(usuario.role)
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es correcto'
        });
    }
}

const renewToken = async(req, res = response) => {
    const uid = req.uid;

    //Generar token - JWT
    const token = await generarJWT(uid);

    //Obtener el usuario por UID
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        //uid,
        token,
        usuario,
        menu: getMenuFrontEnd(usuario.role)
    });
}

module.exports = {
    login, 
    googleSigIn,
    renewToken
}