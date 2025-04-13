const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  projectURL: { type: String, required: true },
});

// ✅ Compound unique index on email + projectURL
userSchema.index({ email: 1, projectURL: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
