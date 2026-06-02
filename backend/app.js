const express = require('express');
const app = express();
const PORT = 3000;

// Configuración para que el servidor entienda datos en formato JSON
app.use(express.json());

// RUTA PRINCIPAL DE PRUEBA
app.get('/', (req, res) => {
    res.send('¡El servidor del SIGATAA está vivo y escuchando perfectamente!');
});

// Indicarle al servidor en qué puerto encender
app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});