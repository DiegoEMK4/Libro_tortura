//const { response } = require("express");
const {Usuario} = require("../model/usuarios.model");
const { where } = require("sequelize");
const bcryptjs= require("bcryptjs");
const { generarToken } =require("../helpers/generara_jwt");

const iniciarSesion = async (req, res ) => {
   try {
     console.log(req.body);
     const { nombre_usuario, contrasena } = req.body;
     //if (!nombre_usuario || !contrasena) {
      //return res.status(400).json({ message: 'Faltan datos en la solicitud' });
      //}
     const usuario = await Usuario.findOne({ where:{nombre_usuario:nombre_usuario}});
     //console.log(usuario)
     if (!usuario) {
       res.json({ message: 'Usuario no encontrado' });
     }
       const contrasenaValidar = await bcryptjs.compare(contrasena, usuario.contrasena);
       if (!contrasenaValidar) {
         res.json({ message: 'Contraseña incorrecta'});
       }
       ////
      const token = await generarToken(usuario.id);
      return res.json({usuario,token, message: 'Usuario encontrado e ingresaste al sistema'});
   } catch (error) {
     console.error("No pudiste ingresar", error);
   }
 };
///////////////////////////////////////////////////////////////////////////////////////////////////
const cerrarSesion = async (req, res) => {
  const { nombre_usuario,id  } = req.body;
  try {
    console.log("DATOS EN EL BACKEND",nombre_usuario,id)
      return res.status(200).send('Cierre de sesión exitoso');
  } catch (error) {
      console.error("Error al cerrar sesión:", error);
      return res.status(500).json({ message: 'Error en el servidor' });
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////
module.exports={
   iniciarSesion,
   cerrarSesion
}
//sequelize