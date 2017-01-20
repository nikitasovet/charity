var mongoose = require('mongoose');
var Association = mongoose.model('association');
var Members = mongoose.model('members');
var crypto = require('crypto');

// module.exports.associationGetAll = (req,res) => {
//    console.log('Get the association');
//
//
//   Association
//         .find()
//         .exec(function(err,associations){
//           console.log(err);
//           console.log(associations);
//           if(err){
//             console.log("Error finding association");
//             res
//                 .status(500)
//                 .json(err);
//           } else {
//             console.log("Found association", associations.length);
//             res
//                 .json(associations);
//           }
//         });
// };

module.exports.associationGetOne = (req, res) => {
  var id = req.session.associationId;
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

  const motdepasseCrypter = crypto.createHash('md5').update(req.body.password).digest("hex")
  Members
    .create({
      name:req.body.name,
      email:req.body.email,
      password:motdepasseCrypter,
      isAssociationAdmin: true
    }, function(err, member){
      if (err) {
        console.log("Error creating member");
        res
          .status(400)
          .json(err);
      } else {
        console.log("Member created", member);
        // Ici on créé une session et on créé USERID qui contient
        // l'id du membre dans la collection mongo



        // Deuxième étape, apres avoir créé l'utilisateur, on créé l'association
        Association
            .create({
                name:req.body.name,
                surname:req.body.surname,
                address:req.body.address,
                codePostal:req.body.codePostal,
                city:req.body.city,
                country:req.body.country,
                phone:req.body.phone,
                description:req.body.description,
                lien:req.body.lien,
                photo:_splitArray(req.body.photo),
                idCreator: member._id

              }, function(err2, association) {
                  if (err2) {
                    console.log("Error creating asssociation");
                    console.log(err2);
                    res
                        .status(400)
                        .json(err2);
                } else {
                    console.log("Association created", association);
                    req.session.userID = member._id;
                    req.session.associationId = association._id;

                    res
                        .status(200)
                        .json(association)
                }
        });

      }
    });

};

module.exports.associationDelete = (req, res) => {
  var associationId = req.session.associationId;

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
   var associationId = req.session.associationId;

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

console.log(req.body);
          association.name = req.body.name,
          association.surname = req.body.surname,
          association.address = req.body.address,
          association.codePostal = req.body.codePostal,
          association.city = req.body.city,
          association.country = req.body.country,
          // association.phone = req.body.phone,
          association.description = req.body.description;
          // association.lien = req.body.lien,
          // association.photo = _splitArray(req.body.photo)

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
