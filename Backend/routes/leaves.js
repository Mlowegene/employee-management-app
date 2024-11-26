import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addLeave, getLeaves } from '../controllers/leavesController.js';


const router = express.Router()

router.post('/add',authMiddleware, addLeave)
router.get('/:id/:role',authMiddleware, getLeaves)

export default router;