require('dotenv').config()
const Server = require("./src/model/server.model")//colocar/posicionar en el archivo
const server = new Server()//instanciar clase creada en ser.model.js
server.listen()
