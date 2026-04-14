import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import dns from 'node:dns/promises';

dns.setServers(['8.8.8.8', '8.8.4.4']);

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);

    const hashed = await bcrypt.hash('12345678', 10);

    const existe = await User.findOne({ email: 'admin3@gmail.com' });
    if (existe) {
        console.log('⚠️  El email ya está registrado');
        await mongoose.disconnect();
        return;
    }

    await User.create({
        name: 'Nuevo Admin',
        email: 'admin3@gmail.com',
        password: hashed,
        role: 'admin'
    });

    console.log('✅ Admin creado');
    console.log('   Email:    admin3@gmail.com');
    console.log('   Password: 12345678');

    await mongoose.disconnect();
}

run();