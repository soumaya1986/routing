const express = require("express");
const app = express();
const path = require("path");

// Configuration du moteur de template EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware pour servir les fichiers statiques (CSS)
app.use(express.static(path.join(__dirname, "public")));

// Middleware personnalisé pour vérifier les horaires de travail
function checkWorkingHours(req, res, next) {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  // Vérifier si c'est un jour ouvrable (lundi à vendredi) et entre 9h et 17h
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send(
      "L'application web est disponible uniquement pendant les heures de travail (du lundi au vendredi, de 9 à 17 heures)."
    );
  }
}

app.use(checkWorkingHours);

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/nos-services", (req, res) => {
  res.render("services");
});

app.get("/contactez-nous", (req, res) => {
  res.render("contact");
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
