import express, { type Request, type Response } from 'express';

import companyRoutes from './routes/company.routes';

const app = express();
app.use(express.json());

app.use('/api/1/', companyRoutes);

app.get('/health', (_: Request, res: Response) => {
  res.status(200).json({ status: 'Ok!' });
});

app.listen(3333, () => {
  console.log('Server is running at: http://localhost:3333');
});
