import Contact from '../models/Contacts.js';

export async function getAllContacts() {
  return await Contact.find({}, '-__v').lean();
}

export async function getContactById(contactId) {
  return await Contact.findById(contactId, '-__v').lean();
}

export async function createContact(contactData) {
  const contact = new Contact(contactData);
  const saved = await contact.save();
  return saved.toObject({ versionKey: false });
}

export async function updateContact(contactId, updateData) {
  return await Contact.findByIdAndUpdate(contactId, updateData, {
    new: true,
    runValidators: true,
    select: '-__v',
  }).lean();
}

export async function deleteContact(contactId) {
  const result = await Contact.findByIdAndDelete(contactId);
  return !!result;
}
