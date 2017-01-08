var express = require('express');
var router = express.Router();

var ctrlAssociation = require('../controllers/association.controllers.js');

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


module.exports = router;
