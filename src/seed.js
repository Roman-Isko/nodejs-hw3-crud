import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Contact from './models/Contacts.js';
import { contactValidationSchema } from './validation/contactValidation.js';
import { initMongoConnection } from './db/initMongoConnection.js';

dotenv.config();

const contacts = [
  {
    name: 'Dmytro Boyko',
    phoneNumber: '+380000000002',
    email: null,
    isFavourite: false,
    contactType: 'personal',
  },
  {
    name: 'Olena Ivanenko',
    phoneNumber: '+380000000003',
    email: 'olena@example.com',
    isFavourite: true,
    contactType: 'business',
  },
];

async function seed() {
  try {
    console.log('🌱 Starting seeding process...');

    await initMongoConnection();

    await Contact.deleteMany();

    const validatedContacts = [];
    for (const contact of contacts) {
      const { error, value } = contactValidationSchema.validate(contact);
      if (error)
        throw new Error(`Invalid contact data: ${JSON.stringify(contact)}`);
      validatedContacts.push(value);
    }

    await Contact.insertMany(validatedContacts);
    console.log('✅ Contacts successfully seeded!');
  } catch (error) {
    console.error(`❌ Seed error: ${error.message}`);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
