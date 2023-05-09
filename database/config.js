const mongoose = require('mongoose');

const dbConnection = async () => {

    try{
        await mongoose.connect(process.env.DB_CNN, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        console.log('Base de datos en línea');

    }catch(error){
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD. Pr favor ver los logs');
    }
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = {
    dbConnection
}