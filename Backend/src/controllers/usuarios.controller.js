const bcrypt = require('bcrypt');
const bccrypt = require('bcrypt');
const {Usuario} = require ("../model/usuarios.model");
const { where } = require('sequelize');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const crearUsuario = async (req, res) => {
  console.log("//-**/*");
  try {
    let { nombre, apellido_P, apellido_M, nombre_usuario, rol_id, estado_usuario, contrasena } = req.body;

    if (rol_id === "Capturador") {
      rol_id = 0;
    } else if (rol_id === "Consulta") {
      rol_id = 1;
    } else if (rol_id === "Admin") {
      rol_id = 2;
    }
    estado_usuario = estado_usuario === "Activo";
    const salt = bcrypt.genSaltSync();
    const hashedContrasena = bcrypt.hashSync(contrasena, salt);

    const usuario = await Usuario.create({
      nombre,
      apellido_P,
      apellido_M,
      nombre_usuario,
      rol_id,
      estado_usuario,
      contrasena: hashedContrasena,
    });

    console.log("Usuario final ---/---", usuario);

    res.status(201).json({ message: 'Usuario creado exitosamente', usuario });
  } catch (error) {
    console.log("Error al crear el usuario:", error);
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const eliminarUsuario = async (req, res) => {
  console.log("Entró al método");
  try {
    const { id } = req.params; 
    console.log("Datos a eliminar - ", id);
    const usuario = new Usuario({ id });
    await usuario.destroy();
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.log("No se eliminó el usuario", error);
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const buscarUsuario = async (req, res) => {
    try {
      console.log(req.query);
      const { nombre_usuario } = req.query;
      const usuario = await Usuario.findOne({ nombre_usuario });
      //await usuario.update(nombre_usuario);
      res.json(usuario);
      res.json({ message: 'Usuario encontrado' });
  
    } catch (error) {
      console.log("No se encontro al usuario", error);
    }
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const editarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    let { nombre, apellido_P, apellido_M, nombre_usuario, rol_id, estado_usuario } = req.body;
    console.log(id)
    if (rol_id === "Capturador") {
      rol_id = 1;
    } else if (rol_id === "Consulta") {
      rol_id = 2;
    } else if (rol_id === "Admin") {
      rol_id = 0;
    }
    estado_usuario = estado_usuario === "Activo";

    const usuario = new Usuario({
      id,
      nombre,
      apellido_P,
      apellido_M,
      nombre_usuario,
      rol_id,
      estado_usuario,
    });
    console.log("------>,",id)
    console.log("Usuario final ---/---",usuario)
    await Usuario.update({
      nombre,
      apellido_P,
      apellido_M,
      nombre_usuario,
      rol_id,
      estado_usuario
    }, {
      where: { id:id }
    });
    res.json({ message: 'Usuario editado exitosamente' });
  } catch (error) {
    console.error("No se editó el usuario", error);

  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const ocultarContrasena = async (req, res) => {
  try {
    const { id } = req.params;
    const { contrasena } = req.body;
    const salt = bcrypt.genSaltSync();
    const contrasenaOculta = bcrypt.hashSync(contrasena, salt);
    
    await Usuario.update(
      { contrasena: contrasenaOculta }, 
      { where: { id: id } }
    );
    res.json({ message: 'Contraseña ocultada' });
  } catch (error) {
    console.error("No se oculto la contraseña", error);
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const buscarUsuarios = async (req, res) => {
  const { tipo_busqueda } = req.query;
  console.log("/////",req.query)
  try {

    const usuarios = await Usuario.findAll({ where: { estado_usuario: tipo_busqueda } }); 

    console.log("datosooo",usuarios)
    return res.json(usuarios); 
  } catch (error) {
    console.error("No se encontrarón los usuarios", error);
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
    crearUsuario,
    eliminarUsuario,
    editarUsuario,
    buscarUsuario,
    ocultarContrasena,
    buscarUsuarios,
  }