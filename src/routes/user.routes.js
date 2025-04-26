const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller'); // Importamos el controlador de usuarios
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');
const ROLES = require('../utils/constants');
const errorHandler = require('../middlewares/error.middleware');

// Rutas de solicitud para usuarios      //middleware para hacer autenticación y asi proteger las rutas


router.post('/users/create', userController.createUser);
router.put('/users/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.updateUser);
router.get('/users/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.getUserById); /// se cambio users por users como prueba
// ^ Método GET  ^ Ruta dinámica   ^ Middlewares (seguridad)         ^ Controlador que crearemos
router.get('/users', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByAdministradorId);
router.delete('/users/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.deleteUser);
router.get('/users/rol/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByRolId);

router.use(errorHandler);// Middleware para manejar errores

// Exportamos el router para que se puedan utilizar las rutas que se hayan definido
module.exports = router;