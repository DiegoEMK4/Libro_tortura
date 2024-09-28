const {check} = require('express-validator');
const {Router}= require('express');

const {crearLibro,eliminarLibro,buscarLibro,editarLibro,buscarLibros, buscarPerito, buscarLibros_excel, eliminarLibro_logico} = require('../controllers/libros.controller');
const router = Router ()  
router.post('/crearLibro',crearLibro)
router.delete('/eliminarLibro/:id',eliminarLibro)
router.get('/buscarLibro',buscarLibro)
router.put('/editarLibro/:id',editarLibro)
router.get('/buscarLibros',buscarLibros)
router.get('/buscarPerito',buscarPerito)
router.get('/buscarLibros-excel',buscarLibros_excel)
router.put('/eliminarLibroLogico/:id',eliminarLibro_logico)

module.exports=router