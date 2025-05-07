/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique de l'utilisateur
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
 *           description: Mot de passe de l'utilisateur (ne sera jamais renvoyé dans les réponses)
 *         role:
 *           type: string
 *           enum: [administrator, trainer, user, guest]
 *           description: Rôle de l'utilisateur dans le système
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création du compte
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière mise à jour du compte
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426614174000
 *         firstname: Jean
 *         lastname: Dupont
 *         email: jean.dupont@example.com
 *         role: user
 *         createdAt: 2023-01-01T12:00:00Z
 *         updatedAt: 2023-01-01T12:00:00Z
 *
 *     Course:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique du cours
 *         title:
 *           type: string
 *           description: Titre du cours
 *         description:
 *           type: string
 *           description: Description détaillée du cours
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426614174001
 *         title: Introduction à JavaScript
 *         description: Un cours complet pour apprendre les bases de JavaScript
 *         createdAt: 2023-01-01T12:00:00Z
 *         updatedAt: 2023-01-01T12:00:00Z
 *
 *     Chapter:
 *       type: object
 *       required:
 *         - title
 *         - courseId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique du chapitre
 *         title:
 *           type: string
 *           description: Titre du chapitre
 *         open:
 *           type: boolean
 *           description: Indique si le chapitre est ouvert par défaut
 *         courseId:
 *           type: string
 *           format: uuid
 *           description: Identifiant du cours parent
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426614174002
 *         title: Variables et Types
 *         open: true
 *         courseId: 123e4567-e89b-12d3-a456-426614174001
 *         createdAt: 2023-01-01T12:00:00Z
 *         updatedAt: 2023-01-01T12:00:00Z
 *
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
 *         createdAt: 2023-01-01T12:00:00Z
 *         updatedAt: 2023-01-01T12:00:00Z
 *
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
 *         createdAt: 2023-01-01T12:00:00Z
 *         updatedAt: 2023-01-01T12:00:00Z
 *
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
 *         createdAt: 2023-01-01T12:00:00Z
 *         updatedAt: 2023-01-01T12:00:00Z
 *
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 */
