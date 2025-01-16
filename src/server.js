import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './config/contacts.js';
import { getContacts, getContactsById } from './services/contacts.js';


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

    app.get('/contacts', async (req, res) => {
        const contacts = await getContacts();
        res.status(200).json({
            status: 200,
            message: 'Successfully found contacts!',
            data: contacts,

        });
    });

    app.get('/contacts/:contactId', async (req, res) => {
        const { contactId } = req.params;
        const contact = await getContactsById(contactId);

        if (!contact) {
            return res.status(404).json({
                status: 404,
                message: 'Contacts not found!',
            });
        }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,

        });

    });


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
