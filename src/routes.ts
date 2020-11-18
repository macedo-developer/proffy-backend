import express from 'express';

import ClassesController from './controllers/ClassesController';
import ClassesScheduleController from './controllers/ClassesScheduleController';
import ConnectionsController from './controllers/ConnectionsController';
import UsersControllers from './controllers/UsersController';

const routes = express.Router();

const classesScheduleController = new ClassesScheduleController();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const usersControllers = new UsersControllers();

routes.get('/user', usersControllers.show);
routes.get('/user/:id', usersControllers.showUser);
routes.post('/users', usersControllers.create);
routes.put('/users/:id', usersControllers.updateUser);

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

routes.get('/schedule/:class_id', classesScheduleController.show);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;
