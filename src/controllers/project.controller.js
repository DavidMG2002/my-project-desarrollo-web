// Importación del servicio que maneja las operaciones de proyectos en la base de datos
const projectService = require('../services/project.service');

// Controlador para crear un nuevo proyecto
exports.createProject = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body; // Obtiene los datos del proyecto desde la solicitud
        const newProject = await projectService.createProject(nombre, descripcion); // Llama al servicio para crear el proyecto
        res.status(201).json({ message: 'Proyecto creado con éxito', newProject }); // Responde con el proyecto creado
    } catch (err) {
        res.status(500).json({ message: err.message }); // Devuelve un mensaje de error si algo falla
    }
};

// Controlador para obtener todos los proyectos almacenados en la base de datos
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            attributes: ['id', 'nombre', 'descripcion', 'fecha_creacion'], // Define los atributos que se devolverán
            order: [['fecha_creacion', 'DESC']] // Ordena los proyectos por fecha de creación, de más reciente a más antiguo
        });

        res.status(200).json({
            success: true,
            count: projects.length, // Muestra cuántos proyectos se encontraron
            data: projects // Devuelve la lista de proyectos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener proyectos',
            error: error.message // Devuelve un mensaje de error si ocurre un problema
        });
    }
};

// Controlador para asignar usuarios a un proyecto
exports.assingUsersToProject = async (req, res) => {
    try {
        const data = req.body; // Obtiene los datos de la solicitud
        const project = await projectService.assingUsersToProject(data); // Llama al servicio para asignar usuarios
        res.status(200).json({ message: 'Usuarios asignados al proyecto con éxito', project }); // Responde con la asignación exitosa
    } catch (err) {
        res.status(500).json({ message: err.message }); // Devuelve un mensaje de error si algo falla
    }
};

// Controlador para eliminar un usuario de un proyecto
exports.removeUserFromProject = async (req, res) => {
    try {
        const data = req.body; // Obtiene los datos de la solicitud
        const result = await projectService.removeUserFromProject(data); // Llama al servicio para eliminar al usuario del proyecto
        res.status(200).json({ message: 'Usuario eliminado del proyecto con éxito', result }); // Responde con la confirmación de eliminación
    } catch (err) {
        res.status(500).json({ message: err.message }); // Devuelve un mensaje de error si algo falla
    }
};

// Controlador para obtener un proyecto por su ID
exports.getProjectById = async (req, res) => {
    try {
        const id = req.params.id; // Obtiene el ID del proyecto desde la URL
        const project = await projectService.getProjectById(id); // Busca el proyecto en la base de datos
        res.status(200).json({ message: 'Proyecto obtenido con éxito', project }); // Devuelve el proyecto encontrado
    } catch (err) {
        res.status(500).json({ message: err.message }); // Devuelve un mensaje de error si algo falla
    }
};

// Controlador para actualizar un proyecto existente
exports.updateProject = async (req, res) => {
    try {
        const id = req.params.id; // Obtiene el ID del proyecto desde la URL
        const { nombre, descripcion, administrador_id } = req.body; // Obtiene los datos actualizados del proyecto
        const project = await projectService.updateProject(id, nombre, descripcion, administrador_id); // Llama al servicio para actualizar el proyecto
        res.status(200).json({ message: 'Proyecto actualizado con éxito', project }); // Devuelve el proyecto actualizado
    } catch (err) {
        res.status(500).json({ message: err.message }); // Devuelve un mensaje de error si algo falla
    }
};

// Controlador para eliminar un proyecto por su ID
exports.deleteProject = async (req, res) => {
    try {
        const id = req.params.id; // Obtiene el ID del proyecto desde la URL
        const result = await projectService.deleteProject(id); // Llama al servicio para eliminar el proyecto
        res.status(200).json(result); // Devuelve la confirmación de eliminación
    } catch (err) {
        res.status(500).json({ message: err.message }); // Devuelve un mensaje de error si algo falla
    }
};
