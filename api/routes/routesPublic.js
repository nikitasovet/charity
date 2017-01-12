var express = require('express');
var router = express.Router();
var path = require('path');

// Authentication and Authorization Middleware
var authentification = function(req, res, next) {
  // Si j'ai bien un userID dans ma session je poursuis,
  if (req.session && req.session.userID)
    return next();
  else
    return res.redirect(302, '/');
    // Sinon je redirige vers l'index puisqu'on est pas connecté
};

// Si on me demande l'adresse localhost:3000/dashboard
// je vais chercher le contenu de dashboard.html
router.route('/dashboard').get(authentification, function(req, res) {
  res.sendFile('dashboard.html', { root: path.join(__dirname, '../../public') });
});
router.route('/dashboardassoc').get(authentification, function(req, res) {
  res.sendFile('dashboardassoc.html', { root: path.join(__dirname, '../../public') });
});

// Fonction pour se déconnecter
router.route('/signout').get(authentification, function(req, res) {
  req.session.destroy();
  console.log('Session fin');
  res.redirect(302, '/');
});

module.exports = router;
