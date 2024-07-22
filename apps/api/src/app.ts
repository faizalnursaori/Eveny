import express, { urlencoded, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import eventRoutes from './routes/event.router';
import reviewRoutes from './routes/review.router';
import transactionRoutes from './routes/transaction.router';
import authRoutes from './routes/auth.router';
import userRoutes from './routes/user.router';

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));

app.use(
  express.json({
    verify: (req: Request, res: Response, buf: Buffer, encoding: string) => {
      try {
        JSON.parse(buf.toString());
      } catch (e) {
        res.status(400).json({ message: 'Invalid JSON' });
        throw new Error('Invalid JSON');
      }
    },
  }),
);

app.use('/api', eventRoutes);
app.use('/api', reviewRoutes);
app.use('/api', transactionRoutes);
app.use('/auth', authRoutes);
app.use('/auth', userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON' });
  }

  res.status(500).json({ message: 'Something went wrong' });
});

export default app;
