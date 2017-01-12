var express = require('express');
var router = express.Router();

var ctrlAssociation = require('../controllers/association.controllers.js');
var ctrlEvent = require('../controllers/event.controllers.js');
var ctrlMember = require('../controllers/members.controllers.js');

// Authentication and Authorization Middleware
var authentification = function(req, res, next) {
  // Si j'ai bien un userID dans ma session je poursuis,
  if (req.session && req.session.userID)
    return next();
  else
    return res.redirect(302, '/');
    // Sinon je redirige vers l'index puisqu'on est pas connecté
};

//Association routes
//!\\ READ ME !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Les méthodes avec authentification sont des méthodes qui ne fonctionnent que si il y a une session active
router
    .route('/association')
    .post(ctrlAssociation.associationAddOne)
    .get(authentification, ctrlAssociation.associationGetOne)
    .delete(authentification, ctrlAssociation.associationDelete)
    .put(authentification, ctrlAssociation.associationPut);
    // .get(authentification, ctrlAssociation.associationGetAll)

// Event routes
router
    .route('/event')
    .get(authentification, ctrlEvent.eventGetAll)
    .post(authentification, ctrlEvent.eventAddOne);

router
    .route('/event/:eventId')
    .get(authentification, ctrlEvent.eventGetOne)
    .delete(authentification, ctrlEvent.eventDelete)
    .put(authentification, ctrlEvent.eventPut);

// Membres authentification
router
  .route('/member')
  .post(ctrlMember.memberAddOne);

// Router pour le login
router
  .route('/login')
  .post(ctrlMember.login);

module.exports = router;
