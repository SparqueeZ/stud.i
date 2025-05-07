const express = require("express");
const router = express.Router();
const contentController = require("../../controllers/courses/content.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Content:
 *       type: object
 *       required:
 *         - lessonId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique du contenu
 *         textType:
 *           type: string
 *           description: Type de texte (paragraph, heading, etc.)
 *         textContent:
 *           type: string
 *           description: Contenu textuel
 *         noteIcon:
 *           type: string
 *           description: Icône de la note
 *         noteColor:
 *           type: string
 *           description: Couleur de la note
 *         parentId:
 *           type: string
 *           description: Identifiant du contenu parent
 *         lessonId:
 *           type: string
 *           format: uuid
 *           description: Identifiant de la leçon associée
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426614174004
 *         textType: paragraph
 *         textContent: Les variables en JavaScript sont déclarées avec let, const ou var.
 *         noteIcon: info
 *         noteColor: blue
 *         parentId: null
 *         lessonId: 123e4567-e89b-12d3-a456-426614174003
 */

/**
 * @swagger
 * tags:
 *   name: Contents
 *   description: API de gestion des contenus de leçons
 */

/**
 * @swagger
 * /api/contents:
 *   get:
 *     summary: Récupère tous les contenus
 *     tags: [Contents]
 *     responses:
 *       200:
 *         description: Liste des contenus récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Content'
 *       500:
 *         description: Erreur serveur
 */
router.get("/contents", contentController.getAllContents);

/**
 * @swagger
 * /api/courses/{courseId}/contents:
 *   get:
 *     summary: Récupère tous les contenus d'un cours
 *     tags: [Contents]
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
 *         description: Cours avec tous ses contenus récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Cours non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get(
  "/courses/:courseId/contents",
  contentController.getAllContentsByCourseId
);

/**
 * @swagger
 * /api/courses/{courseId}/chapters/{chapterId}/contents:
 *   get:
 *     summary: Récupère tous les contenus d'un chapitre
 *     tags: [Contents]
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
 *         description: Leçons avec leurs contenus récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lesson'
 *       400:
 *         description: ID de chapitre manquant
 *       500:
 *         description: Erreur serveur
 */
router.get(
  "/courses/:courseId/chapters/:chapterId/contents",
  contentController.getAllContentsByChapterId
);

/**
 * @swagger
 * /api/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}/contents:
 *   get:
 *     summary: Récupère tous les contenus d'une leçon
 *     tags: [Contents]
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
 *         name: lessonId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la leçon
 *     responses:
 *       200:
 *         description: Leçon avec ses contenus récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lesson'
 *       400:
 *         description: ID de leçon manquant
 *       404:
 *         description: Leçon non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get(
  "/courses/:courseId/chapters/:chapterId/lessons/:lessonId/contents",
  contentController.getAllContentsByLessonId
);

/**
 * @swagger
 * /api/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}/contents:
 *   post:
 *     summary: Crée un nouveau contenu dans une leçon
 *     tags: [Contents]
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
 *         name: lessonId
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
 *               textType:
 *                 type: string
 *                 description: Type de texte
 *               textContent:
 *                 type: string
 *                 description: Contenu textuel
 *               noteIcon:
 *                 type: string
 *                 description: Icône de la note
 *               noteColor:
 *                 type: string
 *                 description: Couleur de la note
 *               parentId:
 *                 type: string
 *                 description: ID du contenu parent
 *     responses:
 *       201:
 *         description: Contenu créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       404:
 *         description: Leçon non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.post(
  "/courses/:courseId/chapters/:chapterId/lessons/:lessonId/contents",
  contentController.createContent
);

/**
 * @swagger
 * /api/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}/contents/{id}:
 *   put:
 *     summary: Met à jour un contenu
 *     tags: [Contents]
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
 *         name: lessonId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la leçon
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du contenu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               textType:
 *                 type: string
 *                 description: Type de texte
 *               textContent:
 *                 type: string
 *                 description: Contenu textuel
 *               noteIcon:
 *                 type: string
 *                 description: Icône de la note
 *               noteColor:
 *                 type: string
 *                 description: Couleur de la note
 *               parentId:
 *                 type: string
 *                 description: ID du contenu parent
 *     responses:
 *       200:
 *         description: Contenu mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       404:
 *         description: Contenu non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put(
  "/courses/:courseId/chapters/:chapterId/lessons/:lessonId/contents/:id",
  contentController.updateContent
);

/**
 * @swagger
 * /api/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}/contents/{id}:
 *   get:
 *     summary: Récupère un contenu spécifique
 *     tags: [Contents]
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
 *         name: lessonId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la leçon
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du contenu
 *     responses:
 *       200:
 *         description: Contenu récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       404:
 *         description: Contenu non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get(
  "/courses/:courseId/chapters/:chapterId/lessons/:lessonId/contents/:id",
  contentController.getContentById
);

/**
 * @swagger
 * /api/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}/contents/{id}:
 *   delete:
 *     summary: Supprime un contenu
 *     tags: [Contents]
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
 *         name: lessonId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la leçon
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du contenu
 *     responses:
 *       204:
 *         description: Contenu supprimé avec succès
 *       404:
 *         description: Contenu non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete(
  "/courses/:courseId/chapters/:chapterId/lessons/:lessonId/contents/:id",
  contentController.deleteContent
);

module.exports = router;
