const {DataTypes} = require ('sequelize')
const { sequelize } = require('../database/config.database')

const Libro = sequelize.define('Libro', {
    expediente:{
        type: DataTypes.STRING(30),
        allowNull:false,
    },
    fecha_solicitud:{
        type:DataTypes.DATE(6),
        allowNull:false,
    },
    fecha_emision:{
        type:DataTypes.DATE(6),
        allowNull:false,
    },
    nombre_perito:{
        type: DataTypes.STRING(30),
        allowNull:false,
    },
    nic:{
        type:DataTypes.STRING(30),
        allowNull:true,
    },
    nuc:{
        type:DataTypes.STRING(30),
        allowNull:true,
    },
    documento_emitido:{
        type: DataTypes.STRING(20),
        allowNull:false,
    },
    materia_pericial:{
        type: DataTypes.STRING(20),
        allowNull:false,
    },
    agencia:{
        type: DataTypes.STRING(20),
        allowNull:false,
    },
    estado:{
        type: DataTypes.BOOLEAN,
        allowNull:true,
    },
},{
}) 
console.log(this.Libro==sequelize.models.Libro);

//Rol.hasMany(Usuario,{foreignKey:'rol_id'}); 
//Usuario.belongsTo(Rol,{foreignKey:'rol_id'});

module.exports={Libro}