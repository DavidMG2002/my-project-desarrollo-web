// Importaciones necesarias para manejar usuarios y autenticación
const userService = require('../services/user.service'); // Servicio que maneja las operaciones de usuarios en la base de datos
const Project = require('../models/project.model'); // Modelo de proyectos
const User = require('../models/user.model'); // Modelo de usuarios
const bcrypt = require('bcrypt'); // Librería para encriptar contraseñas

// Función para crear un nuevo usuario en la base de datos
exports.createUser = async (req, res) => {
    try { 
        const { nombre, email, password, rol_id} = req.body; // Obtiene los datos del usuario desde la solicitud
        console.log(req.body); // Muestra los datos en consola para depuración
        const newUser = await userService.createUser(nombre, email, password, rol_id); // Llama al servicio para crear el usuario
        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser }); // Responde con el usuario creado
    } catch (err) {
        console.log(err); // Muestra el error en consola
        res.status(500).json({ message: err.message}); // Devuelve un mensaje de error si algo falla
    }
};

// Función para obtener todos los usuarios asociados a un administrador
exports.getAllUsersByAdministradorId = async (req, res) => {
    try {
        const admin_from_token = req.user.id; // Extrae el ID del administrador desde el token de autenticación
        const { email } = req.query; // Obtiene el email como filtro opcional
        const users = await userService.getAllUsersByAdministradorId(admin_from_token, email); // Llama al servicio para obtener los usuarios
        res.status(200).json({message: 'Usuarios consultados con éxito', users }); // Responde con la lista de usuarios encontrados
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error }); // Devuelve un mensaje si ocurre un error
    }
};

// Función para obtener usuarios según su tipo de rol
exports.getAllUsersByRolId = async (req, res) => {
    try {
        const users = await userService.getAllUsersByRolId(req.params.id); // Obtiene usuarios por su ID de rol
        res.status(200).json({ message: 'Usuarios consultados con éxito', users }); // Devuelve los usuarios encontrados
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error }); // Devuelve un mensaje si ocurre un error
    }
};

// Función para obtener un usuario por su ID
exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id); // Busca el usuario en la base de datos
        
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'Usuario no encontrado' 
            }); // Si el usuario no existe, devuelve un mensaje de error
        }

        res.status(200).json({
            success: true,
            message: 'Usuario encontrado',
            data: user
        }); // Si lo encuentra, lo devuelve con éxito

    } catch (error) {
        console.error('Error en getUserById:', error); // Muestra el error en consola para depuración
        res.status(500).json({
            success: false,
            message: 'Error al buscar el usuario',
            error: error.message // Devuelve el mensaje de error en la respuesta
        });
    }
};

// Función para actualizar un usuario en la base de datos
exports.updateUser = async (req, res) => {
    const { id } = req.params; // Obtiene el ID del usuario desde la URL
    const { nombre, email, rol_id } = req.body; // Obtiene los nuevos datos del usuario
    const admin_from_token = req.user.id; // Extrae el ID del administrador desde el token
    try {
        const user = await userService.updateUser(id, nombre, email, rol_id, admin_from_token); // Llama al servicio para actualizar el usuario
        res.status(200).json({ message: 'El usuario ha actualizado con éxito', user }); // Devuelve el usuario actualizado
    } catch (err) {
        console.log(err); // Muestra el error en consola
        res.status(500).json({ message: err.message }); // Devuelve un mensaje de error si ocurre un problema
    }
};

// Función para eliminar un usuario de la base de datos
exports.deleteUser = async (req, res) => {
    try {
        const result = await userService.deleteUser(req.params.id); // Llama al servicio para eliminar el usuario por su ID
        res.status(200).json(result); // Devuelve el resultado de la eliminación
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message // Devuelve el mensaje de error en caso de fallo
        });
    }
};


