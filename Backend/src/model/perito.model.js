const {DataTypes} = require('sequelize')
const { sequelize } = require ('../database/config.database')

const Perito = sequelize.define('Libro',{
   nombre:{
    type:DataTypes.STRING(20),
    allowNull:false,
   },
    

})