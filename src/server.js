const sequelize = require('./confing/db'); // Importamos la configuración de la base de datos (el objeto sequelize).
const app = require('./app'); // Importamos la aplicación de Express ya configurada.
const dotenv = require('dotenv'); // Importamos dotenv para poder usar las variables de entorno (como el puerto o la clave secreta).
require('./models/associations'); // Importamos las asociaciones entre los modelos para que estén registradas.

dotenv.config(); // Cargamos las variables de entorno del archivo .env.

const PORT = process.env.PORT || 3000; // Definimos el puerto en el que va a correr el servidor, usando el del .env o el 3000 si no existe.

// Nos conectamos a la base de datos usando sequelize.
sequalize.authenticate()
    .then(() => {
        console.log('conectado a postgreSQL con sequalize'); // Si la conexión es exitosa, mostramos este mensaje.
        app.listen(PORT, () => {
            console.log('Servidor corriendo en http://localhost:$(PORT)'); // Cuando el servidor esté levantado, mostramos esta URL.
        });
    })
    .catch(err => console.error('Error conectado a la base de datos:', err)); // Si hay un error al conectar la base de datos, lo mostramos en consola.

// Sincronizamos los modelos con la base de datos.
sequelize.sync({ force: false }) // No forzamos la sincronización (no borra las tablas existentes).
    .then(() => {
        console.log('Base de datos sincronizada'); // Si todo sale bien, mostramos este mensaje.
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos', err); // Si hay error al sincronizar, lo mostramos en consola.
    });
