var mongoose = require('mongoose');

var memberSchema = new mongoose.Schema ({

  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }


});

mongoose.model("member", memberSchema, "member");
