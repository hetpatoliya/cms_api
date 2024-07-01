import express from 'express';
import { authanticateUser } from '../middleware/authUser';
import { UserController } from '../controllers/user.controller';

const userController = new UserController();
const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/signUp', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/:userId', authanticateUser, userController.updateUser);
router.delete('/:userId', authanticateUser, userController.deleteUser);

export default router;