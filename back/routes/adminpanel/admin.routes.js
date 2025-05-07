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

/**
 * @swagger
 * components:
 *   schemas:
 *     Dashboard:
 *       type: object
 *       properties:
 *         userCount:
 *           type: integer
 *           description: Nombre total d'utilisateurs
 *         courseCount:
 *           type: integer
 *           description: Nombre total de cours
 *         recentOrders:
 *           type: array
 *           description: Liste des commandes récentes
 *           items:
 *             $ref: '#/components/schemas/Order'
 *         totalRevenue:
 *           type: number
 *           description: Revenu total
 *
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         courseId:
 *           type: string
 *           format: uuid
 *         status:
 *           type: string
 *           enum: [pending, completed, cancelled]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         orderId:
 *           type: string
 *           format: uuid
 *         amount:
 *           type: number
 *         status:
 *           type: string
 *           enum: [pending, completed, failed]
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     UserPublic:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         firstname:
 *           type: string
 *         lastname:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         role:
 *           type: string
 *           enum: [administrator, trainer, user, guest]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Statistics:
 *       type: object
 *       properties:
 *         sales:
 *           type: object
 *           properties:
 *             daily:
 *               type: integer
 *             monthly:
 *               type: integer
 *             yearly:
 *               type: integer
 *         topCourses:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *               title:
 *                 type: string
 *               orderCount:
 *                 type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API d'administration
 */

// Middleware pour vérifier les droits d'administration (à implémenter)
const checkAdminRights = (req, res, next) => {
  // Vérification de l'authentification et des droits admin
  // À compléter avec la logique d'authentification
  next();
};

// Appliquer le middleware sur toutes les routes admin
router.use(checkAdminRights);

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Récupère les données du tableau de bord administrateur
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Données du tableau de bord
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dashboard'
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès non autorisé
 *       500:
 *         description: Erreur serveur
 */
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

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Récupère la liste paginée des utilisateurs
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numéro de page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Nombre d'éléments par page
 *     responses:
 *       200:
 *         description: Liste paginée des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserPublic'
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès non autorisé
 *       500:
 *         description: Erreur serveur
 */
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

/**
 * @swagger
 * /api/admin/users/{id}:
 *   get:
 *     summary: Récupère les détails d'un utilisateur
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPublic'
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 *
 *   put:
 *     summary: Met à jour les informations d'un utilisateur
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               role:
 *                 type: string
 *                 enum: [administrator, trainer, user, guest]
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/UserPublic'
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 *
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
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

/**
 * @swagger
 * /api/admin/courses:
 *   get:
 *     summary: Récupère la liste des cours avec statistiques
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des cours avec statistiques de vente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Course'
 *                   - type: object
 *                     properties:
 *                       salesCount:
 *                         type: integer
 *                       revenue:
 *                         type: number
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès non autorisé
 *       500:
 *         description: Erreur serveur
 */
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

/**
 * @swagger
 * /api/admin/courses/{id}/feature:
 *   put:
 *     summary: Met un cours en avant sur la page d'accueil
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du cours
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - featured
 *             properties:
 *               featured:
 *                 type: boolean
 *                 description: Statut de mise en avant
 *     responses:
 *       200:
 *         description: Statut de mise en avant mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 course:
 *                   $ref: '#/components/schemas/Course'
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès non autorisé
 *       404:
 *         description: Cours non trouvé
 *       500:
 *         description: Erreur serveur
 */
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

/**
 * @swagger
 * /api/admin/orders:
 *   get:
 *     summary: Récupère la liste des commandes avec pagination et filtres
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numéro de page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Nombre d'éléments par page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, completed, cancelled]
 *         description: Filtre par statut
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Date de début (YYYY-MM-DD)
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Date de fin (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Liste paginée des commandes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès non autorisé
 *       500:
 *         description: Erreur serveur
 */
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

/**
 * @swagger
 * /api/admin/statistics:
 *   get:
 *     summary: Récupère les statistiques de vente
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Statistiques de vente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statistics'
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès non autorisé
 *       500:
 *         description: Erreur serveur
 */
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
