const User = require('../models/user.model'); // Importamos el modelo de usuarios desde models
const bcrypt = require('bcryptjs'); // Importamos bcryptjs para encriptar contraseñas

// Servicio para crear un usuario
exports.createUser = async (nombre, email, password, rol_id) => { // Exportamos la función createUser que recibe nombre, email, password y rol_id
    try {
        const userExists = await User.findOne({ where: { email } }); // Buscamos si ya existe un usuario con ese email en la base de datos
        if (userExists) { // Si el usuario ya existe...
            throw new Error('El usuario ya existe'); // Lanzamos un error diciendo que ya existe
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Encriptamos la contraseña con un "salt" de 10 rondas

        const newUser = await User.create({ // Creamos un nuevo usuario en la base de datos
            nombre,
            email,
            password: hashedPassword, // Guardamos la contraseña encriptada
            rol_id
        });

        return newUser; // Devolvemos el nuevo usuario
    } catch (err) { // Si ocurre algún error...
        console.log(err); // Mostramos el error en consola
        throw new Error(`Error al crear el usuario: ${err.message}`); // Lanzamos un nuevo error con un mensaje detallado
    }
};

// Servicio para obtener todos los usuarios de un administrador
exports.getAllUsersByAdministradorId = async (administrador_id, email) => { // Exportamos la función getAllUsersByAdministradorId
    try {
        const whereClause = { administrador_id }; // Creamos un objeto whereClause para el filtro
        if (email) { // Si viene un email adicional...
            whereClause.email = email; // Lo agregamos al filtro
        }
        const users = await User.findAll({ where: whereClause, attributes: { exclude: ['password'] }}); // Buscamos los usuarios filtrando y excluyendo la contraseña
        return users; // Devolvemos los usuarios encontrados
    } catch {err} { // <- (Aquí tienes un pequeño error, debería ser "catch (err)")
        throw new Error(`Error al obtener los usuarios: ${err.message}`); // Lanzamos un error si falla
    }
};

// Servicio para obtener usuarios por rol específico
exports.getAllUsersByRolId = async (rol_id) => { // Exportamos la función getAllUsersByRolId
    try {
        const users = await User.findAll({ where: {rol_id}, attributes: { exclude: ['password'] }}); // Buscamos los usuarios filtrados por rol y sin contraseña
        return users; // Devolvemos los usuarios encontrados
    } catch (err) {
        throw new Error(`Error al obtener los usuarios: ${err.message}`); // Lanzamos un error si algo falla
    }
};

// Servicio para actualizar un usuario
exports.updateUser = async (id, nombre, email, rol_id) => { // Exportamos la función updateUser
    try {
        const user = await User.findByPk(id); // Buscamos el usuario por su ID

        if (!user) { // Si no existe...
            throw new Error('Usuario no encontrado'); // Lanzamos un error
        }

        if (email && email !== user.email) { // Verificamos si el nuevo email es diferente al que ya tenía
            const userExists = await User.findOne({ where: { email } }); // Buscamos si ya existe ese email
            if (userExists) {
                throw new Error('El email ya está en uso'); // Lanzamos un error si ya está en uso
            }
        }

        await user.update({ // Actualizamos los datos del usuario
            nombre,
            email,
            rol_id
        });

        return user; // Devolvemos el usuario actualizado
    } catch (err) {
        throw new Error(`Error al actualizar el usuario: ${err.message}`); // Lanzamos un error si algo sale mal
    }
};

// Servicio para eliminar un usuario
exports.deleteUser = async (userId) => { // Exportamos la función deleteUser
    try {
        const user = await User.findByPk(userId); // Buscamos el usuario por su ID
        
        if (!user) { // Si no existe...
            throw new Error('Usuario no encontrado'); // Lanzamos un error
        }

        await user.destroy(); // Eliminamos el usuario
        return { 
            success: true, // Indicamos que todo salió bien
            message: 'Usuario eliminado con éxito' 
        };

    } catch (err) {
        throw new Error(`Error al eliminar el usuario: ${err.message}`); // Lanzamos un error si algo falla
    }
};

// Servicio para buscar un usuario por su ID
exports.getUserById = async (userId) => { // Exportamos la función getUserById
    const user = await User.findByPk(userId, { // Buscamos el usuario por su ID y seleccionamos solo algunos campos
        attributes: ['id', 'nombre', 'email', 'rol_id'], // Campos que queremos devolver
        raw: true // Obtenemos un objeto plano, no una instancia de Sequelize
    });
    if (!user) { // Si no se encuentra...
        throw new Error("Usuario no encontrado"); // Lanzamos un error
    }
    return user; // Devolvemos el usuario encontrado
};
