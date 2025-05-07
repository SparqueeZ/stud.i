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
 *
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
 *
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
 *
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
 *
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
 *       400:
 *         description: ID de contenu manquant
 *       404:
 *         description: Contenu non trouvé
 *       500:
 *         description: Erreur serveur
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
 *       400:
 *         description: ID de contenu manquant
 *       404:
 *         description: Contenu non trouvé
 *       500:
 *         description: Erreur serveur
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
 *       400:
 *         description: ID de contenu manquant
 *       404:
 *         description: Contenu non trouvé
 *       500:
 *         description: Erreur serveur
 */
