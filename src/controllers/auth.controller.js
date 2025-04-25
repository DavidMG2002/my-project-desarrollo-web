// importamos el servicio de autenticacion

const authService = require('../services/auth.service');

// Iniciar sesión

// Esta función se usará para manejar el inicio de sesión de los usuarios.
exports.login = async (req, res) => {
    // Tomamos el correo y la contraseña que el usuario envió en su solicitud.
    const { email, password } = req.body;
    try {
        
        // Intentamos iniciar sesión con esos datos y obtenemos un token si todo sale bien.
        const token = await authService.loginUser(email, password);
        console.log(token)
        // Si todo funcionó, enviamos una respuesta diciendo que el inicio de sesión fue exitoso.
        res.status(200).json({ message: 'inicio de sesión exitoso', token });
    } catch (err) {
        console.log(err);
        // Si hubo un problema, enviamos una respuesta con un error.
        res.status(400).json({ message: err.message }); // Corregí "messege" a "message".
    }
};



// importamos el servicio de autenticacion

/*const authService = require('../services/auth.service');

// Iniciar sesión

// Esta función se usará para manejar el inicio de sesión de los usuarios.
exports.login = async (req, res) => {
    // Tomamos el correo y la contraseña que el usuario envió en su solicitud.
    const { email, password } = req.body;
    try {
        
        // Intentamos iniciar sesión con esos datos y obtenemos un token si todo sale bien.
        const token = await authService.loginUser(email, password);
        console.log(token)
        // Si todo funcionó, enviamos una respuesta diciendo que el inicio de sesión fue exitoso.
        res.status(200).json({ message: 'inicio de sesión exitoso', token });
    } catch (err) {
        // Si hubo un problema, enviamos una respuesta con un error.
        res.status(400).json({ message: err.message }); // Corregí "messege" a "message".
    }
};


// importamos el servicio de autenticación
/*const authService = require('../services/auth.service');
const { User } = require('../models/user.model');

// Iniciar sesión

// Esta función se usará para manejar el inicio de sesión de los usuarios.
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Verificar usuario en la base de datos
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

        // 2. Verificar contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: 'Credenciales inválidas' });

        // 3. Generar token
        const token = jwt.sign(
            {
                id: user.id,
                rol_id: user.rol_id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};*/

