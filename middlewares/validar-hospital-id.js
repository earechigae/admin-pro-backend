const { response } = require('express');
const Hospital = require('../models/hospital');

const validarHospitalId = async(req, res = response, next) => {
    const { hospital } = req.body;
    const _id = hospital

    try{
        const existeHospital = await Hospital.findOne({ _id });

        if(!existeHospital){
            return res.status(400).json({
                ok: false,
                msg: 'El Id del hopsital especificado no existe'
            });
        }
    }catch(error){
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Contacte al administrador'
        });
    }

    next();
}

module.exports = {
    validarHospitalId
}