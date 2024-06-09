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
  errorHandler as customErrorHandler,
  notFoundHandler,
} from './middleware/errorMiddleware';

// Create Express server
const app = express();

// Express configuration
app.set('port', config.PORT);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

app.use(
  express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }),
);

app.get('/apis/v1/', (req: Request, res: Response) => {
  res.send('Server is healthy');
});

// Error handling middleware
app.use(notFoundHandler);
app.use(customErrorHandler);

// Development error handler
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}

export default app;
