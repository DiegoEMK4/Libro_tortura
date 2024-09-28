const {check} = require('express-validator');
const {Router}= require('express');
const {validar_usuario_existe}= require ('../helpers/db_validar_usuario');
const validarToken=require('../middleware/validar-jwt.middelware');

const {crearUsuario,eliminarUsuario,buscarUsuario,editarUsuario,ocultarContrasena,buscarUsuarios} = require('../controllers/usuarios.controller');
const router = Router ()  
router.post('/crearUsuario',[
    validarToken,
    check('usuario','El usuario es necesario').not().isEmpty(),
    check('apellidoP','El Apellidno tengo ni los ejercicos o es necesario').not().isEmpty(),
    check('apellidoM','El usuario es necesario').not().isEmpty(),
    check('nombre_usuario','El nombre de usuario) es necesario').not().isEmpty(),
    check('nombre_usuario','El nombre de usuario ya existe').custom(validar_usuario_existe),
    check('contrasena','La contraseña en necesaria').not().isEmpty(),
    check('rol_id','El rol del usuario es necesario').not().isEmpty(),
    check('estado_usuario','El estado del usuario es necesario').not().isEmpty(),
    //validarcampos()
    validar_usuario_existe,
],crearUsuario)

router.delete('/eliminarUsuario/:id',eliminarUsuario)
router.get('/buscarUsuario',buscarUsuario)
router.put('/editarUsuario/:id',[
    validar_usuario_existe,
],editarUsuario)
router.put('/ocultarContrasena/:id',ocultarContrasena)
router.get('/buscaUsuarios',buscarUsuarios)

module.exports=router