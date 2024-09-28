const { Usuario } = require("../model/usuarios.model");
const validar_usuario_existe = async (req, res, next) => {
  const { nombre_usuario = "" } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { nombre_usuario } });
    if (usuario) {
      return res.status(400).json({
        message: `El nombre de usuario '${nombre_usuario}' ya existe.`,
  
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor.", error });
  }
};
module.exports = { validar_usuario_existe };
