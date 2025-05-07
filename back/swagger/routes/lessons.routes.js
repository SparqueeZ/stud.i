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
 *
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
 *
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
 *               description:
 *                 type: string
 *                 description: Description de la leçon
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
 *         description: Cours ou chapitre non trouvé
 *       500:
 *         description: Erreur serveur
 *
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
 *               description:
 *                 type: string
 *                 description: Description de la leçon
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
 *         description: Cours, chapitre ou leçon non trouvé
 *       500:
 *         description: Erreur serveur
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
 *         description: Cours, chapitre ou leçon non trouvé
 *       500:
 *         description: Erreur serveur
 */
