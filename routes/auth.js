//Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middelware/auth');

//autenticar un usuario
// api/auth
router.post('/', 
    authController.autenticarUsuario
);

//obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
)

module.exports = router;