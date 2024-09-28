const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); // Importar Morgan
const sesiones = require('../middleware/sesiones.middleware'); // Importar seiones
const cerrar_sesiones=require('../middleware/cerrar_sesiones.middleware');//Importar cerrar sesiones
const {sequelize} = require("../database/config.database");

class Server {
    constructor() {
        this.app = express(); // Inicializa Express
        this.port = process.env.PORT; // Llama al puerto desde el archivo .env
        this.path = {
            authPath: '/api/auth',
            usuarioPath: '/api/usuario',
            libroPath: '/api/libro'
        }; // Define las rutas del backend
        this.conectardb();
        this.middleware();
        this.routes();
    }

    // Método para conectar a la base de datos
    async conectardb() {
        try {
            await sequelize.authenticate();
            await sequelize.sync();
            console.log("Conexión establecida"); // Mensaje de éxito
        } catch (error) {
            throw new Error(error); // Mensaje de error si falla la conexión
        }
    }

    // Configura los middlewares
    middleware() {
        this.app.use(cors()); // Habilita CORS
        this.app.use(express.json()); // Parseo de JSON
        this.app.use(morgan('dev')); // Configura Morgan para registrar solicitudes HTTP
        this.app.use(sesiones); 
        this.app.use(cerrar_sesiones);
    }

    // Configura las rutas del servidor
    routes() {
        this.app.use(this.path.authPath, require('../routes/auth.route'));
        this.app.use(this.path.usuarioPath, require('../routes/usuarios.route'));
        this.app.use(this.path.libroPath, require('../routes/libros.route'));
    }

    // Inicia el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }
}

module.exports = Server;
