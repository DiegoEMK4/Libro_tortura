const {DataTypes} = require ('sequelize')
const { sequelize } = require('../database/config.database')

const Rol = sequelize.define('Rol', {
    rol_usuario:{
        type: DataTypes.ENUM('admin','capturador','consulta'),
        allowNull:false,
    },
},{
}) 
console.log(this.Rol==sequelize.models.Rol);

module.exports={ 
      Rol
}