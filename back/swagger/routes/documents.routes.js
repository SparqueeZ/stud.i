/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: API de gestion des documents de leçons
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
 *
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
 *
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
 *
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
 *   post:
 *     summary: Crée un nouveau document dans une leçon
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
 *               lessonId:
 *                 type: string
 *                 format: uuid
 *                 description: ID de la leçon associée
 *     responses:
 *       201:
 *         description: Document créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       500:
 *         description: Erreur serveur
 *
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
