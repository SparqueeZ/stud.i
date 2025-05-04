const express = require("express");
const router = express.Router();
const courseController = require("../../controllers/courses/course.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: integer
 *           description: L'ID auto-généré du cours
 *         title:
 *           type: string
 *           description: Le titre du cours
 *         description:
 *           type: string
 *           description: Description du contenu du cours
 *       example:
 *         id: 1
 *         title: Introduction à JavaScript
 *         description: Apprendre les bases du développement JavaScript
 */

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API de gestion des cours
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Récupère tous les cours
 *     description: Retourne une liste de tous les cours disponibles
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Liste des cours récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get("/courses", courseController.getAllCourses);

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Crée un nouveau cours
 *     description: Ajoute un nouveau cours à la base de données
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Cours créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Données invalides
 */
router.post("/courses", courseController.createCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Récupère un cours spécifique
 *     description: Retourne un cours par son ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du cours
 *     responses:
 *       200:
 *         description: Cours récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Cours non trouvé
 */
router.get("/courses/:id", courseController.getCourseById);

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Met à jour un cours
 *     description: Met à jour les données d'un cours existant par ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du cours
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Cours mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Cours non trouvé
 */
router.put("/courses/:id", courseController.updateCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Supprime un cours
 *     description: Supprime un cours par ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du cours
 *     responses:
 *       204:
 *         description: Cours supprimé avec succès
 *       404:
 *         description: Cours non trouvé
 */
router.delete("/courses/:id", courseController.deleteCourse);

// old
// router.get("/courses/:id", courseController.getCourseById);
// router.put("/courses/full/:id", courseController.updateFullCourse);
// router.delete("/courses/full/:id", courseController.deleteFullCourse);

module.exports = router;
