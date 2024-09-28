const fs = require('fs');
const path = require('path');

// ruta
const logFilePath = path.join(__dirname, '../logs/loginLogs.txt');

if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

// inicios de sesión
const loginLogger = (req, res, next) => {
    if (req.method === 'POST' && req.path === '/api/auth/login') {
        const { nombre_usuario, id } = req.body; 
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        const logMessage = `${new Date().toISOString()} - Inicio de sesión: ${nombre_usuario} (Método: ${req.method}) (IP: ${ip})\n`;
        console.log("Registrando inicio de sesión...");
        console.log(`Usuario: ${nombre_usuario}, ID: ${id}`);

        // Escribe en el archivo de log
        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Error al escribir en el archivo de log:', err);
            }
        });
    }

    next();
};

module.exports = loginLogger;
