# RecettesCuisineGestionnaire de Recettes - Backend + MySQL Docker
Résumé du projet

Ce projet est un gestionnaire de recettes de cuisine.

Backend : Node.js + Express

Base de données : MySQL dans Docker

Frontend : React Native (à venir)

Étapes réalisées jusqu’à présent
1. Installation et vérification de Docker

Test avec le container hello-world pour vérifier l’installation :

docker run hello-world
Résultat : message de succès confirmé.

2. Création du container MySQL avec Docker Compose

Création du dossier db/ et du fichier docker-compose.yml :

Commande pour lancer le container :
docker-compose up -d

Vérification :
docker ps

3. Création de la base de données et des tables

Base créée : recettesCuisine_db

Tables créées :

users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

recipes
CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    ingredients TEXT,
    category_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

4. Création du backend Node.js

Dossier : back/

Initialisation Node.js :

npm init -y


Dépendances installées :

npm install express mysql2 dotenv
npm install --save-dev nodemon


Variables d’environnement .env :

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=


Script de démarrage dans package.json :

"start": "node index.js",
"dev": "nodemon index.js"

Test du backend :
npm run dev


Résultat :

Backend démarré sur le port 5000
Connecté à MySQL Dockerisé !

5. Prochaines étapes

Ajouter les endpoints CRUD pour recipes et categories

Ajouter l’endpoint /auth/register pour créer des utilisateurs

Créer le frontend React Native

Optionnel : dockeriser le backend pour un projet entièrement portable