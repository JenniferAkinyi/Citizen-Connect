import { Router } from 'express';
import { allUsers, deleteUser, fetchById, updateUser, resetPassword, requestPasswordReset  } from '../controllers/user.js';

const userRouter = Router();

userRouter.get('/allusers', allUsers)
userRouter.get('/:id', fetchById)
userRouter.patch('/:id', updateUser)
userRouter.delete('/:id', deleteUser)
userRouter.post('/request-password-reset', requestPasswordReset); 
userRouter.put('/reset-password/:token', resetPassword); 

export default userRouter;