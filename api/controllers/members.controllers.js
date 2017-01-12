var mongoose = require('mongoose');
var Members = mongoose.model('members');
var Association = mongoose.model('association');
var crypto = require('crypto');

module.exports.login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.send('login failed');
  } else {

    const email = req.body.email;
    const password = req.body.password;

    Members.findOne({
      email: email
    }).exec((err, membre) => {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(membre != null) {
          // Si on trouve un membre avec cet email
          var motdepasseMD5 = crypto.createHash('md5').update(password).digest("hex");
          console.log(motdepasseMD5);

          if(motdepasseMD5 === membre.password) {
            if(membre.isAssociationAdmin) {
              // Dans le cas d'une connexion d'une association

              // Ici on va chercher dans la collection association l'association qui a l'idCreator
              // Du membre qui essai de se connecter pour stocker l'id de l'association en session
              Association.findOne({
                idCreator: membre._id
              }).exec((err, association) => {
                if(err) {
                  res.status(500).json(err);
                }
                else {
                  if(association != null) {
                    req.session.associationId = association._id;
                    req.session.userID = membre._id;
                    //res.redirect(302, '/dashboardassoc');
                    res.json({isAssoc: true});
                    // ici on redirige vers le dashboard spécial association
                  }
                  else {
                    res.redirect(302, '/');
                  }
                }
              })

            }
            else {

              // Dans le cas d'une connexion d'un bénévole
              req.session.userID = membre._id;
              console.log('Connexion OK');
              res.json({isAssoc: false});
              //res.redirect(302, '/dashboard');

            }
          }
          else {
            res.redirect(302, '/');
          }
        }
        else {
          // Sinon, on redirect vers la page de connexion
          console.log('Pas de membre pour cet email');
          res.redirect(302, '/');
        }
      }
    });
  }
};

module.exports.memberAddOne = (req,res) => {
  console.log("Post new member");

  /*
  Lorsqu'on s'enregistre, on peux choisir si on est bénévole ou admin d'une assoc.
  isAdmin vaut false si bénévole et true si admin.
  /!\ PAS POSSIBILITEE DE CREER PLUSIEURS ASSOC AVEC UN COMPTE /!\


  */
  const motdepasseCrypter = crypto.createHash('md5').update(req.body.password).digest("hex")
  Members
    .create({
      name:req.body.name,
      email:req.body.email,
      password:motdepasseCrypter,
      isAssociationAdmin: false
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

        req.session.userID = member._id;
        res
          .status(200)
          .json(member);

      }
    });
};

// module.export.memberAddOne = (req,res) => {
//   console.log("Post new member");
//
//   Member
//     .create({
//       name:req.body.name,
//       email:req.body.email,
//       password:req.body.password
//     }, function(err, association){
//       if (err) {
//         console.log("Error creating member");
//         res
//           .status(400)
//           .json(err);
//       } else {
//         console.log("Member created", member);
//         res
//           .status(200)
//           .json(member);
//       }
//     });
// };
