import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',   // MySQL Docker host
    port: process.env.DB_PORT || 3307,          // Port exposé Docker
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'userpass',
    database: process.env.DB_NAME || 'recettesCuisine_db',
    waitForConnections: true,   
    connectionLimit: 5,      
    queueLimit: 0               
});

export default pool;
