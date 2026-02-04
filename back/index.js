require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Connexion à MySQL Docker
const db = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3307,
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'userpass',
    database: process.env.DB_NAME || 'recettesCuisine_db'
});

db.connect((err) => {
    if(err) {
        console.error('Erreur de connexion MySQL:', err);
    } else {
        console.log('Connecté à MySQL Dockerisé !');
    }
});

// Endpoint test
app.get('/', (req, res) => {
    res.send('Backend OK !');
});

// Endpoint login (test simple)
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    db.query(
        'SELECT * FROM users WHERE email = ? AND password_hash = ?',
        [email, password],
        (err, results) => {
            if(err) return res.status(500).json({ error: err });
            if(results.length === 0) return res.status(401).json({ message: 'Utilisateur ou mot de passe incorrect' });
            res.json({ message: 'Connexion réussie', user: results[0] });
        }
    );
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend démarré sur le port ${PORT}`));
