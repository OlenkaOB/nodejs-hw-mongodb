import {
    createContact,
    deleteContact,
    getAllContacts,
    getContactsById,
    updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
    const { _id: userId } = req.user;

    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const contacts = await getAllContacts({
        userId,
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
    });

    res.status(200).json({
        status: 200,
        message: 'Successfully found contact!',
        data: contacts,
    });
};
export const getContactsByIdController = async (req, res) => {
    const { _id: userId } = req.user;
    const { contactId } = req.params;
    const contact = await getContactsById(contactId, userId);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};
export const deleteContactsController = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { contactId } = req.params;
    const contact = await deleteContact(contactId, userId);

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.status(204).send();
};

export const createContactsController = async (req, res) => {
    const { _id: userId } = req.user;

    const contact = await createContact({ ...req.body, userId });

    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: contact,
    });
};

export const updateContactsController = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const result = await updateContact(contactId, userId, req.body);

    if (!result) {
        next(createHttpError(404, 'Contact not found'));
    }

    res.status(201).json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: result.contact,
    });
};
