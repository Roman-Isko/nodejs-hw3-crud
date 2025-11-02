import mongoose from 'mongoose';

export async function initMongoConnection() {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
    process.env;

  if (!MONGODB_URL || !MONGODB_DB) {
    throw new Error('❌ Missing MongoDB env variables. Check .env');
  }

  const uri = `mongodb+srv://${encodeURIComponent(MONGODB_USER)}:${encodeURIComponent(
    MONGODB_PASSWORD,
  )}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

  console.log('🔗 Generated Mongo URI:', uri.replace(/:[^:]*@/, ':****@'));

  await mongoose.connect(uri);
  console.log('✅ Mongo connection successfully established!');
}
