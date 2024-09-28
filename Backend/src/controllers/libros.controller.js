const {Libro} = require ('../model/libro.model');
const { Op } = require('sequelize');


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const crearLibro = async (req, res) => {
  try {
    console.log("back878")
    console.log(req.body)
    const {expediente,fecha_solicitud,fecha_emision,nombre_perito,primer_apellido,segundo_apellido,nic,nuc,carpeta_investigacion,documento_emitido,materia_pericial,agencia}=req.body 
    const libro = new Libro ({expediente,fecha_solicitud,fecha_emision,nombre_perito,primer_apellido,segundo_apellido,nic,nuc,carpeta_investigacion,documento_emitido,materia_pericial,agencia});
      //revisar esta parte...
      //fecha_solicitud.toLocaleDateString('es-MX');
      //fecha_emision.toLocaleDateString('es-MX');
      console.log(libro)
      await libro.save();
      res.json({ message: 'Libro creado'});
    
  } catch (error) {
    console.log("No se creo el libro",error)
    console.error({message:'Error al creal el libro',error});
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const eliminarLibro = async (req, res) => {
  try {
    console.log(req.query);
    const { id } = req.params; 
    const libro = new Libro({ id });
    await libro.destroy(id);
    res.json({ message: 'Libro eliminado' });
  } catch (error) {
    console.log("No se eliminó el libro", error);
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const buscarLibro = async (req, res) => {
    try {
      console.log(req.query);
      const { id } = req.query;
      const libro = await Libro.findOne({ id });
      //await usuario.update(nombre_usuario);
      res.json(libro);
      res.json({ message: 'Libro encontrado' });
  
    } catch (error) {
      console.log("No se encontro el libro", error);
    }
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const editarLibro = async (req, res) => {
  try {
    const { expediente, fecha_solicitud, fecha_emision, nombre_perito, nic, nuc, carpeta_investigacion, documento_emitido, materia_pericial, agencia } = req.body;
    const { id } = req.params;
    console.log("idLibro -> ",id)
    console.log("editarLibro -> ",req.body)
    
    const response = await Libro.update(
      {
        expediente,
        fecha_solicitud,
        fecha_emision,
        nombre_perito,
        nic,
        nuc,
        carpeta_investigacion,
        documento_emitido,
        materia_pericial,
        agencia
      },
      {
        where: { id:id }
      }
    );
    console.log(response)
    res.json({ response });

  } catch (error) {
    console.error("No se editó el libro", error);
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const buscarLibros = async (req, res) => {
  const { tipo_busqueda } = req.query;
  console.log("/////",req.query)
  try {
    // Buscamos en la columna 'estado'
    const libros = await Libro.findAll({ where: { estado: tipo_busqueda } });
    console.log("datosooo",libros)
    return res.json(libros); 

  } catch (error) {
    console.error("Error al buscar libros", error);
    return res.status(500).json({ message: 'Error al buscar libros' });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const buscarLibros_excel = async (req, res) => {
  try {
    console.log(req.query);
    const { fecha_i, fecha_f } = req.query;

    const fechaInicio = new Date(fecha_i);
    const fechaFinal = new Date(fecha_f);
    if (fechaFinal < fechaInicio) {
      return res.status(400).json({ message: 'La fecha final no puede ser menor que la fecha inicial' });
    }
    const libros = await Libro.findAll({
      where: {
        createdAt: {
          [Op.between]: [fechaInicio, fechaFinal],
        },
      },
    });
    res.json(libros);
  } catch (error) {
    console.log('No se encontraron libros', error);
    res.status(500).json({ message: 'Error al buscar libros' });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const buscarPerito = async (req, res) => {
  try {
    const peritos = await Libro.findAll({
      attributes: ['nombre_perito'],
    });
    console.log('Peritos encontrados:', peritos);

    if (peritos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron peritos' });
    }
    res.json(peritos);
  } catch (error) {
    console.error('Error al buscar peritos:', error);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const eliminarLibro_logico = async (req, res) => {
  const { id } = req.params; 
    //const {id } = req.query;
  try {
    const response = await Libro.update(
      { estado: 0 },
      { where: { id: id } }
    );
    res.json({ response });
  } catch (error) {
    console.error("No se eliminó el libro", error);
    res.status(500).json({ error: "Error al eliminar el libro" });
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
    crearLibro,
    eliminarLibro,
    editarLibro,
    buscarLibro,
    buscarLibros,
    buscarPerito,
    buscarLibros_excel,
    eliminarLibro_logico
  }