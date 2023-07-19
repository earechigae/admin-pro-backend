const { Router } = require('express');
const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const subirArchivo = (req, res = response) => {

    const tabla = req.params.tabla;
    const id = req.params.id;
    const tablasValidas = ['hospitales', 'medicos', 'usuarios'];

    //Validar la tabla
    if(!tablasValidas.includes(tabla)){
        return res.status(400).json({
            ok: false,
            msg: 'La tabla especificada no es alguna de las siguientes: hospitales, medicos, usuarios'
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400)/*.send('No files were uploaded.');*/
                    .json({
                        ok: false,
                        msg: 'No hay ningún archivo'
                    });
    }

    //Procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.'); //Ejuemplo: wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400)/*.send('No files were uploaded.');*/
        .json({
            ok: false,
            msg: 'El archivo no tiene una extensión permitida'
        });
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`; 

    //Path para guardar la imagen 
    const path = `./archivos-subidos/${ tabla }/${ nombreArchivo }`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Hubo un error al subir el archivo'
            });
        }
        
        //Actualizar base de datos
        if(!actualizarImagen(tabla, id, nombreArchivo)){
            return res.status(400).json({
                ok: false,
                msg: 'El id especificado no existe'
            });            
        }

        res.json({
            ok: true,
            msg: '¡Archivo subido exitosamente!',
            nombreArchivo
        });
    });
}

const retornaImagen = (req, res = response) => {
    const tabla = req.params.tabla;
    const foto = req.params.foto;   

    const pathFoto = path.join(__dirname, `../archivos-subidos/${tabla}/${foto}`);

    //Imagen por defecto
    if(fs.existsSync(pathFoto)){
        res.sendFile(pathFoto);
    }else{
        const pathFotoNoEncontrado = path.join(__dirname, `../archivos-subidos/no-img.jpg`);
        res.sendFile(pathFotoNoEncontrado);
    }
}


module.exports = {
    subirArchivo,
    retornaImagen
}