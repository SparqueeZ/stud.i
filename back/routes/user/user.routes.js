const express = require("express");
const router = express.Router();
const authenticationController = require("../../controllers/authentication/auth.controller");
const userController = require("../../controllers/user/user.controller");
const authMiddleware = require("../../middleware/auth.middleware");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: sessionToken
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API de gestion des utilisateurs
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupère tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste de tous les utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserPublic'
 *       500:
 *         description: Erreur serveur
 */
router.get("/users", authenticationController.getAllUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPublic'
 *       500:
 *         description: Erreur serveur
 */
router.post("/users", authenticationController.createUser);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Récupère les informations de l'utilisateur connecté
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPublic'
 *       401:
 *         description: Non authentifié - aucun token fourni
 *       403:
 *         description: Token invalide
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/user", authMiddleware, userController.getUserData);

module.exports = router;
