const mongoose = require('mongoose');


const waveSchema = new mongoose.Schema ({
name: {
  type: String,
  required: true,
},
location: {
  type: String,
  required: true,
},
classification: {
  type: String,
  enum: ['reef break', 'beach break', 'point break'],
},
difficulty: {
  type: String,
  enum: ['beginner', 'intermediate', 'advanced'],
},
rating: {
  type: String,
  min: 1,
  max: 5,
},
dangerous: {
  type: Boolean,
},
notes: {
  type: String,
},
});



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  bio: {
    type: String,
  },
  waves: [waveSchema],
});


const User = mongoose.model('User', userSchema);

module.exports = User;
