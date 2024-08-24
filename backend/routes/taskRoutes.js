import express from 'express';
import { di } from '../utils/dependencyInjector.js';
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask, assignTask } from '../controllers/taskController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Dependency Injection for each route
router.post('/', authenticateToken, di.inject(createTask));
router.get('/', authenticateToken, di.inject(getAllTasks));
router.get('/:id', authenticateToken, di.inject(getTaskById));
router.put('/:id', authenticateToken, di.inject(updateTask));
router.delete('/:id', authenticateToken, di.inject(deleteTask));

// Route for assigning task to users
router.put('/:id/assign', authenticateToken, di.inject(assignTask));

export default router;
