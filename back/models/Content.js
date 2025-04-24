const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid");

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
