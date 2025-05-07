/**
 * @swagger
 * tags:
 *   name: Chapters
 *   description: API de gestion des chapitres
 */

/**
 * @swagger
 * /api/chapters:
 *   get:
 *     summary: Récupère tous les chapitres
 *     tags: [Chapters]
 *     responses:
 *       200:
 *         description: Liste des chapitres récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chapter'
 *       500:
 *         description: Erreur serveur
 *
 * /api/courses/{courseId}/chapters:
 *   get:
 *     summary: Récupère tous les chapitres d'un cours
 *     tags: [Chapters]
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
 *         description: Liste des chapitres du cours récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chapter'
 *       404:
 *         description: Cours non trouvé
 *       500:
 *         description: Erreur serveur
 *   post:
 *     summary: Crée un nouveau chapitre dans un cours
 *     tags: [Chapters]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du cours
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
 *                 description: Titre du chapitre
 *               open:
 *                 type: boolean
 *                 description: Indique si le chapitre est ouvert par défaut
 *                 default: false
 *     responses:
 *       201:
 *         description: Chapitre créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chapter'
 *       404:
 *         description: Cours non trouvé
 *       500:
 *         description: Erreur serveur
 *
 * /api/courses/{courseId}/chapters/{id}:
 *   get:
 *     summary: Récupère un chapitre spécifique
 *     tags: [Chapters]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du cours
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du chapitre
 *     responses:
 *       200:
 *         description: Chapitre récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chapter'
 *       404:
 *         description: Cours ou chapitre non trouvé
 *       500:
 *         description: Erreur serveur
 *   put:
 *     summary: Met à jour un chapitre
 *     tags: [Chapters]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du cours
 *       - in: path
 *         name: id
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
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titre du chapitre
 *               open:
 *                 type: boolean
 *                 description: Indique si le chapitre est ouvert par défaut
 *     responses:
 *       200:
 *         description: Chapitre mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chapter'
 *       404:
 *         description: Cours ou chapitre non trouvé
 *       500:
 *         description: Erreur serveur
 *   delete:
 *     summary: Supprime un chapitre
 *     tags: [Chapters]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du cours
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du chapitre
 *     responses:
 *       204:
 *         description: Chapitre supprimé avec succès
 *       404:
 *         description: Cours ou chapitre non trouvé
 *       500:
 *         description: Erreur serveur
 */
