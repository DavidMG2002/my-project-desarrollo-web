const { DataTypes } = require('sequelize'); // Importamos tipos de datos de Sequelize
const sequelize = require('../config/database'); // Importamos la instancia de conexión a la base de datos

// Definimos el modelo "Proyect" (Proyectos)
const Proyect = sequelize.define('proyectos', { // Nombre del modelo (en la BD será 'proyectos')
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, // Llave primaria
        autoIncrement: true // Se autoincrementa
    },
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false // No puede ser nulo
    },
    descripcion: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }, 
    fecha_creacion: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW // Por defecto, la fecha de creación es el momento actual
    }
    // El campo administrador_id ha sido eliminado
}, {
    timestamps: false, // No usar campos automáticos createdAt y updatedAt de Sequelize
    tableName: 'proyectos', // Nombre explícito de la tabla

    hooks: {
        afterCreate: (proyect, options) => { // Hook que se ejecuta después de crear un proyecto
            if (proyect.fecha_creacion) {
                proyect.fecha_creacion.setHours(proyect.fecha_creacion.getHours() - 5); 
                // Resta 5 horas a la fecha de creación (posiblemente por ajuste de zona horaria Colombia GMT-5)
            }
        }
    }
});

module.exports = Proyect; // Exportamos el modelo

