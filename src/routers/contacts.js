import { Router } from 'express';
import { createContactsController, deleteContactsController, getContactsByIdController, getContactsController, updateContactsController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';



const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactsByIdController));
contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactsController));
contactsRouter.post('/', ctrlWrapper(createContactsController));
contactsRouter.patch('/:contactId', ctrlWrapper(updateContactsController));

export default contactsRouter;
