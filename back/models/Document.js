const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
 */

const Document = sequelize.define("Document", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  link: { type: DataTypes.STRING },
  type: {
    type: DataTypes.ENUM("text", "archive", "video", "audio", "image"),
    allowNull: false,
  },
  lessonId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
});

// Associations moved to index.js

module.exports = Document;
