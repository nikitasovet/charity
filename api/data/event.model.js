var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
  associationId: {
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true
  },
  date:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  place:{
    type: String,
    required: true
  }

});

mongoose.model("event", eventSchema, "event");
