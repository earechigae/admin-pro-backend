
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const path = require('path');
//const csrf = require('csrf');
const { dbConnection } = require('./database/config')

//Crear el servidor de express
const app = express();

//app.use(csrf());

//Configurar CORS
app.use(cors());

//Carpeta pública
app.use(express.static('public'));

//Lectura y parseo del body en JSON
app.use(express.json());

//Base de datos
dbConnection();
//console.log(process.env);

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/subir-archivos',  require('./routes/subir-archivos'));
 
// Lo último. Con este cambio Angular toma elcontrol del path en lo que haya en la carpeta public 
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
}); 

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})

//lWMAQXTonzrRJWzK

//mean_user
//eQwDV0S6bkWvb1kz