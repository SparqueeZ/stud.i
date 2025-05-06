const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserCourse = sequelize.define("UserCourse", {
  purchaseDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  completionStatus: {
    type: DataTypes.ENUM("not_started", "in_progress", "completed"),
    defaultValue: "not_started",
  },
  completionRate: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = UserCourse;
