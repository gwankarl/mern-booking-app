import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/users';
import authRoutes from './routes/auth';

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log('Connected to database!'));

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.get('/api/test/', async (req: Request, res: Response) => {
  res.json({ messeage: 'hello from express endpoint' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.listen(7000, () => {
  console.log('server running on localhost:7000');
});
