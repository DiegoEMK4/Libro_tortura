const {DataTypes} = require ('sequelize')
const { sequelize } = require('../database/config.database')
const { Rol }=require('./Rol.model')

const Usuario = sequelize.define('Usuario', {
    nombre:{
        type: DataTypes.STRING(30),
        allowNull:false,
    },
    apellido_P:{
        type:DataTypes.STRING(20),
        allowNull:false,
    },
    apellido_M:{
        type:DataTypes.STRING(20),
        allowNull:false,
    },
    nombre_usuario:{
        type: DataTypes.STRING(30),
        allowNull:false,
    },
    contrasena:{
        type: DataTypes.STRING(10),    
        allowNull:false,
    },
    rol_id:{
        type: DataTypes.INTEGER,
        Reference:{
            model:Rol,
            key:'id',
        },
    },
    estado_usuario:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
    },
},{
}) 
console.log(this.Usuario==sequelize.models.Usuario);
Rol.hasMany(Usuario,{foreignKey:'rol_id'}); 
Usuario.belongsTo(Rol,{foreignKey:'rol_id'});
module.exports={Usuario}