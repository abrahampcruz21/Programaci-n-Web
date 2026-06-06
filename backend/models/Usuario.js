const mongoose = require('mongoose');

// Este es el molde estricto para registrar usuarios en el SIGATAA
const UsuarioSchema = new mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true
    },
    correoElectronico: {
        type: String,
        required: true,
        unique: true // No se pueden repetir correos
    },
    matricula: {
        type: String,
        required: true,
        unique: true // Cada matrícula es única (alumnos o profes)
    },
    contrasena: {
        type: String,
        required: true
    },
    carrera: {
        type: String,
        required: false // Es opcional por si el usuario es un Profesor o Admin
    },
    rol: {
        type: String,
        required: true,
        default: 'alumno' // Si no se define, por defecto es alumno
    }
});

// Guardamos el molde con el nombre 'Usuario'
module.exports = mongoose.model('Usuario', UsuarioSchema);