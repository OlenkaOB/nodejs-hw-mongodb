import { contactsCollection } from "../db/models/contacts.js";

export const getContacts = () => contactsCollection.find();
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
