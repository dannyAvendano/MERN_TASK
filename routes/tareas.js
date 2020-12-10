//Rutas para gestionar tareas
const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middelware/auth');
const {check} = require('express-validator');

//Crea tareas
// api/tareas
router.post('/',
    auth,
    [
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
)

//obtener las tareas por proyecto
router.get('/',
    auth,
    tareaController.obtenerTareas
)

//actualizar una tarea
router.put('/:id',
    auth,
    tareaController.actualizarTarea
)

//eliminar una tarea
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
)

module.exports = router;