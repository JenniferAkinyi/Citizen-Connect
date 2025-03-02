import { Router } from 'express';
import { allUsers, deleteUser, fetchById, updateUser } from '../controllers/user.js';

const userRouter = Router();

userRouter.get('/allusers', allUsers)
userRouter.get('/:id', fetchById)
userRouter.patch('/:id', updateUser)
userRouter.delete('/:id', deleteUser)

export default userRouter;