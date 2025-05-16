const { User } = require("../../models");
const {
  checkInputs,
  checkEmail,
  checkPassword,
  updateLastConnection,
} = require("../../services/user");
const { LogError, LogSuccess } = require("../../services/console");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const users = await User.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password"],
      },
    });

    res.json({
      total: users.count,
      pages: Math.ceil(users.count / limit),
      currentPage: page,
      users: users.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des utilisateurs",
      error: error.message,
    });
  }
};
