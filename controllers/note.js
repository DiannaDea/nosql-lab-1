const mongoose = require('mongoose');
const Note = require('../models/note');
const UserController = require('../controllers/user');

const NoteController = {
  checkIfExists: (params) => Note.findOne({ ...params }),
  create: async (ctx) => {
    const { userId } = ctx;
    const { title, text, status } = ctx.request.body;

    try {
      const note = await Note.create({
        _id: new mongoose.Types.ObjectId(),
        title,
        text,
        userId,
        status,
      });

      return ctx.send(200, note);
    } catch (error) {
      return ctx.send(500, error.message);
    }
  },
  getAll: async (ctx) => {
    const notes = await Note.find({});

    return (notes && notes.length)
      ? ctx.send(200, notes)
      : ctx.send(204);
  },
  getAllSorted: async (ctx) => {
    const { field, order } = ctx.query;
    
    const notes = await Note.find({}).sort({ [field]: order });

    return ctx.send(200, notes);
  },
  getAllUserNotes: async (ctx) => {
    const { filter, search, sort } = ctx.query;

    const { userId } = ctx.params;

    const user = await UserController.checkIfExists({ _id: userId });
    if (!user) return ctx.send(400, 'No user with such id');

    const notes = (sort) 
      ? await Note.find({ 
          userId,
          ...(search && { ...search }),
          ...(filter && { ...filter })
        }).sort({ [sort.field]: sort.order })
      : await Note.find({ 
          userId,
          ...(search && { ...search }),
          ...(filter && { ...filter })
        });

    return ctx.send(200, notes);

  },
  update: async (ctx) => {
    const { userId } = ctx;
    const { id } = ctx.params;
    const { text, title }= ctx.request.body;

    const note = await NoteController.checkIfExists({ _id: id, userId});
    if (!note) return ctx.send(400, 'No note with such id and userId');

    try {
      await Note.findOneAndUpdate({ _id: id }, {
        text: (text) ? text : note.text,
        title: (title) ? title : note.title,
        updatedAt: Date.now(),
      });
      return ctx.send(200);
    } catch (error) {
      return ctx.send(500, error.message);
    }
  },
  delete: async (ctx) => {
    const { userId } = ctx;
    const { id } = ctx.params;

    const note = await NoteController.checkIfExists({ _id: id });
    if (!note) return ctx.send(400, 'No note with such id and userId');

    try {
      await Note.findOneAndRemove({ _id: id });
      return ctx.send(200);
    } catch (error) {
      return ctx.send(500, error.message);
    }
  },
};

module.exports = NoteController;