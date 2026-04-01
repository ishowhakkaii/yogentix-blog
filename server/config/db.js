// ============================================
// DATABASE CONNECTION
// ============================================

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;

        if (!uri) {
            throw new Error('MONGO_URI is not defined in .env file!');
        }

        console.log('⏳ Connecting to MongoDB...');

        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 15000,
            socketTimeoutMS: 45000
        });

        console.log('✅ MongoDB Connected: ' + conn.connection.host);

        // Test if we can write to the database
        const admin = conn.connection.db.admin();
        const serverStatus = await conn.connection.db.command({ ping: 1 });
        console.log('✅ Database ping successful:', serverStatus.ok === 1 ? 'OK' : 'FAILED');

        // Check if we're connected to primary
        const isMaster = await conn.connection.db.command({ hello: 1 });
        console.log('✅ Connected to PRIMARY:', isMaster.isWritablePrimary ? 'YES ✅' : 'NO ❌');

    } catch (error) {
        console.error('❌ MongoDB Connection Error: ' + error.message);
        process.exit(1);
    }
};

module.exports = connectDB;