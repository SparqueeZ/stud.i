const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
