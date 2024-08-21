import express from 'express';
import { createUser, getUsers, getUsersByPinCode, uploadFiles } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', uploadFiles, createUser);
router.get('/usersdata', getUsers);

router.get('/search', getUsersByPinCode); 


export default router;
