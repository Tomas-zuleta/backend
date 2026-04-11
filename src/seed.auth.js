import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import dns from 'node:dns/promises';

dns.setServers(['8.8.8.8', '8.8.4.4']);
async function run() {
    await mongoose.connect(process.env.MONGODB_URI);

    await User.deleteMany({});

    const hashedAdmin = await bcrypt.hash('12345678', 10);
    const hashedUser = await bcrypt.hash('12345678', 10);

    await User.create([
        {
            name: 'Admin',
            email: 'admin@gmail.com',
            password: hashedAdmin,
            role: 'admin'
        },
        {
            name: 'Usuario Demo',
            email: 'user@gmail.com',
            password: hashedUser,
            role: 'user'
        }
    ]);

    console.log('✅ Usuarios creados');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👑 Admin');
    console.log('   Email:    admin@gmail.com');
    console.log('   Password: 12345678');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 Usuario');
    console.log('   Email:    user@gmail.com');
    console.log('   Password: 12345678');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await mongoose.disconnect();
}

run();