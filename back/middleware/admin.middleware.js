const jwt = require("jsonwebtoken");
const { User } = require("../models");

const adminMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Aucun token n'a été fourni par l'utilisateur." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const user = await User.findByPk(decoded.id);

    if (user.role !== "administrator") {
      return res.status(403).json({ message: "Accès refusé." });
    }
    next();
  } catch (err) {
    res.status(403).json({ message: "Token invalide." });
  }
};

module.exports = adminMiddleware;
