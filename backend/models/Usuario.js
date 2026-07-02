const mongoose = require('mongoose');


const UsuarioSchema = new mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true
    },
    correoElectronico: {
        type: String,
        required: true,
        unique: true 
    },
    matricula: {
        type: String,
        required: true,
        unique: true 
    },
    contrasena: {
        type: String,
        required: true
    },
    carrera: {
        type: String,
        required: false 
    },
    rol: {
        type: String,
        required: true,
        default: 'alumno' 
    }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);