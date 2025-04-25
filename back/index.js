const express = require("express");
const cors = require("cors");
// Import models through the index.js file instead of database directly
const { sequelize } = require("./models");
const cookieParser = require("cookie-parser");
const courseRoutes = require("./routes/courses/course.routes");
const chapterRoutes = require("./routes/courses/chapter.routes");
const lessonRoutes = require("./routes/courses/lesson.routes");
const contentRoutes = require("./routes/courses/content.routes");
const documentRoutes = require("./routes/courses/document.routes");
const adminRoutes = require("./routes/adminpanel/admin.routes");
const userRoutes = require("./routes/user/user.routes");
const authRoutes = require("./routes/auth/auth.routes");

const app = express();

const corsOptions = {
  origin: "http://localhost",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes for the courses
app.use("/api", courseRoutes);
app.use("/api", chapterRoutes);
app.use("/api", lessonRoutes);
app.use("/api", contentRoutes);
app.use("/api", documentRoutes);

// Routes for the user authentication
app.use("/api", authRoutes);
app.use("/api", userRoutes);

// Routes for the admin panel
app.use("/api/admin", adminRoutes);

// Synchronisation de la base de données et démarrage du serveur
sequelize
  .sync({ alter: false, logging: false, force: false })
  .then(() => {
    console.log("Connexion à la base de données réussie.");
    app.listen(3000, () => {
      console.log("Serveur démarré sur le port 3000");
    });
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données:", error);
    // Additional detailed error logging
    if (error.parent) {
      console.error("SQL Error:", error.parent.sqlMessage);
      console.error("SQL Query:", error.sql);
    }
  });

// Disable Sequelize logging globally after sync
sequelize.options.logging = false;
