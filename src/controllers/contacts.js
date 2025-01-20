import { getContacts, getContactsById } from "../services/contacts.js";
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
    const contacts = await getContacts();

    res.json(contacts);
};
export const getContactsByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactsById(contactId);



    if (!contact) {
        throw createHttpError(404, "Contact not found");
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,

    });

};
