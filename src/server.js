import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';
import dns from 'node:dns/promises';

dns.setServers(['8.8.8.8', '8.8.4.4']);



dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('🔥 DB Conectada');
        app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
    })
    .catch(err => {
        console.error('❌ Error al conectar con MongoDB:', err.message || err);
        process.exit(1);
    });