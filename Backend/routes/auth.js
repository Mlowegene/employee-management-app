import express from 'express'
import { Login, verify } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/login", Login)
router.get("/login", authMiddleware, verify );

export default router ;