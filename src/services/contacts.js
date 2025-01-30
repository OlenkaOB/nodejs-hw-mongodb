import { contactsCollection } from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";



export const getAllContacts = async ({ page, perPage }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const contactsQuery = contactsCollection.find();
    const contactsCount = await contactsCollection.find().merge(contactsQuery).countDocuments();
    const contacts = await contactsQuery.skip(skip).limit(limit).exec();
    const paginationData = calculatePaginationData(contactsCount, perPage, page);
    return {
        data: contacts,
        ...paginationData,
    };
};

export const getContactsById = (contactId) => contactsCollection.findById(contactId);
export const deleteContact = (contactId) => contactsCollection.findOneAndDelete({ _id: contactId });
export const createContact = (payload) => contactsCollection.create(payload);



export const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await contactsCollection.findOneAndUpdate(
        { _id: contactId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        }
    );
    if (!rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };


};
