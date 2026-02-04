Gestionnaire de Recettes de Cuisine – Projet CDA
1️⃣ Ce que nous avons réalisé jusqu’à présent
Configuration et environnement

Installation et configuration de Docker pour MySQL et backend Node.js.

Création d’un Docker Compose pour MySQL.

Connexion de l’application backend à la base de données Dockerisée.

Configuration de Node.js avec Express pour le backend.

Mise en place du système MVC : dossiers models, controllers, routes.

Création de fichiers utilitaires pour :

Gestion des hashs de mot de passe (bcrypt/argon2)

Gestion des JWT (signToken, verifyTokenUtil)

Validation des données avec Joi (validations/)

Base de données

Création de la table users avec :
id, name, email, password_hash, role, created_at

Création de la table categories avec :
id, name, description, created_at

Création de la table recipes avec :
id, title, description, ingredients, category_id, user_id, created_at, updated_at

Authentification (Auth)

Routes et controllers pour :

Register (création d’utilisateur)

Login (connexion avec JWT)

Logout

GetMe (récupérer l’utilisateur connecté)

DeleteUser (admin uniquement)

Middleware pour :

Vérifier le JWT (verifyToken)

Vérifier le rôle (requireAuth)

Validation des données avec Joi pour register et login.

Gestion des catégories

Modèle, controller et routes CRUD pour categories.

Validation des données avec Joi.

Gestion de created_at et description.

Gestion des recettes

Modèle, controller et routes CRUD pour recipes.

user_id automatiquement récupéré depuis le token JWT lors de la création.

Gestion de created_at et updated_at.

Validation des données avec Joi (recipeSchema).

2️⃣ Ce qu’il reste à faire
Backend

Ajouter contrôle de propriété : seuls les propriétaires ou l’admin peuvent modifier ou supprimer leurs recettes.

Ajouter filtrage / pagination / recherche pour les recettes.

Ajouter tests unitaires et d’intégration (Jest / Supertest).

Ajouter CI/CD pour automatiser tests et déploiement sur serveur Linux.

Frontend

Créer la partie frontend avec React ou React Native :

Pages : Login, Register, Dashboard, Liste de recettes, Détails recette, Création / Modification recette, Gestion catégories.

Consommer les API du backend avec Axios ou Fetch.

Gestion des cookies pour JWT.

Déploiement

Déploiement de l’application backend et frontend sur serveur Linux ou cloud (Render, Railway, Heroku, etc.)

Utilisation de Docker pour le déploiement.

Améliorations possibles

Gestion d’images pour les recettes.

Système de favoris / likes / commentaires.

Mise en place d’un système de notifications.

Gestion des rôles avancés (admin, gérante, utilisateur).

3️⃣ Organisation du projet
/back
  /config
    db.js
  /controllers
    authController.js
    categoryController.js
    recipeController.js
  /models
    userModel.js
    categoryModel.js
    recipeModel.js
  /routes
    authRoutes.js
    categoryRoutes.js
    recipeRoutes.js
  /utils
    hash.js
    jwt.js
  /validations
    authValidation.js
    categoryValidation.js
    recipeValidation.js
  /middlewares
    auth.js
    validate.js
index.js
.env
docker-compose.yml





« Reprenons le projet Gestionnaire de Recettes de Cuisine là où nous nous étions arrêtés.
On a déjà :

Backend avec Node.js / Express / MVC complet pour users, categories et recipes

Authentification JWT avec middleware et validation Joi

Docker pour MySQL et backend

Base de données avec tables users, categories, recipes avec created_at et updated_at

Routes et controllers pour CRUD complet

Ce qu’il reste à faire :

Backend : contrôle de propriété, filtres/pagination, tests unitaires/intégration, CI/CD

Frontend : React ou React Native avec pages Login, Register, Dashboard, Liste Recettes, Détails Recette, Création/Modification Recette, Gestion Catégories, consommation des API backend

Déploiement sur serveur Linux avec Docker

Reprends depuis la prochaine étape backend ou frontend selon les priorités. »