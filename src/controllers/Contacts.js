import createHttpError from 'http-errors';
import * as contactsService from '../services/Contacts.js';

/**
 * Отримати всі контакти
 */
export const getAllContacts = async (req, res) => {
  const contacts = await contactsService.getAllContacts();

  const data = Array.isArray(contacts)
    ? contacts.map((c) => (c.toObject ? c.toObject() : c))
    : [];

  data.forEach((item) => {
    if (item && item.__v !== undefined) delete item.__v;
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully fetched all contacts!',
    data,
  });
};

/**
 * Отримати контакт за id
 */
export const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  const data = contact.toObject ? contact.toObject() : contact;
  if (data.__v !== undefined) delete data.__v;

  res.status(200).json({
    status: 200,
    message: 'Successfully fetched contact!',
    data,
  });
};

/**
 * Створити контакт
 */
export const createContact = async (req, res) => {
  const payload = req.body;

  const created = await contactsService.createContact(payload);

  const data = created.toObject ? created.toObject() : created;
  if (data.__v !== undefined) delete data.__v;

  res.status(201).json({
    status: 201,
    message: 'Contact created successfully',
    data,
  });
};

/**
 * Оновити контакт
 */
export const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updated = await contactsService.updateContact(contactId, req.body);

  if (!updated) {
    throw createHttpError(404, 'Contact not found');
  }

  const data = updated.toObject ? updated.toObject() : updated;
  if (data.__v !== undefined) delete data.__v;

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data,
  });
};

/**
 * Видалити контакт
 */
export const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deleted = await contactsService.deleteContact(contactId);

  if (!deleted) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
