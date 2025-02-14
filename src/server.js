import express from 'express';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './config/contacts.js';
import router from './routers/index.js';
import { errorHandlerMiddleware } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';




export const setupServer = () => {
    const app = express();
    app.use(cors());

    app.use(express.json());

    app.use(cookieParser());

    app.use('/uploads', express.static(UPLOAD_DIR));

    app.use(router);
    app.use('*', notFoundHandler);

    app.use(errorHandlerMiddleware);

    const PORT = getEnvVar(ENV_VARS.PORT);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
