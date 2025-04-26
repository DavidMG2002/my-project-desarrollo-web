// Importar servicio de usuarios
const userService = require('../services/user.service');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');


exports.createUser = async (req, res) => {
    try { 
        const { nombre, email, password, rol_id} = req.body; // Se extrae los datos de la solicitud para el nuevo usuario
        console.log(req.body)
        const newUser = await userService.createUser(nombre, email, password, rol_id);
        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser }); // 281 para la creacion de nuevos ususarios
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message});
    }
};
// Controlador para obtener todos los usuarios asociados a un administrador 
// req que contiene los datos de la solicitud  y res que se utiliza para enviar las solicitudes
exports.getAllUsersByAdministradorId = async (req, res) => {
    try {
        const admin_from_token = req.user.id; // Se extrae el id del administrador del token de autenticación
        const { email } = req.query; // Se extrae el email de la consulta para utilizarlo como tipo filtro y es opcional
        const users = await userService.getAllUsersByAdministradorId(admin_from_token, email);
        res.status(200).json({message: 'Usuarios consultados con éxito', users });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

//  Controlador para obtener a los usuarios asociados a un rol
exports.getAllUsersByRolId = async (req, res) => {
    try {
        const users = await userService.getAllUsersByRolId(req.params.id);
        res.status(200).json({ message: 'Usuarios consultados con éxito', users });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};




// Controlador corregido para obtener un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'Usuario no encontrado' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Usuario encontrado',
            data: user
        });

    } catch (error) {
        console.error('Error en getUserById:', error);
        res.status(500).json({
            success: false,
            message: 'Error al buscar el usuario',
            error: error.message // Solo envía el mensaje de error, no todo el objeto
        });
    }
};


// Controlador para obtener un usuario por su ID único ultimo agregado
/*exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id); // Llama a un servicio nuevo
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario encontrado', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar el usuario', error });
    }
};*/

// Controlador para actualizar un usuario
exports.updateUser = async (req, res) => {
    const { id } = req.params; // extrae el id de la URL enviado como parametro
    const { nombre, email, rol_id } = req.body; // se extrae los datos actualizados 
    const admin_from_token = req.user.id;
    try {
        const user = await userService.updateUser(id, nombre, email, rol_id, admin_from_token);
        res.status(200).json({ message: 'El susuario a actualizado con éxito', user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const admin_from_token = req.user.id;
    try {
        const result = await userService.deleteUser(id, admin_from_token);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


