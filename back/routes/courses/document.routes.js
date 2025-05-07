const express = require("express");
const router = express.Router();
const documentController = require("../../controllers/courses/document.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Document:
 *       type: object
 *       required:
 *         - title
 *         - type
 *         - lessonId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique du document
 *         title:
 *           type: string
 *           description: Titre du document
 *         link:
 *           type: string
 *           description: Lien vers le document
 *         type:
 *           type: string
 *           enum: [text, archive, video, audio, image]
 *           description: Type de document
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
 *         id: 123e4567-e89b-12d3-a456-426614174005
 *         title: Introduction à JavaScript - PDF
 *         link: /documents/intro-js.pdf
 *         type: text
 *         lessonId: 123e4567-e89b-12d3-a456-426614174003
 */

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: API de gestion des documents de cours
 */

/**
 * @swagger
 * /api/documents:
 *   get:
 *     summary: Récupère tous les documents
 *     tags: [Documents]
 *     responses:
 *       200:
 *         description: Liste des documents récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 *       500:
 *         description: Erreur serveur
 */
router.get("/documents", documentController.getAllDocuments);

/**
 * @swagger
 * /api/courses/{courseId}/documents:
 *   get:
 *     summary: Récupère tous les documents d'un cours
 *     tags: [Documents]
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
 *         description: Liste des documents du cours récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 *       400:
 *         description: ID de cours manquant
 *       500:
 *         description: Erreur serveur
 */
router.get(
  "/courses/:courseId/documents",
  documentController.getAllDocumentsByCourseId
);

/**
 * @swagger
 * /api/courses/{courseId}/chapters/{chapterId}/documents:
 *   get:
 *     summary: Récupère tous les documents d'un chapitre
 *     tags: [Documents]
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
 *         description: Liste des documents du chapitre récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 *       400:
 *         description: ID de chapitre manquant
 *       500:
 *         description: Erreur serveur
 */
router.get(
  "/courses/:courseId/chapters/:chapterId/documents",
  documentController.getAllDocumentsByChapterId
);

/**
 * @swagger
 * /api/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}/documents:
 *   get:
 *     summary: Récupère tous les documents d'une leçon
 *     tags: [Documents]
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
 *         description: Liste des documents de la leçon récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 *       400:
 *         description: ID de leçon manquant
 *       500:
 *         description: Erreur serveur
 */
router.get(
  "/courses/:courseId/chapters/:chapterId/lessons/:lessonId/documents",
  documentController.getAllDocumentsByLessonId
);

/**
 * @swagger
 * /api/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}/documents:
 *   post:
 *     summary: Crée un nouveau document pour une leçon
 *     tags: [Documents]
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
 *             required:
 *               - title
 *               - type
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titre du document
 *               link:
 *                 type: string
 *                 description: Lien vers le document
 *               type:
 *                 type: string
 *                 enum: [text, archive, video, audio, image]
 *                 description: Type de document
 *     responses:
 *       201:
 *         description: Document créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       500:
 *         description: Erreur serveur
 */
router.post(
  "/courses/:courseId/chapters/:chapterId/lessons/:lessonId/documents",
  documentController.createDocument
);

/**
 * @swagger
 * /api/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}/documents/{id}:
 *   put:
 *     summary: Met à jour un document
 *     tags: [Documents]
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
 *         description: ID du document
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titre du document
 *               link:
 *                 type: string
 *                 description: Lien vers le document
 *               type:
 *                 type: string
 *                 enum: [text, archive, video, audio, image]
 *                 description: Type de document
 *     responses:
 *       200:
 *         description: Document mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       400:
 *         description: ID de document manquant
 *       404:
 *         description: Document non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put(
  "/courses/:courseId/chapters/:chapterId/lessons/:lessonId/documents/:id",
  documentController.updateDocument
);

/**
 * @swagger
 * /api/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}/documents/{id}:
 *   delete:
 *     summary: Supprime un document
 *     tags: [Documents]
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
 *         description: ID du document
 *     responses:
 *       204:
 *         description: Document supprimé avec succès
 *       400:
 *         description: ID de document manquant
 *       404:
 *         description: Document non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete(
  "/courses/:courseId/chapters/:chapterId/lessons/:lessonId/documents/:id",
  documentController.deleteDocument
);

module.exports = router;
