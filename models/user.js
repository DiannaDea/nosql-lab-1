const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = Schema({
  _id: Schema.Types.ObjectId,
  username: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;