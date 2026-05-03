import { Router } from 'express';
import boardgamesRouter from '../modules/boardgames/boardgames.routes.js';

const indexRouter = Router();

indexRouter.use('/boardgames', boardgamesRouter);

export default indexRouter;
