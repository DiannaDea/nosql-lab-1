const mongoose = require('mongoose');

const { Schema } = mongoose;

const NoteSchema = Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: Schema.Types.String,
    required: true,
  },
  text: {
    type: Schema.Types.String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: Schema.Types.String,
    required: true,
    default: 'to do',
  },
  updatedAt: {
    type: Schema.Types.Date,
    required: true,
    default: Date.now,
  }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;