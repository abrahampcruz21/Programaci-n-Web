const mongoose = require('mongoose');

// Este es el molde para controlar las citas de asesorías y tutorías en el SIGATAA
const AsesoriaSchema = new mongoose.Schema({
    alumnoMatricula: {
        type: String,
        required: true // Quién pide la cita
    },
    profesorNombre: {
        type: String,
        required: true // Con qué maestro es la cita
    },
    materia: {
        type: String,
        required: true // Qué materia van a revisar
    },
    fechaHora: {
        type: String,
        required: true // El día y la hora seleccionados
    },
    estado: {
        type: String,
        required: true,
        default: 'Pendiente' // Al inicio siempre se crea como "Pendiente"
    },
    motivoRechazo: {
        type: String,
        required: false,
        default: '' // Empieza vacío, solo se llena si el profe la rechaza
    }
});

module.exports = mongoose.model('Asesoria', AsesoriaSchema);