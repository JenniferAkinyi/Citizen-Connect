import { Router } from 'express';
import {postUser, loginUser, fetchUsers, fetchById, updateUser, deleteUser} from '../controllers/userController.js'

const userRouter = Router();

userRouter.post('/register', postUser)
userRouter.get('/login', loginUser)
userRouter.get('/allusers', fetchUsers)
userRouter.get('/:id', fetchById)
userRouter.patch('/:id', updateUser)
userRouter.delete('/:id', deleteUser)
// userRouter.post('/request-password-reset', requestPasswordReset); 
// userRouter.put('/reset-password/:token', resetPassword); 

export default userRouter;