var express = require('express');
var router = express.Router();

var ctrlAssociation = require('../controllers/association.controllers.js');
var ctrlEvent = require('../controllers/event.controllers.js');

//Association routes
router
    .route('/association')
    .get(ctrlAssociation.associationGetAll)
    .post(ctrlAssociation.associationAddOne);

router
    .route('/association/:associationId')
    .get(ctrlAssociation.associationGetOne)
    .delete(ctrlAssociation.associationDelete)
    .put(ctrlAssociation.associationPut);

// Event routes
router
    .route('/event')
    .get(ctrlEvent.eventGetAll)
    .post(ctrlEvent.eventAddOne);

router
    .route('/event/:eventId')
    .get(ctrlEvent.eventGetOne)
    .delete(ctrlEvent.eventDelete)
    .put(ctrlEvent.eventPut);



module.exports = router;
