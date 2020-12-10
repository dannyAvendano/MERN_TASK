const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//crear el servidor
const app = express();

//conectar a la BD
conectarDB();

//habilitar cors
app.use(cors());

//Habilitar express.json
app.use(express.json({extended: true}))

//Se crea el puerto de la app
const PORT = process.env.PORT || 5000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

//Se arranca la app
app.listen(
    PORT, () => {
        console.log('El servidor esta funcionando en el puerto...: ' + PORT)
    }
)