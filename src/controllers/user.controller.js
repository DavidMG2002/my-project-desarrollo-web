// Importar servicio de usuarios
const userService = require('../services/user.service');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// Controlador para crear nuevos usuarios
/*exports.createUser = async (req, res) => {
    try { 
        const { nombre, email, password, rol_id, administrador_id } = req.body; // Se extrae los datos de la solicitud para el nuevo usuario
        const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id);
        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser }); // 281 para la creacion de nuevos ususarios
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}; */

exports.createUser = async (req, res) => {
    try {
        const { nombre, email, password, rol_id, administrador_id } = req.body;

        if (!email || !password || !rol_id) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario con la contraseña hasheada
        const newUser = await userService.createUser(nombre, email, hashedPassword, rol_id, administrador_id);

        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
    } catch (err) {
        console.error('Error al crear usuario:', err);
        res.status(500).json({ message: err.message });
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

// Controlador para actualizar un usuario
exports.updateUser = async (req, res) => {
    const { id } = req.params; // extrae el id de la URL enviado como parametro
    const { nombre, email, rol_id, administrador_id } = req.body; // se extrae los datos actualizados 
    const admin_from_token = req.user.id;
    try {
        const user = await userService.updateUser(id, nombre, email, rol_id, administrador_id, admin_from_token);
        res.status(200).json({ message: 'El susuario a actualizado con éxito', user });
    } catch (err) {
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


