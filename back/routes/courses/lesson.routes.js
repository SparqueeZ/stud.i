const express = require("express");
const router = express.Router();
const lessonController = require("../../controllers/courses/lesson.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Lesson:
 *       type: object
 *       required:
 *         - title
 *         - chapterId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique de la leçon
 *         title:
 *           type: string
 *           description: Titre de la leçon
 *         link:
 *           type: string
 *           description: Lien vers une ressource externe
 *         icon:
 *           type: string
 *           description: Icône représentative de la leçon
 *         chapterId:
 *           type: string
 *           format: uuid
 *           description: Identifiant du chapitre parent
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426614174003
 *         title: Les variables en JavaScript
 *         link: /resources/js-variables
 *         icon: code
 *         chapterId: 123e4567-e89b-12d3-a456-426614174002
 */

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: API de gestion des leçons
 */

/**
 * @swagger
 * /api/lessons:
 *   get:
 *     summary: Récupère toutes les leçons
 *     tags: [Lessons]
 *     responses:
 *       200:
 *         description: Liste des leçons récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lesson'
 *       500:
 *         description: Erreur serveur
 */
router.get("/lessons", lessonController.getAllLessons);

/**
 * @swagger
 * /api/courses/{courseId}/lessons:
 *   get:
 *     summary: Récupère toutes les leçons d'un cours
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du cours
 *     responses:
 *       200:
 *         description: Liste des leçons du cours récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lesson'
 *       404:
 *         description: Cours non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get(
  "/courses/:courseId/lessons",
  lessonController.getAllLessonsByCourseId
);

/**
 * @swagger
 * /api/courses/{courseId}/chapters/{chapterId}/lessons:
 *   get:
 *     summary: Récupère toutes les leçons d'un chapitre
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du cours
 *       - in: path
 *         name: chapterId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du chapitre
 *     responses:
 *       200:
 *         description: Liste des leçons du chapitre récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lesson'
 *       404:
 *         description: Cours ou chapitre non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get(
  "/courses/:courseId/chapters/:chapterId/lessons",
  lessonController.getAllLessonsByChapterId
);

/**
 * @swagger
 * /api/courses/{courseId}/chapters/{chapterId}/lessons/{id}:
 *   get:
 *     summary: Récupère une leçon spécifique
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du cours
 *       - in: path
 *         name: chapterId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du chapitre
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la leçon
 *     responses:
 *       200:
 *         description: Leçon récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lesson'
 *       404:
 *         description: Cours, chapitre ou leçon non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get(
  "/courses/:courseId/chapters/:chapterId/lessons/:id",
  lessonController.getLessonById
);

/**
 * @swagger
 * /api/courses/{courseId}/chapters/{chapterId}/lessons:
 *   post:
 *     summary: Crée une nouvelle leçon dans un chapitre
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du cours
 *       - in: path
 *         name: chapterId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du chapitre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titre de la leçon
 *               link:
 *                 type: string
 *                 description: Lien vers une ressource externe
 *               icon:
 *                 type: string
 *                 description: Icône représentative de la leçon
 *     responses:
 *       201:
 *         description: Leçon créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lesson'
 *       404:
 *         description: Chapitre non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.post(
  "/courses/:courseId/chapters/:chapterId/lessons",
  lessonController.createLesson
);

/**
 * @swagger
 * /api/courses/{courseId}/chapters/{chapterId}/lessons/{id}:
 *   put:
 *     summary: Met à jour une leçon
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du cours
 *       - in: path
 *         name: chapterId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du chapitre
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la leçon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titre de la leçon
 *               link:
 *                 type: string
 *                 description: Lien vers une ressource externe
 *               icon:
 *                 type: string
 *                 description: Icône représentative de la leçon
 *     responses:
 *       200:
 *         description: Leçon mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lesson'
 *       404:
 *         description: Leçon non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.put(
  "/courses/:courseId/chapters/:chapterId/lessons/:id",
  lessonController.updateLesson
);

/**
 * @swagger
 * /api/courses/{courseId}/chapters/{chapterId}/lessons/{id}:
 *   delete:
 *     summary: Supprime une leçon
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du cours
 *       - in: path
 *         name: chapterId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du chapitre
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la leçon
 *     responses:
 *       204:
 *         description: Leçon supprimée avec succès
 *       404:
 *         description: Leçon non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.delete(
  "/courses/:courseId/chapters/:chapterId/lessons/:id",
  lessonController.deleteLesson
);

module.exports = router;
