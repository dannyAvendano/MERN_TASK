const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

//crea una nueva tarea
exports.crearTarea = async (req, res) => {

    //revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //extraer el proyecto y comprobar si existe
    const {proyecto} = req.body;
    try {
        const proyectoValidar = await Proyecto.findById(proyecto);
        if (!proyectoValidar) {
            res.status(404).send('Proyecto no encontrado');
        }

        //revisar si el proyecto actual pertenece al usuario autenticado
        if (proyectoValidar.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: "No autorizado..."});
        }

        //creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al crear tarea');
    }

}

//obtiene las tareas por proyecto
exports.obtenerTareas = async (req, res) => {

    //extraer el proyecto y comprobar si existe
    const {proyecto} = req.query;

    try {
        const proyectoValidar = await Proyecto.findById(proyecto);
        if (!proyectoValidar) {
            res.status(404).send('Proyecto no encontrado');
        }

        //revisar si el proyecto actual pertenece al usuario autenticado
        if (proyectoValidar.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: "No autorizado..."});
        }

        //obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto }).sort({creado: -1});
        res.json({tareas});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener las tareas');
    }
}

//actualizar una tarea
exports.actualizarTarea = async (req, res) => {
    
    try {

        //extraer el proyecto y comprobar si existe
        const {proyecto, nombre, estado} = req.body;

        //validar si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if (!tarea) {
            return res.status(404).send('No existe la tarea');
        }

        //se extrae el proyecto al que pertenece la tarea
        const proyectoValidar = await Proyecto.findById(proyecto);

        //revisar si el proyecto actual pertenece al usuario autenticado
        if (proyectoValidar.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: "No autorizado..."});
        }

        //crear un objeto con la nueva información
        const nuevaTarea = {};

        
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;

        //guardar la tarea
        tarea = await Tarea.findByIdAndUpdate({_id: req.params.id}, nuevaTarea, {new: true});

        res.json({tarea});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar la tarea');
    }
}

//eliminar una tarea
exports.eliminarTarea = async (req, res) => {
    
    try {

        //extraer el proyecto y comprobar si existe
        const {proyecto} = req.query;

        //validar si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if (!tarea) {
            return res.status(404).send('No existe la tarea');
        }

        //se extrae el proyecto al que pertenece la tarea
        const proyectoValidar = await Proyecto.findById(proyecto);

        //revisar si el proyecto actual pertenece al usuario autenticado
        if (proyectoValidar.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: "No autorizado..."});
        }

        //eliminar tarea
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: "Tarea Eliminada"});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar la tarea');
    }
}