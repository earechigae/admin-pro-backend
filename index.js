
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { dbConnection } = require('./database/config')

//Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y parseo del body en JSON
app.use(express.json());

//Base de datos
dbConnection();
//console.log(process.env);

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})

//lWMAQXTonzrRJWzK

//mean_user
//eQwDV0S6bkWvb1kz