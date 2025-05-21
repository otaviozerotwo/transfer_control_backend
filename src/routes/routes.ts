import { Router } from 'express';
import { UserController } from './../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';

const routes = Router();

routes.post('/user', new UserController().create);
routes.post('/login', new UserController().login);
routes.post('/forgot-password', new UserController().forgotPassword);
routes.post('/reset-password', new UserController().resetPassword);

routes.use(authMiddleware);

routes.get('/profile', new UserController().getProfile);

export default routes;