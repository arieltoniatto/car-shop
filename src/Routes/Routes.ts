import { Router } from 'express';
import CarController from '../Controllers/CarController';
import MotorcycleController from '../Controllers/MotorcycleController';

const routes = Router();

const carIdPath = '/cars/:id';
const motorcycleIdPath = '/motorcycles/:id';

routes.delete(
  carIdPath,
  (req, res, next) => new CarController(req, res, next).delete(),
);

routes.put(
  carIdPath,
  (req, res, next) => new CarController(req, res, next).updateById(),
);

routes.get(
  carIdPath,
  (req, res, next) => new CarController(req, res, next).getById(),
);

routes.get(
  '/cars',
  (req, res, next) => new CarController(req, res, next).findAll(),
);

routes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).create(),
);

routes.delete(
  motorcycleIdPath,
  (req, res, next) => new MotorcycleController(req, res, next).delete(),
);

routes.put(
  motorcycleIdPath,
  (req, res, next) => new MotorcycleController(req, res, next).updateById(),
);

routes.get(
  motorcycleIdPath,
  (req, res, next) => new MotorcycleController(req, res, next).getById(),
);

routes.get(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).findAll(),
);

routes.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).create(),
);

export default routes;