const express = require("express");
const router = express.Router();
const {
  User,
  Course,
  Chapter,
  Lesson,
  Order,
  Payment,
} = require("../../models");

// Middleware pour vérifier les droits d'administration (à implémenter)
const checkAdminRights = (req, res, next) => {
  // Vérification de l'authentification et des droits admin
  // À compléter avec la logique d'authentification
  next();
};

// Appliquer le middleware sur toutes les routes admin
router.use(checkAdminRights);

// === DASHBOARD ===
router.get("/dashboard", async (req, res) => {
  try {
    const userCount = await User.count();
    const courseCount = await Course.count();
    const recentOrders = await Order.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
    });

    // Calcul des revenus totaux
    const totalRevenue = await Payment.sum("amount");

    res.json({
      userCount,
      courseCount,
      recentOrders,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des données du tableau de bord",
      error: error.message,
    });
  }
});

// === GESTION DES UTILISATEURS ===
// Liste des utilisateurs avec pagination
router.get("/users", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const users = await User.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
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
});

// Détail d'un utilisateur
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Order, include: [Course] }],
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de l'utilisateur",
      error: error.message,
    });
  }
});

// Mettre à jour un utilisateur
router.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await user.update(req.body);
    res.json({ message: "Utilisateur mis à jour avec succès", user });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour de l'utilisateur",
      error: error.message,
    });
  }
});

// Supprimer un utilisateur
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await user.destroy();
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de l'utilisateur",
      error: error.message,
    });
  }
});

// === GESTION DES COURS ===
// Liste des cours avec statistiques de vente
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [{ model: Chapter, include: [Lesson] }],
      order: [["createdAt", "DESC"]],
    });

    // Enrichir avec des statistiques de vente
    const coursesWithStats = await Promise.all(
      courses.map(async (course) => {
        const salesCount = await Order.count({
          where: { courseId: course.id },
        });

        const revenue = await Payment.sum("amount", {
          include: [{ model: Order, where: { courseId: course.id } }],
        });

        return {
          ...course.toJSON(),
          salesCount,
          revenue: revenue || 0,
        };
      })
    );

    res.json(coursesWithStats);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des cours",
      error: error.message,
    });
  }
});

// Mettre un cours en avant sur la page d'accueil
router.put("/courses/:id/feature", async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Cours non trouvé" });
    }

    await course.update({ featured: req.body.featured });
    res.json({ message: "Statut de mise en avant mis à jour", course });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du statut",
      error: error.message,
    });
  }
});

// === GESTION DES VENTES ===
// Liste des commandes avec pagination et filtres
router.get("/orders", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const { status, dateFrom, dateTo } = req.query;

  const where = {};
  if (status) where.status = status;
  if (dateFrom || dateTo) {
    where.createdAt = {};
    if (dateFrom) where.createdAt.$gte = new Date(dateFrom);
    if (dateTo) where.createdAt.$lte = new Date(dateTo);
  }

  try {
    const orders = await Order.findAndCountAll({
      where,
      include: [
        { model: User, attributes: ["id", "email", "firstName", "lastName"] },
        { model: Course, attributes: ["id", "title", "price"] },
        { model: Payment },
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      total: orders.count,
      pages: Math.ceil(orders.count / limit),
      currentPage: page,
      orders: orders.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des commandes",
      error: error.message,
    });
  }
});

// === STATISTIQUES ===
router.get("/statistics", async (req, res) => {
  try {
    // Statistiques de vente par période
    const today = new Date();
    const lastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    const lastYear = new Date(
      today.getFullYear() - 1,
      today.getMonth(),
      today.getDate()
    );

    const dailySales = await Order.count({
      where: { createdAt: { $gte: new Date(today - 24 * 60 * 60 * 1000) } },
    });
    const monthlySales = await Order.count({
      where: { createdAt: { $gte: lastMonth } },
    });
    const yearlySales = await Order.count({
      where: { createdAt: { $gte: lastYear } },
    });

    // Cours les plus vendus
    const topCourses = await Course.findAll({
      attributes: [
        "id",
        "title",
        [sequelize.fn("COUNT", sequelize.col("Orders.id")), "orderCount"],
      ],
      include: [{ model: Order, attributes: [] }],
      group: ["Course.id"],
      order: [[sequelize.literal("orderCount"), "DESC"]],
      limit: 5,
    });

    res.json({
      sales: {
        daily: dailySales,
        monthly: monthlySales,
        yearly: yearlySales,
      },
      topCourses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des statistiques",
      error: error.message,
    });
  }
});

module.exports = router;
