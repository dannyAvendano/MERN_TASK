//Rutas para gestionar proyectos
const express = require('express');
const router = express.Router();
const proyectoControler = require('../controllers/proyectoControler');
const auth = require('../middelware/auth');
const {check} = require('express-validator');

//Crea proyectos
// api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoControler.crearProyecto
)

//obtener todos los proyectos
router.get('/',
    auth,
    proyectoControler.obtenerProyectos
)

//actualizar proyecto vía id
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoControler.actualizarProyecto
)

//eliminar un proyecto
router.delete('/:id',
    auth,
    proyectoControler.eliminarProyecto
)

module.exports = router;