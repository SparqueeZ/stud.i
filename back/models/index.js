const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// Importer les définitions de modèles
const User = require("./User/User");
const Course = require("./Course");
const Chapter = require("./Chapter");
const Lesson = require("./Lesson");
const Document = require("./Document");
const Content = require("./Content");
const UserCourse = require("./UserCourse");

const setupAssociations = () => {
  // User-Course associations (many-to-many with explicit model)
  User.belongsToMany(Course, {
    through: UserCourse,
    foreignKey: "userId",
    otherKey: "courseId",
    onDelete: "CASCADE",
  });
  Course.belongsToMany(User, {
    through: UserCourse,
    foreignKey: "courseId",
    otherKey: "userId",
    onDelete: "CASCADE",
  });

  // Course-Chapter associations
  Course.hasMany(Chapter, {
    foreignKey: { name: "courseId", allowNull: false },
    onDelete: "CASCADE",
  });
  Chapter.belongsTo(Course, { foreignKey: "courseId" });

  // Chapter-Lesson associations
  Chapter.hasMany(Lesson, {
    foreignKey: { name: "chapterId", allowNull: false },
    onDelete: "CASCADE",
  });
  Lesson.belongsTo(Chapter, { foreignKey: "chapterId" });

  // Lesson-Content associations
  Lesson.hasMany(Content, {
    foreignKey: { name: "lessonId", allowNull: false },
    onDelete: "CASCADE",
  });
  Content.belongsTo(Lesson, { foreignKey: "lessonId" });

  // Lesson-Document associations
  Lesson.hasMany(Document, {
    foreignKey: { name: "lessonId", allowNull: false },
    onDelete: "CASCADE",
  });
  Document.belongsTo(Lesson, { foreignKey: "lessonId" });
};

const initializeDatabase = async (options = {}) => {
  try {
    await User.sync(options);
    await Course.sync(options);
    await Chapter.sync(options);
    await Lesson.sync(options);
    await Content.sync(options);
    await Document.sync(options);
    await UserCourse.sync(options);

    console.log("Base de données initialisée avec succès");
    return true;
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation de la base de données:",
      error
    );
    throw error;
  }
};

setupAssociations();

module.exports = {
  sequelize,
  User,
  Course,
  Chapter,
  Lesson,
  Document,
  Content,
  UserCourse,
  initializeDatabase,
};
