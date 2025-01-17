import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import lusca from 'lusca';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from 'errorhandler';

import config from './config';
import {
  notFoundHandler,
  customErrorHandler,
} from './middleware/errorMiddleware';
import UserRouter from './routes/authRoutes';
import problemRoutes from './routes/problemRoutes';
import attemptRoutes from './routes/attemptRoutes';
import adminRoutes from './routes/adminRoutes';

// Create Express server
const app = express();

// Express configuration
app.set('port', config.PORT);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

app.use(
  express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }),
);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is healthy');
});

app.use('/apis/v1/users', UserRouter);
app.use('/apis/v1/problems', problemRoutes);
app.use('/apis/v1/attempts', attemptRoutes);
app.use('/apis/v1/admin', adminRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(customErrorHandler);

// Development error handler
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}

export default app;
