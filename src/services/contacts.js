import { contactsCollection } from "../db/models/contacts.js";

export const getContacts = async () => {
    const contacts = await contactsCollection.find();

    return contacts;
};

export const getContactsById = async (contactId) => {
    const contact = await contactsCollection.findById(contactId);
    return contact;
};
