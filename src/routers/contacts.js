import { Router } from 'express';
import { createContactsController, deleteContactsController, getContactsByIdController, getContactsController, updateContactsController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createStudentSchema, updateStudentSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';



const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactsByIdController));
contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteContactsController));
contactsRouter.post('/', validateBody(createStudentSchema), ctrlWrapper(createContactsController));
contactsRouter.patch('/:contactId', isValidId, validateBody(updateStudentSchema), ctrlWrapper(updateContactsController));

export default contactsRouter;
