import express, { Request, Response } from 'express';
import cors from 'cors';
import notificationRoutes from './src/routes/notificationRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/notifications', notificationRoutes);

app.use((req: Request, res: Response) => {
  res.status(400).send('NOT FOUND');
});

app.use((err: any, req: Request, res: Response) => {
  const { status, message } = err;
  console.error(err);
  res.status(status || 500).json({ message });
});

export default app;
