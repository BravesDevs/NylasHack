import express, { Application } from 'express';
import { authRouter, contactsRouter } from './routes';
import cors from 'cors';
const app: Application = express();

class MyApplication {
    app: Application;
    constructor() {
        this.app = app;
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    initializeMiddlewares() {
        this.app.use(cors({
            origin: '*',
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        }));
        this.app.use(express.json());
    }

    initializeRoutes() {
        this.app.use('/', authRouter);
        this.app.use('/contacts', contactsRouter);
    }

    start() {
        this.app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    }
}

new MyApplication().start();