var mongoose = require('mongoose');

var membersSchema = new mongoose.Schema ({

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
  },
  isAssociationAdmin: {
    type: Boolean,
    required: true
  }


});

mongoose.model("members", membersSchema, "members");
