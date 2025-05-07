const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { LogError } = require("../../services/console");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique de l'utilisateur
 *         firstname:
 *           type: string
 *           description: Prénom de l'utilisateur
 *         lastname:
 *           type: string
 *           description: Nom de famille de l'utilisateur
 *         email:
 *           type: string
 *           format: email
 *           description: Adresse email de l'utilisateur
 *         password:
 *           type: string
 *           format: password
 *           description: Mot de passe hashé de l'utilisateur
 *         role:
 *           type: string
 *           enum: [administrator, trainer, user, guest]
 *           description: Rôle de l'utilisateur
 *           default: user
 *         resetTokenUsed:
 *           type: boolean
 *           description: Indique si le token de réinitialisation a été utilisé
 *           default: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("administrator", "trainer", "user", "guest"),
    allowNull: false,
    defaultValue: "user",
  },
  resetTokenUsed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  lastConnectedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

User.beforeCreate(async (user) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password, salt);
});

User.prototype.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

User.prototype.generateAuthToken = function () {
  const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

User.prototype.generateResetToken = async function () {
  this.resetTokenUsed = false; // Reset the token usage flag
  await this.save();
  const resetToken = jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_RESET_EXPIRES_IN,
  });
  return resetToken;
};

User.prototype.getCourses = async function () {
  const Course = require("../Course");
  const Chapter = require("../Chapter");
  const Lesson = require("../Lesson");
  // Récupère les cours avec Chapters et Lessons
  const courses = await Course.findAll({
    include: [
      {
        model: require("./User"),
        where: { id: this.id },
        attributes: [],
        through: {
          attributes: ["purchaseDate", "completionStatus", "completionRate"],
        },
      },
      {
        model: Chapter,
        include: [
          {
            model: Lesson,
          },
        ],
      },
    ],
  });

  return courses.map((course) => {
    const courseObj = course.toJSON();
    if (courseObj.Chapters) {
      courseObj.chapters = courseObj.Chapters.map((chapter) => {
        if (chapter.Lessons) {
          chapter.lessons = chapter.Lessons;
          delete chapter.Lessons;
        }
        return chapter;
      });
      delete courseObj.Chapters;
    }
    return courseObj;
  });
};

module.exports = User;
