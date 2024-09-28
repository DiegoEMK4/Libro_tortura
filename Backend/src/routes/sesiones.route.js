const {check} = require('express-validator');
const {Router}= require('express');
const {validar_usuario_existe}= require ('../helpers/db_validar_usuario');
const validarToken=require('../middleware/validar-jwt.middelware');

const {crear_Registro_Sesion,eliminar_Registro_Sesion,editar_Registro_Sesiones,buscar_Registros_Sesion} = require('../controllers/sesiones.controller');
const router = Router ()  
router.post('/crear_registro_sesion',crear_Registro_Sesion)
router.delete('/eliminar_registro_sesion/:id',eliminar_Registro_Sesion)
router.put('/editar_registro_sesion',editar_Registro_Sesiones)
router.get('/buscar_registros_sesion',buscar_Registros_Sesion)

module.exports=router