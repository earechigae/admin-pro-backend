const jwt = require('jsonwebtoken');
const { response } = require('express');

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

module.exports = {
    validarJWT
}