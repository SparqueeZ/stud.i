# STUD.I - Plateforme E-Learning

STUD.I est une plateforme d'apprentissage en ligne moderne qui permet aux utilisateurs d'accéder à des cours, des ressources pédagogiques et de suivre leur progression académique.

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Structure du projet](#structure-du-projet)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Démarrage](#démarrage)
- [Scripts disponibles](#scripts-disponibles)
- [Architecture](#architecture)
- [Contribution](#contribution)
- [Licence](#licence)

## 📝 Aperçu

STUD.I est une application web e-learning complète avec des fonctionnalités pour les étudiants et les enseignants. La plateforme offre une interface intuitive pour accéder aux cours, suivre la progression et interagir avec le contenu pédagogique.

## 🗂 Structure du projet

Le projet est organisé en monorepo avec la structure suivante :

```
stud.i/
├── front/             # Application front-end Vue.js
├── back/              # API back-end Node.js + Express
└── README.md          # Ce fichier
```

## 🔧 Technologies utilisées

### Front-end

- Vue.js 3
- Vite
- Pinia (gestion d'état)
- Vue Router
- Axios
- SCSS

### Back-end

- Node.js
- Express
- MySQL (Sequelize)
- JWT pour l'authentification

## ⚙️ Prérequis

- Node.js (v16+)
- npm ou yarn
- Une base de données MySQL

## 📥 Installation

1. Clonez ce dépôt :

```bash
git clone https://github.com/SparqueeZ/stud.i.git
cd stud.i
```

2. Installez les dépendances du monorepo :

```bash
npm install
```

3. Installez les dépendances du front-end et du back-end :

```bash
npm run install:all
```

## 🚀 Démarrage

### Mode développement

Pour lancer le front-end et le back-end en mode développement :

```bash
npm run dev
```

Pour lancer uniquement le front-end :

```bash
cd front
npm run dev
```

Pour lancer uniquement le back-end :

```bash
cd back
nodemon index.js
```

### Mode production

Pour construire l'application pour la production :

```bash
npm run build
```

Pour démarrer l'application en mode production :

```bash
npm run start
```

## 📜 Scripts disponibles

- `npm run dev` - Lance le front-end en mode développement
- `nodemon index.js` - Lance le back-end en mode développement
- `npm run build` - Construit l'application pour la production
- `npm run start` - Démarre l'application en mode production

## 🏛 Architecture

### Front-end

L'application front-end est organisée comme suit :

- `components/` - Composants Vue réutilisables
- `views/` - Pages de l'application
- `router/` - Configuration des routes
- `store/` - État global avec Pinia
- `assets/` - Images, styles et autres actifs statiques
- `utils/` - Fonctions utilitaires

### Back-end

L'API back-end est organisée comme suit :

- `controllers/` - Contrôleurs pour gérer les requêtes
- `models/` - Modèles de données Mongoose
- `routes/` - Définition des routes API
- `middlewares/` - Middlewares Express
- `config/` - Configuration de l'application
- `services/` - Services métier
- `utils/` - Fonctions utilitaires

## Ce projet est réalisé dans le cadre de notre formation de bachelor 3 à l'ESAIP (projet applicatif).
