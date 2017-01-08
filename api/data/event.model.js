var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({

  name:{
    type: String,
    required: true
  },
  date:{
    type: Number,
    required: true
  },
  hours:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  }

});

mongoose.model("event", eventSchema, "event");
