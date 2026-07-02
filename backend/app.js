const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const Usuario = require('./models/Usuario'); 
const Asesoria = require('./models/Asesoria'); 

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json()); 


mongoose.connect('mongodb://127.0.0.1:27017/sigataa_db')
    .then(() => console.log('¡Conectado con éxito a MongoDB!'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));


app.post('/api/registro', async (req, res) => {
    try {
        const { nombreCompleto, correoElectronico, matricula, contrasena, carrera } = req.body;

       
        if (!nombreCompleto || !correoElectronico || !matricula || !contrasena) {
            return res.status(400).json({ mensaje: 'Por favor, llena todos los campos obligatorios.' });
        }

        
        const usuarioExiste = await Usuario.findOne({ matricula });
        if (usuarioExiste) {
            return res.status(400).json({ mensaje: 'Esta matrícula ya está registrada.' });
        }

        
        let rolAsignado = 'alumno'; 
        let carreraAsignada = carrera;

        if (matricula.length === 5) {
            rolAsignado = 'profesor';
            carreraAsignada = 'Docente'; 
        } else if (matricula.length === 10) {
            rolAsignado = 'alumno';
            
            if (!carreraAsignada) {
                carreraAsignada = 'No especificada';
            }
        } else {
            
            return res.status(400).json({ mensaje: 'Matrícula no válida. Debe tener 10 dígitos para Alumno o 5 para Profesor.' });
        }

        
        const nuevoUsuario = new Usuario({
            nombreCompleto,
            correoElectronico,
            matricula,
            contrasena, 
            carrera: carreraAsignada,
            rol: rolAsignado
        });

        
        await nuevoUsuario.save();

       
        res.status(201).json({ 
            mensaje: `¡${rolAsignado.toUpperCase()} registrado con éxito en el SIGATAA!`,
            rol: rolAsignado
        });

    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ mensaje: 'Hubo un error interno en el servidor.' });
    }
});


app.post('/api/login', async (req, res) => {
    try {
        const { matricula, contrasena } = req.body;

       
        if (!matricula || !contrasena) {
            return res.status(400).json({ mensaje: 'Por favor, introduce tu matrícula y contraseña.' });
        }

        
        const usuario = await Usuario.findOne({ matricula });

      
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Error: Esta matrícula no se encuentra registrada antes.' });
        }

       
        if (usuario.contrasena !== contrasena) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta. Inténtalo de nuevo.' });
        }

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


app.get('/api/asesorias', async (req, res) => {
    try {
        const listaAsesorias = await Asesoria.find();
        res.status(200).json(listaAsesorias);
    } catch (error) {
        console.error('Error al obtener asesorías:', error);
        res.status(500).json({ mensaje: 'Error interno al consultar las asesorías.' });
    }
});

app.put('/api/asesorias/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const { estado, motivoRechazo } = req.body;

        const asesoriaActualizada = await Asesoria.findByIdAndUpdate(
            id,
            { estado, motivoRechazo: motivoRechazo || '' },
            { new: true } 
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

app.listen(PORT, () => {
    console.log(`Servidor del Backend corriendo en http://localhost:${PORT}`);
});