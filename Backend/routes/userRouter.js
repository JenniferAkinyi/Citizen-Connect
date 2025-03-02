// import { Router } from "express";
// import { 
//     getAllUsers,
//     postUser,
//     fetchById,
//     updatedUserById,
//     deleteUserById,
//     loginUser,
// } from "../controllers/userController.js"; 
// import { asyncHandler } from "../utils/handler.js"; 
// import { authenticateTokenMiddleware } from "../middlewares/validators/authToken.middlewares.js";

// const userRouter = Router();

// userRouter.post('/login', asyncHandler(loginUser));
// userRouter.get('/allusers', asyncHandler(getAllUsers));
// userRouter.post('/register', asyncHandler(postUser));
// userRouter.get('/:id', authenticateTokenMiddleware, asyncHandler(fetchById));
// userRouter.patch('/:id', asyncHandler(updatedUserById));
// userRouter.delete('/:id', asyncHandler(deleteUserById));

// export default userRouter;