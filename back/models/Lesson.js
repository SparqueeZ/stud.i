const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
