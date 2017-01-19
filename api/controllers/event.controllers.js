var mongoose = require('mongoose');
var Event = mongoose.model('event');

module.exports.eventGetAll = (req, res) => {
    console.log('Get the event');

    // Ici on veut tous les événements de l'association qui est connecté en session
    Event
        .find({
          associationId: req.session.associationId
        })
        .exec(function(err, events){
          console.log(err);
          console.log(events);
          if (err) {
            console.log("Error finding event");
            res
                .status(500)
                .json(err);
          } else {
            console.log("Found events", events.length);
            res
                .json(events);
          }
        });
};

module.exports.eventGetOne = (req, res) => {
  var id = req.params.eventId;

  console.log('Get eventId', id);

  Event
      .findById(id)
      .exec(function(err, event){
        if(err) {
          console.log("Eroor finding event");
          res
            .status(500)
            .json(err);
        } else if (!event) {
          console.log("eventId not found in database", id);
          res
              .status(400)
              .json(err);
        }
        res
            .status(200)
            .json(event);
      });
};

module.exports.eventAddOne = (req, res) => {
  console.log("Post new event");

  Event
      .create({
        associationId: req.session.associationId,
        name:req.body.name,
        date:req.body.date,
        description:req.body.description,
        place: req.body.place
      }, function(err, event){
        if(err){
          console.log("Error creating event");
          res
              .status(400)
              .json(err);
        } else {
          console.log("Event created", event);
          res
              .status(200)
              .json(event)
        }
    });
};

module.exports.eventDelete = (req, res) => {
  var eventId = req.params.eventId;

  Event
      .find({
        associationId: req.session.associationId,
        _id: eventId
      })
      .remove()
      .exec(function(err, event){
        if(err){
          res
              .status(500)
              .json(err);
        } else {
          console.log("Event deleted, id", eventId);
          res
              .status(200)
              .json({
                  "msg":"event deleted"
              });
        }
      });
};

module.exports.eventPut = (req, res) => {
  var eventId = req.params.eventId;

  Event
      .findById(eventId)
      .exec(function(err, event){
        if (err) {
          console.log("Error finding event");
          res
              .status(500)
              .json(err);
          return;
        } else if (!event) {
          console.log("eventId not found in database", eventId);
          res
              .status(404)
              .json(err);
          return;
        }

        event.name = req.body.name;
        event.date = req.body.date;
        event.description = req.body.description;
        event.place = req.body.place;

        event
          .save(function(err, eventUpdated){
            if (err) {
               res
                  .status(500)
                  .json(err);
            } else {
                res
                    .status(200)
                    .json(eventUpdated);
            }
          });
      });
};
