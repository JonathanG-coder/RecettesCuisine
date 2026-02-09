Projet Fil Rouge CDA
Gestionnaire de Recettes de Cuisine

Présentation du projet :
Concept :
Application mobile permettant aux utilisateurs de :
créer un compte,
ajouter leurs recettes,
modifier ou supprimer leurs recettes,
organiser les recettes par catégories,
rechercher et filtrer les recettes,
ajouter des recettes en favoris,
partager leurs recettes (optionnel).

Objectif : proposer une application simple et moderne pour découvrir et gérer des recettes de cuisine.



Objectif pédagogique CDA
Le projet doit démontrer :
architecture backend complète,
API sécurisée,
gestion base de données,
frontend fonctionnel,
dockerisation,
CI/CD,
déploiement Linux,
bonnes pratiques professionnelles.





Stack technique
Partie	Technologie
Frontend	React Native (Expo)
Backend	Node.js + Express
Base de données	MySQL
Authentification	JWT + cookies httpOnly
ORM/DB	mysql2
Validation	Joi
Images	Cloudinary
Conteneurs	Docker
Tests	Jest + Supertest
CI/CD	GitHub Actions / GitLab CI
Déploiement	Serveur Linux
Cache (optionnel)	Redis
Temps réel (optionnel)	WebSocket


Architecture globale
Frontend (React Native)
        │
        │ REST API
        ▼
Backend Node.js (Express)
        │
        ├── MySQL (Docker)
        ├── Cloudinary (images)
        ├── Redis (optionnel)
        └── WebSocket (optionnel)




Base de données : 


Table users
users
- id
- name
- email
- password_hash
- role (user/admin)
- created_at




Table categories
categories
- id
- name
- description
- created_at




Table recipes
recipes
- id
- title
- description
- ingredients
- category_id
- user_id
- created_at
- updated_at


Relations :
recette → catégorie
recette → utilisateur


Table favorites
favorites
- id
- user_id
- recipe_id
- created_at


Contrainte :
UNIQUE(user_id, recipe_id)
Empêche les doublons.


État actuel du projet (MIS À JOUR)
Environnement
✔ Docker installé
✔ MySQL via Docker
✔ Backend connecté à la DB
✔ Structure MVC mise en place

Authentification
Fonctionnalités disponibles :

✔ Register
✔ Login
✔ Logout
✔ Récupération utilisateur connecté

Sécurité :

✔ Hash password
✔ JWT
✔ Cookie httpOnly
✔ Middleware verifyToken
✔ Middleware requireAuth
✔ Validation Joi
✔ Rate limiting login

Gestion des catégories
CRUD complet :

✔ Créer catégorie
✔ Lister catégories
✔ Modifier catégorie
✔ Supprimer catégorie

Gestion des recettes
CRUD complet :

✔ Créer recette
✔ Voir toutes les recettes
✔ Voir recette par ID
✔ Modifier recette
✔ Supprimer recette


Sécurité :
✔ Recette liée à utilisateur
✔ Auteur ou admin peut modifier/supprimer



Fonctionnalités :
✔ Pagination
✔ Filtre par catégorie
✔ Recherche par titre

Gestion des favoris
✔ Ajouter favori
✔ Supprimer favori
✔ Liste favoris utilisateur
✔ Protection anti doublons

Images
✔ Upload possible via Cloudinary
✔ Images associées aux catégories
✔ Images associées aux recettes


Organisation backend actuelle
/back
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   ├── categoryController.js
│   ├── recipeController.js
│   └── favoriteController.js
│
├── services
│   ├── categoryService.js
│   └── favoriteService.js
│
├── models
│   ├── userModel.js
│   ├── categoryModel.js
│   ├── recipeModel.js
│   └── favoriteModel.js
│
├── routes
│   ├── authRoutes.js
│   ├── categoryRoutes.js
│   ├── recipeRoutes.js
│   └── favoriteRoutes.js
│
├── middlewares
│   ├── auth.js
│   └── validate.js
│
├── validations
│   ├── authValidation.js
│   ├── categoryValidation.js
│   └── recipeValidation.js
│
├── utils
│   ├── hash.js
│   └── jwt.js
│
index.js
.env
docker-compose.yml


Frontend prévu : 
Application React Native / Expo.
Pages principales :
Login
Register
Dashboard recettes
Détail recette
Création recette
Modification recette
Profil utilisateur
Favoris
Composants :
RecipeCard
RecipeForm
Navigation mobile
Modal édition


Fonctionnalités restantes

Backend
À faire :
validation complète recettes
images recettes
tests unitaires
tests d’intégration
CI/CD
cache Redis (optionnel)

Frontend
À faire :
création projet React Native
pages principales
connexion API backend
gestion authentification
affichage recettes

Docker
À faire :
dockerisation frontend
docker-compose complet
config production


Déploiement
À faire :
serveur Linux final
déploiement Docker
configuration domaine / HTTPS



Fonctionnalités bonus possibles
Pour valoriser le projet :
commentaires recettes
classement recettes populaires
notifications temps réel
export PDF recette
partage réseaux sociaux
mode sombre
cache Redis



Planning restant conseillé
Étape suivante recommandée
Commencer le frontend maintenant.
Backend est déjà bien avancé.