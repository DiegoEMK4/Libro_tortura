const SequelizeConn = require('sequelize')
const sequelize=new SequelizeConn('librotortura','root','',{//conexión con base de datos
    host: 'localhost',
    dialect: 'mysql',
    port:process.env.PORT_DATABASE//se llama la variable de entorno que contiene el puerto
})
module.exports = {sequelize}//exportar variable o metodo sequelize 