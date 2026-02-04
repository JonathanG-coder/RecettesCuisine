import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',   // MySQL Docker host
    port: process.env.DB_PORT || 3307,          // Port exposé Docker
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'userpass',
    database: process.env.DB_NAME || 'recettesCuisine_db',
    waitForConnections: true,   // Attendre si toutes les connexions sont occupées
    connectionLimit: 5,         // Max 5 connexions simultanées
    queueLimit: 0               // Pas de limite dans la file d'attente
});

export default pool;
