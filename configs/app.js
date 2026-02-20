import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';
import rateLimit from 'express-rate-limit';

import { dbConnection } from './db.configuration.js';
import authRoutes from '../src/auth/auth.routes.js';
import publicacionRoutes from '../src/Publicacion/publicacion.routes.js';
import comentarioRoutes from '../src/Comentario/comentario.routes.js';
import { errorHandler } from '../middlewares/handle-errors.js';

const app = express();
config();


const configs = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: 'Too many requests from this IP, please try again later'
    });
    app.use(limiter);

};

const routes = (app) => {
    app.use('/opinionManager/v1/auth', authRoutes);
    app.use('/opinionManager/v1/publications', publicacionRoutes);
    app.use('/opinionManager/v1/comments', comentarioRoutes);
};

export const initServer = async () => {
    const port = process.env.PORT || 3000;
    try {
        configs(app);
        routes(app);
        await dbConnection();

        app.use(errorHandler);

        app.listen(port, () => {
            console.log(`Server running on port: ${port}           `);
        });
    } catch (err) {
        console.error(`Server init failed: ${err}`);
    }
};