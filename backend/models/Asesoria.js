const mongoose = require('mongoose');

const AsesoriaSchema = new mongoose.Schema({
    alumnoMatricula: {
        type: String,
        required: true 
    },
    profesorNombre: {
        type: String,
        required: true 
    },
    materia: {
        type: String,
        required: true 
    },
    fechaHora: {
        type: String,
        required: true 
    },
    estado: {
        type: String,
        required: true,
        default: 'Pendiente' 
    },
    motivoRechazo: {
        type: String,
        required: false,
        default: '' 
    }
});

module.exports = mongoose.model('Asesoria', AsesoriaSchema);