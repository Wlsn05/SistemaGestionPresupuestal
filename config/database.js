const mongoose = require('mongoose');
require('dotenv').config();
//const uri = 'mongodb://127.0.0.1:27017/music' //para conectar en local

const uri = process.env.MONGODB_URI;

mongoose.set('strictQuery', false)

mongoose.connect(uri)
.then((() => console.log('Connect DB success')))
.catch((err) => console.log('Connect DB fail' + err))


module.exports = mongoose;

