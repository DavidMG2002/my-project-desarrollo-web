const jwt = require('jsonwebtoken'); // Importamos JWT
const dotenv = require('dotenv'); // Importamos dotenv para variables de entorno
dotenv.config(); // Cargamos las variables de entorno

const SECRET_KEY = process.env.JWT_SECRET; // Obtenemos la clave secreta para firmar/verificar tokens

// Middleware para autenticar token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Tomamos el token del header "Authorization"

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, no se proporcionó un token' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => { // Verificamos el token
        if (err) {
            return res.status(403).json({ message: 'Token no valido' });
        }
        req.user = user; // Almacenamos la información del usuario en el request
        next(); // Avanzamos al siguiente middleware o ruta
    });
};

// Middleware para verificar rol
const checkRole = (roles) => {
    return (req, res, next) => {
        const { rol_id } = req.user; // Extraemos el rol del token decodificado

        if (!roles.includes(rol_id)) { // Comprobamos si el rol está permitido
            return res.status(403).json({ message: 'Acceso denegado, no tienes permiso para realizar esta acción' });
        }

        next(); // Si tiene permiso, continuamos
    };
};

module.exports = { authenticateToken, checkRole }; // Exportamos los middlewares
