var mongoose = require('mongoose');
var Association = mongoose.model('association');

module.exports.associationGetAll = (req,res) => {
   console.log('Get the association');


  Association
        .find()
        .exec(function(err,associations){
          console.log(err);
          console.log(associations);
          if(err){
            console.log("Error finding association");
            res
                .status(500)
                .json(err);
          } else {
            console.log("Found association", associations.length);
            res
                .json(associations);
          }
        });
};

module.exports.associationGetOne = (req, res) => {
  var id = req.params.associationId;
  console.log('Get associationId', id);

  Association
        .findById(id)
        .exec(function(err,association){
          if(err){
            console.log("Error finding zoo");
            res
                .status(500)
                .json(err);
          } else if (!association) {
            console.log("AssociationId not found in database", id);
            res
                .status(400)
                .json(err);
          }
          res
            .status(200)
            .json(association);
        });

};
var _splitArray = function(input) {
    var output;
    if (input && input.length > 0) {
        output = input.split(";");
    } else {
        output = [];
    }
    return output;
};

module.exports.associationAddOne = (req,res) => {
  console.log("Post new association");

  Association
      .create({
          name:req.body.name,
          username:req.body.username,
          address:req.body.address,
          codePostal:req.body.codePostal,
          city:req.body.city,
          country:req.body.country,
          phone:req.body.phone,
          description:req.body.description,
          lien:req.body.lien,
          photo:_splitArray(req.body.photo)

        }, function(err, association) {
            if (err) {
              console.log("Error creating asssociation");
              res
                  .status(400)
                  .json(err);
          } else {
              console.log("Association created", association);
              res
                  .status(200)
                  .json(association)
          }
        });
};

module.exports.associationDelete = (req, res) => {
  var associationId = req.params.associationId;

  Association
      .findByIdAndRemove(associationId)
      .exec(function(err, association) {
        if (err) {
           res
              .status(500)
              .json(err);
        } else {
            console.log("Association deleted, id" , associationId);
            res
            .status(500)
            .json({
                "msg":"association deleted"
            });
        }
      });
};

module.exports.associationPut = (req, res) => {
   var associationId = req.params.associationId;

   Association
        .findById(associationId)
        .exec(function(err, association){
          if (err) {
            console.log("Error finding association");
            res
                .status(500)
                .json(err);
            return;
          } else if (!association) {
            console.log("associationId not found in database", associationId);
            res
                .status(404)
                .json(err);
            return;
          }


          association.name = req.body.name,
          association.username = req.body.username,
          association.address = req.body.address,
          association.codePostal = req.body.codePostal,
          association.city = req.body.city,
          association.country = req.body.country,
          association.phone = req.body.phone,
          association.description = req.body.description,
          association.lien = req.body.lien,
          association.photo = _splitArray(req.body.photo)

          association
          .save(function(err, associationUpdated){
            if (err) {
               res
                  .status(500)
                  .json(err);
            } else {
               res
                  .status(200)
                  .json(associationUpdated);
            }
          });

        });
}
