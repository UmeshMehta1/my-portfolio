const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters'],
  },
  ipAddress: {
    type: String,
  },
  userAgent: {
    type: String,
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new',
  },
  repliedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Index for faster queries
contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1 });
contactSchema.index({ email: 1 });

// Instance method to mark as read
contactSchema.methods.markAsRead = function() {
  this.status = 'read';
  return this.save();
};

// Instance method to mark as replied
contactSchema.methods.markAsReplied = function() {
  this.status = 'replied';
  this.repliedAt = new Date();
  return this.save();
};

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;

