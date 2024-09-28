const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/loginLogs.txt');
if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

const loginclose = (req, res, next) => {
    if (req.method === 'POST' && req.path === '/api/auth/logout') {
        const { nombre_usuario, id } = req.body;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        const logMessage = `${new Date().toISOString()} - Fin de sesión: ${nombre_usuario} (ID: ${id})  (IP: ${ip}) (Metodo: ${req.method})\n`;

        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Error al escribir en el archivo de log:', err);
            } else {
                console.log('Log registrado:', logMessage.trim());
            }
        });

        res.status(200).send('Cierre de sesión registrado');
    } else {
        next();
    }
};

module.exports = loginclose;
