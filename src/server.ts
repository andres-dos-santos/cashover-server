import 'dotenv/config';
import 'express-async-errors';
import express, { type Request, type Response } from 'express';

import companyRoutes from './routes/company.routes';
import authenticationRoutes from './routes/authentication.routes';
import groupRoutes from './routes/group.routes';
import refreshTokenRoutes from './routes/refresh-token.routes';

const app = express();
app.use(express.json());

app.use(
  '/api/1/',
  companyRoutes,
  authenticationRoutes,
  groupRoutes,
  refreshTokenRoutes
);

app.get('/health', (_: Request, res: Response) => {
  res.status(200).json({ status: 'Ok!' });
});

// app.use((error: Error, _: Request, response: Response) => {
//   return response.json({
//     status: 'error',
//     message: error.message,
//   });
// });

app.listen(3333, () => {
  console.log('Server is running at: http://localhost:3333');
});
