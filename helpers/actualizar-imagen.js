const fs = require('fs');

const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');

const actualizarImagen = async(tabla, id, nombreArchivo) => {
    let pathViejo = '';

    switch(tabla){
       case 'hospitales':
            let hospital;

            switch(tabla){
                case 'hospitales':
                    hospital = await Hospital.findById(id);
                    
                    if (!hospital){
                        console.log('No se encontró al hospital por Id')
                        return false;
                    }

                    pathViejo = `./archivos-subidos/hospitales/${hospital.img}`;
                    //borramos la imagen anterior 
                    borrarImagen(pathViejo);

                    hospital.img = nombreArchivo;
                    await hospital.save();       
                    //console.log(id + ' Imagen actualizada en ' + nombreArchivo) 
                    break;
                case 'medicos':
                    // Rest of the code...
                    break;
                case 'usuarios':
                    // Rest of the code...
                    break;
            }

            // Rest of the code...
            break;

        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico){
                console.log('No se encontró al médico por Id')
                return false;
            }

            pathViejo = `./archivos-subidos/medicos/${medico.img}`;
            //borramos la imagen anterior 
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            break; 

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario){
                console.log('No se encontró usuario por Id')
                return false;
            }

            pathViejo = `./archivos-subidos/usuarios/${usuario.img}`;
            //borramos la imagen anterior 
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();     
            break;          
   }

   return true;
}


const borrarImagen = (path) => {
    if(fs.existsSync(path)){
        //borramos imagen 
        fs.unlinkSync(path);
    }
}

module.exports = {
    actualizarImagen    
}