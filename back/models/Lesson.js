const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
 */

const Lesson = sequelize.define("Lesson", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  link: { type: DataTypes.STRING },
  icon: { type: DataTypes.STRING },
  chapterId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
});

// Associations moved to index.js

module.exports = Lesson;
