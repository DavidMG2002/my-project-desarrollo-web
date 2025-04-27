const express = require('express'); // Importamos Express para poder usar su sistema de rutas.
const router = express.Router(); // Creamos un router, que sirve para agrupar rutas relacionadas (en este caso de proyectos).
const projectController = require('../controllers/project.controller'); // Importamos el archivo donde están las funciones que manejan los proyectos.
const ROLES = require('../utils/constants'); // Importamos los roles de usuario definidos en constantes (por ejemplo: ADMIN, USER).
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware'); // Importamos dos funciones de seguridad: una para validar token y otra para verificar roles.

// Ruta POST para crear un proyecto
//router.post('/projects/create', authenticateToken, checkRole([ROLES.ADMIN]), projectController.createProject); // Esta línea está comentada. Antes protegía la creación de proyectos exigiendo token y rol de admin.
router.post('/projects/create', projectController.createProject); // Crea un nuevo proyecto, sin necesidad de token ni verificación de rol (actualmente está libre).

router.put('/projects/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.updateProject); // Actualiza un proyecto específico (por id), pero solo si el usuario tiene token válido y es admin.

router.get('/projects', authenticateToken, checkRole([ROLES.ADMIN]), projectController.getAllProjects); // Obtiene la lista de todos los proyectos, pero requiere autenticación y que sea admin.

router.delete('/projects/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.deleteProject); // Elimina un proyecto específico (por id), solo si quien hace la petición tiene permisos de admin.

router.get('/projects/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.getProjectById); // Trae la información de un proyecto en particular usando su id, con autenticación y rol de admin.

router.post('/projects/associate', authenticateToken, checkRole([ROLES.ADMIN]), projectController.assingUsersToProject); // Asocia (vincula) uno o varios usuarios a un proyecto, pero necesita validación de token y ser admin.

router.delete('/projects/disassociate', authenticateToken, checkRole([ROLES.ADMIN]), projectController.removeUserFromProject); // Desasocia (quita) un usuario de un proyecto, también requiriendo autenticación y ser admin.

// Exportamos el enrutador para que pueda ser utilizado en otras partes de la aplicación.
module.exports = router; // Exportamos este conjunto de rutas para poderlo usar en el servidor principal.
