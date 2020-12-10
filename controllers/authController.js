const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {

    //revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //se extrae el email y el password del request
    const {email, password} = req.body;

    try {
        //revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});
        if (!usuario) {
            return res.status(400).json({msg: 'El usuario no existe'});
        }

        //revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json({msg: 'Password Incorrecto'});
        }

        //si todo es correcto se crea el JWT
        //crear y firmar el json web token
        const payload = {
            usuario:{
                id: usuario.id
            }
        };

        //firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 //1 hora
        }, (error, token) => {
            if(error) throw error;

            //mensaje de confirmación
            res.json({token: token});

        });

    } catch (error) {
        console.log(error);
    }

}

//obtiene que usuario está autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password')
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}