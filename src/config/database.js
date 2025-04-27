// Importamos Sequelize para manejar la conexión y las consultas a la base de datos
const { Sequelize } = require('sequelize'); 

// Importamos dotenv para cargar las variables de entorno desde un archivo .env
const dotenv = require('dotenv');
dotenv.config(); 

// Configuramos la conexión a la base de datos usando Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME, // Nombre de la base de datos obtenido desde las variables de entorno
    process.env.DB_USER, // Usuario de la base de datos
    process.env.DB_PASSWORD, // Contraseña del usuario
    {
        host: process.env.DB_HOST,  // Dirección del servidor donde está la base de datos
        port: process.env.DB_PORT, // Puerto donde está corriendo la base de datos
        dialect: 'postgres', // Especificamos que estamos usando PostgreSQL
        logging: false, // Desactiva los mensajes de log generados por Sequelize
        timezone: '-05:00' // Configura la zona horaria (ejemplo: hora estándar de Colombia)
    }
);

// Intentamos conectar con la base de datos y verificamos si la conexión fue exitosa
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente en el servidor✅'); // Mensaje de éxito
  })
  .catch(error => {
    console.error('❌ Error al conectar con la base de datos:', error); // Mensaje de error si la conexión falla
  });

// Exportamos la instancia de Sequelize para que otros archivos puedan usarla
module.exports = sequelize;
