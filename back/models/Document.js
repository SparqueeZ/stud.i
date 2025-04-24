const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
