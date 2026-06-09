const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Permite que Angular y Node se hablen sin bloqueos
const Usuario = require('./models/Usuario'); // Importamos tu molde de usuarios
const Asesoria = require('./models/Asesoria'); //  IMPORTACIÓN CLAVE: Tu molde de asesorías (Agregado por Adair)

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
//  RUTA 1: REGISTRO INTELIGENTE (SEPARA ALUMNOS, PROFESORES Y CARRERAS)
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

// ===================================================================
//  RUTA NUEVA: LOGIN / INICIO DE SESIÓN CON VALIDACIÓN EN BD
// ===================================================================
app.post('/api/login', async (req, res) => {
    try {
        const { matricula, contrasena } = req.body;

        // 1. Validar que vengan ambos campos llenos
        if (!matricula || !contrasena) {
            return res.status(400).json({ mensaje: 'Por favor, introduce tu matrícula y contraseña.' });
        }

        // 2. Buscar al usuario en MongoDB por su matrícula
        const usuario = await Usuario.findOne({ matricula });

        //  CONTROL DE ERRORES: Si no existe el usuario en la base de datos
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Error: Esta matrícula no se encuentra registrada antes.' });
        }

        // 3. Validar si la contraseña coincide directamente
        if (usuario.contrasena !== contrasena) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta. Inténtalo de nuevo.' });
        }

        // 4. Si la matrícula existe y la contraseña es correcta, damos acceso exitoso
        res.status(200).json({
            mensaje: '¡Inicio de sesión exitoso!',
            usuario: {
                nombreCompleto: usuario.nombreCompleto,
                matricula: usuario.matricula,
                rol: usuario.rol,
                carrera: usuario.carrera
            }
        });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ mensaje: 'Hubo un error interno en el servidor al intentar iniciar sesión.' });
    }
});

// ===================================================================
// 📅RUTA 2: MÓDULO DE HORARIOS Y ASESORÍAS (¡TU PARTE, ADAIR! CRUD COMPLETO)
// ===================================================================

//  OPERACIÓN CRUD 1: AGENDAR UNA NUEVA ASESORÍA (CREATE)
app.post('/api/asesorias', async (req, res) => {
    try {
        const { alumnoMatricula, profesorNombre, materia, fechaHora } = req.body;

        if (!alumnoMatricula || !profesorNombre || !materia || !fechaHora) {
            return res.status(400).json({ mensaje: 'Faltan datos obligatorios para agendar la asesoría.' });
        }

        const nuevaCita = new Asesoria({
            alumnoMatricula,
            profesorNombre,
            materia,
            fechaHora
        });

        await nuevaCita.save();

        res.status(201).json({ 
            mensaje: '¡Asesoría agendada con éxito! Queda en espera de la aprobación del docente.',
            cita: nuevaCita
        });

    } catch (error) {
        console.error('Error al agendar asesoría:', error);
        res.status(500).json({ mensaje: 'Error interno al registrar la asesoría.' });
    }
});

//  OPERACIÓN CRUD 2: CONSULTAR LAS ASESORÍAS (READ)
app.get('/api/asesorias', async (req, res) => {
    try {
        const listaAsesorias = await Asesoria.find();
        res.status(200).json(listaAsesorias);
    } catch (error) {
        console.error('Error al obtener asesorías:', error);
        res.status(500).json({ mensaje: 'Error interno al consultar las asesorías.' });
    }
});

//  OPERACIÓN CRUD 3: ACTUALIZAR EL ESTADO DE UNA ASESORÍA (UPDATE)
app.put('/api/asesorias/:id', async (req, res) => {
    try {
        const { id } = req.params; // ID que viene en la URL
        const { estado, motivoRechazo } = req.body; // Nuevos valores

        const asesoriaActualizada = await Asesoria.findByIdAndUpdate(
            id,
            { estado, motivoRechazo: motivoRechazo || '' },
            { new: true } // Devuelve el documento modificado
        );

        if (!asesoriaActualizada) {
            return res.status(404).json({ mensaje: 'No se encontró la asesoría específica.' });
        }

        res.status(200).json({
            mensaje: '¡Asesoría actualizada con éxito!',
            cita: asesoriaActualizada
        });

    } catch (error) {
        console.error('Error al actualizar la asesoría:', error);
        res.status(500).json({ mensaje: 'Error interno al actualizar la asesoría.' });
    }
});

//  OPERACIÓN CRUD 4: ELIMINAR / CANCELAR UNA ASESORÍA (DELETE)
app.delete('/api/asesorias/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const asesoriaEliminada = await Asesoria.findByIdAndDelete(id);

        if (!asesoriaEliminada) {
            return res.status(404).json({ mensaje: 'No se encontró la asesoría que deseas eliminar.' });
        }

        res.status(200).json({
            mensaje: '¡Asesoría eliminada / cancelada correctamente del sistema!'
        });

    } catch (error) {
        console.error('Error al eliminar la asesoría:', error);
        res.status(500).json({ mensaje: 'Error interno al eliminar la asesoría.' });
    }
});

// ENCENDER EL SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor del Backend corriendo en http://localhost:${PORT}`);
});