const project = require('../models/project.model'); // (IMPORTACIÓN REPETIDA - no necesaria)
const user = require('../models/user.model'); // (IMPORTACIÓN QUE NO USAS)
const Project = require('../models/project.model'); // Importamos el modelo de proyectos

// Servicio para crear un proyecto
exports.createProject = async (nombre, descripcion) => {
    try {
        // Crear el proyecto (sin administrador_id en esta función)
        const newProject = await Project.create({
            nombre,
            descripcion,
        });

        return newProject; // Devolvemos el proyecto creado
    } catch (err) {
        throw new Error(`Error al crear el proyecto: ${err.message}`); // Si falla, lanzamos un error
    }
};

// Servicio para obtener todos los proyectos con sus administradores y usuarios asociados
exports.getAllProjects = async () => {
    try {
        const projects = await Project.findAll({
            include: [
                {
                    model: User, // Incluimos el modelo de Usuario
                    as: 'administrador', // Relación como administrador
                    attributes: ['id', 'nombre', 'email'] // Solo estos atributos
                },
                {
                    model: User,
                    as: 'usuarios', // Relación como usuarios
                    attributes: ['id', 'nombre', 'email'],
                    through: { attributes: [] } // No queremos atributos extra de la tabla intermedia
                }
            ]
        });
        return projects; // Devolvemos los proyectos encontrados
    } catch (err) {
        throw new Error(`Error al obtener los proyectos: ${err.message}`);
    }
};

// Servicio para obtener un proyecto por su ID
exports.getProjectById = async (id) => {
    try {
        const project = await Project.findByPk(id); // Buscamos el proyecto por ID
        if (!project) {
            throw new Error('Proyecto no encontrado'); // Si no existe, lanzamos error
        }
        return project; // Devolvemos el proyecto encontrado
    } catch (err) {
        throw new Error(`Error al obtener el proyecto: ${err.message}`);
    }
};

// Servicio para asignar usuarios a un proyecto
exports.assingUsersToProject = async (data) => {
    const project = await Project.findByPk(data.projectId); // Buscamos el proyecto
    if (!project) throw new Error('Proyecto no encontrado');

    const users = await User.findAll({ where: { id: data.userIds }}); // Buscamos los usuarios
    if (users.length !== data.userIds.length) throw new Error('Algunos usuarios no fueron encontrados');

    await project.addUsuarios(users); // Relacionamos usuarios al proyecto
    return await project.findByPk(data.project, { // <- Aquí tienes un pequeño error: debería ser `data.projectId`
        include: [
            {
                model: User,
                as: 'usuarios',
                attributes: ['id', 'nombre', 'email'],
                through: { attributes: [] }
            }
        ],
    });
};

// Servicio para remover un usuario de un proyecto
exports.removeUserFromProject = async (data) => {
    const project = await Project.findByPk(data.projectId); // Buscamos el proyecto
    if (!project) throw new Error('Proyecto no encontrado'); // Aquí el error en tu mensaje (decías "Usuario no encontrado")

    const user = await User.findByPk(data.userId); // Buscamos el usuario
    if (!user) throw new Error('Usuario no encontrado');

    await project.removeUsuario(user); // Quitamos el usuario del proyecto
};

// Servicio para actualizar un proyecto
exports.updateProject = async (id, nombre, descripcion, administrador_id) => {
    try {
        const project = await Project.findByPk(id); // Buscamos el proyecto
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }

        await project.update({ // Actualizamos los datos
            nombre,
            descripcion,
            administrador_id,
        });

        return project; // Devolvemos el proyecto actualizado
    } catch (err) {
        throw new Error(`Error al actualizar el proyecto: ${err.message}`);
    }
};

// Servicio para eliminar un proyecto
exports.deleteProject = async (id) => {
    try {
        const project = await Project.findByPk(id); // Buscamos el proyecto
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }
        
        await project.destroy(); // Eliminamos el proyecto
        return { message: 'Proyecto eliminado con éxito' }; // Devolvemos confirmación
    } catch (err) {
        throw new Error(`Error al eliminar el proyecto: ${err.message}`);
    }
};

