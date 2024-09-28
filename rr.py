const buscarUsuarios = async (req, res) => {
  const { estado } = req.query;
  console.log("Esta en el metodo",estado)
  try {
    const usuarios = await Usuario.findAll({
      where: { estado: estado }
    });
    res.json(usuarios); 
  } catch (error) {
    console.error("No se encontraron los usuarios", error);
    res.status(500).json({ error: "No se pudieron obtener los usuarios" }); 
  }
};