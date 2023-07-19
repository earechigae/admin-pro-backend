const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async(req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i'); // i = case insensitive

    // const usuarios = await Usuario.find({nombre: regex});
    // const medicos =  await Medico.find({nombre: regex});
    // const hospitales = await Hospital.find({nombre: regex});

    //Código más eficiente en términos de rendimiento
    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({nombre: regex}),
        Medico.find({nombre: regex}),
        Hospital.find({nombre: regex})
    ]) 

    res.json({
        ok: true,
        usuarios, 
        medicos,
        hospitales
    });
}

const getDocumentosColeccion = async(req, res = response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i'); // i = case insensitive
    let data = [];

    switch(tabla) {
        case 'hospitales':
            data = await Hospital.find({nombre: regex}).populate('usuario', 'nombre img');
            break;
        case 'medicos':
            data =  await Medico.find({nombre: regex})
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');;
            break;
        case 'usuarios':
            data = await Usuario.find({nombre: regex});
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser hospitales/medicos/usuarios'
            })
    }

    res.json({
        ok: true,
        resultados: data
    });
}


module.exports = {
    getTodo,
    getDocumentosColeccion
}
