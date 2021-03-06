import 'reflect-metadata';
import './database';

import express, { Express } from 'express';
import cors from 'cors';

import routes from './routes';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use(routes);

export { app };
