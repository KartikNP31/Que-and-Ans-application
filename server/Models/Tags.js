const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true, index: true },
  count: { type: Number, default: 1 },
});

tagSchema.index({ name: 1 });

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;