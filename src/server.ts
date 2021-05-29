import express, { Application } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import Controller from './interfaces/controller.interface';
import sequelize from './database'

import TeacherController from './controllers/teacher.controller';

class Server {
  public app: Application;
  public port: number;
  constructor(controllers: Controller[]) {
    this.app = express();
    this.port = parseInt(process.env.PORT!, 10);
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(compression());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/api/', controller.router);
    });
  }

  private async connectToDatabase() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening to port ${this.port}`);
    });
  }
}

new Server([
  new TeacherController()
]).listen();
