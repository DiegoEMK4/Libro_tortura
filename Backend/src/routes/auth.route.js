const {Router}= require("express")
const {iniciarSesion,cerrarSesion} = require('../controllers/auth.controller')
//se agregan rutas 
const router = Router ()  
router.post('/login',iniciarSesion)//seccion de  URL  que se coloca en thunder  
router.post('/logout',cerrarSesion)  
                 
module.exports=router
