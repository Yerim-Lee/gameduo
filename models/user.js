const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config= require('../config/database');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true   //반드시 입력해야되는 정보
  },
  email: {
    type: String,
    require: true  
  },
  username: {
    type: String,
    require: true  
  },
  password: {
    type: String,
    require: true   
  },
});

const User = mongoose.model('User', UserSchema);

User.getUserById = function(id, callback) {
  User.findById(id, callback);
}

User.getUserByUsername = function(username, callback) {
  const query = { username : username };
  User.findOne(query, callback);
}

User.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports = User;