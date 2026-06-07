const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Permite que Angular y Node se hablen sin bloqueos
const Usuario = require('./models/Usuario'); // Importamos tu molde de usuarios

const app = express();
const PORT = 3000;

// CONFIGURACIONES BÁSICAS
app.use(cors());
app.use(express.json()); // Permite al servidor leer datos en formato JSON (el formato de Angular)

// CONEXIÓN A MONGOOSE (MongoDB Local)
mongoose.connect('mongodb://127.0.0.1:27017/sigataa_db')
    .then(() => console.log('¡Conectado con éxito a MongoDB!'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

// ===================================================================
// 🚀 RUTA 1: REGISTRO INTELIGENTE (SEPARA ALUMNOS, PROFESORES Y CARRERAS)
// ===================================================================
app.post('/api/registro', async (req, res) => {
    try {
        const { nombreCompleto, correoElectronico, matricula, contrasena, carrera } = req.body;

        // 1. Validar que no falten los datos obligatorios
        if (!nombreCompleto || !correoElectronico || !matricula || !contrasena) {
            return res.status(400).json({ mensaje: 'Por favor, llena todos los campos obligatorios.' });
        }

        // 2. Revisar si la matrícula ya existe en MongoDB
        const usuarioExiste = await Usuario.findOne({ matricula });
        if (usuarioExiste) {
            return res.status(400).json({ mensaje: 'Esta matrícula ya está registrada.' });
        }

        // ✨ 3. DETECTAR ROL POR LONGITUD DE MATRÍCULA Y ASIGNAR CARRERA
        let rolAsignado = 'alumno'; // Por defecto
        let carreraAsignada = carrera;

        if (matricula.length === 5) {
            rolAsignado = 'profesor';
            carreraAsignada = 'Docente'; // Los profesores no tienen carrera de estudiante
        } else if (matricula.length === 10) {
            rolAsignado = 'alumno';
            // Si el alumno no seleccionó carrera, le ponemos una por defecto para que no vaya vacía
            if (!carreraAsignada) {
                carreraAsignada = 'No especificada';
            }
        } else {
            // Si no mide ni 5 ni 10, frena el registro y avisa el error
            return res.status(400).json({ mensaje: 'Matrícula no válida. Debe tener 10 dígitos para Alumno o 5 para Profesor.' });
        }

        // 4. Crear el nuevo usuario usando tu molde con los datos inteligentes
        const nuevoUsuario = new Usuario({
            nombreCompleto,
            correoElectronico,
            matricula,
            contrasena, // Nota: Más adelante le meteremos encriptación para seguridad
            carrera: carreraAsignada,
            rol: rolAsignado
        });

        // 5. Guardarlo físicamente en MongoDB
        await nuevoUsuario.save();

        // 6. Responderle a Abraham qué tipo de usuario se creó con éxito
        res.status(201).json({ 
            mensaje: `¡${rolAsignado.toUpperCase()} registrado con éxito en el SIGATAA!`,
            rol: rolAsignado
        });

    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ mensaje: 'Hubo un error interno en el servidor.' });
    }
});

// ENCENDER EL SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor del Backend corriendo en http://localhost:${PORT}`);
});