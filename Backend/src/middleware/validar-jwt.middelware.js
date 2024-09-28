const { response , request} = require("express");
const jwt = require('jsonwebtoken');
const {Usuario} = require("../model/usuarios.model");

const validarToken = async (req=request, res=response, next) => {
    const token=req.header('x-token')
    console.log("E:",'x-token')
    if (!token) {
        return res.json({ message: 'Se necesita el token' });
    }
    try {
        //Verifica 
        const {id} = jwt.verify(token, process.env.Key_token);
        //DB
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.json({ message: 'No hay token' });
        }
        //verificar estado
        req.usuario=usuario
        console.log("ya quedo")
        next();
    } catch (error) {
        res.json({ message: 'Token no valido.' });
    }
};

module.exports = validarToken;
