const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    matricula: {
        type: String,
        required: true,
        unique: true, // Para que las matrículas no se dupliquen
        trim: true
    },
    nombreCompleto: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        enum: ['alumno', 'profesor', 'administrador'] // Los 3 accesos de tu PDF
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);