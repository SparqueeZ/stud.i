const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid");

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
 */

const Content = sequelize.define("Content", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  textType: { type: DataTypes.STRING },
  textContent: { type: DataTypes.STRING },
  noteIcon: { type: DataTypes.STRING },
  noteColor: { type: DataTypes.STRING },
  parentId: { type: DataTypes.STRING },
  lessonId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Lessons",
      key: "id",
    },
  },
});

// Associations moved to index.js

module.exports = Content;
