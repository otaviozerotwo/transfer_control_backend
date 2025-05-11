import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('Auth Route');
});

export default routes;