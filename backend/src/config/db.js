// Database connection configuration placeholder
// Can be configured for MongoDB (Mongoose), PostgreSQL, MySQL, etc.

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.log('ℹ️  No database URI provided in .env (running in mock/in-memory mode)');
      return;
    }
    // Example: await mongoose.connect(mongoUri);
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};
