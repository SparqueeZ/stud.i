const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

/**
 * @swagger
 * components:
 *   schemas:
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
 */

const Chapter = sequelize.define("Chapter", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  open: { type: DataTypes.BOOLEAN, defaultValue: false },
  courseId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
});

// Associations moved to index.js

module.exports = Chapter;
