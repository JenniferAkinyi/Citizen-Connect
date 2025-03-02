import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

// import routers
import userRouter from './routes/user.router.js';
import authRouter from './routes/auth.router.js';
import incidentRouter from './routes/incident.router.js';
import pollRouter from './routes/polls.router.js';
import voteRouter from './routes/votes.router.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(errorHandler);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors(
    {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }
));
app.use(morgan('dev'))

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/incidents', incidentRouter)
app.use('/api/polls', pollRouter)
app.use('/api/votes', voteRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});