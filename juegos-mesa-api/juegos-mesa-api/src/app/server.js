import cors from 'cors';
import express, { json } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import indexRouter from '../routes/index.routes.js';

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(json());
app.use(cors({ origin: '*' }));
app.use(helmet());

app.get('/', (req, res) => {
  res.status(200).send({
    msg: 'API de colección de juegos de mesa activa'
  });
});

app.use('/api', indexRouter);

app.use((req, res) => {
  res.status(404).send({
    msg: 'Ruta no encontrada'
  });
});

export default app;
