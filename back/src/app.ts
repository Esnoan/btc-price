import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { router } from './routes';

// initialize configuration
dotenv.config();

// initialize app
const app = express();

// app config
app.set('port', process.env.SERVER_PORT);

// app middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// define a route handler for the default home page
app.get('/', (req: Request, res: Response) => {
  res.send('Backend is working!');
});

app.use('/api', router);

// implements swagger for docs
app.use('/api-docs', swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(
    swaggerUi.generateHTML(await import('../build/swagger.json'))
  );
});

export default app;
