import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';
import { ENV_VARS } from '../config/contacts.js';

export const initMongoConnection = async () => {
    try {
        const user = getEnvVar(ENV_VARS.MONGODB_USER);
        const pwd = getEnvVar(ENV_VARS.MONGODB_PASSWORD);
        const url = getEnvVar(ENV_VARS.MONGODB_URL);
        const db = getEnvVar(ENV_VARS.MONGODB_DB);

        await mongoose.connect(`mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('Mongo connection successfully established!');

    } catch (error) {
        console.error('Error while setting up mongo connection', error);
        throw error;

    }

};
