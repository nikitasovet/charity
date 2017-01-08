var mongoose = require('mongoose');

var associationSchema = new mongoose.Schema({

  name:{
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  codePostal: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  description: String,
  lien: String,
  photo:[String]
});

mongoose.model("association", associationSchema, "association");
