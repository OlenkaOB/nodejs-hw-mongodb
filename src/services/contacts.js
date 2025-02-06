import { SORT_ORDER } from '../constants/index.js';
import { contactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
    page,
    perPage,
    userId,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const contactsQuery = contactsCollection.find({ userId });

    if (filter.contactType) {
        contactsQuery.where('contactType').equals(filter.contactType);
    }

    if (filter.isFavourite !== undefined) {
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }

    const contactsCount = await contactsCollection
        .find()
        .merge(contactsQuery)
        .countDocuments();
    const contacts = await contactsQuery
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder })
        .exec();
    const paginationData = calculatePaginationData(contactsCount, perPage, page);
    return {
        data: contacts,
        ...paginationData,
    };
};

export const getContactsById = (contactId, userId) =>
    contactsCollection.findOne({ _id: contactId, userId });

export const deleteContact = (contactId, userId) =>
    contactsCollection.findOneAndDelete({ _id: contactId, userId });

export const createContact = (payload) => contactsCollection.create(payload);

export const updateContact = async (
    contactId,
    userId,
    payload,
    options = {},
) => {
    const rawResult = await contactsCollection.findOneAndUpdate(
        { _id: contactId, userId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );
    if (!rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};
