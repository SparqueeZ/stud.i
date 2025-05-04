const express = require("express");
const router = express.Router();
const authenticationController = require("../../controllers/authentication/auth.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     UserCredentials:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Adresse email de l'utilisateur
 *         password:
 *           type: string
 *           format: password
 *           description: Mot de passe de l'utilisateur
 *       example:
 *         email: utilisateur@exemple.com
 *         password: MotDePasse123!
 *
 *     UserRegistration:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *       properties:
 *         firstname:
 *           type: string
 *           description: Prénom de l'utilisateur
 *         lastname:
 *           type: string
 *           description: Nom de famille de l'utilisateur
 *         email:
 *           type: string
 *           format: email
 *           description: Adresse email de l'utilisateur
 *         password:
 *           type: string
 *           format: password
 *           description: Mot de passe de l'utilisateur
 *       example:
 *         firstname: Jean
 *         lastname: Dupont
 *         email: jean.dupont@exemple.com
 *         password: MotDePasse123!
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API d'authentification
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Authentication]
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
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 role:
 *                   type: string
 *                   enum: [administrator, trainer, user, guest]
 *       400:
 *         description: Données invalides ou champs manquants
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 code:
 *                   type: number
 *       409:
 *         description: Email déjà utilisé
 *       500:
 *         description: Erreur serveur
 */
router.post("/auth/register", authenticationController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCredentials'
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     firstname:
 *                       type: string
 *                     lastname:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: sessionToken=abc123; Path=/; HttpOnly
 *       401:
 *         description: Mot de passe invalide
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.post("/auth/login", authenticationController.login);

router.post(
  "/auth/forgot-password",
  authenticationController.requestPasswordReset
);
router.post("/auth/reset-password", authenticationController.resetPassword);

module.exports = router;
