import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './config/contacts.js';
import router from './routers/index.js';
import { errorHandlerMiddleware } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';


export const setupServer = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.use(router);
    app.use(errorHandlerMiddleware);
    app.use(notFoundHandler);


    app.use('*', (req, res, next) => {
        res.status(404).json({
            message: 'Not found',
        });
    });



    const PORT = getEnvVar(ENV_VARS.PORT);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });


};
