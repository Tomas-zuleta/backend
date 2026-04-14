import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js'; 
import habitacionRoutes from './routes/habitacion.routes.js';

const app = express();

const parseAllowedOrigins = (raw) => {
  if (!raw) return [];
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
};

const defaultAllowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]);

const allowedOrigins = new Set([
  ...defaultAllowedOrigins,
  ...parseAllowedOrigins(process.env.CORS_ORIGINS),
]);

const corsOptions = {
  origin(origin, callback) {
    // Requests like curl/postman may not send Origin header
    if (!origin) return callback(null, true);
    if (allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
// Express 5 (path-to-regexp v6) requires named wildcards.
app.options('/*splat', cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/habitaciones', habitacionRoutes);

export default app;